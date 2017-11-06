import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Auth from "./Auth/Auth";
import Header from "./Header/Header";
import Home from "./Home/Home.js";
import Callback from "./Callback/Callback.js";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends React.Component {
  render() {
    return (
      <div>
        <Header auth={auth} />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route
            exact
            path="/home"
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
