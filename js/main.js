var player = {
    hand: [],
    score: 0
};

// basic card structure
function card(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
    this.face = name + suit;
}

// build deck of cards
function deck() {
    this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['H', 'D', 'S', 'C'];
    var cards = [];

    for (var i = 0; i < this.suits.length; i++) {
        for (var j = 0; j < this.names.length; j++) {
            var val = j + 1;
            if (val > 10) {
                val = 10;
            } else if (val === 1) {
                val = 11;
            }
            cards.push(new card(val, this.names[j], this.suits[i]));
        }
    }

    return cards;
};

// deck 1
var deck1 = deck();


// display deck
function displayDeck(deck) {
    for (var i = 0; i < deck.length; i++) {
        console.log(deck[i]);
    }
};

// Fisher-Yates shuffle
function shuffle (array) {
    var i = 0
      , j = 0
      , temp = null
  
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
};

//shuffle
$('.shuffle').on('click', shuffleDeck);
function shuffleDeck() {
    shuffle(deck1);
};

//Deal card to player

$('.hit').on('click', addCardToPlayer);
var playerTurn = 1;

function addCardToPlayer() {
    
    var cardPulled = deck1.pop()
    player.hand.push(cardPulled);
    var image = '<img src="images/' + cardPulled.face + '.png" />';
    if (playerTurn) {
    $('#playerHand').html(image);
    } else {
    $('#dealerHand').html(image); 
    }
}

// Stand
$('.stand').on('click', stand);

function stand() {
    if (playerTurn) {
        playerTurn = 0;
    } else {
        playerTurn = 1;
    }
}

