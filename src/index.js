fetch('http://localhost:3000/games')
    .then(rsp => rsp.json())
    .then(games => {
        games.forEach(game => {
            addToDiv(game)
        })
    })

    fetch('http://localhost:3000/games/1')
    .then(rsp => rsp.json())
    .then(game => displayDetails(game))

let currentGame
let gameHighScore = document.getElementById('detail-high-score')
const highScoreForm = document.getElementById('high-score-form')

highScoreForm.addEventListener('submit', updateHighScore)


function updateHighScore(event) {
    event.preventDefault();
    let score = document.getElementById('score-input').value;
    score = parseInt(score);
    currentGame.high_score = score;
    gameHighScore.textContent = currentGame.high_score;
    event.target.reset();

    fetch(`http://localhost:3000/games/${currentGame.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentGame)
    })

}


function addToDiv(game) {

    const gameDiv = document.querySelector('.game-list')
    let gameName = document.createElement('h5')
    gameName.textContent = game.name + `(${game.manufacturer_name})`
    gameDiv.appendChild(gameName)
    console.log(gameDiv)

    gameName.addEventListener('click', () => {
     displayDetails(game)
    })
}


function displayDetails(game) {
    
    currentGame = game
    let gameImage = document.getElementById('detail-image')
    gameImage.src = currentGame.image
   
    let gameDetailTitle = document.getElementById('detail-title')
    gameDetailTitle.textContent = currentGame.name

    gameHighScore.textContent = currentGame.high_score
}





