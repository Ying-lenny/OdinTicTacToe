console.log("Hi")

const gameTile = document.querySelectorAll('.tile');

gameTile.forEach((tile) =>
    tile.addEventListener('click', () => {
        markTile(tile);
    })
)

function markTile(tile) {
    if (tile.textContent === "") {
        tile.textContent = "X"
    } else {
        console.log("Already taken bud")
    }
}