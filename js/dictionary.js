var Dictionary = {
  word: "",
  words: "",

  initialize: function() {
    this.words = gameWords;
    this.searchWord();
  },

  searchWord: function() {
  	this.word = this.words[Math.floor((Math.random() * this.words.length))];
	this.checkWord();
  },

  checkWord: function() {
  	if(this.word.length < 5 || this.word.length > 12) {
  		this.searchWord();
  	}
  }

}