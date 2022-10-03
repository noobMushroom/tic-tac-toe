// todo somehow make a pop up and show winner's name
// todo make reset button.


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
   let moves = ['', '', '', '', '', '', '', '', '']
   let isPressed = false
   let marker = ''


   //* Players
   let players = []
   let current_player=''


   const currentPlayer=(marker)=>{
      current_player=players[0].name
      if (marker==='X'){
         current_player=players[0].name
         console.log(current_player)
      }else if(marker==="O"){
         current_player=players[1].name
         console.log(current_player)
      }
   }

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
      playersDiv.innerHTML = `${(player.name).toUpperCase()} ${player.marker}`
      opponentDiv.innerHTML = `${(opponent.name).toUpperCase()} ${opponent.marker}`
      showDiv.appendChild(playersDiv)
      showDiv.appendChild(opponentDiv)
   };

   const showDiv = document.getElementById("tic-tac-toe");
   const gameBoardDiv = document.createElement('div');
   showDiv.appendChild(gameBoardDiv);
   gameBoardDiv.classList.add('gameBoardDiv');

   //* restart button

   const resetBoard = () => {

   }

   const resetBtn = () => {
      moves = ['', '', '', '', '', '', '', '', '']
      const showDiv = document.getElementById("tic-tac-toe");
      const reset = document.createElement("button")
      showDiv.appendChild(reset)
      reset.innerHTML = 'NEW GAME'
      reset.addEventListener('click', () => {
         Board.board()
         Board.Cells()

      })
   }

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
            Logic.whoWon(players)
         })
      });
   }
   return { board, Cells, resetBtn, createPlayers }

})();



const Logic = (() => {
   let winner = ''

   

   const whoWon = (players) => {
      if (winner != '') {
         const showDiv = document.getElementById("tic-tac-toe")
         if (winner === "X") {
            showDiv.innerHTML = `Hurray! ${(players[0].name).toUpperCase()} Won congratulations`
            Board.resetBtn()

         } else if (winner === "O") {
            showDiv.innerHTML = `Hurray! ${(players[1].name).toUpperCase()} Won congratulations`
            Board.resetBtn()
         }else if (winner === "draw") {
            showDiv.innerHTML = `It was a draw`
            Board.resetBtn()
         }
      }
   }

   const checker = arr => arr.every(v => v === arr[0])
   const Winner = (moves) => {
      if (moves[0] && moves[1] && moves[2] != '') {
         if (checker([moves[0], moves[1], moves[2]])) {
            return winner = moves[0]
         }
      }
      if (moves[3] && moves[4] && moves[5]) {
         if (checker([moves[3], moves[4], moves[5]])) {
            return winner = moves[3]
         }
      }
      if (moves[6] && moves[7] && moves[8] != '') {
         if (checker([moves[6], moves[7], moves[8]])) {
            return winner = moves[6]
         }
      }
      if (moves[0] && moves[3] && moves[6] != '') {
         if (checker([moves[0], moves[3], moves[6]])) {
            return winner = moves[0]
         }
      }
      if (moves[1] && moves[4] && moves[7] != '') {
         if (checker([moves[1], moves[4], moves[7]])) {
            return winner = moves[1]
         }
      }
      if (moves[2] && moves[5] && moves[8] != '') {
         if (checker([moves[2], moves[5], moves[8]])) {
            return winner = moves[2]
         }
      }
      if (moves[0] && moves[4] && moves[8] != '') {
         if (checker([moves[0], moves[4], moves[8]])) {
            return winner = moves[0]
         }
      }
      if (moves[6] && moves[4] && moves[2] != '') {
         if (checker([moves[6], moves[4], moves[2]])) {
            return winner = moves[6]
         }
      }
      if (moves[0] && moves[1] && moves[2] && moves[3] && moves[4] && moves[5] && moves[6] && moves[7] && moves[8] != '') {
         return winner = "draw"
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

   return { input, whoWon }
})()



const GameBoard = (() => {

   const btn = document.getElementById('start')
   const setBoard = () => {
      const inputDiv = document.getElementById('playersDiv')
      Board.createPlayers()
      Board.board()
      Board.Cells()
      inputDiv.innerHTML = ''
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
