import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import sockets from 'socket.io';

import routes from './controllers/base.js';

const port = process.env.PORT || 1234;
const host = '127.0.0.1';

let app = express();
app.server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname+'/views');

app.use("/public", express.static(__dirname+'/public'));

app.use('/', routes);

let io = sockets(app.server);

io.on('connection', (socket) => {
    console.log('connection ' + socket.id);
    io.emit('connected', socket.id);
});

io.on('message-to-server', (message) => {
    console.log('message: ' + message);
});

app.server.listen(port, host, () => {
    console.log('Explore space at http://'+host+':'+port);
});