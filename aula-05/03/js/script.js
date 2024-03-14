function botao() {
  let btn = document.getElementById("btn");
  btn.innerText = "Show Less"
}

let open = document.querySelector('article');

function showMore() {
  open.classLista.toggle('show')
}