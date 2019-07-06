var game = new Phaser.Game(800, 600, Phaser.AUTO, 'nave-game', { preload: preload, create: create, update: update, render: render });
var button; //960 576

function preload() {
	game.load.image('bgInfo', 'images/bgInfo.png');
	preload();
}

function create() {
	game.stage.backgroundColor = '#fffff0';
	var image = game.add.sprite(game.world.centerX, game.world.centerY, 'bgInfo');
	image.anchor.set(0.5);
    button = game.add.button(game.world.centerX-100, game.world.centerY, 'button', actionOnClick, this, 2, 1, 0);
}

function update(){update();}
function render(){render();}
function actionOnClick () {button.kill(); client();}
