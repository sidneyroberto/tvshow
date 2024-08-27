import { search } from "../controllers/TVShowController.js";

const $ = document.getElementById.bind(document);

const printCard = (show) => {
  const id = show.id;
  const name = show.name;
  const language = show.language;
  const genres = show.genres;
  const type = show.type;
  const isRunning = show.running ? "Sim" : "Não";
  const channel = show.channel;
  const poster = show.largeImageURL;

  const url = `/details.html?id=${id}&name=${name}&lang=${language}&gen=${genres}&type=${type}&run=${isRunning}&ch=${channel}&poster=${poster}`;

  const showCard = `
    <div class="show-card">
        <a href="${url}">
            <img src="${show.imageURL}" alt="${show.name}">
        </a>

        <a href="${url}">
            <p>${show.name}</p>
        </a>
    </div>
  `;

  const showsArea = $("shows-area");
  showsArea.insertAdjacentHTML("beforeend", showCard);
};

export const searchShows = async () => {
  const query = $("query").value.trim();

  if (query) {
    $("not-found-message").style.display = "none";

    const loadingAnimation = `<img src="/img/loading.gif" alt="Procurando">`;
    $("shows-area").innerHTML = loadingAnimation;

    // Não sabemos quanto tempo a instrução abaixo demorará para completar
    const shows = await search(query);

    $("shows-area").innerHTML = "";

    // Se tem resultados para exibir...
    if (shows.length > 0) {
      // Salva os shows no local storage (armazenamento local)
      const showsJSON = JSON.stringify(shows);
      localStorage.setItem("shows", showsJSON);

      shows.forEach((s) => printCard(s));
    } else {
      $("not-found-message").style.display = "block";
    }
  }
};

export const showDetails = (show) => {
  $("poster").src = show.imageURL;
  $("poster").alt = show.name;
  $("name").innerText = show.name;
  $("type").innerText = show.type;
  $("language").innerText = show.language;
  $("genres").innerText = show.genres;
  $("running").innerText = show.running;
  $("channel").innerText = show.channel;
};

export const loadShows = () => {
  const showsJSON = localStorage.getItem("shows");

  /**
   * Verifica se tem shows salvos no local storage.
   * Caso tenha, exibe eles na página.
   */
  if (showsJSON) {
    const shows = JSON.parse(showsJSON);
    shows.forEach((s) => printCard(s));
  }
};
