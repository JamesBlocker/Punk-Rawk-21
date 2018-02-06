var player = {
	hand: [],
	score: 0;
	playerTurn = 1;
};

var dealer = {
	hand: [];
	score: 0;
	playTurn: function () {
		if (this.score < 16) {
			hit();
		} else if (this.score > 21) {
			bust();
		} else {
			stay();
		}
	}
};

function getScore() {
	var tempScore = 0;
	for (var i = 0; i < this.hand.length; i++) {
		tempScore += this.hand[i].value;
	}
	console.log('temp: ' + tempScore);
	return tempScore;
}

function card(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
    this.face = name + suit;
    this.faceUp = 1;
}

function deck() {
    this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['H', 'D', 'S', 'C'];
    var cards = [];

    for (var i = 0; i < this.suits.length; i++) {
        for (var j = 0; j < this.names.length; j++) {
            var val = j + 1;
            // if card is JQKA set value
            if (val > 10) {
                val = 10;
            } else if (val === 1) {
            	//split
                val = 11;
            }
            cards.push(new card(val, this.names[j], this.suits[i]));
        }
    }

    return cards;
};