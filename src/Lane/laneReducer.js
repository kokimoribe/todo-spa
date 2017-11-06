import * as C from "../Constants.js";
import * as Api from "../Api.js";
import { actions as taskActions } from "../Task/taskReducer";

const ADD_TASK_TO_LANE = "lanes/ADD_TASK_TO_LANE";
const CLEAR_LANES = "lanes/CLEAR_LANES";
const REMOVE_TASK_FROM_LANE = "lanes/REMOVE_TASK_FROM_LANE";
const REORDER_TASKS_IN_LANE = "lanes/REORDER_TASKS_IN_LANE";
const SET_TASKS_FOR_LANE = "lanes/SET_TASKS_FOR_LANE";

const clearLanes = () => ({ type: CLEAR_LANES });

const removeTaskFromLane = (laneId, taskId) => ({
  type: REMOVE_TASK_FROM_LANE,
  payload: { laneId, taskId }
});
const addTaskToLane = (laneId, taskId, destinationIndex = 0) => ({
  type: ADD_TASK_TO_LANE,
  payload: { laneId, taskId, destinationIndex }
});
const reorderTasksInLane = (laneId, sourceIndex, destinationIndex) => ({
  type: REORDER_TASKS_IN_LANE,
  payload: { laneId, sourceIndex, destinationIndex }
});

const setTasksForLane = (laneId, taskIds) => ({
  type: SET_TASKS_FOR_LANE,
  payload: { laneId, taskIds }
});

const moveTask = (source, destination) => {
  return (dispatch, getState) => {
    const { boards, lanes } = getState();
    const sourceLane = lanes.byId[source.laneId];
    const taskId = sourceLane.taskIds[source.index];

    if (source.laneId === destination.laneId) {
      dispatch(
        reorderTasksInLane(source.laneId, source.index, destination.index)
      );
    } else {
      dispatch(removeTaskFromLane(source.laneId, taskId));
      dispatch(
        taskActions.updateTask(taskId, {
          status: destination.laneId,
          isPending: true
        })
      );
      dispatch(addTaskToLane(destination.laneId, taskId, destination.index));

      boards.selectedId === "demo"
        ? dispatch(taskActions.updateTask(taskId, { isPending: false }))
        : Api.updateTask(taskId, { status: destination.laneId })
            .then(() =>
              dispatch(taskActions.updateTask(taskId, { isPending: false }))
            )
            .catch(e => {
              dispatch(removeTaskFromLane(destination.laneId, taskId));
              dispatch(
                taskActions.updateTask(taskId, {
                  status: source.laneId,
                  isPending: false
                })
              );
              dispatch(addTaskToLane(source.laneId, taskId, source.index));
            });
    }
  };
};

const actions = {
  addTaskToLane,
  removeTaskFromLane,
  clearLanes,
  reorderTasksInLane,
  setTasksForLane,
  moveTask
};

const initialState = {
  byId: {
    [C.TO_DO]: { name: "TO DO", color: "blue", taskIds: [] },
    [C.IN_PROGRESS]: { name: "IN PROGRESS", color: "yellow", taskIds: [] },
    [C.DONE]: { name: "DONE", color: "green", taskIds: [] }
  },
  ids: [C.TO_DO, C.IN_PROGRESS, C.DONE]
};

const reorder = (items, startIndex, endIndex) => {
  const result = [...items];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const laneReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_TASK_TO_LANE:
      return {
        ...state,
        taskIds: [
          ...state.taskIds.slice(0, payload.destinationIndex),
          payload.taskId,
          ...state.taskIds.slice(payload.destinationIndex)
        ]
      };
    case REMOVE_TASK_FROM_LANE:
      return {
        ...state,
        taskIds: state.taskIds.filter(id => id !== payload.taskId)
      };
    case REORDER_TASKS_IN_LANE:
      return {
        ...state,
        taskIds: reorder(
          state.taskIds,
          payload.sourceIndex,
          payload.destinationIndex
        )
      };
    case SET_TASKS_FOR_LANE:
      return {
        ...state,
        taskIds: [...payload.taskIds]
      };
    default:
      return state;
  }
};

const byIdReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_TASK_TO_LANE:
    case REMOVE_TASK_FROM_LANE:
    case REORDER_TASKS_IN_LANE:
    case SET_TASKS_FOR_LANE:
      return {
        ...state,
        [payload.laneId]: laneReducer(state[payload.laneId], action)
      };
    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_LANES:
      return { ...initialState };
    case ADD_TASK_TO_LANE:
    case REMOVE_TASK_FROM_LANE:
    case REORDER_TASKS_IN_LANE:
    case SET_TASKS_FOR_LANE:
      return {
        ...state,
        byId: byIdReducer(state.byId, action)
      };
    default:
      return state;
  }
};

export { reducer, actions };
