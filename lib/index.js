import http from 'http';

const port = process.env.PORT || 1234;
const host = '127.0.0.1';

http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(port, '127.0.0.1');

console.log('Explore space at http://'+host+':'+port);