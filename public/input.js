var Input = function (game){
	this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.physicKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
	this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.pointerClick = game.input.activePointer.isDown;
	this.pointerX = game.input.x;
	this.pointerY = game.input.y;
}

var PlayerInput = function (){
	this.upKey;
    this.downKey;
    this.leftKey;
    this.rightKey;
    this.physicKey;
	this.fireKey;
	this.pointerClick;
	this.pointerX;
	this.pointerY;
}

var setPlayerInputs = function(){
	playerSpritePerson.player.input.upKey = gameInput.upKey.isDown;
	playerSpritePerson.player.input.downKey = gameInput.downKey.isDown;
	playerSpritePerson.player.input.leftKey = gameInput.leftKey.isDown;
	playerSpritePerson.player.input.rightKey = gameInput.rightKey.isDown;
	playerSpritePerson.player.input.physicKey = gameInput.physicKey.isDown;
	playerSpritePerson.player.input.fireKey = gameInput.fireKey.isDown;
	playerSpritePerson.player.input.pointerClick = gameInput.pointerClick.isDown;
	playerSpritePerson.player.input.pointerX = gameInput.pointerX;
	playerSpritePerson.player.input.pointerY = gameInput.pointerY;
}
