import readline from "readline";

let states = ["X", "O", "-"];
let mat = [];
createMatrix();
printMatrix(mat);
 input();





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

  read.question(`Enter position`, handleInput);

  function handleInput(ind) {
    console.log(ind);
    if (ind < 10 && ind > 0) {
      m = ind / 3.5;
      m = parseInt(m);
      n = (ind - 1) % 3;
      if (mat[m][n] == "-") {
        mat[m][n] = "X";
      }
      else{
        console.log("Enter a valid input");
        input();
      }
    }
    printMatrix(mat);
    read.close();
  }
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
