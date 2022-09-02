"use strict"

const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return { getSign };
};

const displayController = (() => {
    const gameTile = document.querySelectorAll('.tile');
    const restartButton = document.getElementById('restart-button')

    gameTile.forEach((tile) =>
        tile.addEventListener('click', () => {
            markTile(tile);
        })
    )

    restartButton.addEventListener('click', () => {
        gameTile.forEach((tile) => {
            tile.textContent = "";
        })
    })

    const markTile = (tile) => {
        if (tile.textContent === "") {
            tile.textContent = "X"
        } else {
            console.log("Already taken bud")
        }
    }
})();


const gameController = (() => {
    console.log("gameController ready for work")
})();