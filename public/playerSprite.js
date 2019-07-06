var PlayerSprite = function (game, player){
    Phaser.Sprite.call(this, game, player.x, player.y, 'player'+player.skin);
    this.player = player;
	this.game.physics.p2.enable(this, false);
	this.body.fixedRotation = true;
	this.body.collideWorldBounds=true;
	this.body.clearShapes();
	this.body.loadPolygon('physicsData', 'player');
	this.id = this.player.id;
	game.physics.p2.setPostBroadphaseCallback(checkBullet, this); //verify if its my bullet
    this.anchor.set(0.5);

	if(id == this.player.id) this.name = "myPlayer";
	else this.name = "enemyPlayer";
}

PlayerSprite.prototype = Object.create(Phaser.Sprite.prototype);
PlayerSprite.prototype.constructor = PlayerSprite;

PlayerSprite.prototype.death = function(){
	this.player.health = 0;
	this.player.alive = false;
	now = new Date();
	this.player.respawn = now.getTime();
    this.kill();
	sendInputServer(playerSpritePerson.player);
};

PlayerSprite.prototype.restart = function(){
	if(this.player.id == playerSpritePerson.player.id) this.reset(Math.round(Math.random() * 800), Math.round(Math.random() * 600));
	else this.reset(-100, -100);
	this.player.health = 500;
	this.player.alive = true;
};

var playerSpritePerson;
var playerSpriteGroup;
var players = {};

function movePlayer(playerSprite) {
    playerSprite.body.setZeroVelocity();
	if ((playerSprite.player.input.upKey) && (playerSprite.player.input.rightKey) && (playerSprite.player.input.leftKey))
	{
		playerSprite.body.moveUp(playerSprite.player.vel);
	}
	else if((playerSprite.player.input.downKey) && (playerSprite.player.input.rightKey) && (playerSprite.player.input.leftKey))
	{
		playerSprite.body.moveDown(playerSprite.player.vel);
	}
	else if((playerSprite.player.input.downKey) && (playerSprite.player.input.upKey) || (playerSprite.player.input.rightKey) && (playerSprite.player.input.leftKey)){

	}else{
		if(playerSprite.player.input.upKey) playerSprite.body.moveUp(playerSprite.player.vel);
		if(playerSprite.player.input.downKey) playerSprite.body.moveDown(playerSprite.player.vel);
		if(playerSprite.player.input.leftKey) playerSprite.body.moveLeft(playerSprite.player.vel);
		if(playerSprite.player.input.rightKey) playerSprite.body.moveRight(playerSprite.player.vel);
	}

	playerSprite.player.x = playerSprite.body.x; //after we move the sprite we can set this values to the original player
	playerSprite.player.y = playerSprite.body.y;
}

function rotationPlayer(playerSprite) {
	if ((playerSprite.player.input.downKey) && (playerSprite.player.input.rightKey) && (playerSprite.player.input.leftKey))
    {
		playerSprite.body.angle = 90;
		playerSprite.angle = 90;
    }
	else if ((playerSprite.player.input.upKey) && (playerSprite.player.input.rightKey) && (playerSprite.player.input.leftKey))
	{
		playerSprite.body.angle = 270;
		playerSprite.angle = 270;
	}
	else
	{
		if ((playerSprite.player.input.downKey) && (playerSprite.player.input.rightKey))
		{
			playerSprite.body.angle = 45;
			playerSprite.angle = 45;
		}
		else if((playerSprite.player.input.downKey) && (playerSprite.player.input.leftKey))
		{
			playerSprite.body.angle = 135;
			playerSprite.angle = 135;
		}
		else if((playerSprite.player.input.upKey) && (playerSprite.player.input.rightKey))
		{
			playerSprite.body.angle = 315;
			playerSprite.angle = 315;
		}
		else if((playerSprite.player.input.upKey) && (playerSprite.player.input.leftKey))
		{
			playerSprite.body.angle = 225;
			playerSprite.angle = 225;
		}
		else
		{
			if (playerSprite.player.input.upKey)
			{
				playerSprite.body.angle = 270;
				playerSprite.angle = 270;
			}
			else if (playerSprite.player.input.downKey)
			{
				playerSprite.body.angle = 90;
				playerSprite.angle = 90;
			}

			if (playerSprite.player.input.leftKey)
			{
				playerSprite.body.angle = 180;
				playerSprite.angle = 180;
			}
			else if (playerSprite.player.input.rightKey)
			{
				playerSprite.body.angle = 0;
				playerSprite.angle = 0;
			}
		}
	}
}


