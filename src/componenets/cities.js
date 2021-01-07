import React, { useState } from "react";
import Search from "./search";
import CityDetails from "./cityDetails";

const CityWeather = () => {
  const [cityWeather, setCityWeather] = useState([]);
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notValidCityName, setNotValidCity] = useState(false);
  let cityKey = 1;

  const FetchWeatherData = async () => {
    try {
      setLoading(true);
      const key = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod >= 400) {
        setNotValidCity(true);
      } else {
        setNotValidCity(false);
        setCityWeather([data, ...cityWeather]);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
      setCityName("");
    }
  };

  const InputValue = (event) => setCityName(event.target.value);

  const deleteCity = (key) => {
    const newCityWeather = [...cityWeather];
    newCityWeather.splice(key - 1, 1);
    setCityWeather(newCityWeather);
  };


  return (
    <div>
      <Search
        change={InputValue}
        cityname={cityName}
        fetch={FetchWeatherData}
      />
      {error && (
        <h4>
          Sorry! we were not able to process your request, please try again
          later
        </h4>
      )}
      {loading && <h4>Loading...</h4>}
      {notValidCityName ? (
        <h4> Please enter a vaild city name </h4>
      ) : (
        <>
          {cityWeather.map(city => 
            <CityDetails
              key={cityKey++}
              props={{
                city,
                deleteCity,
                cityKey
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CityWeather;
