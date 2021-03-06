import React, { useState, useEffect } from "react";
import axios from "axios";

var weather = require("./weatherlib");

const countriesUrl = "https://restcountries.eu/rest/v2/all";
const promise = axios.get(countriesUrl);
console.log(promise);

const Countries = props => {
  const { countries, filter, setNewFilter } = props;
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  const length = filteredCountries.length;

  if (length > 10) {
    return <div>Too many matches, please specify another filter.</div>;
  } else if (length < 1) {
    return <div>No matches found on set filter.</div>;
  } else if (length === 1) {
    return (
      <div>
        {filteredCountries.map(country => (
          <CountryDetails key={country.name} country={country} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {filteredCountries.map(country => (
        <Country
          key={country.name}
          country={country}
          setNewFilter={setNewFilter}
        />
      ))}
    </div>
  );
};

const Country = props => {
  const handleFilterChange = event => {
    event.preventDefault();
    props.setNewFilter(props.country.name);
  };

  return (
    <div>
      {props.country.name}
      <button onClick={handleFilterChange}>show</button>
    </div>
  );
};

const Language = ({ language }) => {
  return <li>{language.name}</li>;
};

const Weather = ({ city }) => {
  const errorHandler = () => {
    console.log("got some error");
  };

  const cityString = city.toLowerCase();
  const cityWeather = weather.currentWeather(cityString, errorHandler);
  console.log(cityWeather);

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature: </p>
    </div>
  );
};

const CountryDetails = ({ country }) => {
  const languages = () =>
    country.languages.map(language => (
      <Language key={language.name} language={language} />
    ));
  console.log(languages);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital}
        <br />
        population {country.population}
      </p>

      <h2>languages</h2>
      <ul>{languages()}</ul>

      <img src={country.flag} alt="flag" width="10%" height="10%" />

      {/* <Weather city={country.capital} /> */}
    </div>
  );
};

const Filter = props => {
  return (
    <form>
      <div>
        rajaa näytettäviä{" "}
        <input value={props.filter} onChange={props.handleFilterChange} />
      </div>
    </form>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get(countriesUrl).then(response => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries
        countries={countries}
        filter={newFilter}
        setNewFilter={setNewFilter}
      />
    </div>
  );
};

export default App;
