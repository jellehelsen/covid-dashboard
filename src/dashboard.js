import React from 'react';
import { Container } from '@material-ui/core';
import CountryList from './countrylist';
import MainView from './mainview'
import Papa from 'papaparse';
import { withStyles } from '@material-ui/core/styles';
// import Chart from './chart';

const cases = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv"
const deaths = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv"

const population = {
    "Afghanistan": 38041.754,
    "Africa": 1308064.195,
    "Albania": 2880.917,
    "Algeria": 43053.054,
    "American Samoa": 55.312,
    "Andorra": 77.142,
    "Angola": 31825.295,
    "Anguilla": 14.869,
    "Antigua and Barbuda": 97.118,
    "Argentina": 44780.677,
    "Armenia": 2957.731,
    "Aruba": 106.314,
    "Asia": 4601371.198,
    "Australia": 25203.198,
    "Australia/New Zealand": 29986.261,
    "Austria": 8955.102,
    "Azerbaijan": 10047.718,
    "Bahamas": 389.482,
    "Bahrain": 1641.172,
    "Bangladesh": 163046.161,
    "Barbados": 287.025,
    "Belarus": 9452.411,
    "Belgium": 11539.328,
    "Belize": 390.353,
    "Benin": 11801.151,
    "Bermuda": 62.506,
    "Bhutan": 763.092,
    "Bolivia (Plurinational State of)": 11513.1,
    "Bonaire, Sint Eustatius and Saba": 25.979,
    "Bosnia and Herzegovina": 3301,
    "Botswana": 2303.697,
    "Brazil": 211049.527,
    "British Virgin Islands": 30.03,
    "Brunei Darussalam": 433.285,
    "Bulgaria": 7000.119,
    "Burkina Faso": 20321.378,
    "Burundi": 11530.58,
    "Cabo Verde": 549.935,
    "Cambodia": 16486.542,
    "Cameroon": 25876.38,
    "Canada": 37411.047,
    "Caribbean": 43334.985,
    "Cayman Islands": 64.948,
    "Central African Republic": 4745.185,
    "Central America": 177586.526,
    "Central and Southern Asia": 1991423.481,
    "Central Asia": 73212.1,
    "Chad": 15946.876,
    "Channel Islands": 172.259,
    "Chile": 18952.038,
    "China": 1433783.686,
    "China, Hong Kong SAR": 7436.154,
    "China, Macao SAR": 640.445,
    "Other non-specified areas": 23773.876,
    "Colombia": 50339.443,
    "Comoros": 850.886,
    "Congo": 5380.508,
    "Cook Islands": 17.548,
    "Costa Rica": 5047.561,
    "Côte d'Ivoire": 25716.544,
    "Croatia": 4130.304,
    "Cuba": 11333.483,
    "Curaçao": 163.424,
    "Cyprus": 1198.575,
    "Czechia": 10689.209,
    "Dem. People's Republic of Korea": 25666.161,
    "Democratic Republic of the Congo": 86790.567,
    "Denmark": 5771.876,
    "Djibouti": 973.56,
    "Dominica": 71.808,
    "Dominican Republic": 10738.958,
    "Eastern Africa": 433904.943,
    "Eastern and South-Eastern Asia": 2334622.904,
    "Eastern Asia": 1672611.098,
    "Eastern Europe": 293444.913,
    "Ecuador": 17373.662,
    "Egypt": 100388.073,
    "El Salvador": 6453.553,
    "Equatorial Guinea": 1355.986,
    "Eritrea": 3497.117,
    "Estonia": 1325.648,
    "Eswatini": 1148.13,
    "Ethiopia": 112078.73,
    "Europe": 747182.751,
    "Europe__1": 747182.751,
    "Europe and Northern America": 1113783.715,
    "Falkland Islands (Malvinas)": 3.377,
    "Faroe Islands": 48.678,
    "Fiji": 889.953,
    "Finland": 5532.156,
    "France": 65129.728,
    "French Guiana": 290.832,
    "French Polynesia": 279.287,
    "Gabon": 2172.579,
    "Gambia": 2347.706,
    "Georgia": 3996.765,
    "Germany": 83517.045,
    "Ghana": 30417.856,
    "Gibraltar": 33.701,
    "Greece": 10473.455,
    "Greenland": 56.672,
    "Grenada": 112.003,
    "Guadeloupe": 400.056,
    "Guam": 167.294,
    "Guatemala": 17581.472,
    "Guinea": 12771.246,
    "Guinea-Bissau": 1920.922,
    "Guyana": 782.766,
    "Haiti": 11263.077,
    "High-income countries": 1258043.422,
    "Holy See": 0.799,
    "Honduras": 9746.117,
    "Hungary": 9684.679,
    "Iceland": 339.031,
    "India": 1366417.754,
    "Indonesia": 270625.568,
    "Iran (Islamic Republic of)": 82913.906,
    "Iraq": 39309.783,
    "Ireland": 4882.495,
    "Isle of Man": 84.584,
    "Israel": 8519.377,
    "Italy": 60550.075,
    "Jamaica": 2948.279,
    "Japan": 126860.301,
    "Jordan": 10101.694,
    "Kazakhstan": 18551.427,
    "Kenya": 52573.973,
    "Kiribati": 117.606,
    "Kuwait": 4207.083,
    "Kyrgyzstan": 6415.85,
    "Land-locked Developing Countries (LLDC)": 520972.677,
    "Lao People's Democratic Republic": 7169.455,
    "Latin America and the Caribbean": 648120.957,
    "Latin America and the Caribbean__1": 648120.957,
    "Latvia": 1906.743,
    "Least developed countries": 1033388.876,
    "Lebanon": 6855.713,
    "Lesotho": 2125.268,
    "Less developed regions": 6442837.823,
    "Less developed regions, excluding China": 4977203.662,
    "Less developed regions, excluding least developed countries": 5409448.947,
    "Liberia": 4937.374,
    "Libya": 6777.452,
    "Liechtenstein": 38.019,
    "Lithuania": 2759.627,
    "Low-income countries": 755849.769,
    "Lower-middle-income countries": 3057708.838,
    "Luxembourg": 615.729,
    "Madagascar": 26969.307,
    "Malawi": 18628.747,
    "Malaysia": 31949.777,
    "Maldives": 530.953,
    "Mali": 19658.031,
    "Malta": 440.372,
    "Marshall Islands": 58.791,
    "Martinique": 375.554,
    "Mauritania": 4525.696,
    "Mauritius": 1269.668,
    "Mayotte": 266.15,
    "Melanesia": 10918.517,
    "Mexico": 127575.529,
    "Micronesia": 543.486,
    "Micronesia (Fed. States of)": 113.815,
    "Middle Africa": 174308.432,
    "Middle-income countries": 5696667.251,
    "Monaco": 38.964,
    "Mongolia": 3225.167,
    "Montenegro": 627.987,
    "Montserrat": 4.989,
    "More developed regions": 1270630.277,
    "Morocco": 36471.769,
    "Mozambique": 30366.036,
    "Myanmar": 54045.42,
    "Namibia": 2494.53,
    "Nauru": 10.756,
    "Nepal": 28608.71,
    "Netherlands": 17097.13,
    "New Caledonia": 282.75,
    "New Zealand": 4783.063,
    "Nicaragua": 6545.502,
    "Niger": 23310.715,
    "Nigeria": 200963.599,
    "Niue": 1.615,
    "No income group available": 2907.658,
    "North Macedonia": 2083.459,
    "Northern Africa": 241780.768,
    "Northern Africa and Western Asia": 517105.581,
    "Northern America": 366600.964,
    "Northern America__1": 366600.964,
    "Northern Europe": 105768.505,
    "Northern Mariana Islands": 57.216,
    "Norway": 5378.857,
    "Oceania": 42128.035,
    "Oceania (excluding Australia and New Zealand)": 12141.774,
    "Oman": 4974.986,
    "Pakistan": 216565.318,
    "Palau": 18.008,
    "Panama": 4246.439,
    "Papua New Guinea": 8776.109,
    "Paraguay": 7044.636,
    "Peru": 32510.453,
    "Philippines": 108116.615,
    "Poland": 37887.768,
    "Polynesia": 679.771,
    "Portugal": 10226.187,
    "Puerto Rico": 2933.408,
    "Qatar": 2832.067,
    "Republic of Korea": 51225.308,
    "Republic of Moldova": 4043.263,
    "Réunion": 888.927,
    "Romania": 19364.557,
    "Russian Federation": 145872.256,
    "Rwanda": 12626.95,
    "Saint Helena": 6.059,
    "Saint Kitts and Nevis": 52.823,
    "Saint Lucia": 182.79,
    "Saint Pierre and Miquelon": 5.822,
    "Saint Vincent and the Grenadines": 110.589,
    "Saint-Barthélemy": 9.847,
    "Saint-Martin (French part)": 38.002,
    "Samoa": 197.097,
    "San Marino": 33.86,
    "Sao Tome and Principe": 215.056,
    "Saudi Arabia": 34268.528,
    "Senegal": 16296.364,
    "Serbia": 8772.235,
    "Seychelles": 97.739,
    "Sierra Leone": 7813.215,
    "Singapore": 5804.337,
    "Sint Maarten (Dutch part)": 42.388,
    "Slovakia": 5457.013,
    "Slovenia": 2078.654,
    "Small Island Developing States (SIDS)": 71428.792,
    "Solomon Islands": 669.823,
    "Somalia": 15442.905,
    "South Africa": 58558.27,
    "South America": 427199.446,
    "South Sudan": 11062.113,
    "South-Eastern Asia": 662011.806,
    "Southern Africa": 66629.895,
    "Southern Asia": 1918211.381,
    "Southern Europe": 152446.923,
    "Spain": 46736.776,
    "Sri Lanka": 21323.733,
    "State of Palestine": 4981.42,
    "Sub-Saharan Africa": 1066283.427,
    "Sudan": 42813.238,
    "Suriname": 581.372,
    "Sweden": 10036.379,
    "Switzerland": 8591.365,
    "Syrian Arab Republic": 17070.135,
    "Tajikistan": 9321.018,
    "Thailand": 69625.582,
    "Timor-Leste": 1293.119,
    "Togo": 8082.366,
    "Tokelau": 1.34,
    "Tonga": 104.494,
    "Trinidad and Tobago": 1394.973,
    "Tunisia": 11694.719,
    "Turkey": 83429.615,
    "Turkmenistan": 5942.089,
    "Turks and Caicos Islands": 38.191,
    "Tuvalu": 11.646,
    "Uganda": 44269.594,
    "Ukraine": 43993.638,
    "United Arab Emirates": 9770.529,
    "United Kingdom": 67530.172,
    "United Republic of Tanzania": 58005.463,
    "United States of America": 329064.917,
    "United States Virgin Islands": 104.578,
    "Upper-middle-income countries": 2638958.413,
    "Uruguay": 3461.734,
    "Uzbekistan": 32981.716,
    "Vanuatu": 299.882,
    "Venezuela (Bolivarian Republic of)": 28515.829,
    "Viet Nam": 96462.106,
    "Wallis and Futuna Islands": 11.432,
    "Western Africa": 391440.157,
    "Western Asia": 275324.813,
    "Western Europe": 195522.41,
    "Western Sahara": 582.463,
    "World": 7713468.1,
    "Yemen": 29161.922,
    "Zambia": 17861.03,
    "Zimbabwe": 14645.468
}

