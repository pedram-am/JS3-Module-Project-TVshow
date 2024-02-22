// You can edit ALL of the code here
let allEpisodes = [];

async function fetchData(showId) {
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      allEpisodes = data;
      render(allEpisodes);
      generateEpisodeOptions(allEpisodes);
      return data;
    });
}

function fetchShows() {
  fetch(`https://api.tvmaze.com/shows`)
    .then((response) => response.json())
    .then((data) => {
      data = data.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else {
          return 0;
        }
      });
      generateShowOptions(data);
    });
}

document.querySelector("#selectShow").addEventListener("change", () => {
  fetchData(document.querySelector("#selectShow").value);
});

fetchShows();

function generateShowOptions(shows) {
  shows.forEach((show) => {
    const selectShow = document.querySelector("#selectShow");
    const option = document.createElement("option");
    option.value = show.id;
    option.innerText = show.name;
    selectShow.append(option);
  });
}

function render(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; // Clear existing content

  episodeList.forEach((episode) => {
    const episodeCode = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode");

    const imageSrc = episode.image && episode.image.medium ? episode.image.medium : "";
    const imageAlt = episode.name || "Episode Image";

    episodeElem.innerHTML = `
      <h2>${episode.name} - ${episodeCode}</h2>
      <img src="${imageSrc}" alt="${imageAlt}" />
      <p>${episode.summary}</p>
      <p class="link"><a href="${episode.url}" target="_blank">For more information</a></p>
    `;

    rootElem.appendChild(episodeElem);
  });

  // updating the count of displayed episodes
  document.getElementById("countOfAllEpisodes").innerText = allEpisodes.length;
  document.getElementById("countOfEpisodes").innerText = allEpisodes.length;
}

function generateEpisodeOptions(allEpisodes) {
  const select = document.getElementById("select");
  select.innerHTML = "";
  const optionD = document.createElement("option");
  optionD.setAttribute("value", "default");
  optionD.innerText = "All episodes";
  select.append(optionD);
  allEpisodes.forEach((episode) => {
    const episodeCode = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    const option = document.createElement("option");
    option.setAttribute("value", episode.id);
    option.innerText = `${episodeCode} - ${episode.name}`;
    select.append(option);
  });
}

// Filter function for updating the searched list of episodes
const searchInput = document.getElementById("q");
searchInput.addEventListener("keyup", () => {
  document.getElementById("select").value = "default";
  const inputValue = searchInput.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter(
    (episode) => episode.name.toLowerCase().includes(inputValue) || episode.summary.toLowerCase().includes(inputValue)
  );
  render(filteredEpisodes);
  document.getElementById("countOfEpisodes").innerText = filteredEpisodes.length;
});

const select = document.getElementById("select");
select.addEventListener("change", (event) => {
  document.getElementById("q").value = "";

  const selectedValue = event.target.value;
  if (selectedValue === "default") {
    render(allEpisodes);
    document.getElementById("countOfEpisodes").innerText = allEpisodes.length;
  } else {
    const selectedEpisode = allEpisodes.find((episode) => episode.id === parseInt(selectedValue));
    render([selectedEpisode]);
    document.getElementById("countOfEpisodes").innerText = 1;
  }
});
