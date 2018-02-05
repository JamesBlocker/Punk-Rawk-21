function card(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
}

function deck() {
    this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
    var cards = [];

    for (var i = 0; i < this.suits.length; i++) {
        for (var j = 0; j < this.names.length; j++) {
            cards.push(new card(j + 1, this.names[j], this.suits[i]));
        }
    }

    return cards;
}

var deck1 = deck();
//console.log(deck1[0]);

for (var i = 0; i < deck1.length; i++) {
    console.log(deck1[i]);
}