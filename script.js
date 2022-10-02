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
   isPressed = false
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
            logic.input(element, marker, moves)
         })
      });
   }
   return { Cells}

});



const logic = (() => {
   const checker = arr => arr.every(v => v === arr[0])
   const Winner = (moves) => {
      if (checker([moves[0], moves[1], moves[2]])) {
         console.log("won at 1 round")
         return true, moves[0]
      } else if (checker([moves[3], moves[4], moves[5]])) {
         console.log("won at 2 round")
         return true, moves[3]
      } else if (checker([moves[6], moves[7], moves[8]])) {
         console.log("won at 3 round")
         return true
      } else if (checker([moves[0], moves[3], moves[6]])) {
         console.log("won at 4 round")
         return true
      } else if (checker([moves[1], moves[4], moves[7]])) {
         console.log("won at 5 round")
         return true
      } else if (checker([moves[2], moves[5], moves[8]])) {
         console.log("won at 6 round")
         return true
      } else if (checker([moves[0], moves[4], moves[8]])) {
         console.log("won at 7 round")
         return true
      } else if (checker([moves[6], moves[4], moves[2]])) {
         console.log("won at 8 round")
         return true
      } else {
         console.log('draw')
         return "draw"
      }
   }
   // *button click function
   const input = (e, marker, moves) => {
      if (marker === "X") {
         e.style.background = 'red'
      } else if (marker === 'O') {
         e.style.background = 'aqua'
      }
      if (e.click == true) {
         e.innerHTML = marker
         moves[e.value] = marker
         e.click = false
         Winner(moves)
      }
   }

   return { input }
})()



const GameBoard = (() => {
   const showDiv = document.getElementById("tic-tac-toe")
   const player = Player('some', "X")
   const opponent = Player('Bot', "O")
   const setBoard = () => {
      let board = Board()
      showDiv.innerHTML = `player name: ${player.name}, marker:${player.marker} <br>  opponent name: ${opponent.name}, opponent:${opponent.marker} <br>`
      Board()
      board.Cells()
   }
   const Game = () => {
      const startBtn = document.getElementById('startBtn')
      let isGameBoard = true;
      startBtn.addEventListener("click", () => {
         startBtn.innerHTML = "restart"
         setBoard()
      })
   }
   return { Game }

})();


GameBoard.Game()
