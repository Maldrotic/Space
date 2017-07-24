import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import sockets from 'socket.io';

import Util from './helpers/util.js';

import routes from './controllers/base.js';

import Universe from './controllers/universe.js';
import Commands from './controllers/commands.js';

import User from './models/user.js';

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


let universe = new Universe(10, 10, 10);


let io = sockets(app.server);


io.on('connection', (socket) => {
    console.log('connection ' + socket.id);
    let user = new User(socket.id);
    socket.emit('connected', user, universe);
    socket.on('disconnect', (socket) => {
        console.log('disconnection ' + socket.id);
    });

    socket.on('command', (userId, command, params) => {
        console.log('recieved command from '+userId);
        if (command.toLowerCase() === 'goto-star') {
            console.log('goto-star');
            let lastStarId = params['last-star-id'];
            let starId = params['star-id'];

            if (lastStarId !== null) {
                socket.leave(lastStarId);
                socket.to(lastStarId).emit('user-left', userId, lastStarId);
            }

            socket.join(starId);
            socket.to(starId).emit('user-entered', userId, starId);

        } else {
            socket.emit('command-response', false, 'Invalid command');
        }
    });
});



app.server.listen(port, host, () => {
    console.log('Explore space at http://'+host+':'+port);
});