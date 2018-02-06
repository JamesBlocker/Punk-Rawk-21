//starting conditions
$('.hit').hide();
$('.stand').hide();

// players
var player1Turn = 0;
var player1 = {
    hand: [],
    score: 0
};

var player2Turn = 0;
var player2 = {
    hand: [],
    score: 0
};

//dealer
var dealer = {
    hand: [],
    score: 0
};

// get score
function getScore(playerInput) {
    var tempScore = 0;
    for (var i = 0; i < playerInput.hand.length; i++) {
        tempScore += playerInput.hand[i].value;
    }
    console.log("temp: " + tempScore);
    return tempScore;
}

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
            // if card is JQKA set value
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
// $('.shuffle').on('click', shuffleDeck);
// function shuffleDeck() {
//     shuffle(deck1);
// };

// HIT - Deal card to player

$('.hit').on('click', addCardToPlayer);

function displayHand(playerInput) {
    var imageStr = '';
    if(playerInput === dealer) {
        imageStr = '<img src="images/red_back.png" />';
        for (var i = 1; i < playerInput.hand.length; i ++) {
            imageStr += '<img src="images/' + playerInput.hand[i].face + '.png" />'
        }
    } else {
        for (var i = 0; i < playerInput.hand.length; i ++) {
            imageStr += '<img src="images/' + playerInput.hand[i].face + '.png" />'
        }
    }
    return imageStr;
}

function addCardToPlayer() {
    var cardPulled = deck1.pop()
    
    if (player1Turn) {
        player1.hand.push(cardPulled);
        var handImages = displayHand(player1);
        $('#player1Hand').html(handImages);
        var newScore = getScore(player1);
        if (newScore > 21) {
            alert('Player 1 BUST');
        }
    } else if (player2Turn){
        player2.hand.push(cardPulled);
        var handImages = displayHand(player2);
        $('#player2Hand').html(handImages);
        var newScore = getScore(player2);
        if (newScore > 21) {
            alert('Player 2 BUST');
        }
    } else {
        dealer.hand.push(cardPulled);
        var handImages = displayHand(dealer);
        $('#dealerHand').html(handImages); 
        var newScore = getScore(player1);
        if (newScore > 21) {
            alert('BUST');
        }
    }
}

// Stand
$('.stand').on('click', stand);

function stand() {
    if (player1Turn) {
        player1Turn = 0; 
        player1.score = getScore(player1);
        console.log("player 1: " + player1.score);
        console.log('player 2 turn');
        player2Turn = 1;
        // dealerTurn();
    } else if (player2Turn) {
        player2Turn = 0; 
        player2.score = getScore(player2);
        console.log("player 1: " + player2.score);
        console.log('dealers turn');
        dealerTurn();

    }
}

// Deal

$('.deal').on('click', dealCards);

function dealCards() {
    $('.hit').show();
    $('.stand').show();
    $('.deal').hide();
    shuffle(deck1);
    addCardToPlayer(); //dealer
    player1Turn = 1;
    addCardToPlayer(); //p1
    player1Turn = 0;
    player2Turn = 1;
    addCardToPlayer(); //p2
    player2Turn = 0;
    addCardToPlayer() //dealer
    player1Turn = 1;
    addCardToPlayer(); //p1
    player1Turn = 0;
    player2Turn = 1;
    addCardToPlayer(); //p2
    
    
    
    // addCardToPlayer();
    // player1Turn = 0;
    // addCardToPlayer(); 
    // player1Turn = 1;
    // addCardToPlayer(); 
}

function dealerTurn() {
    console.log('taking dealer turn');
    var tempDealScore = getScore(dealer);
    var imageStr = '';
    for (var i = 0; i < dealer.hand.length; i ++) {
            imageStr += '<img src="images/' + dealer.hand[i].face + '.png" />'
            $('#dealerHand').html(imageStr);
        }
    console.log("deal: " + tempDealScore);


    if (tempDealScore <= 16) {
        addCardToPlayer();
        dealerTurn();
    } else if (tempDealScore > 21) {
        alert('dealer bust');
    }else {
        alert('working - dealer stays');
    }
}