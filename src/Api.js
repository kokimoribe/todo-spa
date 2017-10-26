import Swagger from "swagger-client";

export const updateItem = (itemId, payload) => {
  // return new Promise((resolve, reject) => {
  //   console.log("starting updateItem...");
  //   setTimeout(() => {
  //     console.log("success!");
  //     reject("success!");
  //   }, 1000);
  // });
  return new Promise((resolve, reject) => resolve("success!"));
};

const host = "https://todo-api-rd7qf9.herokuapp.com/v1";

// const request = {
//   url,
//   query,
//   method,
//   body,
//   headers,
//   requestInterceptor,
//   responseInterceptor,
//   userFetch
// }

export const getTasks = () => {
  const request = {
    method: "GET",
    url: host + "/tasks"
  };

  return Swagger.http(request)
    .then(res => res.body)
    .catch(e => console.log(e));
};
