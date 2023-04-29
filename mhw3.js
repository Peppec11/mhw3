
function cancella(event) {
  const contenitore = event.currentTarget;
  contenitore.parentNode.classList.add("hidden");
}



function onJson(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const giochi = json.data;


  const nome = giochi[0].name;
  console.log(nome);
  const image = giochi[0].box_art_url;




  const aside = document.querySelector('aside')
  const box = document.createElement('div');
  const col = document.createElement('a');
  box.classList.add('ads')
  const img = document.createElement('img');
  const title = document.createElement('h3');
  title.textContent = nome;
  img.src = image;
  const url = encodeURI(giochi[0].name);
  const link = "https://www.twitch.tv/directory/game/" + url;
  col.setAttribute('href', link);
  col.classList.add('ads');
  box.appendChild(img);
  box.appendChild(title);
  col.appendChild(box);
  aside.appendChild(col);





}

function rispondi(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const amiibo = json.amiibo;
  console.log(amiibo);
  let id = Math.floor(Math.random() * 10);
  console.log(id);
  for (let a = id; a < id + 3; a++) {
    const contenitore = document.querySelector(".sales");
    const vetrina = document.createElement("div");
    const img = document.createElement('img');
    const title = document.createElement('h3');
    const price = document.createElement('h3');
    img.src = amiibo[a].image;
    title.textContent = amiibo[a].character;
    const prezzo = "5.00" * a + "€";
    price.textContent = prezzo;
    price.classList.add("prezzo");
    vetrina.appendChild(img);
    vetrina.appendChild(title);
    vetrina.appendChild(price);
    contenitore.appendChild(vetrina);
    vetrina.classList.add("square");

  }

}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function ads() {
  fetch("https://www.amiiboapi.com/api/amiibo/?gameseries=pokemon").then(onResponse).then(rispondi)
}




function onTokenJson(json) {
  console.log(json)
  // Imposta il token global
  token = json.access_token;
}

function onTokenResponse(response) {
  return response.json();
}

function cerca() {

  const Titoli = document.querySelectorAll('.titolo_Paragrafo');
  for (const titolo of Titoli) {
    const uri = titolo.textContent;
    const title = encodeURI(uri);
    console.log('Eseguo ricerca: ' + title);
    fetch('https://api.twitch.tv/helix/search/categories?query=' + title,
      {

        headers:
        {
          'Authorization': 'Bearer ' + token,
          'Client-Id': 'owoi7fe94luwlcj2q1mhp7bsdzvso6'

        }
      }
    ).then(onResponse).then(onJson);
  }

}

const client_id = 'owoi7fe94luwlcj2q1mhp7bsdzvso6';
const client_secret = 'hi9vkge1y4pac7e5hwsvuilo5hpala';

let token;

fetch("https://id.twitch.tv/oauth2/token",
  {
    method: "post",
    body: "client_id=owoi7fe94luwlcj2q1mhp7bsdzvso6&client_secret=m7w78mdyd5ilgpbx1znugqyr72zj8h&grant_type=client_credentials",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('woi7fe94luwlcj2q1mhp7bsdzvso6' + ':' + 'm7w78mdyd5ilgpbx1znugqyr72zj8h')
    }
  }).then(onTokenResponse).then(onTokenJson).then(cerca);

const X = document.querySelector(".x");
X.addEventListener('click', cancella)
addEventListener('load', ads);