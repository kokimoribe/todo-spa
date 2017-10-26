import * as C from "./Constants";
import * as Api from "./Api";

// Action types
const ADD_ITEM_TO_LANE = "items/ADD_ITEM_TO_LANE";
const REMOVE_ITEM_FROM_LANE = "items/REMOVE_ITEM_FROM_LANE";
const REORDER_LANE_ITEMS = "items/REORDER_LANE_ITEMS";
const SET_ITEM = "items/SET_ITEM";

// Actions
const reorderItems = (laneId, sourceIndex, destinationIndex) => ({
  type: REORDER_LANE_ITEMS,
  payload: { laneId, sourceIndex, destinationIndex }
});

const addItemToLane = (laneId, itemId, destinationIndex) => ({
  type: ADD_ITEM_TO_LANE,
  payload: { laneId, itemId, destinationIndex }
});

const removeItemFromLane = (laneId, itemId) => ({
  type: REMOVE_ITEM_FROM_LANE,
  payload: { laneId, itemId }
});

const setItem = (itemId, payload) => ({
  type: SET_ITEM,
  payload: { itemId, payload }
});

const moveItem = (source, destination) => {
  return (dispatch, getState) => {
    const { itemsById, lanes } = getState().home;

    const itemId = lanes[source.laneId][source.index];
    const item = itemsById[itemId];

    if (source.laneId === destination.laneId) {
      dispatch(reorderItems(source.laneId, source.index, destination.index));
    } else {
      dispatch(removeItemFromLane(source.laneId, item.id));
      dispatch(
        setItem(item.id, {
          status: destination.laneId,
          isPending: true
        })
      );
      dispatch(addItemToLane(destination.laneId, item.id, destination.index));

      return Api.updateItem(item.id, { status: destination.laneId })
        .then(() => dispatch(setItem(item.id, { isPending: false })))
        .catch(e => {
          dispatch(removeItemFromLane(destination.laneId, item.id));
          dispatch(
            setItem(item.id, { status: source.laneId, isPending: false })
          );
          dispatch(addItemToLane(source.laneId, item.id, source.index));
        });
    }
  };
};

const actions = {
  moveItem
};

// Initial state
const getItems = (count, offset, status) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    title: `item ${k + offset}`,
    description: "task description placeholder",
    status
  }));

const allItems = [
  ...getItems(5, 0, C.TO_DO),
  ...getItems(4, 5, C.IN_PROGRESS),
  ...getItems(3, 9, C.DONE)
];

const itemsById = allItems.reduce((obj, item) => {
  obj[item.id] = item;
  return obj;
}, {});

const lanes = [C.TO_DO, C.IN_PROGRESS, C.DONE].reduce((obj, laneId) => {
  obj[laneId] = Object.keys(itemsById).filter(
    key => itemsById[key].status === laneId
  );
  return obj;
}, {});

const initialState = {
  itemsById,
  lanes
};

// Reducer helpers
const reorder = (items, startIndex, endIndex) => {
  const result = [...items];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// Reducer

const laneReducer = (state, action) => {
  const actionPayload = action.payload || {};

  const { laneId, itemId, sourceIndex, destinationIndex } = actionPayload;

  switch (action.type) {
    case REORDER_LANE_ITEMS:
      return {
        ...state,
        [laneId]: reorder(state[laneId], sourceIndex, destinationIndex)
      };
    case ADD_ITEM_TO_LANE:
      return {
        ...state,
        [laneId]: [
          ...state[laneId].slice(0, destinationIndex),
          itemId,
          ...state[laneId].slice(destinationIndex)
        ]
      };
    case REMOVE_ITEM_FROM_LANE:
      return {
        ...state,
        [laneId]: state[laneId].filter(id => id !== itemId)
      };
    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  const actionPayload = action.payload || {};

  const { itemId, payload } = actionPayload;

  switch (action.type) {
    case REORDER_LANE_ITEMS:
    case ADD_ITEM_TO_LANE:
    case REMOVE_ITEM_FROM_LANE:
      return {
        ...state,
        lanes: laneReducer(state.lanes, action)
      };
    case SET_ITEM:
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [itemId]: {
            ...state.itemsById[itemId],
            ...payload
          }
        }
      };
    default:
      return state;
  }
};

export { reducer as itemReducer, actions };
