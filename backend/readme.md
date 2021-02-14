# YOU MUST FOLLOW THESE INSTRUCTIONS IF SETTING UP THE BACKEND FOR THE FIRST TIME

### Setup env file
* create .env in this directory
    * put in CONNECTION_URL= and then the mongo connection URL
    * put in the JWT signing secret JWT_SECRET=
    * optional: put in the port to run the backend on, PORT=

### Run instructions for backend
* `npm install`
* `node Server.js` or `nodemon Server.js` or `npm start`