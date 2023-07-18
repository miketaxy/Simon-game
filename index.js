let buttonColours = ["red", "green", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

let start = false;
$(document).keypress(function () {
    if (!start) {
        start = true
        nextSequence()
    }
});
$(document).click(function () {
    if (!start) {
        start = true
        nextSequence()
    }
});
//we

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);

    $("." + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.volume = 0.1;
    audio.play();
}

$(".btn").click(function () {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswers(userClickedPattern.length - 1);
});

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}

function checkAnswers(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
    function startOver() {
        level = 0;
        gamePattern = [];
        start = false;
        userClickedPattern = [];
    }


}
