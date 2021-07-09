import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import "./bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/profile" component={ProfileScreen} />
        <Route exact path="/" component={LoginScreen} />
      </Switch>
    </Router>
  );
}

export default App;
