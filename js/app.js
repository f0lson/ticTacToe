/*
    YOU HAVE TO PROGRAM THIS IN THE MODULAR PATTERN -- SEE TREEHOUSE COURSE
    Course Video: https://teamtreehouse.com/library/the-module-pattern-in-javascript

    To Do:
    1. configure showWin() to deal with empty string in input
    2. configure showWin() to show tie page
*/
( function() {


        const player1box = document.querySelector('#player1');
        const player2box = document.querySelector('#player2');
        const player1Name = document.querySelector('#player1 p');
        const player2Name = document.querySelector('#player2 p');

        // start screen
        const startScreen = document.querySelector('.screen-start');
        const startButton = startScreen.querySelector('.button');
        const player1NameInput = startScreen.querySelector('input#screen-start-name-1');
        const player2NameInput = startScreen.querySelector('input#screen-start-name-2');

        // setting player names
        const setPlayerNames = () => {
            let p1NameValue = player1NameInput.value;
            let p2NameValue = player2NameInput.value;
            player1Name.textContent = p1NameValue;
            player2Name.textContent = p2NameValue;
            player1NameInput.value = '';
            player2NameInput.value = '';
        }

        const randomStart = () => {
            let randomNumber = Math.floor( Math.random()*2+1);
            if ( randomNumber === 1 ) {
                if ( player2box.classList.contains('active') ) {
                    player2box.classList.remove('active');
                }
                player1box.classList.add('active');
            } else {
                if ( player1box.classList.contains('active') ) {
                    player1box.classList.remove('active');
                }
                player2box.classList.add('active');
            }
        }

        console.log(randomStart());

        startButton.addEventListener('click', () => {
            startScreen.style.top = '-100vh';
            setPlayerNames();
            randomStart();
        });
        let finish = document.querySelector('#finish');

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

        // adding IDs to boxes
        const boxesContainer = document.querySelector('.boxes');
        const boxes = boxesContainer.querySelectorAll('li');
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].id = i;
        }

        boxesContainer.addEventListener('mouseover', (e) => {
            let element = e.target;
            if (player1box.classList.contains('active')) {
                hoverSquare(element, `url(img/o.svg)`);
            } else {
                hoverSquare(element, `url(img/x.svg)`);
            }
        });
        boxesContainer.addEventListener('mouseout', (e) => {
            let element = e.target;
            unhoverSquare(element);
        });

        boxesContainer.addEventListener('click', (e) => {
            let element = e.target;
            if (!element.classList.contains('box-filled-1') && !element.classList.contains('box-filled-2')) {
                let squareId = parseInt(element.id, 10);
                if (player1box.classList.contains('active')) {
                    element.classList.add('box-filled-1');
                    player1marked.push(squareId);
                    player1marked.sort((x, y) => x - y);
                } else {
                    element.classList.add('box-filled-2');
                    player2marked.push(squareId);
                    player2marked.sort((x, y) => x - y);
                }
                switchPlayer();
                moveAcc();
                if (moveCounter > 1) {
                    startScreen.style.display = 'none';
                }
                if (moveCounter > 4) {
                    if (checkWin(player1marked)) {
                        showWinner(1);
                        console.log(`Player 1 wins`);
                    }
                    if (checkWin(player2marked)) {
                        showWinner(2);
                        console.log(`Player 2 wins`);
                    }
                }
                if ( moveCounter === 9 ) {
                    console.log(`Cat's game!`);
                }
                console.log(`Turn: ${moveCounter} -- Player 1 squares: ${player1marked}`);
                console.log(`Turn: ${moveCounter} -- Player 2 squares: ${player2marked}`);
            }

        });

        const checkWin = player => {
            // iterate thru winning combinations
            for (let i = 0; i < winningCombos.length; i++) {
                // go into the combinations and see if they contain some of the numbers that the player's marked arrays contain
                if (winningCombos[i].some(combo => player.indexOf(combo) >= 0)) {
                    // if it does contain one of the numbers, then test the whole thing
                    if (winningCombos[i].every(combo => player.indexOf(combo) >= 0)) {
                        return true;
                    }
                }
            }
        }
        // move accumulator
        const moveAcc = () => {
            moveCounter++;
        }

        const switchPlayer = () => {
            if (player1box.classList.contains('active')) {
                player1box.classList.remove('active');
                player2box.classList.add('active');
            } else {
                player2box.classList.remove('active');
                player1box.classList.add('active');
            }
        }

        const hoverSquare = (element, bgImg) => {
            // if the element doesn't have a class of box-filled-1 or box-filled-2
            if (!element.classList.contains('box-filled-1') && !element.classList.contains('box-filled-2')) {
                // then add the respective background image to the square
                element.style.backgroundImage = bgImg;
            }
        }

        const unhoverSquare = (element) => {
            if (!element.classList.contains('box-filled-1') && !element.classList.contains('box-filled-2')) {
                element.style.backgroundImage = '';
            }
        }

        const clearBoard = (arr) => {
            arr.forEach(box => {
                box.style.backgroundImage = '';
                box.classList.remove('box-filled-1');
                box.classList.remove('box-filled-2');
            });
            player1marked = [];
            player2marked = [];
        }

        const showWinner = (player) => {
            finish.style.display = 'block';
            let message = finish.querySelector('.message');
            let p1Name = player1Name.textContent;
            let p2Name = player2Name.textContent;
            if (player === 1) {
                if ( finish.classList.contains('screen-win-two') ) {
                    finish.classList.remove('screen-win-two');
                }
                finish.classList.add('screen-win-one');
                message.textContent = `${p1Name} wins!`;
            } else {
                if ( finish.classList.contains('screen-win-one') ) {
                    finish.classList.remove('screen-win-one');
                }
                finish.classList.add('screen-win-two');
                message.textContent = `${p2Name} wins!`;
            }
        }

        // reset game
        const newGameButton = document.querySelector('#finish .button');
        newGameButton.addEventListener('click', () => {
            resetGame();
        });

        const resetGame = () => {
            moveCounter = 0;
            if (player2box.classList.contains('active')) {
                player2box.classList.remove('active');
                player1box.classList.add('active');
            }
            finish.style.display = 'none';
            startScreen.style.display = 'block';
            startScreen.style.top = 0;
            clearBoard(boxes);
        }
}());
