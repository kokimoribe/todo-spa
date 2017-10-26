import Header from "./Header";
import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home.js";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
