import config from './config/config'
import http from 'http'
import app from './app'

// const reload = require("reload");
// const server = require("http").Server(app);
// var bodyParser = require("body-parser");

// app.use(bodyParser.json()); // Parse the body from get request
// app.use(bodyParser.urlencoded({ extended: false })); // Parse the body of post request from jQuery

app.set('port', process.env.PORT || config.port);
let port = app.get('port');

const server = http.createServer(app)

//use reload - reload broswer for every change
// reload(app);
server.listen(port)

