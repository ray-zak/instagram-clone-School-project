//to allow easy testing, the Server itself shouldn't bind to a port
//https://zellwk.com/blog/endpoint-testing/
//So we have this special start.js file instead
import dotenv from "dotenv";
dotenv.config();
//const app = require('./Server.js')

import app from "./Server.js"
const port =  process.env.PORT || 5000;
app.listen(port)