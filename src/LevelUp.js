var LevelUp = function(game){

	var emitter;
	var optionCount;
	var nextLevelButton;
	var mainMenuButton;
	// totalScore;
};

LevelUp.prototype = {

	preload: function(game){
		game.load.image('clock', 'img/clock.png');
		// game.load.image('Next Level', 'assets/buttons/nextLevel.png');
		// game.load.image('Main Menu', 'assets/buttons/mainMenu.png');
		//stuff here
	},
	
	create: function(game){
		this.stage.backgroundColor = 0x4B0082
		//stuff here
		this.titleText = game.add.text(game.width/2, game.height/4, "You Woke Up!", {
		  font: 'bold ' + game.width/13.33 + 'pt TheMinion',
		  fill: '#7CCD7C',
		  align: 'center'
		});
		this.titleText.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);
		this.titleText.anchor.set(0.5);
		optionCount = 1;
		//========================================
		this.showScore = game.add.text(game.width/2 - 130 , game.height/4 + 100, 'Total Score: '+ totalScore, { font: 'bold ' + game.width/40 + 'pt TheMinion',
		  fill: '#c37c01',
		  align: 'center'
		});

		//======================================
		if(game.device.desktop){
		    this.addDesktopMenuOption('Next Level', function () {
		      this.startNextLevel();
		    });
			this.addDesktopMenuOption('Main Menu', function () {
		      game.state.start("MainMenu");
		    });
		} else {
			this.addMobileMenuOption('Next Level', function(){
				this.startNextLevel();
			});
			this.addMobileMenuOption('Main Menu', function(){
				game.state.start('MainMenu');
			});
		}

	    emitter = game.add.emitter(game.world.centerX, 200, 200);
	    emitter.makeParticles('clock');
	    emitter.start(true, 4000, null, totalScore);
	    game.time.events.add(4000, this.destroyEmitter, this);
	  

		
	},

	destroyEmitter: function(){
		emitter.destroy();
	},

	startNextLevel: function(){
		this.game.state.start("Game");
	},

	addDesktopMenuOption: function(text, callback) {
	  var optionStyle = { font: this.game.height/20 + 'pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
	  var txt = this.game.add.text(this.game.width/3, (optionCount * this.game.height/7.5) + this.game.height/2.2, text, optionStyle);
	  txt.anchor.setTo(0);
	  txt.stroke = "rgba(0,0,0,0)";
	  txt.strokeThickness = 4;
	  txt.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);

	  var onOver = function (target) {
	    target.fill = "#FEFFD5";
	    target.stroke = "rgba(200,200,200,0.5)";
	    txt.useHandCursor = true;
	  };

	  var onOut = function (target) {
	    target.fill = "white";
	    target.stroke = "rgba(0,0,0,0)";
	    txt.useHandCursor = false;
	  };
	  //txt.useHandCursor = true;
	  txt.inputEnabled = true;
	  txt.events.onInputUp.add(callback, this);
	  txt.events.onInputOver.add(onOver, this);
	  txt.events.onInputOut.add(onOut, this);

	  optionCount ++;
	},

	addMobileMenuOption: function(buttonName, callback){
		var button = this.game.add.button(this.game.width/3, (optionCount * this.game.height/7.5) + this.game.height/2.2, buttonName);
		button.inputEnabled = true;
		button.events.onInputDown.add(callback, this);

		optionCount++;
	}

};