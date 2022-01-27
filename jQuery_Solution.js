$(document).ready(function () {
    
    var colors = ["green", "red", "yellow", "blue"];
    
    
    var generated_pattern = [];
    var player_pattern = [];
    
    
    var started = false;
    var level = 0;

    
    $(document).keypress(function () {
        if(!started){
            start_game();
            begin = true;
        }
    });


    
    function start_game() {
    
        var randomNum = Math.floor(Math.random() * 4);

 
        gamePattern.push(randomColor);
    }

    $(".btn").click(function () {
        
        var userChoice = $(this).attr("id");
        userPattern.push(userChoice);
        $(`#${userChoice}`).addClass("pressed");
        var sound = new Audio(`sounds/${userChoice}.mp3`);
        sound.play();
        setTimeout(function () {
            $(`#${userChoice}`).removeClass("pressed");
        }, 100);

        check_pattern(userPattern.length -1);

    });



    
    function check_pattern(currentIndex) {
        
        if (userPattern[currentIndex] === gamePattern[currentIndex]) {
            if (userPattern.length === gamePattern.length) {
                setTimeout(function () {
                    
                    start_game();
                }, 500);
            }
        }
        else {
            
            wrong.play();
            $("body").addClass("game-over");
            $("#title").text("Game Over, Press Any Key to Restart");

           
            level = 0;
            gamePattern = [];
            userPattern = [];
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            begin = false;
        }
    }

});