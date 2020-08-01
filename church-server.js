const http  = require('http');
const app = require('./church-app');

const port  = process.env.PORT || 8180;
const server  = http.createServer(app);

server.listen(port,()=>{
    //console.log(' The app is running; make request for data')
})
