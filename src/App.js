import React, { Fragment, useState, useEffect } from 'react';

import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api';

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [childClicked, setChildClicked] = useState(null);

  const [weatherData, setWeatherData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [type, setType] = useState('restaurants');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [rating, setRating] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, []);

  useEffect(() => {

    if (bounds.sw && bounds.ne) {
      setLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data))
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setLoading(false);
        })
    }
  }, [type, bounds]);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => Number(place.rating) > rating)
    setFilteredPlaces(filteredPlaces);
  }, [rating]);


  return (
    <Fragment>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }} >
        <Grid item xs={12} md={4}>
          <List
            loading={loading}
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </Fragment>
  )
}
export default App;