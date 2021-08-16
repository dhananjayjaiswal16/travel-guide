import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'
import { Autocomplete } from '@react-google-maps/api';
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './styles'

const Header = ({ setCoordinates }) => {
    const classes = useStyles();

    const [autocomplete, setAutocomplete] = useState([]);

    //const onLoad = (autoComp) => setAutocomplete(autoComp);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng });
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar className={classes.toolbar} >
                    <Typography variant="h5" className={classes.title} >
                        Travel Guide
                    </Typography>
                    <Box display="flex">
                        <Typography variant="h6" className={classes.title} >
                            Search for new places
                        </Typography>
                        <Autocomplete onLoad={(autoComp) => setAutocomplete(autoComp)} onPlaceChanged={onPlaceChanged}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }}
                                />

                            </div>
                        </Autocomplete>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Header;