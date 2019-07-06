function update() {
	game.scale.refresh();
	if(playerSpritePerson){
		setPlayerInputs();
		setPing(playerSpritePerson.player);
		if(playerSpritePerson.player.alive) sendInputServer(playerSpritePerson.player);
	}
}
