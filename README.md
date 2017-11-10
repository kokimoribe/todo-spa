## About
Implementation of a todo app that allows tasks to be dragged and dropped within a Kanban-like board.

Hosted on Heroku: https://todo-spa-rd7qf9.herokuapp.com/
* My Heroku dynos will most likely be [sleeping](https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping), so give it a couple seconds for the initial load!

Can also be viewed via CodeSandbox: https://codesandbox.io/s/github/kokimoribe/todo-spa


## How?
Built with:
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React)
* [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
* [Swagger-JS](https://github.com/swagger-api/swagger-js)

The app is served as a single page application. It's a client for my [todo-api](https://gitlab.com/koki.moribe/todo-api)!

User management and identity access is handled through [auth0](https://auth0.com)


## Development
1. Install [Node.js](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/lang/en/docs/install/)

2. Checkout repo
```bash
git clone git@github.com:kokimoribe/todo-spa.git
```

3. Run the app
```bash
yarn start
```

4. Open http://localhost:3000
