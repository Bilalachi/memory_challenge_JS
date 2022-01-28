    window.onload = function () {
        
        var colors = ["red", "blue", "green", "yellow"];

        //arrays for storing and comparaison
        var generated_pattern = [];
        var player_pattern = [];

        var started = false; //flag
        var level = 0;


        //Game will start after player presses any key
        document.addEventListener("keydown", function () {
            if (!started) {
                start_game();
                started = true;
            }
        });
        
        //helper function for animation
        function animate(botton) {
            document.getElementById(botton).classList.add("pressed");
            setTimeout(function () {
                document.getElementById(botton).classList.remove("pressed");
            }, 150);
        }
        
        //helper function for audio
        function sound(colorsound) {
            var audio = new Audio("sounds/" + colorsound + ".mp3");
            audio.play();
        }


        //Pattern creation
        function start_game() {

            player_pattern = []; //Emptying The Player's array 
            
            //Chooching a random color and add it to the array 
            var random_number = Math.floor(Math.random() * 4);
            var random_color = colors[random_number];
            generated_pattern.push(random_color);

            level++;
            document.getElementById("title").innerText = `Level ${level}`;
            
            animate(random_color);
            sound(random_color);

        }

        //Player's input
        var buttons = document.getElementsByClassName("btn");
        for (var i = 0; i < buttons.length; i++) {
            
            buttons[i].addEventListener("click", function (event) {
               var player_input = event.target.id;
                player_pattern.push(player_input);
                
                animate(player_input);
                sound(player_input);
                
                check(player_pattern.length - 1);
            });
        }

    //check if correct and add a new color ro the pattern
    function check(this_level) {
        if (generated_pattern[this_level] == player_pattern[this_level]) {
            if (generated_pattern.length == player_pattern.length) {
                setTimeout(function () {
                    start_game();
                }, 1000);
            }
        }else { //if check failed declare loss and start again
            var wronganswer = new Audio("sounds/wrong.mp3");
            wronganswer.play();
            document.body.classList.add("game-over");
            setTimeout(function () {
                document.body.classList.remove("game-over");
            }, 500);
            document.getElementById("title").innerText = "Game Over, press Any Key to Restart";
            reset();
        }
    }

    //starting over
    function reset() {
        level = 0;
        player_pattern = [];
        generated_pattern = [];
        started= false;
    } 

}

