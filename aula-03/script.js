function inArray(array, valor) {
  for (item in array) {
    array[item] += valor;
  }
  return array;
}
// console.log(inArray([1, 3, 4], 4));

const r = inArray([1, 3, 4], 4);
console.log(r);

const f1 = new Function('b', 'h', 'return (b*h/2)');
console.log(f1(3, 4));

const areaTri = function (h, b) {
  return (b * h) / 2;
};
console.log(areaTri(4, 5));

// arrow function
const x = (a, b) => {return a + b;};
console.log(x(2, 2));

// exemplo
function soma(a, b) {
  return a + B;
}
