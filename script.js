// todo somehow make a pop up and show winner's name
// todo make reset button.


// this function will create players
const Player = (name, marker) => {
   const getName = () => name;
   const getMarker = () => marker;
   return {
      name: getName(),
      marker: getMarker()
   }
}

// this function customize board
const Board = (() => {

    //*grabbing important html divs and creating divs for name of players.

    // this is the main div
    const showDiv = document.getElementById("tic-tac-toe");

    // creating gameBoardDiv this will contain small cells or boxes
    const gameBoardDiv = document.createElement('div');
    showDiv.appendChild(gameBoardDiv);
    gameBoardDiv.classList.add('gameBoardDiv');

    // grabbing input divs to take their values
    const xPlayer = document.getElementById('xPlayer')
    const oPlayer = document.getElementById('oPlayer')

    //creating element to show name and marker on the display 
    const playersDiv = document.createElement("div");
    playersDiv.classList.add('playersDiv')
    const opponentDiv = document.createElement("div");
    opponentDiv.classList.add('opponentDiv')

   //*moves array to input players move
   let moves = ['', '', '', '', '', '', '', '', '']

   // this decide marker if it's false marker will be X and if it's true marker will be O
   let isPressed = false

   // value of marker
   let marker = ''


   //* Players array this will have players information
   let players = []
   

   // this function shows the color of player of current player on the screen. 
   const currentPlayer=()=>{
      let current_player=marker//setting current player as marker which will be X and O      
      if (current_player==='O'){
         opponentDiv.style.color=''
         playersDiv.style.color='red'       
      }else if(current_player==="X"){
         playersDiv.style.color=''
         opponentDiv.style.color='red'
      }

   }

   // this function creates div and push players value on the players array
   const createPlayers = () => {
      const player = Player(xPlayer.value, xPlayer.name)
      players.push(player)
      const opponent = Player(oPlayer.value, oPlayer.name)
      players.push(opponent)
      showDiv.appendChild(playersDiv)
      showDiv.appendChild(opponentDiv)   
      playersDiv.innerHTML = `${(player.name).toUpperCase()} ${player.marker}`
      opponentDiv.innerHTML = `${(opponent.name).toUpperCase()} ${opponent.marker}`
   };

  

   //* restart button

   const resetBtn = () => {
      moves = ['', '', '', '', '', '', '', '', '']

      // reset button from popup 
      const reset = document.getElementById("new_round")
      // popup div
      const winnerDiv=document.getElementById("popUp")
      reset.addEventListener('click', () => {
         winnerDiv.classList.remove("open-popup")
         console.log('clicked')
         gameBoardDiv.innerHTML=''
         board()
         Cells()

      })
   }

   //*this function makes game board
   const board = () => {
      for (let i = 0; i <= 8; i++) {
         const boardDiv = document.createElement("div");
         boardDiv.value = i
         boardDiv.click = true;
         boardDiv.classList.add('boardCells')
         gameBoardDiv.appendChild(boardDiv);
      }
   }


   // this function switches players turns 
   const turn = () => {
      if (isPressed == false) {
         marker = "X"
         return isPressed = true;
      } else if (isPressed == true) {
         marker = 'O'
         return isPressed = false;
      }
   }

   // this function is for divs clicks and do different tasks 
   const Cells = () => {

      // initially setting first player color
      if (isPressed==false){

         playersDiv.style.color='red'
      }   

      // grabbing buttons/cells 
      const buttons = document.querySelectorAll('.boardCells')
      buttons.forEach(element => {
         element.addEventListener('click', () => {
            turn()// calling turn function to check which player turn 
            currentPlayer()
            Logic.input(element, marker, moves)
            Logic.whoWon(players)// checking who won and passing players array 
         })
      });
   }
   return { board, Cells, resetBtn, createPlayers }

})();



// *this function checks the logic the game. 
const Logic = (() => {
   let winner = ''// checks who won
   let round=0//displays the number of round

   // this function show's the winner name on the display and takes array as an argument
   const whoWon = (players) => {
      if (winner != '') {
         round+=1
         const winnerDiv=document.getElementById("popUp")
         const winnerName=document.getElementById("winner")
         const roundDiv=document.getElementById("round")
         roundDiv.innerHTML=round
         winnerDiv.classList.add("open-popup")
         Board.resetBtn()
         if (winner === "X") {
            winner=''
            winnerName.innerHTML = `Hurray! ${(players[0].name).toUpperCase()} Won congratulations`           
         } else if (winner === "O") {
            winner=''
            winnerName.innerHTML = `Hurray! ${(players[1].name).toUpperCase()} Won congratulations`          
         }else if (winner === "draw") {
            winner=''
            winnerName.innerHTML = `It was a draw`           
         }
      }
   }

   //this function checks if the array is equal
   const checker = arr => arr.every(v => v === arr[0])

   // this function checks all the winning possibilities and returns the winner or draw
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


   // *this function changes the inner html of buttons/cells of game board and change the value of moves array(log the moves in moves array) and changes the value of click so the button is disabled. and it also call winner function and checks if someone won.

   const input = (e, marker, moves) => {
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


// this function sets the board 
const GameBoard = (() => {

   const btn = document.getElementById('start')

   // this function sets the board and calls different functions 
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
