var Game = {
  player: "",
  opportunities: 6,
  dictionary: "",
  win: false,

  initialize: function(player, dictionary) {
    this.player = player;
    this.dictionary = dictionary;
    this.dictionary.initialize();
    this.opportunities = 6;
    this.win = false;
    this.createBoard();
  },

  createBoard: function() {
    this.createRowOfDashes();
    this.insertPlayerName();
    this.changeOpportunitiesText();
  },

  createRowOfDashes: function() {
    for(var i = 0; i < this.dictionary.word.length; i++) {
      var value = "_";
      var listItem = document.createElement('li');

      if(this.dictionary.word[i] === " ") {
        value = "&nbsp;"
      }
      listItem.innerHTML = value;

      var list = document.getElementById('word-list');
      list.appendChild(listItem);
    }
  },

  insertPlayerName: function() {
    var playerNameText = document.getElementById('playerName');
    playerNameText.innerText = this.player.name;
  },

  changeOpportunitiesText: function() {
    var opportunitiesText = document.getElementById('playerOpportunities');
    opportunitiesText.innerText = this.opportunities;
  },

  playerInsertLetter: function(letter) {
    if(this.opportunities > 0 && this.win === false) {
      if(this.dictionary.word.toUpperCase().includes(letter) === true){
        this.userOk(letter);
      } else {
        this.userFail(letter);
      }
    }
  },

  userOk: function(letter) {
    this.player.addGuesses(letter, false);
    this.showLetterInWords(letter);
    if(this.userWin()) {
      this.win = true;
      this.displayGif('win', true);
      this.hideSaveButton();
      this.displayStartAgainButton();
      localStorage.removeItem("game");
    }
  },

  showLetterInWords: function(letter) {
    for(var i = 0; i < this.dictionary.word.length; i++) {
      if(this.dictionary.word[i].toUpperCase() === letter) {
        this.showLetter(letter, i);
      }
    }
  },

  showLetter: function(letter, index) {
    var letterElement = document.querySelector('#word-list li:nth-child('+ (index + 1) +')');
    letterElement.innerHTML = letter;
  },

  userWin: function() {
    var wordList = document.getElementById('word-list');
    var userWin = true;
    for(var i = 0; i < wordList.children.length; i++) {
      if(wordList.children[i].innerText === '_') {
        userWin = false;
        return userWin;
      }
    }
    return userWin;
  },

  userFail: function(letter) {
    this.player.addGuesses(letter, true);
    this.opportunities -= 1;
    this.changeOpportunitiesText();
    this.showHangman();
    if(this.opportunities === 0) {
      this.displayGif('lose', true);
      this.hideSaveButton();
      this.displayStartAgainButton();
      localStorage.removeItem("game");
    }
  },

  showHangman: function() {
    switch(this.opportunities) {
      case 5:
          this.showHangmanPart('hangman-head');
          break;
      case 4:
          this.showHangmanPart('hangman-body');
          break;
      case 3:
          this.showHangmanPart('hangman-right-arm');
          break;
      case 2:
          this.showHangmanPart('hangman-left-arm');
          break;
      case 1:
          this.showHangmanPart('hangman-right-leg');
          break;
      case 0:
          this.showHangmanPart('hangman-left-leg');
          break;
    }
  },

  showHangmanPart: function(element) {
    var hangmanPart = document.getElementById(element);
    hangmanPart.style.display = "initial";
  },

  hideHangman: function() {
    var hangmanArray = ['hangman-head', 'hangman-body', 'hangman-right-arm', 'hangman-left-arm', 'hangman-right-leg', 'hangman-left-leg']
    for(var i = 0; i < hangmanArray.length; i++) {
      var hangmanPart = document.getElementById(hangmanArray[i]);
      hangmanPart.style.display = "none";
    }
  },

  displayStartAgainButton: function() {
    var startAgainButton = document.getElementById('start-again-button');
    startAgainButton.style.display = "block";
  },

  hideSaveButton: function() {
    var startAgainButton = document.getElementById('save-game-button');
    startAgainButton.style.display = "none";
  },

  startAgain: function() {
    this.deleteAll();
    this.initialize(this.player, this.dictionary);
  },

  deleteAll: function() {
    this.player.guesses = [];

    var guessesList = document.getElementById('guesses-list');
    while( guessesList.firstChild ){
      guessesList.removeChild( guessesList.firstChild );
    }
    var wordList = document.getElementById('word-list');
    while( wordList.firstChild ){
      wordList.removeChild( wordList.firstChild );
    }

    this.displayGif('win', false);
    this.displayGif('lose', false);

    this.hideHangman();
  },

  displayGif: function(id, show) {
    var gif = document.getElementById(id);
    if(show) gif.style.display = 'block';
    else gif.style.display = 'none';
  },

  resumeGame: function(gameAttributes) {
    this.player.name = gameAttributes.player.name;

    this.dictionary.word = gameAttributes.dictionary.word;

    this.deleteAll();
    this.createBoard();

    for(var i = 0; i < gameAttributes.player.guesses.length; i++) {
      this.playerInsertLetter(gameAttributes.player.guesses[i]);
    }
  }
}