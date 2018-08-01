// player object

document.addEventListener('DOMContentLoaded', () => {

class Player {
    constructor ( isTurn, playerNumber ) {
        this.isTurn = isTurn;
        this.playerNumber = playerNumber;
    }
}

const player1 = new Player( 'Forrest', true, 0 );
const player2 = new Player( 'Hillary', false, 1 );

const player1box = document.querySelector('#player1');
const player2box = document.querySelector('#player2');

// start screen
const startScreen = document.querySelector('.screen-start');
const startButton = startScreen.querySelector('.button');
startButton.addEventListener('click', () => {
    startScreen.style.top = '-100vh';
    player1box.classList.add('active');

});

// all possible winning combinations
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//move counter
let moveCounter = 0;
if ( moveCounter > 0 ) {
    startScreen.style.display = 'none';
    startScreen.style.top = 0;
}

// check win after the 4th move
const checkWin = () => {};

// adding IDs to boxes
const boxesContainer = document.querySelector('.boxes');
const boxes = boxesContainer.querySelectorAll('li');
for (var i = 0; i < boxes.length; i++) {
    boxes[i].id = i;
}

boxesContainer.addEventListener('mouseover', (e) => {
    let element = e.target;
    if ( player1box.classList.contains('active') ) {
        hoverSquare( element, `url(img/o.svg)` );
    } else {
        hoverSquare( element, `url(img/x.svg)` );
    }
});

boxesContainer.addEventListener('mouseout', (e) => {
    let element = e.target;
    unhoverSquare( element );
});

const hoverSquare = ( element, bgImg ) => {
    if ( !element.classList.contains('box-filled-1') && !element.classList.contains('box-filled-2') ) {
        element.style.backgroundImage = bgImg;
    }
};

const unhoverSquare = ( element ) => {
    if ( !element.classList.contains('box-filled-1') && !element.classList.contains('box-filled-2') ) {
        element.style.backgroundImage = '';
    }
}

});
