window.onload = function () {

    var colors = ["red", "blue", "green", "yellow"];

    //arrays for storing and comparaison
    var generated_pattern = [];
    var player_pattern = [];

    var started = false; //flag
    var level = 0;

    //Game will start after player presses any key
    $(document).keypress(function () {
        if (!started) {
            start_game();
            started = true;
        }
    });

    //helper function for animation
    function animate(botton) {
        $("#" + botton).addClass("pressed");
        setTimeout(function () {
            $("#" + botton).removeClass("pressed");
        }, 100);
    }

    //helper function for audio
    function sound(colorsound) {
        var audio = new Audio("sounds/" + colorsound + ".mp3");
        audio.play();
    }

    function start_game() {
        player_pattern = []; //Emptying The Player's array 

        //Chooching a random color and add it to the array 
        var random_number = Math.floor(Math.random() * 4);
        var random_color = colors[random_number];
        generated_pattern.push(random_color);

        level++;
        $("h1").text("Level " + level);

        animate(random_color)
        sound(random_color);
    }

    //Player's input
    $(".btn").click(function () {
        var player_input = $(this).attr("id");
        
        player_pattern.push(player_input);
        sound(player_input);
        animatePressBtn(player_input);
        check(player_pattern.length - 1);
    });

    //check if correct and add a new color ro the pattern
    function check(this_level) {
        if (generated_pattern[this_level] == player_pattern[this_level]) {
            if (player_pattern.length == generated_pattern.length) {
                setTimeout(function () {
                    start_game();
                }, 1000);
            }
        } else { //if check failed declare loss and start again
            
            var wronganswer = new Audio("sounds/wrong.mp3");
            wronganswer.play();
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 500);
            $("h1").text("Game Over, Press Any Key to Restart");
            reset();
        }
    }

    function reset() {
        level = 0;
        generated_pattern = [];
        player_pattern = [];
        started = false;
    }
}