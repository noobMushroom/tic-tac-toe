// todo somehow make a pop up and show winner's name
// todo make reset button.
// todo if game is finished declare it was a draw


// players
const Player = (name, marker) => {
   const getName = () => name;
   const getMarker = () => marker;
   return {
      name: getName(),
      marker: getMarker()
   }
}

const Board = (() => {
   let moves = ['0', '1', '2', '3', '4', '5', '6', '7', '8']
   let isPressed = false
   let marker = ''
   const showDiv = document.getElementById("tic-tac-toe");
   const gameBoardDiv = document.createElement('div');
   showDiv.appendChild(gameBoardDiv);
   gameBoardDiv.classList.add('gameBoardDiv');

   for (let i = 0; i <= 8; i++) {
      const boardDiv = document.createElement("div");
      boardDiv.value = i
      boardDiv.click = true;
      boardDiv.classList.add('boardCells')
      gameBoardDiv.appendChild(boardDiv);
   }

   const turn = (arr) => {
      if (isPressed == false) {
         marker = "X"
         return isPressed = true;
      } else if (isPressed == true) {
         marker = 'O'
         return isPressed = false;
      }
   }
   const Cells = () => {
      const buttons = document.querySelectorAll('.boardCells')
      buttons.forEach(element => {
         element.addEventListener('click', () => {
            turn()
            Logic.input(element, marker, moves)
            Logic.whoWon(showDiv)
         })
      });
   }
   return { Cells }

});




const Logic = (() => {
   let winner = ''
   const checker = arr => arr.every(v => v === arr[0])
   const whoWon = (div) => {
      if (winner != '') {
         div.innerHTML = `Player ${winner} won`
      }
   }
   const Winner = (moves) => {
      if (checker([moves[0], moves[1], moves[2]])) {
         return winner = moves[0]
      } else if (checker([moves[3], moves[4], moves[5]])) {
         return winner = moves[3]
      } else if (checker([moves[6], moves[7], moves[8]])) {
         return winner = moves[6]
      } else if (checker([moves[0], moves[3], moves[6]])) {
         return winner = moves[0]
      } else if (checker([moves[1], moves[4], moves[7]])) {
         return winner = moves[1]
      } else if (checker([moves[2], moves[5], moves[8]])) {
         return winner = moves[2]
      } else if (checker([moves[0], moves[4], moves[8]])) {
         return winner = moves[0]
      } else if (checker([moves[6], moves[4], moves[2]])) {
         return winner = moves[6]
      } else {
         console.log('draw')
         return "draw"
      }
   }
   // *button click function
   const input = (e, marker, moves) => {
      console.log('this is winner from input', winner)
      if (e.click == true) {
         moves[e.value] = marker
         e.click = false
         Winner(moves)
         if (marker === "X") {
            e.innerHTML = '<img src="images/x.jpg" height="100%" width="100%" >'
         } else if (marker === 'O') {
            e.innerHTML = '<img src="images/O.png" height="100%" width="100%">'
         }
      }
   }
   return { input, whoWon }
})()



const GameBoard = (() => {
   let players = []

   const showDiv = document.getElementById("tic-tac-toe")

   const makePlayers = () => {
      const xPlayer = document.getElementById('xPlayer')
      const oPlayer = document.getElementById('oPlayer')
      const player = Player(xPlayer.value, xPlayer.name)
      players.push(player)
      const opponent = Player(oPlayer.value, oPlayer.name)
      players.push(opponent)
   }

   const setBoard = () => {
      makePlayers()
      let board = Board()
      showDiv.innerHTML = `${(players[0].name).toUpperCase()} ${players[0].marker} <br>   ${(players[1].name).toUpperCase()}, ${players[1].marker} <br>`
      Board()
      board.Cells()
   }
   const Game = () => {
      const startBtn = document.getElementById('startBtn')
      startBtn.addEventListener("click", () => {
         startBtn.innerHTML = "restart"
         setBoard()
         console.log(players)
      })
   }
   return { Game }
})();


GameBoard.Game()
