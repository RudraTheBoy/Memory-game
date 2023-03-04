const cards = document.querySelectorAll('.memory-card');

let hasFlipperCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

   this.classList.toggle('flip');

   if(!hasFlipperCard){
       // First Click
    hasFlipperCard = true;
    firstCard = this;
    return;
   } 
    // Second Click
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    
    isMatch ? diasbleCards() : unflipCards();

}

function diasbleCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    restBoard(); 
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    restBoard(); 
    }, 1000); 
}

function restBoard() {
    [hasFlipperCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*10);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));