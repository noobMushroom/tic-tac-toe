// this function will create players
const Player = (name, marker, round) => {
   const getName = () => name;
   const getMarker = () => marker;
   const totalRoundWon = () => round

   return {
      name: getName(),
      marker: getMarker(),
      roundWon: totalRoundWon()
   }
}

// this function customize board
const Board = (() => {
   //*grabbing important html divs 

   // this is the main div everything will go inside this div
   const showDiv = document.getElementById("tic-tac-toe");

   // creating gameBoardDiv this will contain small cells or boxes
   const gameBoardDiv = document.createElement('div');
   showDiv.appendChild(gameBoardDiv);
   gameBoardDiv.classList.add('gameBoardDiv');

   // grabbing input divs to take their values for users name
   const xPlayer = document.getElementById('xPlayer')
   const oPlayer = document.getElementById('oPlayer')


   // grabbing important elements to show player info on the display
   const playersDiv = document.getElementById('playerInfo')
   const playerName = document.getElementById("player_name")
   const playerMarker = document.getElementById("player_marker")
   const playerRoundWon = document.getElementById('playerRoundWon')
   // grabbing important element to show opponent info on the display
   const opponentDiv = document.getElementById("opponentInfo")
   const opponentName = document.getElementById("opponentName")
   const opponentMarker = document.getElementById("opponentMarker")
   const opponentRoundWon = document.getElementById("opponentRoundWon")

   // decide games if it's innerhtml changes the cells won't click
   const winner = document.getElementById('winner')


   //*moves array to input players move
   let moves = ['', '', '', '', '', '', '', '', '']

   // this decide marker if it's false marker will be X and if it's true marker will be O
   let isPressed = false

   // value of marker
   let marker = ''


   //* Players array this will have players information
   let players = []

   // is game on deciede clicks and it's value come from winners div
   let isGameOn = ''

   // this function shows the color of player of current player( whose turn) on the screen. 
   const currentPlayer = () => {
      let current_player = marker//setting current player as marker which will be X and O      
      if (current_player === 'O') {
         opponentDiv.classList.remove("player_Info_focus")
         playersDiv.classList.add("player_Info_focus")
      } else if (current_player === "X") {
         playersDiv.classList.remove("player_Info_focus")
         opponentDiv.classList.add("player_Info_focus")
      }
   }

   // this function create players and push players value on the players array
   const createPlayers = () => {
      const player = Player(xPlayer.value, xPlayer.name, 0)
      players.push(player)
      const opponent = Player(oPlayer.value, oPlayer.name, 0)
      players.push(opponent)
   };

   
   // grabbing elements to set attribute to show them on the screen
   const playerInfoDiv=document.getElementById('playerInfo')
   const opponentInfoDiv=document.getElementById("opponentInfo")

   // function to display to show player info in the display like round name and marker
   const showPlayerInfo = () => {
      playerInfoDiv.setAttribute('style', 'background-color: #67e8f9;width: 330px; height: 140px; padding: 30px;')
      opponentInfoDiv.setAttribute('style', 'background-color: #67e8f9;width: 330px; height: 140px; padding: 30px;')

      playerName.innerHTML = players[0].name.toUpperCase()
      playerMarker.innerHTML = players[0].marker.toUpperCase()
      playerRoundWon.innerHTML = `Round Won: ${players[0].roundWon}`

      opponentName.innerHTML = players[1].name.toUpperCase()
      opponentMarker.innerHTML = players[1].marker.toUpperCase()
      opponentRoundWon.innerHTML = `Round Won: ${players[1].roundWon}`
   }


   //*New game function it starts new game and sets the board for new game. 
   const newGame = () => {
      // grabbing pop up menu
      const winnerDiv = document.getElementById("popUp")
      const new_game = document.getElementById('new_game')
      const playersDiv = document.getElementById('playersDiv')
      const startGameBtn = document.getElementById("startGame")

      // new game button inside the pop up when it will be pressed it will ask for user info
      new_game.addEventListener("click", () => {
         // removing winning pop up class and adding asking for player info
         winnerDiv.classList.remove("open-popup")
         playersDiv.classList.add('choice-popup')

         // removing value from input boxes
         xPlayer.value = ''
         oPlayer.value = ''

         // button from players div to take information 
         startGameBtn.addEventListener('click', () => {

            // changing all values to default 
            isPressed = false
            marker = ''
            players = []
            winner.innerHTML = ''
            moves = ['', '', '', '', '', '', '', '', '']
            playersDiv.classList.remove("choice-popup")
            gameBoardDiv.innerHTML = ''
            createPlayers()
            showPlayerInfo()
            board()
            Cells()
         })

      })
   };


   //* restart button it will restart the board 
   const resetBtn = () => {
      moves = ['', '', '', '', '', '', '', '', '']

      // reset button from popup 
      const reset = document.getElementById("new_round")
      // popup div
      const winnerDiv = document.getElementById("popUp")
      reset.addEventListener('click', () => {
         winnerDiv.classList.remove("open-popup")
         gameBoardDiv.innerHTML = ''// to clear the cells 
         isGameOn = ''
         winner.innerHTML = ''
         board()
         Cells()
         showPlayerInfo()
      })
   }


   //*this function makes game board
   const board = () => {
      for (let i = 0; i <= 8; i++) {
         const boardDiv = document.createElement("div");
         boardDiv.value = i
         boardDiv.name = 'unClicked';
         boardDiv.classList.add('boardCells')
         boardDiv.setAttribute('id', `cell${i}`)
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

   // this function is for divs clicks and call different functions
   const Cells = () => {
      
      // initially setting first player color
      if (isPressed == false) {
         opponentDiv.classList.remove("player_Info_focus")
         playersDiv.classList.add("player_Info_focus")
      }

      // grabbing buttons/cells
      const buttons = document.querySelectorAll('.boardCells')
      buttons.forEach(element => {
         element.addEventListener('click', () => {
            isGameOn = winner.innerHTML
            if (isGameOn === '') {
               if (element.name == 'unClicked') {
                  turn()// calling turn function to check which player turn 
                  currentPlayer()// changing current player
                  Logic.input(element, marker, moves)
                  Logic.whoWon(players)// checking who won and passing players array 
               }
            }
         })

      });
   }
   return { board, Cells, resetBtn, createPlayers, showPlayerInfo, newGame }

})();



// *this function checks the logic the game. 
const Logic = (() => {
   let winner = ''// checks who won

   // this function show's the winner name on the display and takes array as an argument
   const whoWon = (players) => {
      if (winner != '') {
         //grabbing important elements to show the winner and round
         const winnerDiv = document.getElementById("popUp")
         const winnerName = document.getElementById("winner")
         winnerDiv.classList.add("open-popup")
         // calling reset button and new game functions so the player can choose.
         Board.resetBtn()
         Board.newGame()
         // changing winner value and changing round won by players
         if (winner === "X") {
            winner = ''
            players[0].roundWon += 1
            if (players[0].name != '') {
               winnerName.innerHTML = `Hurray! ${(players[0].name).toUpperCase()} Won congratulations`
            }else{
               winnerName.innerHTML = `Hurray! ${(players[0].marker).toUpperCase()} Won congratulations`
            }
         } else if (winner === "O") {
            winner = ''
            players[1].roundWon += 1
            if (players[1].name != '') {
               winnerName.innerHTML = `Hurray! ${(players[1].name).toUpperCase()} Won congratulations`
            }else{
               winnerName.innerHTML = `Hurray! ${(players[1].marker).toUpperCase()} Won congratulations`
            }
         } else if (winner === "draw") {
            winner = ''
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
      moves[e.value] = marker
      e.name = "clicked"
      Winner(moves)
      if (marker === "X") {
         e.innerHTML = 'X'
         e.setAttribute('style', "color:#111827;")
      } else if (marker === 'O') {
         e.innerHTML = 'O'
         e.setAttribute('style', "color:#27272a;")
      }
   }

   return { input, whoWon }
})()

// this function sets the board 
const GameBoard = (() => {
   const humanVsComputerBtn= document.getElementById("computer")
   const btn = document.getElementById('start')
   // this function sets the board and calls different functions 
   const setBoard = () => {
      Board.createPlayers()
      Board.showPlayerInfo()
      Board.board()
      Board.Cells()
      humanVsComputerBtn.innerHTML=''
      btn.innerHTML = ''
   }
   const Game = () => {
      const startBtn = document.getElementById('startBtn')
      const playersDiv = document.getElementById('playersDiv')
      startBtn.addEventListener("click", () => {
         playersDiv.classList.add('choice-popup')
      })
   }

   const startGame = () => {
      const startGameBtn = document.getElementById("startGame")
      const playersDiv = document.getElementById('playersDiv')
      startGameBtn.addEventListener('click', () => {
         playersDiv.classList.remove("choice-popup")
         setBoard()
      })
   }
   return { Game, startGame }

})();


GameBoard.Game()
GameBoard.startGame()