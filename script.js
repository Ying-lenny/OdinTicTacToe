"use strict"


const displayController = (() => {
    const gameTile = document.querySelectorAll('.tile');
    const restartButton = document.getElementById('restart-button')

    gameTile.forEach((tile) =>
        tile.addEventListener('click', () => {
            markTile(tile);
        })
    )

    restartButton.addEventListener('click', () => {
        console.log("Hello World")
    })

    const markTile = (tile) => {
        if (tile.textContent === "") {
            tile.textContent = "X"
        } else {
            console.log("Already taken bud")
        }
    }
})();
