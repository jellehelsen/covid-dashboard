import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    list: {
        width: 250,
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        overflowY: 'auto',
    }
})


class CountryList extends React.Component {
    constructor(props){
        super(props)
        this.state = {checked: []}
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle(event){
        const value = event.target.textContent,
              { checked } = this.state,
              currentIndex = checked.indexOf(value),
              newChecked = [...checked];
        const { setSelectedCountries } = this.props

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        this.setState({checked: newChecked})
        setSelectedCountries(newChecked)
    }

    render() {
        const { countries, classes } = this.props
        const { checked } = this.state
        let countryList = countries.sort((a, b) => {
            if(a.current > b.current) return -1
            if(b.current > a.current) return 1
            return 0
        })
        return (
            <List className={classes.list}>
                {countryList.map(country => {
                    return (
                          <ListItem key={country.name} onClick={this.handleToggle}>
                            <ListItemIcon>
                            <Checkbox checked={checked.indexOf(country.name) !== -1}/>
                            </ListItemIcon>
                          <ListItemText primary={country.name} secondary={country.current}/>
                      </ListItem>
                    )
                })}
            </List>
        )
    }
}

export default withStyles(useStyles)(CountryList);
