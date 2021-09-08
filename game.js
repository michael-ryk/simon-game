// Define variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var score = 0;

// Start game
$("#startButton").click(() => {
    if (!started){
        $("#level-title").text("Level " + 0);
        nextSequence(0);
        started = true;
    }
});


// Generated Sequence
function nextSequence(level){
    
    // Set Level
    level += 1;
    $("#level-title").text("Level " + level);

    // Generate Sequence
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log("=== Start Level: " + level + " ===");
    // console.log("Game pattern: " + gamePattern);

    // Blink sequence for user learn
    gamePattern.forEach ((element, i) => {
        setTimeout(() => {
            $("#" + element).fadeOut(100).fadeIn(100);
            playSound(element);
        }, i * 500);
    });

}


// User Sequence
$(".btn").click((event) => {
    
    // Check if game started
    if (started){
        
        var userChoosenColour = event.target.id;
        userClickedPattern.push(userChoosenColour);
        
        // console.log("User Pattern: " + userClickedPattern);
        
        playSound(event.target.id);
        animatePress(event.target.id);
    
        checkAnswer(userClickedPattern.length);
    }

});


function playSound(name){
    var audioObj = new Audio("sounds\\" + name + ".mp3");
    audioObj.play();
}


function animatePress(currentColour){

    $(".btn#" + currentColour).addClass("pressed")
    setTimeout(() => {
        $(".btn#" + currentColour).removeClass("pressed")
    } ,100);

}

// Check answer
function checkAnswer(currentLevel){

    // Check if last user input same as expected
    if (gamePattern[userClickedPattern.length - 1] == userClickedPattern[userClickedPattern.length - 1]){
    
        score = score + 1000;
        // console.log("Score : " + score);

        // if user pattern = game pattern
        if (gamePattern.length == userClickedPattern.length){

            // console.log("Sequence Complete");
            userClickedPattern = [];
            
            // delay 2 sec and launch next level
            setTimeout(() => {
                nextSequence(currentLevel);
            }, 2000);
        }
    } else {

        // Wrong answer
        // console.log("Game over");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over - Double click to restart");
        $("#score-title").text("Your Last Score is : " + score);

        $("#arrData").prepend(score + "<br/>");

        // console.log("Score Array : " + scoreArray);
        
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    
    }
    
}

// Reset all variables
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
