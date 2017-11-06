import { actions as laneActions } from "../Lane/laneReducer";
import { actions as taskActions } from "../Task/taskReducer";
import * as Api from "../Api";

const SELECT_BOARD = "boards/SELECT_BOARD";
const SET_BOARDS = "boards/SET_BOARDS";
const GET_BOARDS_LOADING = "boards/GET_BOARDS_LOADING";
const GET_BOARDS_SUCCESS = "boards/GET_BOARDS_SUCCESS";

const ADD_BOARD = "boards/ADD_BOARD";
const SELECT_DEMO_BOARD = "boards/SELECT_DEMO_BOARD";

const setBoards = boards => ({
  type: SET_BOARDS,
  payload: { boards }
});

const getBoardsLoading = () => ({ type: GET_BOARDS_LOADING });
const getBoardsSuccess = () => ({ type: GET_BOARDS_SUCCESS });

const addBoard = board => ({ type: ADD_BOARD, payload: { board } });

const getBoards = () => {
  return dispatch => {
    dispatch(getBoardsLoading());

    Api.getBoards().then(boards => {
      dispatch(setBoards(boards));
      dispatch(getBoardsSuccess());
    });
  };
};

const selectBoard = id => {
  return (dispatch, getState) => {
    const { lanes } = getState();

    dispatch({ type: SELECT_BOARD, payload: { id } });
    dispatch(taskActions.getTasksLoading());

    Api.getTasks(id).then(tasks => {
      dispatch(laneActions.clearLanes());
      dispatch(taskActions.setTasks(tasks));
      lanes.ids.map(laneId => {
        const laneTasks = tasks.filter(task => task.status === laneId);
        const taskIds = laneTasks.map(task => task.id);
        return dispatch(laneActions.setTasksForLane(laneId, taskIds));
      });
      dispatch(taskActions.getTasksSuccess());
    });
  };
};

const selectDemoBoard = () => {
  return (dispatch, getState) => {
    const { lanes } = getState();
    dispatch(taskActions.getTasksLoading());

    Api.getDemoBoard().then(board => {
      dispatch({ type: SELECT_DEMO_BOARD, payload: { board } });
      dispatch(laneActions.clearLanes());
      dispatch(taskActions.setTasks(board.tasks));
      lanes.ids.map(laneId => {
        const laneTasks = board.tasks.filter(task => task.status === laneId);
        const taskIds = laneTasks.map(task => task.id);
        return dispatch(laneActions.setTasksForLane(laneId, taskIds));
      });
      dispatch(taskActions.getTasksSuccess());
    });
  };
};

const actions = {
  addBoard,
  setBoards,
  selectBoard,
  selectDemoBoard,
  getBoards
};

const initialState = {
  byId: {},
  selectedId: "demo",
  ids: [],
  demoBoard: { id: null, name: "Demo Board", taskIds: [] },
  loading: false
};

const byIdReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        [payload.board.id]: { ...payload.board }
      };
    case SET_BOARDS:
      return payload.boards.reduce((obj, board) => {
        obj[board.id] = board;
        return obj;
      }, {});
    default:
      return state;
  }
};

const idsReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_BOARD:
      return [...state, payload.board.id];
    case SET_BOARDS:
      return payload.boards.map(board => board.id);
    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_BOARD:
    case SET_BOARDS:
      return {
        ...state,
        byId: byIdReducer(state.byId, action),
        ids: idsReducer(state.ids, action)
      };
    case SELECT_BOARD:
      return { ...state, selectedId: payload.id };
    case SELECT_DEMO_BOARD:
      return { ...state, selectedId: "demo", demoBoard: payload.board };
    case GET_BOARDS_LOADING:
      return { ...state, loading: true };
    case GET_BOARDS_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export { reducer, actions };
