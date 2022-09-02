"use strict"

const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return { getSign };
};

const gameBoard = (() => {
    const board = ["","","","","","","","",""];

    const setTile= (index, sign) => {
        if (index > board.length) return;
        board[index] = sign
    };

    const getTile = (index) => {
        if (index > board.length) return;
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { setTile, getTile, reset };
})();

const displayController = (() => {
    const gameTiles = document.querySelectorAll('.tile');
    const restartButton = document.getElementById('restart-button');
    const currentPlayerTurn = document.getElementById('player-turn');

    gameTiles.forEach((tile) =>
        tile.addEventListener('click', (e) => {
            if (gameController.getIsOver() || e.target.textContent !== "") return;
            gameController.playRound(parseInt(e.target.dataset.index));
            markTile();
        })
    );

    const markTile = () => {
        for (let i = 0; i < gameTiles.length; i++) {
            gameTiles[i].textContent = gameBoard.getTile(i);
        }
    };

    const setPlayerTurn = (message) => {
        currentPlayerTurn.textContent = message
    }

    restartButton.addEventListener('click', (e) => {
        gameBoard.reset();
        gameController.reset();
        markTile();
        setPlayerTurn("It is currently Player X's turn");
});

    const setResult = (winner) => {
        if (winner === "Draw") {
            setPlayerTurn("It's a draw!");
        } else {
            setPlayerTurn(`Player ${winner} has won`);
        }
    }

    return { setPlayerTurn, setResult }
})();


const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let isOver = false

    const playRound = (tileIndex) => {
        gameBoard.setTile(tileIndex, getCurrentPlayerSign());
        if (checkWinner(tileIndex)) {
            displayController.setResult(getCurrentPlayerSign());
            isOver = true
            return
        }
        if (round === 9) {
            displayController.setResult("Draw")
            return
        }
        round++;
        displayController.setPlayerTurn(
            `It is currently Player ${getCurrentPlayerSign()}'s turn`
        );
    }

    const checkWinner = (tileIndex) => {
        const winConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
    
        return winConditions
          .filter((combination) => combination.includes(tileIndex))
          .some((possibleCombination) =>
            possibleCombination.every(
              (index) => gameBoard.getTile(index) === getCurrentPlayerSign()
            )
          );
      };

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    }

    const getIsOver = () => {
        return isOver;
    }

    const reset = () => {
        round = 1;
        isOver = false
    };

    return { playRound, getIsOver, reset };
})();