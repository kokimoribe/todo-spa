const UPDATE_TASK = "tasks/UPDATE_TASK";
const ADD_TASK = "tasks/ADD_TASK";

const SET_TASKS = "tasks/SET_TASKS";
const GET_TASKS_LOADING = "tasks/GET_TASKS_LOADING";
const GET_TASKS_SUCCESS = "tasks/GET_TASKS_SUCCESS";

const setTasks = tasks => ({ type: SET_TASKS, payload: { tasks } });
const addTask = task => ({ type: ADD_TASK, payload: { task } });

const getTasksLoading = () => ({ type: GET_TASKS_LOADING });
const getTasksSuccess = () => ({ type: GET_TASKS_SUCCESS });

const updateTask = (id, body) => ({
  type: UPDATE_TASK,
  payload: { id, body }
});

const actions = {
  addTask,
  updateTask,
  setTasks,
  getTasksLoading,
  getTasksSuccess
};

const initialState = {
  byId: {},
  ids: [],
  loading: true
};

const byIdReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        [payload.task.id]: { ...payload.task }
      };
    case UPDATE_TASK:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload.body
        }
      };
    case SET_TASKS:
      return action.payload.tasks.reduce((obj, task) => {
        obj[task.id] = task;
        return obj;
      }, {});
    default:
      return state;
  }
};

const idsReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_TASK:
      return [...state, payload.task.id];
    case SET_TASKS:
      return payload.tasks.map(task => task.id);
    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_LOADING:
      return { ...state, loading: true };
    case GET_TASKS_SUCCESS:
      return { ...state, loading: false };
    case ADD_TASK:
    case UPDATE_TASK:
    case SET_TASKS:
      return {
        ...state,
        byId: byIdReducer(state.byId, action),
        ids: idsReducer(state.ids, action)
      };
    default:
      return state;
  }
};

export { reducer, actions };
