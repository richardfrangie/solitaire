import "./PlayingCard.vars.css";

import jackImg from "/src/assets/images/jack.png";
import queenImg from "/src/assets/images/queen.png";
import kingImg from "/src/assets/images/king.png";

class PlayingCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */ `
    :host {
    --card-field-clip-path: polygon(15% 0, 15% 100%, 85% 100%, 85% 0);

    display: inline-grid;
    width: var(--card-width);
    height: var(--card-height);
    background: var(--card-bg);
    border-radius: 8%;
    color: var(--card-color-red);
    margin: 1rem;
    border: 1px solid var(--card-border-color);
    user-select: none;
    align-items: center;

    &::before, &::after {
    content: var(--rank-suit);
    display: block;
    font-size: var(--card-rank-font-size);
    padding: 0 0.25rem;
    }

    &::after {
    justify-self: end;
    align-content: end;
    transform: rotate(180deg);
    }
    }

    :host([suit="club"]), :host([suit="spade"]) {
    color: var(--card-color-black);
    }

    .container {
    width: var(--card-field-width);
    height: var(--card-field-height);
    background: var(--card-bg);
    position: relative;
    }

    :host([rank="1"]) .container {
    font-size: var(--card-font-size);
    text-align: center;
    line-height: var(--card-field-height);
    cursor: default;
    }

    :host(:is([rank="11"], [rank="12"], [rank="13"])) .container {
    background-position: 50% 50%;
    background-size: 150%;
    clip-path: var(--card-field-clip-path);
    }

    :host([rank="11"]) .container {
    background-image: url(${jackImg});}
    :host([rank="12"]) .container {
    background-image: url(${queenImg});}
    :host([rank="13"]) .container {
    background-image: url(${kingImg});}

    .symbol {
    width: calc(var(--card-field-height) / 4);
    height: calc(var(--card-field-height) / 4);
    font-size: calc(var(--card-font-size) / 3);
    text-align: center;
    line-height: calc(var(--card-field-height) / 4);
    }

    :host([suit="heart"]) .symbol::after {content: "♥";}
    :host([suit="club"]) .symbol::after {content: "♣";}
    :host([suit="spade"]) .symbol::after {content: "♠";}
    :host([suit="diamond"]) .symbol::after {content: "♦";}

    :host(:is([rank="2"], [rank="3"])) .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & :last-child {
    transform: scale(1, -1);
    }
    }

    :host(:is([rank="4"], [rank="5"], [rank="6"],
    [rank="7"], [rank="8"], [rank="9"], [rank="10"])) .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    justify-items: center;
    }

    :host(:is([rank="4"], [rank="5"])) .container :nth-child(n+3) {
    transform: scale(1, -1);
    }

    :host(:is([rank="6"], [rank="7"], [rank="8"],
    [rank="9"], [rank="10"])) .container :nth-child(n+5) {
    transform: scale(1, -1);
    }

    :host(:is([rank="4"], [rank="5"])) :is(.symbol:nth-child(3),
    .symbol:nth-child(4)),
    :host(:is([rank="6"], [rank="7"], [rank="8"])) :is(.symbol:nth-child(5),
    .symbol:nth-child(6)) {
    align-self: end;
    }

    :host(:is([rank="6"], [rank="7"], [rank="8"])) :is(.symbol:nth-child(3),
    .symbol:nth-child(4)) {
    align-self: center;
    }

    :host(:is([rank="5"], [rank="7"], [rank="8"], [rank="9"], [rank="10"]))
    .symbol:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    }

    :host([rank="9"]) .symbol:last-child {
    transform: translate(-50%,-50%) scale(1, -1);
    }

    :host(:is([rank="7"], [rank="8"])) .symbol:last-child {top: 32%;}

    :host([rank="8"]) .symbol:nth-child(7) {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%,-50%) scale(1, -1);
    }

    :host([rank="10"]) .symbol:nth-child(9) {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%,-50%) scale(1, -1);
    }

    :host([rank="10"]) .symbol:last-child {top: 25%;}

    :host([flipped]) {
    border: 1px solid var(--card-border-color);
    background: #1a3a8a;
    background-image: repeating-linear-gradient(45deg,
      transparent 0px, transparent 20px,
      rgba(255, 255, 255, 0.08) 20px, rgba(255, 255, 255, 0.08) 21px),
      repeating-linear-gradient(-45deg,
      transparent 0px, transparent 20px,
      rgba(255, 255, 255, 0.08) 20px, rgba(255, 255, 255, 0.08) 21px );

    & .container {
    visibility: hidden;
    }

    &::before, &::after {
    visibility: hidden;
    }
    }

    `;
  }

  static symbol(suit) {
    const suitSymbol = { diamond: "♦", club: "♣", spade: "♠", heart: "♥" };
    const normalizeSuit = suit?.toLowerCase();
    return suitSymbol[normalizeSuit] ?? "♦";
  }

  static normalizeRank(value) {
    const num = Number(value);
    if (Number.isFinite(num) && num >= 1 && num <= 13) return Math.trunc(num);
    return 1;
  }

  static getRankDisplay(rank) {
    const display = { 1: "A", 11: "J", 12: "Q", 13: "K" };
    return display[rank] || rank.toString();
  }

  static get observedAttributes() {
    return ["rank"];
  }

  populateContainer(container) {
    if (this.rank == 1) container.textContent = this.suit;
    if (this.rank >= 2 && this.rank <= 10) {
      for (let i = 0; i < this.rank; i++) {
        const symbol = document.createElement("div");
        symbol.className = "symbol";
        container.appendChild(symbol);
      }
    }
  }

  createContainer() {
    const container = document.createElement("div");
    container.className = "container";
    this.populateContainer(container);
    return container;
  }

  setSuit() {
    const suitAttr = this.getAttribute("suit") || "diamond";
    this.setAttribute("suit", suitAttr);
    this.suit = PlayingCard.symbol(suitAttr);
  }

  setRank() {
    const rankAttr = this.getAttribute("rank");
    this.rank = PlayingCard.normalizeRank(rankAttr);
    this.setAttribute("rank", this.rank);
    this.rankDisplay = PlayingCard.getRankDisplay(this.rank);
    this.style.setProperty("--rank-suit", `"${this.rankDisplay}${this.suit}"`);
  }

  connectedCallback() {
    this.setSuit();
    this.setRank();
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.setRank();
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${PlayingCard.styles}</style>`;
    const container = this.createContainer();
    this.shadowRoot.appendChild(container);
  }
}

customElements.define("playing-card", PlayingCard);