const useStyles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
        maxWidth: '100%',
    }
})

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            selectedCountries: [],
        }
        this.setSelectedCountries = this.setSelectedCountries.bind(this)
    }

    componentDidMount() {
        const groups = {US: "United States", Canada: "Canada", China: "China", Australia: "Australia"}
        let groupValues = {}
        Papa.parse(cases, {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                let data = [],
                    us = null;
                for (let i=0;i<results.data.length;i++) {
                    let out = {},
                        val = results.data[i],
                        country = val["Country/Region"];
                    delete val.Lat
                    delete val.Long
                    if(Object.keys(groups).includes(country)){
                        if(val["Province/State"] && val["Province/State"].includes(",")){
                            continue
                        }
                        let groupValue = groupValues[country]
                        if(groupValue) {
                            Object.keys(groupValue.data).forEach(k => {
                                groupValue.data[k] += val[k]
                            })
                        } else {
                            out.name = groups[country]
                            delete val["Province/State"]
                            delete val["Country/Region"]
                            out.data = val
                            data.push(out)
                            groupValues[country] = out
                        }
                    } else {
                      out.name = val["Country/Region"]
                      if(val["Province/State"]){
                          out.name = val["Province/State"]
                      }
                      delete val.Lat
                      delete val.Long
                      delete val["Province/State"]
                      delete val["Country/Region"]
                      out.data = val
                      data.push(out)
                    }
                }
                this.setState({countries: data})
            }
        })
    }

    setSelectedCountries(selected){
        const { countries } = this.state;
        let selectedCountries = countries.filter(c => {
            return selected.includes(c.name)
        })
        this.setState({selectedCountries: selectedCountries})
    }

    render() {
        const { classes } = this.props;
        let { countries, selectedCountries } = this.state;
        return (
            <Container className={classes.root}>
                <CountryList countries={countries} setSelectedCountries={this.setSelectedCountries}/>
                <MainView countries={countries} selected={selectedCountries}/>
            </Container>
        )
    }
}

export default withStyles(useStyles)(Dashboard);
