import TVShow from "../models/TVShow.js";

const API_URL = "https://api.tvmaze.com/search/shows?";

export const search = async (term) => {
  const response = await fetch(API_URL + new URLSearchParams({ q: term }));
  const results = await response.json();
  const tvShows = [];

  results.forEach((r) => {
    // Associação por desestruturação
    const { show } = r;
    const {
      id,
      name,
      type,
      language,
      genres,
      status,
      image,
      network,
      webChannel,
    } = show;

    const tvShow = new TVShow();
    tvShow.id = id;
    tvShow.name = name;
    tvShow.type = type;
    tvShow.language = language;
    tvShow.genres = genres.join(", ");
    tvShow.running = status === "Running" ? true : false;
    tvShow.imageURL = image ? image.medium : "/img/noimage.png";
    tvShow.largeImageURL = image ? image.original : "/img/noimage.png";
    tvShow.channel = network ? network.name : webChannel.name;

    tvShows.push(tvShow);
  });

  return tvShows;
};
