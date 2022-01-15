var selection = document.getElementById("Selection");

var GameBoard = document.getElementById("GameBoard");
var TileBox = document.getElementById("TileBox");

var activePlay = document.querySelector(".activePlay");

var result = document.getElementById("result");
var rstatus = result.children[0];
var resultTxt = result.children[1];

var Player;

function playSelect(element) {
  if (element.innerHTML == "Player 1") {
    Player = "Player 1";
    selection.style.display = "none";
    GameBoard.style.display = "block";
    activePlay.classList.add("playX");
  } else {
    Player = "Player 2";
    selection.style.display = "none";
    GameBoard.style.display = "block";
    activePlay.classList.add("playO");
  }
}

function GameMove(move) {
  if (Player == "Player 1") {
    move.innerHTML = '<i class="bi bi-x-lg"></i>';
    activePlay.classList.remove("playX");
    activePlay.classList.add("playO");
  } else {
    move.innerHTML = '<i class="bi bi-circle"><i>';
    activePlay.classList.remove("playO");
    activePlay.classList.add("playX");
  }
  move.style.pointerEvents = "none";
  var rBotDelay = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    Bot();
  }, rBotDelay);
  selectWinner();
}

function Bot() {
  var UTurnCounter = [];
  for (var i = 0; i < TileBox.children.length; i++) {
    if (TileBox.children[i].childElementCount == 0) {
      UTurnCounter.push(i);
    }
  }
  var botTurn = UTurnCounter[Math.floor(Math.random() * UTurnCounter.length)];
  if (UTurnCounter.length > 0) {
    if (Player == "Player 1") {
      TileBox.children[botTurn].innerHTML = '<i class="bi bi-circle"><i>';
      TileBox.children[botTurn].style.pointerEvents = "none";
      activePlay.classList.remove("playO");
      activePlay.classList.add("playX");
    } else {
      TileBox.children[botTurn].innerHTML = '<i class="bi bi-x-lg"></i>';
      TileBox.children[botTurn].style.pointerEvents = "none";
      activePlay.classList.remove("playX");
      activePlay.classList.add("playO");
    }
  }
}

function selectWinner() {
  var tiles = document.getElementsByClassName("tiles");
  var WConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  
  WConditions.forEach((e) => {
    if (
      tiles[e[0]].innerHTML === tiles[e[1]].innerHTML &&
      tiles[e[1]].innerHTML === tiles[e[2]].innerHTML &&
      tiles[e[0]].innerHTML !== ""
    ) {
      if (
        tiles[e[0]].innerHTML === '<i class="bi bi-x-lg"></i>' &&
        tiles[e[1]].innerHTML === '<i class="bi bi-x-lg"></i>' &&
        tiles[e[2]].innerHTML === '<i class="bi bi-x-lg"></i>'
        ) {
          GameBoard.style.display = "none";
          result.style.display = "block";
        rstatus.innerHTML = "Congratulations!";
        resultTxt.innerHTML = "Player 1 won.";
      } else if (
        tiles[e[0]].innerHTML === '<i class="bi bi-circle"><i></i></i>' &&
        tiles[e[1]].innerHTML === '<i class="bi bi-circle"><i></i></i>' &&
        tiles[e[2]].innerHTML === '<i class="bi bi-circle"><i></i></i>'
        ) {
          rstatus.innerHTML = "Congratulations!";
          resultTxt.innerHTML = "Player 2 won.";
          GameBoard.style.display = "none";
          result.style.display = "block";
        }
      }
      else {
        var allBoxes = 0;
        for (let i = 0; i < TileBox.children.length; i++) {
          if (TileBox.children[i].innerHTML == "") {
            allBoxes++;
          }
        }
        if (allBoxes == 0) {
          rstatus.innerHTML = "OOPs!";
          result.style.display = "block";
          GameBoard.style.display = "none";
          resultTxt.innerHTML = "The match was drawn";
        }
      }
  });
}

function restart() {
  selection.style.display = "block";
  result.style.display = "none";
  for (let i = 0; i < TileBox.children.length; i++) {
    TileBox.children[i].innerHTML = "";
    TileBox.children[i].style.pointerEvents = "auto";
  }
}
