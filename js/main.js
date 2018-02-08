// opener page and game start
$('#game').hide();
$('#actionBar').hide();
hideAlerts();
$('#startGame').on('click', startGame);

var audioGlass = new Audio('audio/glass.wav');
var audioOi = new Audio ('audio/oi.wav');
var audioChord1 = new Audio ('audio/chord1.flac');
var audioChord2 = new Audio ('audio/chord2.wav');
var audioDbleChord = new Audio('audio/doubleChord.mp3');

function startGame() {
    $('#opener').hide();
    $('#game').show();
    $('#actionBar').show();
}

//starting conditions
$('.hit').hide();
$('.stand').hide();
$('.new').hide();

// deck 1
var deck1 = deck();

// players
var player1Turn = 0;
var player1 = {
    name: 'Johnny Rotten',
    hand: [],
    score: 0,
    wins: 0
};

var player2Turn = 0;
var player2 = {
    name: 'Sid Vicious',
    hand: [],
    score: 0,
    wins: 0
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

// HIT - give card to player
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

// setup new hand
function newHand(playerInput) {
    var imageStr = '';
    if(playerInput === dealer) {
        imageStr = '';
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
            audioGlass.play();
            jBust();
            player1Turn = 0;
            player2Turn = 1;
            $('#turn').text("Sid's turn");  
        }
    } else if (player2Turn){
        player2.hand.push(cardPulled);
        var handImages = displayHand(player2);
        $('#player2Hand').html(handImages);
        var newScore = getScore(player2);
        if (newScore > 21) {
            audioGlass.play();
            sBust();
            player2Turn = 0;
            $('#turn').text("");
            setTimeout(function(){
                dealerTurn();            
            }, 1000);
        }
    } else {
        dealer.hand.push(cardPulled);
        var handImages = displayHand(dealer);
        $('#dealerHand').html(handImages); 
        var newScore = getScore(player1);
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
        $('#turn').text("Sid's turn");
        
    } else if (player2Turn) {
        player2Turn = 0; 
        player2.score = getScore(player2);
        console.log("player 1: " + player2.score);
        console.log('dealers turn');
        $('#turn').text('');
        
        dealerTurn();
    }
}

// Deal
$('.deal').on('click', dealCards);

function dealCards() {
    if (deck1.length < 20) {
        deck1 = deck();
    }
    audioDbleChord.play();
    $('.hit').show();
    $('.stand').show();
    $('.deal').hide();
    shuffle(deck1);
    addCardToPlayer(); //dealer
    // player1Turn = 1;
    // addCardToPlayer(); //p1
    // player1Turn = 0;
    p1Deal();
    // player2Turn = 1;
    // addCardToPlayer(); //p2
    // player2Turn = 0;
    p2Deal();
    addCardToPlayer() //dealer
    // player1Turn = 1;
    // addCardToPlayer(); //p1
    // player1Turn = 0;
    p1Deal();
    // player2Turn = 1;
    // addCardToPlayer(); //p2
    // player2Turn = 0;
    p2Deal();
    player1Turn = 1;
    $('#turn').text("Johnny's turn");
}

function p1Deal() {
    player1Turn = 1;
    addCardToPlayer(); //p1
    player1Turn = 0;
}

function p2Deal() {
    player2Turn = 1;
    addCardToPlayer(); //p2
    player2Turn = 0;
}

// new round
$('.new').on('click', newRound);

function newRound() {
    audioOi.play();
    $('.hit').hide();
    $('.stand').hide();
    $('.new').hide();
    $('.deal').show();
    player1.hand = [];
    var handImages = newHand(player1);
    $('#player1Hand').html(handImages);
    player2.hand = [];
    var handImages = newHand(player2);
    $('#player2Hand').html(handImages);
    dealer.hand = [];
    var handImages = newHand(dealer);
    $('#dealerHand').html(handImages);   
}

