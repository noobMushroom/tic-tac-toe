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

   const board = () => {
      for (let i = 0; i <= 8; i++) {
         const boardDiv = document.createElement("div");
         boardDiv.value = i
         boardDiv.click = true;
         boardDiv.classList.add('boardCells')
         gameBoardDiv.appendChild(boardDiv);
      }
   }

   const turn = () => {
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
            Logic.whoWon()
         })
      });
   }
   return { board, Cells }

})();



const Logic = (() => {
   let winner = ''
   let players = []

   const checker = arr => arr.every(v => v === arr[0])

   const createPlayers = () => {
      const showDiv = document.getElementById("tic-tac-toe");
      const xPlayer = document.getElementById('xPlayer')
      const oPlayer = document.getElementById('oPlayer')
      const player = Player(xPlayer.value, xPlayer.name)
      players.push(player)
      const opponent = Player(oPlayer.value, oPlayer.name)
      players.push(opponent)
      const playersDiv = document.createElement("div");
      const opponentDiv = document.createElement("div");
      playersDiv.innerHTML = `${player.name} ${player.marker}`
      opponentDiv.innerHTML = `${opponent.name} ${opponent.marker}`
      showDiv.appendChild(playersDiv)
      showDiv.appendChild(opponentDiv)
   };

   const resetBtn = () => {
      const showDiv = document.getElementById("tic-tac-toe");
      const reset = document.createElement("button")
      showDiv.appendChild(reset)
      reset.innerHTML = 'NEW GAME'
      reset.addEventListener('click', () => {
         showDiv.innerHTML=''
         GameBoard.setBoard()
      })
   }

   const whoWon = () => {
      if (winner != '') {
         const showDiv = document.getElementById("tic-tac-toe")
         showDiv.innerHTML = winner
         resetBtn
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
         ('draw')
         return "draw"
      }
   }
   // *button click function
   const input = (e, marker, moves) => {
      ('this is winner from input', winner)
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

   return { input, whoWon, createPlayers }
})()



const GameBoard = (() => {

   const btn = document.getElementById('start')
   const setBoard = () => {
      const inputDiv= document.getElementById('playersDiv')
      Board.board()
      Board.Cells()
      Logic.createPlayers()
      inputDiv.innerHTML=''
      btn.innerHTML = ''
   }
   const Game = () => {
      const startBtn = document.getElementById('startBtn')
      startBtn.addEventListener("click", () => {
         setBoard()
      })
   }
   return { Game }

})();


GameBoard.Game()
