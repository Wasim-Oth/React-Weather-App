import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Forecast({ match }) {
  const [weather, setWeather] = useState({});
  const [hasError, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const key = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const id = match.params.cityId;
  const url = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=${key}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const Chart = () => {
    const styles = {
      background: "#cccccc",
      margin: "auto",
      padding: "1rem",
    };
    return (
      <AreaChart data={weather.list} width={800} height={400} style={styles}>
        <XAxis dataKey="dt_txt" />
        <YAxis />
        <CartesianGrid />
        <Tooltip />

        <Area name="temp" dataKey="main.temp" fill="rgb(157, 177, 157)" />
        <Area name="weather" dataKey="weather[0].main" />
      </AreaChart>
    );
  };

  return (
    <div>
      {loading && <span> Loading... </span>}
      {hasError && <p>sorry! we are not able to process your request now</p>}
      {weather.city && (
        <>
          <h3>
            {weather.city.name}, {weather.city.country}
          </h3>

          {Chart()}
          <Link to="/">
            <span id="back"> Back</span>
          </Link>
        </>
      )}
    </div>
  );
}

export default Forecast;
