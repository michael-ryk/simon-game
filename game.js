var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Start game by click or touch
$(document).keypress(() => {

    if (!started){
        
        // Game started

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
    console.log("=== Start Level: " + level + " ===");
    console.log("Game pattern: " + gamePattern);

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
        
        console.log("User Pattern: " + userClickedPattern);
        
        playSound(event.target.id);
        animatePress(event.target.id);
    
        checkAnswer( userClickedPattern.length );
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
    
        //console.log("Element correct");

        // if user pattern = game pattern

        if (gamePattern.length == userClickedPattern.length){

            console.log("Level Completed !");
            userClickedPattern = [];
            
            // delay 2 sec and launch next level
            setTimeout(() => {
                nextSequence(currentLevel);
            }, 2000);

        } else {

            console.log("Last Element correct but sequence not finished yet");

        }
    
    } else {

        console.log("Game over");
        playSound("wrong");
        $("body").addClass("game-over");
        
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);
        
        $("h1").text("Game Over, Press Any Key to Restart");
        
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