var bullets;
function fire(playerSprite){
	if(playerSprite.player.input.fireKey){
		if (game.time.now > playerSprite.player.nextFire && bullets.countDead() > 0){
			playerSprite.player.nextFire = game.time.now + playerSprite.player.fireRate;
			var bullet = bullets.getFirstDead();
			if(playerSprite.player.id == playerSpritePerson.player.id) bullet.name = "myBullet";
			else bullet.name = "enemyBullet";

			var x = playerSprite.body.x;
			var y = playerSprite.body.y;
			var rotation = playerSprite.body.angle;
			var bulletVel = 1200;
			if(playerSprite.body.velocity.x == 0 && playerSprite.body.velocity.y == 0) bulletVel = 600;

			bullet.body.angle = rotation;
			bullet.angle = rotation;

			if(rotation == 0){
				bullet.reset(x+90, y);
				bullet.body.moveRight(bulletVel);
			}
			else if(rotation == 90){
				bullet.reset(x, y+90);
				bullet.body.moveDown(bulletVel);
			}
			else if(rotation == -90){
				bullet.reset(x, y-90);
				bullet.body.moveUp(bulletVel);
			}
			else if(rotation == -180){
				bullet.reset(x-90, y);
				bullet.body.moveLeft(bulletVel);
			}
			else if(rotation == -45){
				bullet.reset(x+90, y-90);
				bullet.body.moveUp(bulletVel);
				bullet.body.moveRight(bulletVel);
			}
			else if(rotation == -135){
				bullet.reset(x-90, y-90);
				bullet.body.moveUp(bulletVel);
				bullet.body.moveLeft(bulletVel);
			}
			else if(rotation == 45){
				bullet.reset(x+90, y+90);
				bullet.body.moveDown(bulletVel);
				bullet.body.moveRight(bulletVel);
			}
			else if(rotation == 135){
				bullet.reset(x-90, y+90);
				bullet.body.moveDown(bulletVel);
				bullet.body.moveLeft(bulletVel);
			}
			bullet.body.onBeginContact.add(blockHit, bullet);
			game.time.events.add(Phaser.Timer.SECOND * playerSprite.player.bulletRange, bulletDie, this, bullet);
		}
	}
}

function blockHit (body, bodyB, shapeA, shapeB, equation) {
    if (body){
		if(players[body.sprite.id]){
			if(this.name == "myBullet"){
				 bulletDie(this);
				 players[body.sprite.id].player.lastHitPlayerId = playerSpritePerson.player.id;
				 sendHealthServer(players[body.sprite.id].player);
			}
			bulletDie(this);
		}
	}
}

function bulletDie(bullet){
	bullet.kill();
}

function checkBullet(body1, body2) {
    if(body1.sprite.name === "myPlayer" && body2.sprite.name === "myBullet" || body1.sprite.name === "myBullet" && body2.sprite.name === "myPlayer" || body1.sprite.name === "myBullet" && body2.sprite.name === "myBullet"){ return false; }
	if(body1.sprite.name === "enemyPlayer" && body2.sprite.name === "enemyBullet" || body1.sprite.name === "enemyBullet" && body2.sprite.name === "enemyPlayer" || body1.sprite.name === "enemyBullet" && body2.sprite.name === "enemyBullet"){ return false; }
	return true;
}

function healthPlayer(playerSprite){
	if(playerSprite.player.alive && playerSprite.player.health <= 0){
		playerSprite.death();
	}

	if (!playerSprite.player.alive){
		now = new Date();
		if(now.getTime() - playerSprite.player.respawn > playerSprite.player.respawnTime) playerSprite.restart();
	}
}

function updatePlayerToServerConfigs(playerSprite, player){
	player.nextFire = playerSprite.player.nextFire;
	if(playerSprite.player.id != playerSpritePerson.player.id){
		playerSprite.body.x = player.x;
		playerSprite.body.y = player.y
	}
	playerSprite.player = player; //set new player config

	healthPlayer(playerSprite);
	rotationPlayer(playerSprite);
	movePlayer(playerSprite);
	fire(playerSprite);
}
