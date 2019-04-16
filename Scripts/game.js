
// Game Config Object API 
// https://photonstorm.github.io/phaser3-docs/global.html#GameConfig
var config = {
    type: Phaser.AUTO, // Phaser Rendered to use
    width: 800, // Width of the game in pixels
    height: 600, // Height of the game in pixels
    parent: 'gameArea', // ID of the DOM element that will contain the game canvas
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update,
        initBoard: initBoard,
        initUI: initUI,
        startGame: startGame,
        endGame: endGame,
        restartGame: restartGame,
        updateMines: updateMines
    }
};

var game = new Phaser.Game(config);

init = () => {
     
}

preload = () => {
     
}

create = () => {

}

update = () => {

}

initBoard = () => {
     
}

initUI = () => {
     
}

startGame = () => {

}

endGame = () => {

}

restartGame = () => {

}

updateMines = () => {

}