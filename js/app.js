class Player {
    constructor ( isTurn, playerNumber ) {
        this.isTurn = isTurn;
        this.playerNumber = playerNumber;
    }
};

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

let player1marked = new Array();
let player2marked = new Array();

//move counter
let moveCounter = 0;
if ( moveCounter > 0 ) {
    startScreen.style.display = 'none';
    startScreen.style.top = 0;
}

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

boxesContainer.addEventListener('click', (e) => {
    let element = e.target;
    if ( !element.classList.contains('box-filled-1') && !element.classList.contains('box-filled-2') ) {
        let squareId = parseInt(element.id, 10);
        if ( player1box.classList.contains('active') ) {
            element.classList.add('box-filled-1');
            player1marked.push(squareId);
        } else {
            element.classList.add('box-filled-2');
            player2marked.push(squareId);
        }
        switchPlayer();
        moveCounter++;
        if ( moveCounter > 1 ) {
            startScreen.style.display = 'none';
        }
        console.log(`Turn: ${moveCounter} -- Player 1 squares: ${player1marked}`);
        console.log(`Turn: ${moveCounter} -- Player 2 squares: ${player2marked}`);
    }

});

const switchPlayer = () => {
    if ( player1box.classList.contains('active') ) {
        player1box.classList.remove('active');
        player2box.classList.add('active');
    } else {
        player2box.classList.remove('active');
        player1box.classList.add('active');
    }
}

const hoverSquare = ( element, bgImg ) => {
    // if the element doesn't have a class of box-filled-1 or box-filled-2
    if ( !element.classList.contains('box-filled-1') && !element.classList.contains('box-filled-2') ) {
        // then add the respective background image to the square
        element.style.backgroundImage = bgImg;
    }
}

const unhoverSquare = ( element ) => {
    if ( !element.classList.contains('box-filled-1') && !element.classList.contains('box-filled-2') ) {
        element.style.backgroundImage = '';
    }
}

const resetBoard = () => {
    startScreen.style.display = 'block';
    startScreen.style.top = '0';
}

const newGame = () => {

}
