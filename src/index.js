import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import React from "react";
import store, { history } from "./store";

import { ConnectedRouter } from "react-router-redux";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,

  document.getElementById("root")
);
