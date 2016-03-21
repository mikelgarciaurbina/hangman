var Player = {
  name: "",
  guesses: [],

  initialize: function(name) {
    this.name = name;
  },

  addGuesses: function(letter, fail) {
    this.guesses.push(letter);
    var guessesItem = document.createElement('li');
    guessesItem.innerText = letter;
    if(fail) guessesItem.classList.add("guesses-fail");
    else guessesItem.classList.add("guesses-ok");

    var guessesList = document.getElementById('guesses-list');
    guessesList.appendChild(guessesItem);
  }
}