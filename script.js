//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; // Clear existing content

  episodeList.forEach((episode) => {
    const episodeCode = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode");

    episodeElem.innerHTML = `
      <h2>${episode.name}</h2>
      <p>Episode Code: ${episodeCode}</p>
      <p>Season: ${episode.season} | Episode: ${episode.number}</p>
      <img src="${episode.image.medium}" alt="${episode.name}" />
      <p>${episode.summary}</p>
      <p>Original data from <a href="${episode.url}" target="_blank">TVMaze.com</a></p>
    `;

    rootElem.appendChild(episodeElem);
  });
}

window.onload = setup;
