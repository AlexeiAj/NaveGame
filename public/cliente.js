var socket;
var id = 0;
var client = function() {
	//socket = io.connect('https://navegame.herokuapp.com');
	socket = io.connect('alexeiaj.duckdns.org:8700');

	socket.on('connect', function () {
	    id = socket.io.engine.id;
		create();
	});

	socket.on('con', function(player) {
		var playerSprite = new PlayerSprite(game, player)
		playerSpriteGroup.add(playerSprite);
		players[player.id] = playerSprite;
	});

	socket.on('input', function(player) {
	    if(playerSpriteGroup && playerSpritePerson){
	        playerSpriteGroup.forEach(function(playerSprite){
				if(playerSprite && (playerSprite.player.id == player.id)){
					updatePlayerToServerConfigs(playerSprite, player);
				}
	        }, this);
	    }
	});

	socket.on('disconnect', function(player) {
	    playerSpriteGroup.forEach(function(playerSprite){
	        if (playerSprite.player.id == player){
				delete players[playerSprite.player.id];
	            playerSprite.death();
	        }
	    }, this);
	});
}

var connect = function(){ socket.emit('con', playerSpritePerson.player); }
var sendInputServer = function(player) { socket.emit('input', player); };
var sendHealthServer = function(player) { socket.emit('health', player); };
