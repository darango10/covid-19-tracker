import React, {useEffect, useState} from 'react';
import './App.css';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "./Table";
import {sortData} from "./util";
import LineGraph from "./LineGraph";
import 'leaflet/dist/leaflet.css'


function App() {

    // https://disease.sh/v3/covid-19/countries

    const [countries, setCountries,] = useState([]);
    const [country, setCountry] = useState(['worldwide']);
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);


    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
            .then(res => res.json())
            .then(data => {
                setCountryInfo(data)
            })
    },[])

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2
                    }))
                    const sortedData = sortData(data)
                    setTableData(sortedData);
                    setMapCountries(data)
                    setCountries(countries);
                })
        }

        getCountriesData()
    }, [])

    const onCountryChange = async (e) => {
        const countryCode = e.target.value


        const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

        await fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setCountry(countryCode);
                setCountryInfo(data)
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(5)
            })

    }

    // console.log(countryInfo)

    return (
        <div className="App">
            <div className="app_left">
                <div className="app_header">
                    <h1>COVID-19 TRACKER</h1>

                    <FormControl className='app_dropdown'>
                        <Select variant='outlined' value={country} onChange={onCountryChange}>
                            <MenuItem value={'worldwide'}>Worldwide</MenuItem>
                            {countries.map((country, index) => (
                                <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="app_stats">
                    <InfoBox title={'Coronavirus cases'} cases={countryInfo.todayCases} total={countryInfo.cases}/>
                    <InfoBox title={'Recovered'} cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
                    <InfoBox title={'Deaths'} cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
                </div>
                {/*Map*/}
                <Map center={mapCenter} zoom={mapZoom} countries={mapCountries}/>
            </div>
            <Card className="app_right">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData}/>
                    <h3>Worldwide new cases</h3>
                    <LineGraph/>
                </CardContent>
                {/*Table*/}

                {/*Graph*/}

            </Card>
        </div>
    );
}

export default App;
