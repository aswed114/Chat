/**
 * Created by Administrator on 7/31/2017.
 */
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8181 });
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});
    module.exports=wss;