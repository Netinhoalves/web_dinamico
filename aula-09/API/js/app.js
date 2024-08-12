const container = document.getElementById('container');

const url = 'https://jsonplaceholder.typicode.com/posts';

// GET -> fetch
async function getPots() {
  const resp = await fetch(url);
  const data = await resp.json();

  data.map((post) => {
    const divCard = document.createElement('div');
    divCard.classList.add('card');

    const title = document.createElement('h1');
    title.innerText = post.title;

    const body = document.createElement('p');
    body.innerText = post.body;

    const link = document.createElement('a');
    link.innerText = 'Ler mais...';
    link.setAttribute(
      'href',
      `comments.html?id=${post.id}`,
    );

    divCard.appendChild(title);
    divCard.appendChild(body);
    divCard.appendChild(link);

    container.appendChild(divCard);
  });
}

getPots();
