import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import { itemReducer } from "./itemReducer";

export default combineReducers({
  router: routerReducer,
  home: itemReducer
});
