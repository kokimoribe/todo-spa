import Swagger from "swagger-client";

const host = "https://todo-api-rd7qf9.herokuapp.com/v1";
const spec = host + "/swagger.json";

const sendRequest = (tag, operationId, params, securities = []) => {
  return Swagger(spec, {
    authorizations: { jwt: `Bearer ${localStorage.getItem("access_token")}` }
  }).then(client => client.apis[tag][operationId](params, securities));
};

export const getBoards = () => {
  const tag = "boards";
  const operationId = "todo_api_get_boards";
  const params = {};

  return sendRequest(tag, operationId, params)
    .then(r => r.body)
    .catch(e => console.log(e));
};

export const getBoard = id => {
  const tag = "boards";
  const operationId = "todo_api_get_board";
  const params = { board_id: id };

  return sendRequest(tag, operationId, params)
    .then(r => r.body)
    .catch(e => console.log(e));
};

export const getDemoBoard = id => {
  const tag = "boards";
  const operationId = "todo_api_get_demo_board";
  const params = {};

  return sendRequest(tag, operationId, params)
    .then(r => r.body)
    .catch(e => console.log(e));
};

export const getTasks = boardId => {
  return getBoard(boardId).then(board => board.tasks);
};

export const createTask = (boardId, title, description) => {
  const tag = "tasks";
  const operationId = "todo_api_create_task";
  const params = { board_id: boardId, request_body: { title, description } };

  return sendRequest(tag, operationId, params)
    .then(r => r.body)
    .catch(e => console.log(e));
};

export const updateTask = (id, payload) => {
  const tag = "tasks";
  const operationId = "todo_api_update_task";
  const params = { task_id: id, request_body: payload };

  return sendRequest(tag, operationId, params)
    .then(r => r.body)
    .catch(e => console.log(e));
};

export const createBoard = ({ name }) => {
  const tag = "boards";
  const operationId = "todo_api_create_board";
  const params = { request_body: { name } };

  return sendRequest(tag, operationId, params)
    .then(r => r.body)
    .catch(e => console.log(e));
};
