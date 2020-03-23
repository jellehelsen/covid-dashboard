import React from 'react';
import { LineChart } from 'react-chartkick'
import 'chart.js'


class RelativeChart extends React.Component {
    render(){
        const { data } = this.props;
        const ytitle = "Confirmed cases per capita",
              xtitle = "Date"
        const chartData = data.reduce((collection, country) =>{
            let relativeCountry = Object.assign({}, country, {data: {}})
            Object.keys(country.data).forEach(key => {
                relativeCountry.data[key] = country.data[key]/country.population
            })
            collection.push(relativeCountry)
            return collection

        }, [])
        return (
                <LineChart data={chartData} xtitle={xtitle} ytitle={ytitle}/>
        )
    }
}

export default RelativeChart;
