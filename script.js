//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
let filteredEpisodes = allEpisodes;

function setup() {
  render(allEpisodes);
}

function render(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; // Clear existing content

  episodeList.forEach((episode) => {
    const episodeCode = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode");

    episodeElem.innerHTML = `
      <h2>${episode.name} - ${episodeCode}</h2>
      <img src="${episode.image.medium}" alt="${episode.name}" />
      <p>${episode.summary}</p>
      <p><a href="${episode.url}" target="_blank">For more information</a></p>
    `;
    /*  these line were not in acceptance criteria
        ive commented them incase you want to use again
    <p>Episode Code: ${episodeCode}</p>
    <p>Season: ${episode.season} | Episode: ${episode.number}</p> */

    rootElem.appendChild(episodeElem);
    displayCount.innerHTML = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes`;
  });
}

const input = document.getElementById("q");
input.addEventListener("keyup", () => {
  filteredEpisodes = allEpisodes.filter((episode) => episode.name.toLowerCase().includes(input.value.toLowerCase()));
  render(filteredEpisodes);
});

const displayCount = document.createElement("span");
document.querySelector("#search").append(displayCount);

window.onload = setup;
