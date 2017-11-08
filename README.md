## About
Implementation of a todo app that allows tasks to be dragged and dropped within a Kanban-like board.

Hosted on Heroku: https://todo-spa-rd7qf9.herokuapp.com/

Can also be viewed via CodeSandbox: https://codesandbox.io/s/github/kokimoribe/todo-spa


## How?
Built with:
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React)
* [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
* [Swagger-JS](https://github.com/swagger-api/swagger-js)

The app is served as a single page application. It serves as a UI client for my [todo-api](https://gitlab.com/koki.moribe/todo-api), which is consumed using [Swagger-JS][https://github.com/swagger-api/swagger-js].

User management and identity access is done through [auth0][https://auth0.com]
