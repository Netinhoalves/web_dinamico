// const exemplo1 = document.getElementById("link1");
// console.log(exemplo1);
// console.log(exemplo1.nodeName);
// console.log(exemplo1.id);
// exemplo1.innerHTML = "Novo Texto!"

const listItems = document.getElementsByTagName("li");

document.write("<span>texto dentro dos elementos li</span>");

document.write("<p>há " + listItems.length + " elementos</p>")

listItems[0].innerHTML = "primeiro"

console.log(listItems);

const titulo = document.getElementsByClassName("titulo");
console.log(titulo);

titulo[0].innerHTML = "este é um título"

const descricao = document.getElementsByClassName("descricao");
console.log(descricao);

descricao[0].innerHTML = "esta é uma descrição"

descricao[0].classList.add("bggreen");
titulo[0].classList.add("bgred");

const bgred = document.querySelector(".bgred");

console.log(bgred);