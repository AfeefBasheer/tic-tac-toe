import readline from "readline";

// let states = ["X", "O", "-"];

let mat = [];
let isUsersTurn = true;
let read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


createMatrix();
printMatrix(mat);

do {
  if (isUsersTurn) {
    await input();
    isUsersTurn = false;
  } else {
    computerInput();
    isUsersTurn = true;
  }
  printMatrix(mat);
} while (check() == "continue");

read.close();

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
  let m, n;

  return new Promise((resolve, reject) => {
    read.question(`Enter position`, async (ind) => {
      if (ind < 10 && ind > 0) {
        m = (ind - 1) / 3;
        m = parseInt(m);
        n = (ind - 1) % 3;
        if (mat[m][n] == "-") {
          mat[m][n] = "X";
        } else {
          console.log("Enter a valid input");
          await input();
        }
      } else {
        console.log("Enter a valid input");
        await input();
      }
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

function check() {
  let isallcellsfilled = true;
  //loop through all cells.
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      //check if the element is - set isallcellsfilled=false;
      if (mat[i][j] == "-") {
        isallcellsfilled = false;
        continue;
      }
      //getting Cells in the directions.
      let verticalCells = [];
      let horizontalCells = [];
      let AD_diagonalCells = [];
      let BC_diagonalCells = [];

      for (let k = 0; k < 3; k++) {
        verticalCells.push(mat[k][j]);
        horizontalCells.push(mat[i][k]);
        //A-D DIAGONAL CELLS
        if (i == j) {
          AD_diagonalCells.push(mat[k][k]);
        }
        //B-C DIAGONAL CELLS
        if (i + j == 2) {
          BC_diagonalCells.push(mat[k][2 - k]);
        }
      }
      // let verticalisSame=false;
      // for (let k = 0; k < 2; k++) {
      //   if(verticalCells[k]!=verticalCells[k+1]){
      //     isSame=false;
      //     break;
      //   }
      //   isSame=true;

      // }

      //check if the elements in the cells of that directions are same.

      if (verticalCells.every((el) => verticalCells[0] == el && el != "-")) {
        return verticalCells[0] == "X" ? "user" : "computer";
      }
      if (
        horizontalCells.every((el) => horizontalCells[0] == el && el != "-")
      ) {
        return horizontalCells[0] == "X" ? "user" : "computer";
      }
      if (
        AD_diagonalCells.length &&
        AD_diagonalCells.every((el) => AD_diagonalCells[0] == el && el != "-")
      ) {
        return AD_diagonalCells[0] == "X" ? "user" : "computer";
      }
      if (
        BC_diagonalCells.length &&
        BC_diagonalCells.every((el) => BC_diagonalCells[0] == el && el != "-")
      ) {
        return BC_diagonalCells[0] == "X" ? "user" : "computer";
      }
    }
  }
  return isallcellsfilled ? "draw" : "continue";
}
