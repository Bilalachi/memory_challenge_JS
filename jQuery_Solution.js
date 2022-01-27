window.onload = function () {
    
    //arrays to store patterns and compare them
    var random_pattern = [];  
    var player_pattern = [];
    
    //variables
    var started = false;
    var level = 0;
    var buttons = ["green", "red", "yellow", "blue"];

    //  press any key to start the game
    document.addEventListener("keydown", function () {
        
        if(started == false){
            start_game();
            started = true;
        }
       
    });

    // create a new pattern
    function start_game() {
        
        level++;
        playerPattern = []; //emptying the user's pattern array
        document.getElementById("title").innerText = `Level ${level}`;

        // making a randoom choice
        var random_number = Math.floor(Math.random() * 4);
        var random_color = buttons[random_number];

        // animate and play sound of the choosen color
        setTimeout(function () { document.getElementById(random_color).style.opacity = "0.2" }, 1);
        sound_player(random_color);

        setTimeout(function () { document.getElementById(random_color).style.opacity = "1" }, 200);


        // add the color to the pattren for checking 
        random_pattern.push(random_color);
    }

    var bottons = document.getElementsByClassName("btn");
    for (let i = 0; i < bottons.length; i++) {
        bottons[i].onclick = function () {

            // save the user choice in userPattern[]
            var chosen_color = bottons[i].id;
            player_pattern.push(chosen_color);
            // animate and play sound of the choosen color
            document.getElementById(chosen_color).classList.add("pressed");
            sound_player(chosen_color);
            setTimeout(function () {
                document.getElementById(chosen_color).classList.remove("pressed");
            }, 100)

            // check users pattern 
            check_pattern(player_pattern.length - 1);
        }

    }

    // check user choice
    function check_pattern(currentIndex) {
        // check if current choice matches with game pattern
        if (player_pattern[currentIndex] === random_pattern[currentIndex]) {
            if (player_pattern.length === random_pattern.length) {
                setTimeout(function () {
                    // creat new pattern
                    start_game();
                }, 1000);
            }
        }
        else {
            // in case of wrong move
            sound_player("wrong")
            var body = document.getElementsByTagName("body")[0];
            body.classList.add("game-over");
            levelCounter.innerText = "Game Over, Press Any Key to Restart";

            // restart every thing 
            started = false;
            level = 0;
            
            random_pattern = [];
            player_pattern = [];
            body.classList.remove("game-over");
        }
    }

    function sound_player(color_sound){
        var sound = new Audio("sounds/" + color_sound + ".mp3");
        sound.play()
    }

}