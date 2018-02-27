import config from './config/config'
import http from 'http'
import app from './app'

// const server = require("http").Server(app);

app.set('port', process.env.PORT || config.port);
const port = app.get('port');

const server = http.createServer(app)

server.listen(port)

