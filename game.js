var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var userLevel = 0;

// User Click Listener
$(".btn").click(function() {
  // Get the id of the clicked button
  var userChosenColour = this.id;
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  // Check if the user gets the answer right
  if (checkAnswer(userLevel)) {
    // Correct answer case
    userLevel++;
    if (userLevel >= level) {
      // If the user gets all answers right, proceed to the next level
      setTimeout(nextSequence, 1000);
    }
  } else {
    // Wrong answer case
    playSound("wrong");

    // Add the game-over style to <body> and remove it after 200ms
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  // console.log(userClickedPattern);
});

// Key press listener
$(document).keypress(function() {
  // When a key is pressed, if the game has started, then ignore
  // Otherwise, start the game
  if (!started) {
    $("h1").text("Level 0");
    nextSequence();
  }
});

// Give the user the next sequence
function nextSequence() {
  userLevel = 0;
  userClickedPattern = [];

  // Update the heading
  level++;
  $("h1").text("Level " + level);

  // Randomly generate the next sequence
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Blink the button
  $("#" + randomChosenColour).fadeOut(150).fadeIn(150);
  animatePress(randomChosenColour);

  // Play the sound
  playSound(randomChosenColour);
}

// Play the sound file with the given name
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Add flash animation effect to the clicked button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Check the correctness of the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("Correct");
    return true;
  } else {
    // console.log("Wrong");
    return false;
  }
}

// Reset the game
function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}
