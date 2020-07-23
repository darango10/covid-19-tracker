import React, {useEffect, useState} from 'react';
import './App.css';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

function App() {

    // https://disease.sh/v3/covid-19/countries

    const [countries, setCountries,] = useState([]);
    const [country, setCountry] = useState(['worldwide']);

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2
                    }))

                    setCountries(countries);
                })
        }

        getCountriesData()
    }, [])

    const onCountryChange = (e) => {
        const countryCode = e.target.value
        setCountry(countryCode)
    }

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
                    <InfoBox title={'Coronavirus cases'} cases={123} total={1.2}/>
                    <InfoBox title={'Recovered'} cases={1234} total={3000}/>
                    <InfoBox title={'Deaths'} cases={1} total={4000}/>
                </div>
                {/*Map*/}
                <Map/>
            </div>
            <Card className="app_right">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <h3>Worldwide new cases</h3>
                </CardContent>
                {/*Table*/}
                {/*Graph*/}

            </Card>
        </div>
    );
}

export default App;
