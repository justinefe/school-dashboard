import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Dashboard from "./views/Dashboard/Dashboard";
import Drop from './components/Dropdown'
// import Loader from "./components/Loader";

am4core.useTheme(am4themes_animated);
function App() {
  return (
    <div className="App">
      <Router>
        {/*  <Loader />
      <Suspense fallback={<Loader tempLoad={true} />}>*/}
        <Switch>
          <Route exact path="/drop" component={Drop} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
