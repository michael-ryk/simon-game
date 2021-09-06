var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//$(document).one("keypress", function(event){
$(document).keypress(function(event){

    // Check if keypress is first

    if (!started){
        
        // Game started

        $("#level-title").text("Level " + 0);
        nextSequence(0);

        started = true;
    }

});


function nextSequence(level){
    
    // Generate Sequence

    level += 1;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log("=== Start Level: " + level + " ===");
    console.log("Game pattern: " + gamePattern);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)

}


// User Sequence

$(".btn").click(function(){
    
    var userChoosenColour = this.id;
    userClickedPattern.push(userChoosenColour);
    //console.log("User Pattern: " + userClickedPattern);
    playSound(this.id);
    animatePress(this.id);

    checkAnswer( userClickedPattern.length );
});


function playSound(name){
    var audioObj = new Audio("sounds\\" + name + ".mp3");
    audioObj.play();
}


function animatePress(currentColour){

    $(".btn#" + currentColour).addClass("pressed")
    setTimeout(function (){$(".btn#" + currentColour).removeClass("pressed")} ,100);

}

// Check answer

function checkAnswer(currentLevel){
    //console.log("Received level - userClickedPattern last index: " + currentLevel)
    //console.log("Game Pattern lengh: " + gamePattern.length)

    // Check if last user input same as expected

    if (gamePattern[userClickedPattern.length - 1] == userClickedPattern[userClickedPattern.length - 1]){
    
        //console.log("Element correct");

        // if user pattern = game pattern

        if (gamePattern.length == userClickedPattern.length){

            console.log("Level Completed !");
            userClickedPattern = [];
            
            // delay 2 sec and launch next level
            setTimeout(function (){
                nextSequence(currentLevel);
            }, 2000);

        } else {

            console.log("Last Element correct but sequence not finished yet");

        }
    
    } else {

        console.log("Game over");
        playSound("wrong");
        $("body").addClass("game-over");
        
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 100);
        $("h1").text("Game Over, Press Any Key to Restart");
        
        startOver();

    }
    
}


function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
