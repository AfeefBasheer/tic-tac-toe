let states = ["X", "O", "-"];
let mat = [];
createMatrix();

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

function input(ind) {
  let m,n;
  if(ind<10&&ind>0){
    
    m=ind/3.5;
    m=parseInt(m);
    n=(ind-1)%3;

  mat[m][n]="X";
  }
}


