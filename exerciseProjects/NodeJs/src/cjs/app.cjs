const {multiply, substract} = require('./math.cjs');

console.log("CJS multiply:", multiply(2, 3));
console.log("CJS substract:", substract(5, 2));
console.log("CJS __dirname:", __dirname);
console.log("CJS __filename:", __filename);