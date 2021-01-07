import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CityWeather from "./componenets/cities";
import Forecast from "./componenets/forecast";

function App() {
  return (
    <div id="app">
      <h1 id="weather">Weather</h1>
      <Router>
        <Switch>
          <Route path="/" exact component={CityWeather} />
          <Route path="/:cityId" component={Forecast} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
