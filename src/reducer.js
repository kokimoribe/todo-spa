import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import { userReducer } from "./userReducer";
import { reducer as boardReducer } from "./Board/boardReducer";
import { reducer as laneReducer } from "./Lane/laneReducer";
import { reducer as taskReducer } from "./Task/taskReducer";

export default combineReducers({
  router: routerReducer,
  user: userReducer,
  boards: boardReducer,
  lanes: laneReducer,
  tasks: taskReducer
});
