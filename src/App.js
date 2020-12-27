import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login/login";
import Main from "./components/main/main";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/users/:user">
            <Main />
          </Route>
          <Route path="/" exact>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
