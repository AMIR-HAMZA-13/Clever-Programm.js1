//Challenging 1 : your age Days


function ageInDays() {
    var birthYear = prompt('What is your were you born... Good frine ?');

    var ageInDayss = (2021 - birthYear) * 365;

    var h1 = document.createElement('h1');

    var textAnswer = document.createTextNode('you are ' + ageInDayss + ' days old.');

    h1.setAttribute('id', 'ageInDays');

    h1.appendChild(textAnswer);

    document.getElementById('flex-box-result').appendChild(h1);

}
function reset() {
    document.getElementById('ageInDays').remove();
}


// challange 2: cat Generater
function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById("flex-box-cat");
    image.src = "https://cdn2.thecatapi.com/images/4au.gif";
    div.appendChild(image);
}

//Challange 3: Rock: Paper: Scissors
function rpsGane(yourChoice) {

    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer choice', botChoice);

    results = decideWinner(humanChoice, botChoice);
    console.log(results);

    message = finalMessage(results);
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}
function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}
function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 },
    };
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return { 'message': 'you lost :', 'color': 'red' };
    } else if (yourScore === 0.5) {
        return { 'message': 'You tied :', 'color': 'yellow' };
    } else {
        return { 'message': 'You Won!', 'color': 'green' };
    }
}


function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "'height = 150 width= 150 style='box-shadow: 0px 10px 50px blue;'>"

    messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font=size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>"


    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "'height = 150 width= 150 style='box-shadow: 0px 10px 50px red;'>"


    document.getElementById('flex-box-rps-div').appendChild(humanDiv);

    document.getElementById('flex-box-rps-div').appendChild(messageDiv);

    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}


// Challenge 4 : Change the color of All Button
var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}


function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if (buttonThingy.value === 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}


function buttonColorReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

    for (let i = 0; i < all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}


// Challenge 5 : Blackjack
let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },

    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },

    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],

    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,

};


const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('sounds/Mouse Click - Sound Effect (HD).mp4');
const hitSound = new Audio('sounds/You win sound effect 5.mp4');
const hitSound = new Audio('sounds/The Price is Right Losing Horn - Gaming Sound Effect (HD).mp4');

document.querySelector("#blackjack-hit-button").addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);



function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `cards/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false;

        let winner = computerWinner();
        showResult(winner);
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blacjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your=blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer=blackjack-result').style.color = '#ffffff';
        document.querySelector('#blackjack=result').textContent = "let's Play";
        document.querySelector('#blackjack=result').style.color = 'black';
        blackjackGame['turnsOver'] = true;
    }
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        //if adding 11 keeps me below 21, add 11. otherWise, add 1
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        } else {
            activePlayer['score'] += blackjackGame[card];
        }
    }
    activePlayer['score'] += blackjackGame['cardsMap'][card];
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updadeScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    let winner = computerWinner();
    showResult(winner);
}




// computer winner and return who just won
// update the wins, losses, and drews;
function computerWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        // condittion: higher score than dealer or when dealer busts but you're
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['drows']++;
        }


        // condition : when user busts but  dealer doesn'nt
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        console.log('YOU LOSt!');
        winner = DEALER;

        // condition : when user busts but  dealer doesn'nt

    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        console.log('YOU Drew!');
    }
    console.log('Winner is ', winner);
    return winner;
}


function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['trunsOver'] === true) {


        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'YOU Won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];

            message = 'YOU LOst!';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#drews').textContent = blackjackGame['drews'];

            message = 'YOU Drew!';
            messageColor = 'blue';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack=result').style.color = messageColor;
    }
}

