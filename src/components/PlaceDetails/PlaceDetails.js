import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles'

const PlaceDetails = ({ place, selected, refProp }) => {
    const classes = useStyles();

    if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    return (
        <Card elevation={6}>
            <CardMedia
                style={{ height: 350 }}
                image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={place.name}
            />
            <CardContent>
                <Typography variant='h5' gutterBottom>
                    {place.name}
                </Typography>


                <Box display="flex" justifyContent="space-between" >
                    <Rating value={Number(place.rating)} readOnly />
                    <Typography variant='subtitle1' gutterBottom>
                        Out of {place.num_reviews} reviews
                    </Typography>
                </Box>


                <Box display="flex" justifyContent="space-between" >
                    <Typography variant='subtitle1'>
                        Price
                    </Typography>
                    <Typography variant='subtitle1' gutterBottom>
                        {place.price_level}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" >
                    <Typography variant='subtitle1'>
                        Rank
                    </Typography>
                    <Typography variant='subtitle1' gutterBottom>
                        {place.ranking}
                    </Typography>
                </Box>
                {/* {place?.awards?.map((award) => (
                    <Box display='flex' my={1} justifyContent='space-between' alignItems='center'>
                        <img src={award.images.small} alt={award.display_name} />
                        <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                    </Box>
                ))} */}
                {place?.cuisine?.map(({ name }) => (
                    <Chip className={classes.chip} label={name} size="small" key={name} />
                ))}
                {place?.address && (
                    <Typography className={classes.subtitle} variant="body2" color='textSecondary' gutterBottom>
                        <LocationOnIcon />{place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography className={classes.spacing} variant="body2" color='textSecondary' gutterBottom>
                        <PhoneIcon />{place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button size='small' color="primary" onClick={() => window.open(place.web_url, '_blank')} >
                        View on Trip Advisor
                    </Button>
                    <Button size='small' color="primary" onClick={() => window.open(place.website, '_blank')} >
                        Restaurant's Website
                    </Button>
                </CardActions>
            </CardContent>

        </Card>
    )
}
export default PlaceDetails;