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

class CountryItem extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        const { handleToggle, country } = this.props;
        handleToggle(country.name)
    }

    render(){
        const { country, checked } = this.props;
        return (
            <ListItem onClick={this.handleClick}>
              <ListItemIcon>
                <Checkbox  checked={checked} />
              </ListItemIcon>
              <ListItemText primary={country.name} secondary={country.current} />
            </ListItem>
        )
    }
}

class CountryList extends React.Component {
    constructor(props){
        super(props)
        this.state = {checked: []}
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle(value) {
        const { checked } = this.state,
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
                    return (<CountryItem
                       key={country.name}
                        country={country}
                       handleToggle={this.handleToggle}
                       checked={checked.indexOf(country.name) !== -1}/>)
                })}
            </List>
        )
    }
}

export default withStyles(useStyles)(CountryList);
