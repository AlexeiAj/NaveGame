function render() {
	if(playerSpritePerson){

		if(!playerSpritePerson.player.alive) game.debug.text('RESPAWNING', game.width/2-300, game.height/2, "#990000", "72px Arial", "center");
		if(playerSpritePerson.player.alive) game.debug.text("Health: "+playerSpritePerson.player.health, game.width/2-150, game.height/2-250, "#fffff0", "22px Arial", "center");
		if(playerSpritePerson.player.alive) game.debug.text("Kill: "+playerSpritePerson.player.kills, game.width/2+50, game.height/2-250, "#fffff0", "22px Arial", "center");

		if(playerSpritePerson.player.input.physicKey){

			game.debug.text('Online Players:', 15, 80, "#19de65");
			var j = 100;
			playerSpriteGroup.forEach(function(i){
			   if(i && (i.player.id == id)){
				   game.debug.text(i.player.name + ' Kill: ' + i.player.kills + ' (YOU) Ping: ' + i.player.ping, 20, j, "#ffffff");
			   }else{
				    game.debug.text(i.player.name + ' Kill: ' + i.player.kills, 20, j, "#19de65");
			   }
			   j+=20;
		    }, this);

			game.debug.text(game.time.fps, game.width-20, 14, "#00ff00");
		}
	}
}
