let firstCard = 0;
let secondCard = 0;
let sum = 0;
let hasBlackJack = false;
let gameHasStarted = false;
let balance = 150;

// Maybe add a refill Balance instead of reset button
// const REFILL_AMOUNT = 150;
// const REFILL_INTERVAL = ;

const blackjackMessage = document.getElementById("blackjackMessage");

const sumElement = document.getElementById("sum");

const cardsElement = document.getElementById("cards");

const alertMessage = document.getElementById("alertMessage");

const balanceElement = document.getElementById("balance");

const dealerSum = document.getElementById("dealerSum");

function startGame() {
  if (gameHasStarted === false && balance > 0) {
    gameHasStarted = true;
    console.log("Game Started");

    if (localStorage.getItem("balance")) {
      balance = parseInt(localStorage.getItem("balance"));
    }
    balanceElement.textContent = "Your Balance: $" + balance;

    firstCard = Math.floor(Math.random() * 11) + 1;
    secondCard = Math.floor(Math.random() * 11) + 1;
    sum = firstCard + secondCard;

    sumElement.textContent = "Total: " + sum;
    cardsElement.textContent = "Your Cards: " + firstCard + ", " + secondCard;
    blackJackStatus();
  } else if (balance <= 0) {
    alertMessage.textContent =
      "You have run out of balance. Please reset the game.";
    alertMessage.classList.remove("d-none");
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
    gameHasStarted = false;
    balance += 150;
  } else if (sum < 21) {
    blackjackMessage.textContent = "Do you want to draw a new card?";
  } else {
    blackjackMessage.textContent = "You are out of the game!";
    gameHasStarted = false;
    hasBlackJack = false;
    balance -= 20;
  }

  balanceElement.textContent = "Your Balance: $" + balance;
  localStorage.setItem("balance", balance);
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

function stand() {

  if (hasBlackJack === false) {
    gameHasStarted = false;

    dealerSum.classList.remove("d-none");
    let dealerCards = Math.floor(Math.random() * 11) + 16;
    dealerSum.textContent = "Dealer's total: " + dealerCards;

    if (sum > 21) {
      return; // Player already lost
    } else if (dealerCards > 21 || sum > dealerCards) {
      blackjackMessage.textContent = "You win!";
      balance += 150;
      balanceElement.textContent = "Your Balance: $" + balance;
      localStorage.setItem("balance", balance);
    } else if (sum === dealerCards) {
      blackjackMessage.textContent = "It's a tie!";
      // Dont change the balance
    } else {
      blackjackMessage.textContent = "You lose!";
      balance -= 20;
      balanceElement.textContent = "Your Balance: $" + balance;
      localStorage.setItem("balance", balance);
    }
  } else {
    return; // Player has blackjack, already handled in blackJackStatus
  }
}

function resetBalance() {
  balance = 150;
  localStorage.setItem("balance", balance);
  balanceElement.textContent = "Your Balance: $" + balance;
}
