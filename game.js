var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer() {
    for (var i=0; i<userClickedPattern.length; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            playSound("wrong");
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            },200);
            startOver();
            break;
        } else {
        console.log("pass");
    }
    }
    if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function() {
            nextSequence();
        },1000);
    }
}

$("body").keypress(function () {
    if (started === false) {
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    }
})

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    level++;
    $("#level-title").text("Level " + level);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    setTimeout(function() { 
    for (var i = 0; i < gamePattern.length; i++) {
        (function(i) {
            setTimeout(function() {
                $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(gamePattern[i]);
            }, i * 600); 
        })(i);
    }
    }, 100);

}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100);
}

