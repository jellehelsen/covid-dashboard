import React from 'react';
import Chartkick, { LineChart, GeoChart } from 'react-chartkick'
import { withStyles } from '@material-ui/core/styles';
import RelativeLineChart from './chart'

Chartkick.configure({mapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY})
const useStyles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        marginTop: 20,
    }
})


class MainView extends React.Component {
    globalTotal(countries){
        let total = countries.slice(1).reduce((counter, country) => {
            Object.keys(country.data).forEach(key => {
                counter[key] += country.data[key]
            })
            return counter
        }, Object.assign({}, countries[0].data))
        return [{name: "Worldwide", data: total, population: 7700000}]
    }

    chartData(countries, selected, relative){
    }
    render() {
        const { countries, selected, classes, relative } = this.props;
        let xtitle = "Date", ytitle = "Confirmed cases";
        let geoData = countries.map(country => {
            let keys = Object.keys(country.data)
            let current = country.data[keys[keys.length - 1]]
            if(relative) {
                if(!country.population) {
                    console.log(country.name)
                }
                current = current / country.population
            }
            return [country.name, current]
        })
        let chartData, chart;
        if (selected.length === 0 && countries.length > 0) {
            chartData = this.globalTotal(countries)
        } else {
            chartData = selected
        }
        if(relative){
            chart = <RelativeLineChart data={chartData} xtitle={xtitle} ytitle={ytitle}/>
        } else {
            chart = <LineChart data={chartData} xtitle={xtitle} ytitle={ytitle}/>
        }
        const mapOptions = {
            legend: {position: "left"},
            magnifyingGlass: {enable: true, zoomFactor: 5.0}
        }
        return (
                <div className={classes.root}>
                <GeoChart width='100%' height='55%' data={geoData} library={mapOptions}/>
                {chart}
                </div>
        )
    }
}

export default withStyles(useStyles)(MainView);
