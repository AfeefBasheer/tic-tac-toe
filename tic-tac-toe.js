import readline from "readline";

let states = ["X", "O", "-"];
let mat = [];
let isUsersTurn = true;

createMatrix();
printMatrix(mat);

do {
  if (isUsersTurn) {
    await input();
    isUsersTurn=false;
  } else {
    computerInput();
    isUsersTurn=true;
  }
  printMatrix(mat);
} while (check()=="continue");

if (check() == "draw") {
  console.log("MATCH DRAW");
} else if (check() == "user") {
  console.log("YOU WON");
} else {
  console.log("COMPUTER WON");
}

/* *********************************************************** */
function createMatrix() {
  for (let i = 0; i < 3; i++) {
    mat[i] = [];
    for (let j = 0; j < 3; j++) {
      mat[i][j] = "-";
    }
  }
}

function printMatrix(mat) {
  let string = " ┌─────┬─────┬─────┐" + "\n";

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      string = string + " |  " + mat[i][j] + " ";
    }
    string = string + " |" + "\n";
    if (i != 2) {
      string = string + " ├─────┼─────┼─────┤";
    }

    string = string + "\n";
  }
  string = string.trimEnd();
  string = string + "\n" + " └─────┴─────┴─────┘";
  console.log(string);
}

function input() {
  let m, n, ind;

  const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    read.question(`Enter position`, (ind) => {
      if (ind < 10 && ind > 0) {
        m = (ind - 1) / 3;
        m = parseInt(m);
        n = (ind - 1) % 3;
        if (mat[m][n] == "-") {
          mat[m][n] = "X";
        } else {
          console.log("Enter a valid input");
          input();
        }
      }
      read.close();
      resolve();
    });
  });
}

function getUnfilledCells() {
  let unfilledCells = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (mat[i][j] == "-") {
        let ind = i * 3 + j + 1;
        unfilledCells.push(ind);
      }
    }
  }

  return unfilledCells;
}

function check() {}

function computerInput() {
  let unFilledCells = getUnfilledCells();
  let randomCell = chooseRandomCell(unFilledCells);
  let i = (randomCell - 1) / 3;
  i = parseInt(i);
  let j = (randomCell - 1) % 3;
  mat[i][j] = "O";
}

function chooseRandomCell(indices) {
  let random = Math.floor(Math.random() * indices.length);
  return indices[random];
}
