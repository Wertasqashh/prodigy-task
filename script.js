let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let modeSelect = document.getElementById("mode-select");

// Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// Player 'X' plays first
let playerTurn = "X";
let count = 0;
let gameMode = "player"; // Default mode: Player vs. Player

// Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  // Enable popup
  popupRef.classList.remove("hide");
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  // Disable popup
  popupRef.classList.add("hide");
};

// This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

// Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  playerTurn = "X"; // Player 'X' plays first
});

// Restart
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  playerTurn = "X"; // Player 'X' plays first
});

// Check for a win
const checkWin = (letter) => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    if (element1 === letter && element2 === letter && element3 === letter) {
      winFunction(letter);
      return true;
    }
  }
  return false;
};

// Player vs. Player mode
const playerVsPlayer = (element) => {
  element.innerText = playerTurn;
  element.disabled = true;
  count += 1;

  if (checkWin(playerTurn)) return;
  if (count === 9) {
    drawFunction();
    return;
  }

  playerTurn = playerTurn === "X" ? "O" : "X"; // Switch turns between 'X' and 'O'
};

// Player vs. Computer mode
const playerVsComputer = (element) => {
  if (playerTurn === "X" && !element.disabled) {
    element.innerText = playerTurn;
    element.disabled = true;
    count += 1;

    if (checkWin(playerTurn)) return;
    if (count === 9) {
      drawFunction();
      return;
    }

    playerTurn = "O";
    setTimeout(computerTurn, 500); // Delay computer's turn for 500 milliseconds
  }
};

// Computer's turn (Random move)
const computerTurn = () => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * 9);
  } while (btnRef[randomIndex].disabled);

  btnRef[randomIndex].innerText = "O";
  btnRef[randomIndex].disabled = true;
  count += 1;

  if (checkWin("O")) return;
  if (count === 9) {
    drawFunction();
    return;
  }

  playerTurn = "X";
};

// Mode selection change event
modeSelect.addEventListener("change", () => {
  gameMode = modeSelect.value;
  // Reset the game when changing modes
  count = 0;
  enableButtons();
  playerTurn = "X"; // Player 'X' plays first
});

// Add event listeners to buttons
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (gameMode === "player") {
      playerVsPlayer(element);
    } else {
      playerVsComputer(element);
    }
  });
});

// Enable Buttons and disable popup on page load
window.onload = enableButtons;
//select option
$(".custom-select").each(function () {
  var classes = $(this).attr("class"),
    id = $(this).attr("id"),
    name = $(this).attr("name");
  var template = '<div class="' + classes + '">';
  template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
  template += '<div class="custom-options">';
  $(this).find("option").each(function () {
    template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
  });
  template += '</div></div>';

  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".custom-option:first-of-type").hover(function () {
  $(this).parents(".custom-options").addClass("option-hover");
}, function () {
  $(this).parents(".custom-options").removeClass("option-hover");
});
$(".custom-select-trigger").on("click", function () {
  $('html').one('click', function () {
    $(".custom-select").removeClass("opened");
  });
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});
$(".custom-option").on("click", function () {
  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  $(this).addClass("selection");
  $(this).parents(".custom-select").removeClass("opened");
  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
});