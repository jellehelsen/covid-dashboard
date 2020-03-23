import React from 'react';
import Chartkick, { LineChart, GeoChart } from 'react-chartkick'
import { withStyles } from '@material-ui/core/styles';
import Chart from './chart';

Chartkick.configure({mapsApiKey: "AIzaSyC7fIf3wquhh92a9cS7JE4vTSvWZ7MzwCU"})
const useStyles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    }
})


class MainView extends React.Component {
    render() {
        const { countries, selected, classes } = this.props;
        let data = countries.map(country => {
            let keys = Object.keys(country.data)
            return [country.name, country.data[keys[keys.length - 1]]]
        })
        let chartData = selected
        if (selected.length === 0 && countries.length > 0) {
            let total = countries.slice(1).reduce((counter, country) => {
                Object.keys(country.data).forEach(key => {
                    counter[key] += country.data[key]
                })
                return counter
            }, Object.assign({}, countries[0].data))
            chartData = [{name: "Worldwide", data: total}]
        }
        const mapOptions = {
            legend: {position: "left"},
            magnifyingGlass: {enable: true, zoomFactor: 5.0}
        }
        return (
                <div className={classes.root}>
                <GeoChart width='100%' height='55%' data={data} library={mapOptions}/>
                <Chart data={chartData}/>
                </div>
        )
    }
}

export default withStyles(useStyles)(MainView);
