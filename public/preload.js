function preload() {
	game.load.spritesheet('button', 'images/button.png', 193, 71);
	game.load.physics('physicsData','images/nave.json');
	game.load.image('player', 'images/nave.png');
	game.load.image('player2', 'images/naveRed.png');
	game.load.image('player3', 'images/naveBlue.png');
    game.load.image('bullet', 'images/bullet001.png');
    game.load.image('background', 'images/background.png');
}
