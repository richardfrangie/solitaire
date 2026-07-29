import "./components/playing-card/PlayingCard.js";


// SELECT ELEMENTS

// Select piles and containels
const topBoard = document.querySelector('.top-board');

const stock = document.querySelector('.stock');
const waste = document.querySelector('.waste');

const foundations = document.querySelectorAll('.foundation');
const heartPile = foundations[0];
const spadePile = foundations[1];
const diamondPile = foundations[2];
const clubPile = foundations[3];

const tableau = document.querySelector('.tableau');

// Select buttons
const newGame = document.querySelector('.new-game');
const undo = document.querySelector('.undo');


// CARD GENERATION

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


// DEAL

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

// Draw card or redeal
function draw() {
  if (!game.isSelectionActive()) {
    const cards = stock.children;
    if (cards.length > 0) drawCard();
    else redeal()
  }

  // Dealing a card
  function drawCard() {
    const cards = Array.from(stock.children);
    const lastCard = cards[cards.length - 1];
    lastCard.toggleAttribute('flipped');
    waste.appendChild(cards.pop());
  }

  function redeal() {
    const cards = waste.children;
    for (let i = cards.length - 1; i >= 0; i--) {
      cards[i].toggleAttribute('flipped');
      stock.appendChild(cards[i]);
    }
  }
}


// ARRANGE

// Adjust the spacing between cards throughout the entire pile
function arrangePile(pile) {
  const cards = Array.from(pile.children);
  if (pile.closest('.top-board')) cards.map(card => card.style.top = '');
  else {
    // Once a fae-up card is found, the --card-stack-gap is doubled
    let j = 0;
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.top = `calc(var(--card-stack-gap) * ${i + j})`;
      if (!cards[i].hasAttribute("flipped")) j++;
    }
  }
}

function arrangePiles(...piles) {
  piles.map(ele => arrangePile(ele))
}


// CLEAR

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


// START RESET

function setupBoard() {
  deal();
  arrangePiles(...tableau.children);
}

function restartGame() {
  clearBoard();
  setupBoard();
  if (game.isSelectionActive()) game.clearSelection();
}


// BEHAVIOR

// The game uses a click-based interaction model with two phases:
// Idle: Click a face-up card to select it
// Selected: Click a valid destination to move the selected card
// If invalid, selection is cleared.
const game = {
  // Implicit State: null implies "Not Selected", Object implies "Selected"
  hasSelection: null,


  selectedCards(pile, clickedCard, startIndex, cards) {
    this.hasSelection = { pile, clickedCard, startIndex, cards};
  },

  clearSelection() {
    this.hasSelection = null;
  },

  isSelectionActive() {
    return this.hasSelection !== null;
  }
}


// SELECTION

// Select the cards starting from the indicated card upward.
function selectCardsFrom(card) {
  const isCardOnTop = card.closest('.top-board');
  const cards = Array.from(card.parentNode.children);
  const startIndex = cards.indexOf(card);
  const cardsSelected = [];

  // Check if card is in the top board (single card area)
  if (isCardOnTop) {
    card.classList.toggle('selected-only');
    cardsSelected.push(card);
  } else {
    cards[startIndex].classList.toggle('selected-top');
    cards[cards.length - 1].classList.toggle('selected-bottom');

    for (let i = startIndex; i < cards.length; i++) {
      cards[i].classList.toggle('selected');
      cardsSelected.push(cards[i]);
    }
  }
  // Store the selection
  game.selectedCards(card.parentNode, card, startIndex, cardsSelected);
}

function deselectCards() {
  selectCardsFrom(game.hasSelection.clickedCard);
  game.clearSelection();
}

function isCardInSelection(card) {
  const cards = Array.from(game.hasSelection.pile.children);
  return cards.indexOf(card, game.hasSelection.startIndex) >= 0;
}


// MOVEMENTS

