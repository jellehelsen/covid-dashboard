import React from 'react';
import { LineChart, ColumnChart } from 'react-chartkick'
import 'chart.js'


class Chart extends React.Component {
    render(){
        const { data } = this.props;
        return (
            <ColumnChart data={data} xtitle="Days since 10 confirmed" ytitle="Confirmed per capita"/>
        )
    }
}

export default Chart;
