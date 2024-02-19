// You can edit ALL of the code here
let allEpisodes = [];

async function fetchData() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    allEpisodes = data;
    render(allEpisodes);
    generateOpt(allEpisodes);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    // Display an error message to the user
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Error loading data. Please try again later.";
    document.body.appendChild(errorMessage);
  }
}

fetchData();

function render(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; // Clear existing content

  episodeList.forEach((episode) => {
    const episodeCode = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode");

    episodeElem.innerHTML = `
      <h2>${episode.name} - ${episodeCode}</h2>
      <img src="${episode.image.medium}" alt="${episode.name}" />
      <p>${episode.summary}</p>
      <p class="link"><a href="${episode.url}" target="_blank">For more information</a></p>
    `;

    rootElem.appendChild(episodeElem);
  });

  // updating the count of displayed episodes
  document.getElementById("countOfAllEpisodes").innerText = allEpisodes.length;
  document.getElementById("countOfEpisodes").innerText = allEpisodes.length;
}

function generateOpt(allEpisodes) {
  const select = document.getElementById("select");
  select.innerHTML = "";

  const optionD = document.createElement("option");
  optionD.setAttribute("value", "default");
  optionD.innerText = "All episodes";
  select.append(optionD);
  allEpisodes.forEach((episode) => {
    const episodeCode = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;

    const option = document.createElement("option");
    option.setAttribute("value", episode.id);
    option.innerText = `${episodeCode} - ${episode.name}`;
    select.append(option);
  });
}

// Filter function for updating the searched list of episodes
const searchInput = document.getElementById("q");
searchInput.addEventListener("keyup", () => {
  const inputValue = searchInput.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(inputValue) ||
      episode.summary.toLowerCase().includes(inputValue)
  );
  render(filteredEpisodes);
});

const select = document.getElementById("select");
select.addEventListener("change", () => {
  const selectedValue = select.value;
  if (selectedValue === "default") {
    render(allEpisodes);
  } else {
    const selectedEpisode = allEpisodes.find(
      (episode) => episode.id === parseInt(selectedValue)
    );
    render([selectedEpisode]);
  }
});
