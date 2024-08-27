import { loadShows, searchShows } from "./views/TVShowView.js";

// Salva o endereço origem do domínio do site
const location = window.location;
const { origin } = location;
//localStorage.setItem("origin", origin);

const previousURL = document.referrer;
if (previousURL.startsWith(`${origin}/details.html`)) {
  loadShows();
}

const form = document.querySelector("#form-area form");
form.onsubmit = (e) => {
  e.preventDefault();

  searchShows();
};
