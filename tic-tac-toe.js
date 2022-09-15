let states = ["X", "O", "-"];
let mat = [];
function createMatrix() {
  for (let i = 0; i < 3; i++) {
    mat[i] = [];
    for (let j = 0; j < 3; j++) {
     mat[i]="-";
    }
  }
}
console.log(createMatrix()); 
