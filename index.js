let firstCard = 0;
let secondCard = 0;
let sum = 0;
let hasBlackJack = false;
let gameHasStarted = false;

const blackjackMessage = document.getElementById("blackjackMessage");

const sumElement = document.getElementById("sum");

const cardsElement = document.getElementById("cards");

const alertMessage = document.getElementById("alertMessage");

const balanceElement = document.getElementById("balance");

let balance = 100;

function startGame() {
  if (gameHasStarted === false) {
    gameHasStarted = true;
    console.log("Game Started");
    balanceElement.textContent = "Your Balance: $100";

    firstCard = Math.floor(Math.random() * 11) + 1;
    secondCard = Math.floor(Math.random() * 11) + 1;
    sum = firstCard + secondCard;

    sumElement.textContent = "Total: " + sum;
    cardsElement.textContent = "Your Cards: " + firstCard + ", " + secondCard;
    blackJackStatus();
  } else {
    alertMessage.textContent =
      "Game is already running. Please finish the current game to start a new one.";
    alertMessage.classList.remove("d-none");
    setTimeout(() => {
      alertMessage.classList.add("d-none");
    }, 5000);
  }
}

function blackJackStatus() {
  if (sum === 21) {
    blackjackMessage.textContent = "Wohoo! You've got Blackjack!";
    hasBlackJack = true;
    blackjackBalance();
  } else if (sum < 21) {
    blackjackMessage.textContent = "Do you want to draw a new card?";
  } else {
    blackjackMessage.textContent = "You are out of the game!";
    gameHasStarted = false;
    hasBlackJack = false;
    blackjackBalance();
  }
}

function drawNewCard() {
  if (gameHasStarted === true && hasBlackJack === false) {
    const newCard = Math.floor(Math.random() * 11) + 1;
    sum += newCard;
    sumElement.textContent = "Total: " + sum;
    cardsElement.textContent += ", " + newCard;
    blackJackStatus();
  } else {
    alertMessage.textContent =
      "You can't draw a new card! Please start a new game.";
    alertMessage.classList.remove("d-none");
    setTimeout(() => {
      alertMessage.classList.add("d-none");
    }, 5000);
  }
}

function blackjackBalance() {

    if (hasBlackJack === true) {
        balance += 50;
        balanceElement.textContent = "Your Balance: $" + balance;
    } else {
        balance -= 25;
        balanceElement.textContent = "Your Balance: $" + balance;
    }
}
