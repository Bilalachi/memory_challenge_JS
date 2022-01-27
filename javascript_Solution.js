    window.onload = function () {
        var colors = ["red", "blue", "green", "yellow"];
        
        //arrays for storing and comparaison
        var generated_pattern = [];
        var player_pattern = []; 
        
        var started = false; //flag
        var level = 0;
        

        //Game will start after player presses any key
        document.addEventListener("keypress", function () {
            if (!started) {
                
                start_game()();
                start = true;
            }
        });

        //Pattern creation
        function start_game() {

            player_pattern = []; //Emptying The Player's array 
            level ++;
            document.getElementById("title").innerText = `Level ${level}`;

            //Chooching a random color and add it to the array 
            var random_number = Math.floor(Math.random() * 4);
            var random_color = colors[random_number];
            generated_pattern.push(random_color);
            
            animatePressBtn(random_color);
            sound_player(random_color);
            
        }

        //Player's input
        var buttons = document.getElementsByClassName("btn");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function (event) {
                var player_input = event.target.id;
                player_pattern.push(player_input);
                animatePressBtn(player_input);
                sound_player(player_input);
                validatePatterns(player_pattern.length - 1);
            });
        }

        
        }
        //validate if correct and start a new pattern
        function validatePatterns(current_level) {
            if (generated_pattern[current_level] === player_pattern[current_level]) {
                if (generated_pattern.length === player_pattern.length) {
                    setTimeout(function () {
                        start_game()();
                    }, 500);
                }
            } else {//if validation failed declare loss and start again
                sound_player("wrong")
                document.body.classList.add("game-over");
                setTimeout(function () {
                    document.body.classList.remove("game-over");
                }, 200);
                document.getElementById("title").innerText = `Level 0`;
                reset();
            }
        }

        //starting over
        function reset() {
            level = 0;
            player_pattern = [];
            generated_pattern = [];
            start = false;
        }

    }