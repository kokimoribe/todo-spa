import Swagger from "swagger-client";

const host = "https://todo-api-rd7qf9.herokuapp.com/v1";
const spec = host + "/swagger.json";

const clientPromise = Swagger(spec);

const sendRequest = (tag, operationId, params) => {
  return clientPromise.then(client => client.apis[tag][operationId](params));
};

export const getTasks = () => {
  const tag = "tasks";
  const operationId = "todo_api_get_tasks";
  const params = {};

  return sendRequest(tag, operationId, params)
    .then(r => r.body)
    .catch(e => console.log(e));
};

export const createTask = ({ title, description }) => {
  const tag = "tasks";
  const operationId = "todo_api_create_task";
  const params = { request_body: { title, description } };

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
