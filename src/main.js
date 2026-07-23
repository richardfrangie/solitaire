import "./components/playing-card/PlayingCard.js";


// Select elements
const topBoard = document.querySelector('.top-board');

const stock = document.querySelector('.stock');
const waste = document.querySelector('.waste');

const heartPile = document.querySelector('.heart');
const spadePile = document.querySelector('.spade');
const diamondPile = document.querySelector('.diamond');
const clubPile = document.querySelector('.club');

const tableau = document.querySelector('.tableau');


// Card and deck generation
function createCard(suit, rank, flip) {
  const card = document.createElement('playing-card');
  card.setAttribute('suit', suit);
  card.setAttribute('rank', rank);
  if (flip) card.toggleAttribute('flipped');
  return card
}

function createDeck() {
  const deck = [];
  const suits = ['heart', 'spade', 'diamond', 'club'];
  const ranks = [...Array(13).keys()].map(e => e + 1);

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      deck.push(createCard(suits[i], ranks[j], true));
    }
  }
  return deck;
}

function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const pos = Math.floor(Math.random() * (i + 1));
    [cards[pos], cards[i]] = [cards[i], cards[pos]];
  }
  return cards;
}


// Deal the cards on the board
function deal() {
  const cards = shuffle(createDeck());
  const piles = tableau.children;
  for (let i = 0; i < piles.length; i++) {
    for (let j = 0; j <= i; j++) {
      // Flip the top (last) card of the pile
      if (i == j) cards[cards.length - 1].toggleAttribute('flipped');
      // Add card to the pile
      piles[i].appendChild(cards.pop());
    }
  }
  stock.append(...cards);
}

// Adjust the spacing between cards throughout the entire pile
function arrangePile(pile) {
  const cards = Array.from(pile.children);
  cards.map((ele, i) => ele.style.top = `calc(var(--card-stack-gap) * ${i})`);
}

function arrangePiles(piles) {
  const arr = Array.from(piles);
  arr.map(ele => arrangePile(ele))
}

// Start the game
function setupBoard() {
  deal();
  arrangePiles(tableau.children);
}


// Reset and clear
function clearPile(pile) {
  const cards = pile.children;
  for (let i = cards.length - 1; i >= 0; i--) {
    cards[i].remove();
  }
}

function clearPiles(...piles) {
  piles.forEach(clearPile);
}

function clearBoard() {
  clearPiles(...topBoard.children,...tableau.children);
}

// Restart the game
function restartGame() {
  clearBoard();
  setupBoard();
}


// Start a new game
setupBoard();


// TEST
const button = document.querySelector('button');
button.addEventListener('click', () => restartGame());
