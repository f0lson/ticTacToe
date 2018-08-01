// player object
class Player {
    constructor ( isTurn, playerNumber ) {
        this.isTurn = isTurn;
        this.playerNumber = playerNumber;
    }

    get marker () {
        let number = this.playerNumber;
        if( number === 0) {
            return `url('img/o.svg')`;
        } else {
            return `url('img/x.svg')`;
        }
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

// adding IDs to boxes
const boxes = document.querySelectorAll('.box');
for (var i = 0; i < boxes.length; i++) {
    boxes[i].id = i;
    boxes[i].style.backgroundImage = player1.marker;
}

// const hoverSquare = ( element, backgroundImage ) {
//     if ( element) {
//
//     }
// };
