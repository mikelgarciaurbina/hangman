
window.onload = function() {

  var playButton = document.getElementById('play-button');
  playButton.addEventListener('click', playGame, false);

  var player = Object.create(Player);
  var game = Object.create(Game);
  var dictionary = Object.create(Dictionary);

  if(localStorage.getItem("game")){
    var gameAttributes = JSON.parse(localStorage.getItem("game"));

    var firstPanel = document.getElementById('first');
    firstPanel.style.display = "none";
    var secondPanel = document.getElementById('second');
    secondPanel.style.display = "block";

    game.initialize(player, dictionary);
    game.resumeGame(gameAttributes);
    keydownEvent();
    localStorage.removeItem("game");
  }

  function playGame() {

    var nameInput = document.getElementById("name-input");

    if(nameInput.value !== "") {
      player.initialize(nameInput.value);
      nameInput.value = "";

      var firstPanel = document.getElementById('first');
      firstPanel.style.display = "none";
      var secondPanel = document.getElementById('second');
      secondPanel.style.display = "block";

      game.initialize(player, dictionary);
      keydownEvent();
    } else {
      nameInput.focus();
    }

  }

  function keydownEvent() {
    document.addEventListener('keydown', function(event) {
      if(event.keyCode >= 65 && event.keyCode <= 90) {
        var addLetter = true;
        var insertLetter = String.fromCharCode(event.keyCode);
        for(var i = 0; i < game.player.guesses.length; i++){
          if(insertLetter === game.player.guesses[i]) addLetter = false;
        }
        if(addLetter) {
          game.playerInsertLetter(insertLetter);
        }
      }
    });
  }

  var startAgainButton = document.getElementById('start-again-button');
  startAgainButton.addEventListener('click', startAgain, false);

  function startAgain() {
    game.startAgain();
    this.style.display = 'none';
    var startAgainButton = document.getElementById('save-game-button');
    startAgainButton.style.display = "block";
  }

  var saveGameButton = document.getElementById('save-game-button');
  saveGameButton.addEventListener('click', saveGame, false);

  function saveGame() {
    game.player.guesses = game.player.guesses; //If I don't do this not save the guesses
    localStorage.setItem("game", JSON.stringify(game));
    alert("Game saved");
  }
  
}
