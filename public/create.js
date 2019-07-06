var collisionGroup;
var gameInput;
function create() {
    game.stage.backgroundColor = '#8bb8ef';
	game.physics.startSystem(Phaser.Physics.P2JS);
    game.world.setBounds(0, 0, 2560, 1600);
    game.add.tileSprite(0, 0, 2560, 1600, 'background');
 	//game.physics.p2.setBoundsToWorld(true, true, true, true, true);

    //bullet, too lazy to build an obj
    bullets = game.add.group();
    bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.P2JS;
    bullets.createMultiple(100, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

	//Name
	var name = $("#playerName").val();
	if(name == "") name = "USER"+Math.round(Math.random() * 800);

	//Skin
	var skinId = $("#playerSkin").val();
	$("#userInformation").hide();

    //playerSprite
    playerSpriteGroup = game.add.group();
    var player = new Player(id, game.world.centerX, game.world.centerY, name, skinId);
    playerSpritePerson = new PlayerSprite(game, player);
    playerSpriteGroup.add(playerSpritePerson);
	players[playerSpritePerson.player.id] = playerSpritePerson;
    game.camera.follow(playerSpritePerson);


	gameInput = new Input(game);
    game.stage.disableVisibilityChange = true;

    connect();
}
