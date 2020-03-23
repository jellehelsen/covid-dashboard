import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    list: {
        width: 250,
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid black',
        overflowY: 'auto',
    }
})


class CountryList extends React.Component {
    render() {
        const { countries, classes } = this.props
        return (
            <List className={classes.list}>
                {countries.map(country => {
                    return (
                          <ListItem key={country.name}>
                            <ListItemIcon>
                              <Checkbox/>
                            </ListItemIcon>
                          <ListItemText primary={country.name}/>
                      </ListItem>
                    )
                })}
            </List>
        )
    }
}

export default withStyles(useStyles)(CountryList);