//dealer turn and AI
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
        setTimeout(function(){
            addCardToPlayer();
            dealerTurn();            
        }, 1000);
    } else if (tempDealScore > 21) {
        audioChord1.play();
        dBust();
        setTimeout(function(){
            checkWin(player1);
            checkWin(player2);
            }, 1000);    
    }else {
        //alert('The dealer stays');
        audioChord2.play();
        dStays();
        setTimeout(function(){
            checkWin(player1);
            checkWin(player2);
            }, 1000);
    }
}

function hideButtons(){
    $('.new').show();
    $('.hit').hide();
    $('.stand').hide();
}

function checkWin(player) {
    var playScore = getScore(player);
    console.log('-----------');
    console.log('play' + playScore);
    var dealScore = getScore(dealer);
    console.log('deal' + dealScore);
//player pushes
    if (playScore === dealScore && dealScore <= 21 || playScore > 21 && dealScore > 21) {
        push(player.name);
        hideButtons();
//player wins - better score
    } else if (playScore > dealScore && playScore <= 21) {
        win(player.name);
        player.wins += 1;
        updateWins(player);
        hideButtons();
//player wins - dealer bust player under 21
    } else if (dealScore > 21 && playScore <= 21) {
        win(player.name);
        player.wins += 1;
        updateWins(player);
        hideButtons();
//player loses
    } else {
        loss(player.name);
        player.wins -= 1;
        updateWins(player);
        hideButtons();
    }
}

function updateWins(player) {
    if (player === player1) {
        $('#wins1').text(player1.wins);
    } else if (player === player2) {
        $('#wins2').text(player2.wins);
    }
}

//game alerts and functions
function gameHide() {
    $('#game').hide();
    $('#actionBar').hide();
}

function hideAlerts() {
    $('#alertJBust').hide();
    $('#alertSBust').hide();
    $('#alertDBust').hide();
    $('#alertDStays').hide();
    $('#winLoss1').hide();
    $('#winLoss2').hide();
       
}

function showGame() {
    $('#game').show();
    $('#actionBar').show();
    hideAlerts();
}

function jBust() {
    gameHide();
$('#alertJBust').show();
setTimeout(function(){
    showGame();
    }, 1000);
}

function sBust() {
    gameHide();
$('#alertSBust').show();
setTimeout(function(){
    showGame();
    }, 1000);
}

function dBust() {
    gameHide();
$('#alertDBust').show();
setTimeout(function(){
    showGame();
    }, 1000);
}

function dStays() {
    gameHide();
$('#alertDStays').show();
setTimeout(function(){
    showGame();
    }, 1000);
}

//outcome results
function push(playerName) {
    gameHide();
    $('#winLoss1').show();
    $('#winLoss2').show();
    console.log('+++push' + playerName);   
     
    if (playerName === 'Johnny Rotten') {
        $('#winLoss1').html('<h2>' + playerName + ' pushes!</h2>');
    } else if (playerName === 'Sid Vicious') {
        $('#winLoss2').html('<h2>' + playerName + ' pushes!</h2>');
    }
    setTimeout(function(){
        showGame();
        }, 1000);
}

function win(playerName) {
    gameHide();
    $('#winLoss1').show();
    $('#winLoss2').show();
    console.log('+++win' + playerName);
    if (playerName === 'Johnny Rotten') {
        $('#winLoss1').html('<h2>' + playerName + ' wins!</h2>');
    } else if (playerName === 'Sid Vicious') {
        $('#winLoss2').html('<h2>' + playerName + ' wins!</h2>');
    }
    setTimeout(function(){
        showGame();
        }, 1000);
}

function loss(playerName) {
    gameHide();
    $('#winLoss1').show();
    $('#winLoss2').show();
    console.log('+++loss' + playerName);
    if (playerName === 'Johnny Rotten') {
        $('#winLoss1').html('<h2>' + playerName + ' loses!</h2>');
    } else if (playerName === 'Sid Vicious') {
        $('#winLoss2').html('<h2>' + playerName + ' loses!</h2>');
    }
    setTimeout(function(){
        showGame();
        }, 1000);
}