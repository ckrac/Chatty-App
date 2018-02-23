Chatty App Project
=====================

# Chatty App Project

Chatty app is a client-side SPA (single-page app) built with ReactJS. Chatty will allow users to communicate with each other without having to register accounts. Users will be assigned as anonymous until a user inputs a new username and press `enter`. Each users will be assigned a random color to differentiate themselves from other users. A user can post an image by sending an image url through the chat box. A user is also able to posta giphy by typing `/giphy searchParamaterGoesHere`.

## Screenshots

!["Home page"](https://github.com/ckrac/react-simple-boilerplate/blob/master/docs/home.png?raw=true)
!["Users chatting"](https://github.com/ckrac/react-simple-boilerplate/blob/master/docs/usersChat.png?raw=true)


## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm start` command. The app will be served at <http://0.0.0.0:3000/>.
4. Start the websocket server using the `npm run socket` command.
4. Go to <http://0.0.0.0:3000/> in your browser.


## Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* UUID
* WS
* randomcolor
* is-img-url
* node-fetch