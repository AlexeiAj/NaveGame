var Player = function (id, x, y, name, skin){
	this.id = id;
	this.x = x;
	this.y = y;
	this.name = name;
	this.skin = skin;
	this.vel = 200;
	this.fireRate = 400;
	this.nextFire = 0;
	this.bulletRange = 5;
	this.scale = 1;
	this.health = 500;
	this.damage = 50;
	this.ping = 0;
	this.pingPlayer = 0;
	this.respawnTime = 10000;
	this.respawn = 0;
	this.alive = true;
	this.lastHitPlayerId = 0;
	this.kills = 0;
	this.input = new PlayerInput;
}

function setPing(player){
	now = new Date();
	player.pingPlayer = now.getTime();
};
