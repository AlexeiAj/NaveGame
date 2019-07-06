var express = require('express');
var app = express();
var port = process.env.PORT || 8700;
var server = app.listen(port, function(){console.log('\033[96m'+'SERVER RUNNING on localhost:'+port+'! '+'\033[96m');});
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);
var socketList = {};

io.on('connection', function(socket){
    socket.player = null;
    socketList[socket.id] = socket;

    socket.on('con', function(player){
		console.log('\033[92m'+'Player connected: %s'+'\033[92m', socket.id);
        socket.broadcast.emit('con', player);
        socket.player = player;
        for (var i in socketList) {
            var elem = socketList[i];
            if(elem.player.id){
            	if(socket.player.id != elem.player.id) socket.emit('con', elem.player);
            }
        }
    });

    socket.on('input', function(player){
		//console.log('\033[92m'+'%s x: %s y: %s'+'\033[92m', player.name, player.x, player.y);
		now = new Date();
		if(now.getTime() - player.pingPlayer > 0) player.ping = now.getTime() - player.pingPlayer;
        socket.player = player;
    });

	socket.on('health', function(player){
		socketList[player.id].player.health -= player.damage;
		if(socketList[player.id].player.health == 0){
			socketList[player.lastHitPlayerId].player.kills += 1;
			console.log(player.name + ' dies to: ' + socketList[player.lastHitPlayerId].player.name + ' and get ' + socketList[player.lastHitPlayerId].player.kills + 'kills');
		}
    });

    socket.on('disconnect', function(){
		console.log('\033[91m'+'Player disconnected '+'\033[91m', socket.player.id);
        io.sockets.emit('disconnect', socket.player.id);
        delete socketList[socket.player.id];
    });

	setInterval(function(){
		for (var i in socketList) {
    		var elem = socketList[i];
    		if(elem.player){
    			io.sockets.emit('input',elem.player);
    		}
    	}
	}, 10);
});
