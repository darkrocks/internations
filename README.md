###Internations test task (Dmitriy Kazinov)

##Overview
Web based application for managing users/groups with mocked back-end. 
Made according the following specification:  `/Frontend Developer Task.pdf`

###How to start locally
####Prerequisites:
 - node.js should be installed
 
In your terminal:

```
cd [project_folder]
npm install
npm start
```

Then open your browser here: http://localhost:3000/

Note: project is pre-built into /build folder. So you can just run /build/index.html from your IDE if you want to avoid
 installing node.js. Many IDEs can serve static sites such as Web Storm, Visual Studio, etc.


###Technologies used
 - `React` as an UI framework 
 - `react-router` as a client routing solution
 - `Redux` as an architecture pattern
 - `stylus` as a CSS pre-processor
 - `webpack` and `gulp` as build tools
 
 
###Features
  - Single page application
  - Client side validation
  - Ability to create/edit users/groups
  - Responsive style, mobile-friendly
  - ES6 syntax

###API endpoins needed for real-life application
 - `GET /groups`
 - `GET /groups/:groupId`
 - `POST /groups`
 - `GET /users`
 - `GET /users/:userId`
 - `POST /users`
 - `PUT /users`
 
###Browser support
IE10+, modern browsers
*Note: IE 8,9 are not supported because the html5 history used. But it's possible to support them if needed*

