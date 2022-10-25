const API_KEY = "92a36a10b3mshdf086d82f2a53e0p1a2ee3jsn9541378aee95";

const optionsTeams = {
  method: "GET",
  url: "https://api-football-v1.p.rapidapi.com/v3/teams",
  params: { league: "39", season: "2022" },
  headers: {
    "X-RapidAPI-Key": "92a36a10b3mshdf086d82f2a53e0p1a2ee3jsn9541378aee95",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

const optionsTeamStats = {
  method: "GET",
  url: "https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=39&season=2022&team=33",
  params: { league: "39", season: "2022", team: "33" },
  headers: {
    "X-RapidAPI-Key": "92a36a10b3mshdf086d82f2a53e0p1a2ee3jsn9541378aee95",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

const mainContainerEl = document.querySelector(".league-table__main-container");
mainContainerEl.innerHTML = "";

const getTeamInfo = (statObj) => {
  const tableEl = document.createElement("div");
  const teamNameEl = document.createElement("h3");
  const matchesEl = document.createElement("p");
  const winsEl = document.createElement("p");
  const drawsEl = document.createElement("p");
  const lossesEl = document.createElement("p");
  const goalsForEl = document.createElement("p");
  const goalsAgainstEl = document.createElement("p");
  const goalDifferenceEl = document.createElement("p");
  const pointsEl = document.createElement("p");

  const teamId = statObj.team.id;

  axios
    .get(
      `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=39&season=2022&team=${teamId}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "92a36a10b3mshdf086d82f2a53e0p1a2ee3jsn9541378aee95",
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    )
    .then((res) => {
      const statsData = res.data.response;
      tableEl.classList.add("league-table__container-stat");

      console.log(tableEl);

      teamNameEl.classList.add("league-table__team-name");
      mainContainerEl.appendChild(tableEl);

      teamNameEl.innerText = statObj.team.name;
      tableEl.appendChild(teamNameEl);

      matchesEl.innerText = `Matches Played: ${statsData.fixtures.played.total}`;
      tableEl.appendChild(matchesEl);

      winsEl.innerText = `Win: ${statsData.fixtures.wins.total}`;
      tableEl.appendChild(winsEl);

      drawsEl.innerText = `Draw: ${statsData.fixtures.draws.total}`;
      tableEl.appendChild(drawsEl);

      lossesEl.innerText = `Loss: ${statsData.fixtures.loses.total}`;
      tableEl.appendChild(lossesEl);

      goalsForEl.innerText = `GF: ${statsData.goals.for.total.total}`;
      tableEl.appendChild(goalsForEl);

      goalsAgainstEl.innerText = `GA: ${statsData.goals.against.total.total}`;
      tableEl.appendChild(goalsAgainstEl);

      goalDifferenceEl.innerText = `GD: ${
        statsData.goals.for.total.total - statsData.goals.against.total.total
      }`;
      tableEl.appendChild(goalDifferenceEl);
    });
};

axios.request(optionsTeams).then((res) => {
  const arrId = [];
  const teamId = res.data.response;
  teamId.forEach((id, i) => {
    const anchorEl = document.createElement("a");
    const logoEl = document.createElement("img");

    anchorEl.classList.add("league-table__team-stat-link");

    logoEl.setAttribute("src", teamId[i].team.logo);
    logoEl.setAttribute("alt", `${teamId[i].team.name} logo`);
    logoEl.classList.add("league-table__logo");

    anchorEl.addEventListener("click", () => {
      getTeamInfo(id);
    });

    mainContainerEl.appendChild(anchorEl);
    anchorEl.appendChild(logoEl);

    arrId.push(id.team.id);
    //   console.log(arrId);
    return arrId;
  });
});