function moveCardsSelectedTo(pile) {
  const originCards = Array.from(game.hasSelection.pile.children);
  const selectionStart = game.hasSelection.startIndex;
  const isCardsOnTableau = game.hasSelection.pile.closest('.tableau');

  deselectCards();

  // If the previous card is face down, turn it over
  if (isCardsOnTableau && selectionStart >= 1 &&
    originCards[selectionStart - 1].hasAttribute("flipped")) {
      originCards[selectionStart - 1].toggleAttribute("flipped");
    }

  // Move the cars
  for (let i = selectionStart; i < originCards.length; i++) {
    pile.appendChild(originCards[i]);
  }
  arrangePile(pile);
}

function canMoveSelectedTo(target) {
  const isCardClicked = target.matches('playing-card');
  const isFoundationClicked = target.classList.contains('foundation');
  const comparisonCard = game.hasSelection.clickedCard;

  if (isFoundationClicked)
    return isCardClicked ? haveSameSuit(comparisonCard, target) &&
      isOneRankAbove(comparisonCard, target) :
      isAce(comparisonCard) && matchesPileSuit(comparisonCard, target);
    // If the card is not clicked, it clicked on an empty pile
  else
    return isCardClicked ? haveDifferentColors(comparisonCard, target) &&
      isOneRankBelow(comparisonCard, target) :
      isKing(comparisonCard);
}

function moveSelectedTo(target) {
  const isCardClicked = target.matches('playing-card');
  const targetPile = isCardClicked ? target.parentNode : target;

  if (canMoveSelectedTo(target))
    return moveCardsSelectedTo(targetPile);
}

function isSuit(card, suit) {
  return card.getAttribute('suit') === suit;
}

function isRedSuit(card) {
  return isSuit(card, 'heart') || isSuit(card, 'diamond');
}

function haveDifferentColors(card1, card2) {
  return isRedSuit(card1) != isRedSuit(card2);
}

function haveSameSuit(card1, card2) {
  return card1.getAttribute('suit') == card2.getAttribute('suit');
}

// To use in tableau pile
function isOneRankBelow(moving, target) {
  const movingRank = +moving.getAttribute('rank');
  const targetRank = +target.getAttribute('rank');
  return targetRank == movingRank + 1;
}

function isAce(card) {
  return card.getAttribute('rank') == 1;
}

function matchesPileSuit(card, pile) {
  return pile.classList.contains(card.getAttribute('suit'));
}

// To use in foundation pile
function isOneRankAbove(moving, target) {
  const movingRank = +moving.getAttribute('rank');
  const targetRank = +target.getAttribute('rank');
  return targetRank == movingRank - 1;
}

function isKing(card) {
  return card.getAttribute('rank') == 13;
}


// HANDLER

function handleCardsClick(event) {
  const target = event.target;

  const isCardClicked = target.matches('playing-card');
  const isCardUpClicked = isCardClicked && !target.hasAttribute('flipped');
  const isCardDownClicked = isCardClicked && target.hasAttribute('flipped');

  const isTableauClicked = target.classList.contains('tableau');
  const isWastePileClicked = target.classList.contains('waste');

  if (isCardDownClicked || isTableauClicked || isWastePileClicked) return;

  if (game.isSelectionActive())
    return isCardInSelection(target) ? deselectCards() :
      moveSelectedTo(target);
  else if (isCardUpClicked)
    return selectCardsFrom(target);
}


// LISTENERS

// Selection
waste.addEventListener('click', handleCardsClick);

heartPile.addEventListener('click', handleCardsClick);
spadePile.addEventListener('click', handleCardsClick);
diamondPile.addEventListener('click', handleCardsClick);
clubPile.addEventListener('click', handleCardsClick);

tableau.addEventListener('click', handleCardsClick);

// Buttons
newGame.addEventListener('click', restartGame);

// Draw
stock.addEventListener('click', draw);


// NEW GAME

setupBoard();


// DEBUG

window.game = game;
