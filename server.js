//http provides some functionality for spinning up the servers
const http=require('http');

const app=require('./app');

//assign port on which project will run
const port=process.env.PORT || 3000;
//create a server
const server=http.createServer(app);
//tell the server to start listening on the port
server.listen(port);
