let a = 6;

if (a < 6) {
  console.log('A é menor que 6');
} else if (a > 6) {
  console.log('A é maior que 6');
} else {
  console.log('A é igual a 6');
}

// operador ternário
a > 5 ? console.log('a é maior que 5') : console.log('n é maior que 5');

// switch ... case
let marvin = 'robot';
switch (marvin) {
  case 'human':
    console.log('sou humano!');
    break;
  case 'alien':
    console.log('vou dominar o mundo');
    break;
  case 'robot':
    console.log('sou um robo');
    break;
  default:
    console.log('o que é você?');
    break;
}

// estruturas de repetição
let cont = [5, 2];
while (cont[0] + cont[1] < 15) {
  cont[0] += 1;
  cont[1] += 2;
  document.write('<br> cont0 = ' + cont[0] + ' cont1= ' + cont[1]);
}

do {
  cont[0] += 1;
  cont[1] += 2;
  document.write('<br> cont0 = ' + cont[0] + ' cont1= ' + cont[1]);
} while (cont[0] + cont[1] < 15);

let ifms = [5, 2, 3];
for (let i = 0; i < 3; i++) {
  cont[i]++;
}
