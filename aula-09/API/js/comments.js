const commentsContainer = document.getElementById('comments-container');

// Função para pegar parâmetros da URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const postId = getQueryParam('id');

if (postId) {
  const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

  async function getComments() {
    const resp = await fetch(commentsUrl);
    const data = await resp.json();

    data.map((comment) => {
      const divCard = document.createElement('div');
      divCard.classList.add('card');

      const name = document.createElement('h2');
      name.innerText = comment.name;

      const email = document.createElement('p');
      email.innerText = `Email: ${comment.email}`;

      const body = document.createElement('p');
      body.innerText = comment.body;

      divCard.appendChild(name);
      divCard.appendChild(email);
      divCard.appendChild(body);

      commentsContainer.appendChild(divCard);
    });
  }

  getComments();
} else {
  commentsContainer.innerHTML = '<p>Comentários não encontrados.</p>';
}
