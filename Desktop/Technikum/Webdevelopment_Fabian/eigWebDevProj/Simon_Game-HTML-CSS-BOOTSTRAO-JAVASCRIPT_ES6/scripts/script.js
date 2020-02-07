lettersPutByPc = [];

lettersPutByPlayer = [];


document.querySelector("#startBtn").addEventListener("click",
    function() {

        // Assign click on every button

        buttons = document.querySelectorAll("button");

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function(event) {
                let clickedButton = event.target.classList[0];
                animationObject.sound(clickedButton);
                lettersPutByPlayer.push(clickedButton);
                game.compareAnswers();
            })
        }

        // Assign keypress for whole document

        document.addEventListener("keypress", function(event) {
            if (event.key == "a") {
                animationObject.sound("a");
                lettersPutByPlayer.push("a");
                game.compareAnswers();
            } else if (event.key == "b") {
                animationObject.sound("b");
                lettersPutByPlayer.push("b");
                game.compareAnswers();
            } else if (event.key == "c") {
                animationObject.sound("c");
                lettersPutByPlayer.push("c");
                game.compareAnswers();
            } else if (event.key == "d") {
                animationObject.sound("d");
                lettersPutByPlayer.push("d")
                game.compareAnswers();
            }
        })

        document.querySelector("#heading").innerHTML = "Level " + game.gameCounter;

        AITurn();
    }
)

// animations Object

animationObject = {

    sound: function(param) {
        if (param == "a") {
            let audio = new Audio("sounds/green.mp3");
            audio.play();
        } else if (param == "b") {
            let audio = new Audio("sounds/red.mp3");
            audio.play();
        } else if (param == "c") {
            let audio = new Audio("sounds/yellow.mp3");
            audio.play();
        } else if (param == "d") {
            let audio = new Audio("sounds/blue.mp3");
            audio.play();
        }
        this.showButtonPressed("." + param)
    },

    showButtonPressed: function(param) {

        let pressedButton = document.querySelector(param);

        pressedButton.classList.add("pressed");

        setTimeout(() => { document.querySelector(param).classList.remove("pressed") }, 1000);

    }

}


// PC TURN

AITurn = () => {
    pcArray = ["a", "b", "c", "d"];

    let pcLetter = pcArray[Math.floor(Math.random() * 4)];

    lettersPutByPc.push(pcLetter);

    // console.log(lettersPutByPc);
    
    animationObject.showButtonPressed("." + pcLetter);

}


// GAME OBJECT 

game = {

	gameCounter: 1,

	increaseLevel: function () {
		this.gameCounter++;
		document.querySelector("#heading").innerHTML = "Level " + game.gameCounter;
	},

	compareAnswers: function(param) {
		if( lettersPutByPc[lettersPutByPlayer.length-1] == lettersPutByPlayer[lettersPutByPlayer.length-1]) {
			if(lettersPutByPc.length == lettersPutByPlayer.length) {
				lettersPutByPlayer = [];
				this.increaseLevel();
				setTimeout(function(){ AITurn(); }, 2000);
			}
		}

		else {
            document.querySelector("#heading").innerHTML = "Game Over";
            setTimeout(() => {this.gameOver()}, 2800);
			
		}
	},

	gameOver: function() {
		window.location.href = "GameOverScreen.html";
	} 
}

// end game object 