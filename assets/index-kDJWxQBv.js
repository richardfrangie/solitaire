(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`/solitaire/assets/jack-DEo1YWa_.png`,t=`/solitaire/assets/queen-DyPhyMn2.png`,n=`/solitaire/assets/king-Bkl74sS2.png`,r=class r extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`})}static get styles(){return`
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
    background-image: url(${e});}
    :host([rank="12"]) .container {
    background-image: url(${t});}
    :host([rank="13"]) .container {
    background-image: url(${n});}

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

    `}static symbol(e){return{diamond:`♦`,club:`♣`,spade:`♠`,heart:`♥`}[e?.toLowerCase()]??`♦`}static normalizeRank(e){let t=Number(e);return Number.isFinite(t)&&t>=1&&t<=13?Math.trunc(t):1}static getRankDisplay(e){return{1:`A`,11:`J`,12:`Q`,13:`K`}[e]||e.toString()}static get observedAttributes(){return[`rank`]}populateContainer(e){if(this.rank==1&&(e.textContent=this.suit),this.rank>=2&&this.rank<=10)for(let t=0;t<this.rank;t++){let t=document.createElement(`div`);t.className=`symbol`,e.appendChild(t)}}createContainer(){let e=document.createElement(`div`);return e.className=`container`,this.populateContainer(e),e}setSuit(){let e=this.getAttribute(`suit`)||`diamond`;this.setAttribute(`suit`,e),this.suit=r.symbol(e)}setRank(){let e=this.getAttribute(`rank`);this.rank=r.normalizeRank(e),this.setAttribute(`rank`,this.rank),this.rankDisplay=r.getRankDisplay(this.rank),this.style.setProperty(`--rank-suit`,`"${this.rankDisplay}${this.suit}"`)}connectedCallback(){this.setSuit(),this.setRank(),this.render()}attributeChangedCallback(e,t,n){t!==n&&(this.setRank(),this.render())}render(){this.shadowRoot.innerHTML=`
    <style>${r.styles}</style>`;let e=this.createContainer();this.shadowRoot.appendChild(e)}};customElements.define(`playing-card`,r);var i=document.querySelector(`.top-board`),a=document.querySelector(`.stock`),o=document.querySelector(`.waste`),s=document.querySelectorAll(`.foundation`),c=s[0],ee=s[1],l=s[2],u=s[3],d=document.querySelector(`.tableau`),f=document.querySelector(`.new-game`),te=document.querySelector(`.undo`),p=document.querySelector(`.victory-btn`),m=document.querySelector(`.move-counter`),h=document.querySelector(`.time-display`),g=document.querySelector(`.victory-popup`),_=document.querySelector(`.hidden-layer`);function v(e,t,n){let r=document.createElement(`playing-card`);return r.setAttribute(`suit`,e),r.setAttribute(`rank`,t),n&&r.toggleAttribute(`flipped`),r}function y(){let e=[],t=[`heart`,`spade`,`diamond`,`club`],n=[...Array(13).keys()].map(e=>e+1);for(let r=0;r<t.length;r++)for(let i=0;i<n.length;i++)e.push(v(t[r],n[i],!0));return e}function b(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[n],e[t]]=[e[t],e[n]]}return e}function x(){let e=b(y()),t=d.children;for(let n=0;n<t.length;n++)for(let r=0;r<=n;r++)n==r&&e[e.length-1].toggleAttribute(`flipped`),t[n].appendChild(e.pop());a.append(...e)}function S(){let e=Array.from(a.cloneNode(!0).children),t=Array.from(o.cloneNode(!0).children);O.isSelectionActive()||(a.children.length>0?n():r());function n(){let n=Array.from(a.children);n[n.length-1].toggleAttribute(`flipped`),o.appendChild(n.pop()),O.storePiles(a,e,o,t)}function r(){let n=o.children;for(let e=n.length-1;e>=0;e--)n[e].toggleAttribute(`flipped`),a.appendChild(n[e]);O.storePiles(o,t,a,e)}}function C(e){let t=Array.from(e.children);if(e.closest(`.top-board`)){t.forEach(e=>e.style.top=``);return}let n=0;for(let e=0;e<t.length;e++)t[e].style.top=`calc(var(--card-stack-gap) * ${e+n})`,t[e].hasAttribute(`flipped`)||n++}function w(...e){e.map(e=>C(e))}function ne(e){let t=e.children;for(let e=t.length-1;e>=0;e--)t[e].remove()}function T(...e){e.forEach(ne)}function E(){T(...i.children,...d.children)}function D(){x(),w(...d.children)}var O={hasSelection:null,selectedCards(e,t,n,r,i){this.hasSelection={pile:e,clickedCard:t,startIndex:n,cardsSelected:r,cards:i}},clearSelection(){this.hasSelection=null},isSelectionActive(){return this.hasSelection!==null},history:[],MAX_UNDO_HISTORY:3,clearHistory(){this.history=[]},storePiles(e,t,n,r){this.history.length>=this.MAX_UNDO_HISTORY&&this.history.shift(),this.history.push({movingPile:e,movingCards:t,targetPile:n,targetCards:r})},undo(){if(!O.isSelectionActive()&&O.history.length>0){let e=O.history.pop();T(e.movingPile,e.targetPile),e.targetCards.map(t=>e.targetPile.appendChild(t)),e.movingCards.map(t=>e.movingPile.appendChild(t)),w(e.movingPile,e.targetPile),Q()}},seconds:0,moves:0,timerId:null,clearStats(){this.seconds=0,this.moves=0,h.textContent=`00:00`,m.textContent=`0`}};function k(e){let t=e.closest(`.top-board`),n=Array.from(e.parentNode.children),r=n.indexOf(e),i=[],a=e.parentNode.cloneNode(!0);if(t)e.classList.toggle(`selected-only`),i.push(e);else{n[r].classList.toggle(`selected-top`),n[n.length-1].classList.toggle(`selected-bottom`);for(let e=r;e<n.length;e++)n[e].classList.toggle(`selected`),i.push(n[e])}O.selectedCards(e.parentNode,e,r,n,a)}function A(){k(O.hasSelection.clickedCard),O.clearSelection()}function j(e){return Array.from(O.hasSelection.pile.children).indexOf(e,O.hasSelection.startIndex)>=0}function M(e){let t=Array.from(O.hasSelection.pile.children),n=O.hasSelection.startIndex,r=O.hasSelection.pile.closest(`.tableau`);A(),r&&n>=1&&t[n-1].hasAttribute(`flipped`)&&t[n-1].toggleAttribute(`flipped`);for(let r=n;r<t.length;r++)e.appendChild(t[r]);C(e)}function N(e){let t=e.matches(`playing-card`),n=e.closest(`.foundation`),r=e.closest(`.tableau`),i=O.hasSelection.clickedCard;if(n)return t?R(i,e)&&z(i,e):B(i)&&V(i,e);if(r)return t?L(i,e)&&H(i,e):U(i)}function P(e){let t=e.matches(`playing-card`)?e.parentNode:e,n=O.hasSelection.pile,r=Array.from(O.hasSelection.cards.children),i=Array.from(t.children);N(e)?(O.storePiles(n,r,t,i),M(t),Q(),W()&&J()):A()}function F(e,t){return e.getAttribute(`suit`)===t}function I(e){return F(e,`heart`)||F(e,`diamond`)}function L(e,t){return I(e)!=I(t)}function R(e,t){return e.getAttribute(`suit`)==t.getAttribute(`suit`)}function z(e,t){let n=+e.getAttribute(`rank`);return+t.getAttribute(`rank`)==n-1}function B(e){return e.getAttribute(`rank`)==1}function V(e,t){return t.classList.contains(e.getAttribute(`suit`))}function H(e,t){let n=+e.getAttribute(`rank`);return+t.getAttribute(`rank`)==n+1}function U(e){return e.getAttribute(`rank`)==13}function W(){return s[0].children.length==13&&s[1].children.length==13&&s[2].children.length==13&&s[3].children.length==13}function G(){O.isSelectionActive()&&A(),O.clearSelection(),O.clearHistory(),E(),D(),O.timerId&&Z(),O.clearStats(),X()}function K(){J(),G()}var q=!1;function J(){q=!q,O.timerId&&Z(),g.style.display=q?`flex`:`none`,_.style.display=q?`block`:`none`}function Y(e){let t=e%60,n=Math.floor(e/60);n>=60&&(n=Math.floor(n%60));function r(e){return e.toString().padStart(2,`0`)}return`${r(n)}:${r(t)}`}function X(){if(!O.timerId)return O.timerId=setInterval(()=>{h.textContent=Y(++O.seconds)},1e3),O.timerId}function Z(){clearInterval(O.timerId),O.timerId=null,O.seconds=0}function Q(){m.textContent=++O.moves}function $(e){let t=e.target,n=t.matches(`playing-card`),r=n&&!t.hasAttribute(`flipped`),i=n&&t.hasAttribute(`flipped`),a=t.classList.contains(`tableau`),o=t.classList.contains(`waste`);if(!(i||a||o)){if(O.isSelectionActive())return j(t)?A():P(t);if(r)return k(t)}}o.addEventListener(`click`,$),c.addEventListener(`click`,$),ee.addEventListener(`click`,$),l.addEventListener(`click`,$),u.addEventListener(`click`,$),d.addEventListener(`click`,$),f.addEventListener(`click`,G),te.addEventListener(`click`,O.undo),p.addEventListener(`click`,K),_.addEventListener(`click`,J),a.addEventListener(`click`,S),D(),X(),window.game=O;