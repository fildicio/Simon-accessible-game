var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false
var acceptingInput = false
var nextLevelTimer = null
var lastClickColour = null
var lastClickTime = 0


$(".btn").on("click", function (){
   if (!acceptingInput) {
      return
   }

   var userChosenColour = $(this).attr("id")

   // Assistive tech can fire two click events for one activation
   var now = Date.now()
   if (userChosenColour === lastClickColour && now - lastClickTime < 150) {
      return
   }
   lastClickColour = userChosenColour
   lastClickTime = now

   userClickedPattern.push(userChosenColour)
   playSound(userChosenColour)
   animatePress(userChosenColour)
   console.log(userChosenColour) 

   checkAnswer(userClickedPattern.length - 1)

})

$(document).on("keydown", function (event) {
   if (event.key === "a" && !started) {
      started = true
      nextSequence()
   }

})

function nextSequence() {

acceptingInput = false

level++
$("h1").text("Level " + level)

var randomNumber = Math.random();
randomNumber = randomNumber * 4
randomNumber = Math.floor(randomNumber)

var randomChosenColour = buttonColours[randomNumber]

gamePattern.push(randomChosenColour)

$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

playSound (randomChosenColour)
$("#sequence-status").text("Level " + level + ", colour " + gamePattern.length + ": " + randomChosenColour)

acceptingInput = true

}



function playSound(name) {
var ColorSound = new Audio("sounds/" + name + ".mp3" );
ColorSound.play();
}

function animatePress(currentColour) {
$("#" + currentColour).addClass("pressed")
setTimeout(() => {
$("#" + currentColour).removeClass("pressed") 
}, 300);
}

function checkAnswer(currentLevel) {
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
       acceptingInput = false
       nextLevelTimer = setTimeout(function () {
          userClickedPattern = []
          nextSequence()
       }, 1000);
    }

} else {
    var wrongSound = new Audio("sounds/wrong.mp3" );
    wrongSound.play();
    $("h1").text("Game Over, Press A to Restart").addClass("game-over")
    setTimeout(() => {
    $("h1").removeClass("game-over") 
    }, 1500);

    clearTimeout(nextLevelTimer)
    $("#sequence-status").text("")

    level = 0
    gamePattern = []
    userClickedPattern = []
    started = false
    acceptingInput = false
}
}

