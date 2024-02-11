//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
let filteredEpisodes = [...allEpisodes];

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
      <p class="link"><a href="${episode.url}" target="_blank">For more information</a></p>
    `;
    /*  these line were not in acceptance criteria
        ive commented them incase you want to use again
    <p>Episode Code: ${episodeCode}</p>
    <p>Season: ${episode.season} | Episode: ${episode.number}</p> */

    rootElem.appendChild(episodeElem);
  });

  // updating the count of displayed episodes
  document.getElementById("countOfAllEpisodes").innerText = allEpisodes.length;
  document.getElementById("countOfEpisodes").innerText = filteredEpisodes.length;
}

function generateOpt() {
  this.select.innerHTML = "";

  const optionD = document.createElement("option");
  optionD.setAttribute("value", "default");
  optionD.innerText = "All episodes";
  this.select.append(optionD);
  filteredEpisodes.forEach((episode) => {
    const episodeCode = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;

    const option = document.createElement("option");
    option.setAttribute("value", episode.id);
    option.innerText = `${episodeCode} - ${episode.name}`;
    this.select.append(option);
  });
}

//filter function for updating searched list of episodes
const searchInput = document.getElementById("q");
searchInput.addEventListener("keyup", () => {
  this.select.value = "default";
  let inp = searchInput.value.toLowerCase();
  filteredEpisodes = allEpisodes.filter(
    (episode) => episode.name.toLowerCase().includes(inp) || episode.summary.toLowerCase().includes(inp)
  );
  render(filteredEpisodes);
  if (searchInput.value) {
    document.getElementById("sort").append(backBtn);
  } else {
    backBtn.remove();
  }
});

const select = document.getElementById("select");
const backBtn = document.createElement("button");
backBtn.id = "backBtn";
backBtn.innerText = " <- Go back to all episodes";

select.addEventListener("change", renderSelected);

backBtn.addEventListener("click", () => {
  this.select.value = "default";
  filteredEpisodes = allEpisodes;
  renderSelected();
});

function renderSelected() {
  document.getElementById("q").value = "";
  if (select.value === "default") {
    render(allEpisodes);
    backBtn.remove();
  } else {
    filteredEpisodes = allEpisodes.filter((episode) => episode.id == select.value);
    render(filteredEpisodes);

    document.getElementById("sort").append(backBtn);
  }
}

window.onload = render(allEpisodes);
window.onload = generateOpt;
