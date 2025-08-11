const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const creatureName = document.getElementById("creature-name");
const creatureID = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const typesDiv = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const API_BASE = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

function clearStats() {
  creatureName.textContent = "";
  creatureID.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  typesDiv.innerHTML = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
}

function updateStats(data) {
  creatureName.textContent = data.name.toUpperCase();
  creatureID.textContent = `#${data.id}`;
  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;

  typesDiv.innerHTML = "";
  data.types.forEach((typeObj) => {
    const typeSpan = document.createElement("span");
    typeSpan.textContent = typeObj.name.toUpperCase();
    typesDiv.appendChild(typeSpan);
  });

  const statsMap = {};
  data.stats.forEach((statObj) => {
    statsMap[statObj.name] = statObj.base_stat;
  });

  hp.textContent = statsMap["hp"];
  attack.textContent = statsMap["attack"];
  defense.textContent = statsMap["defense"];
  specialAttack.textContent = statsMap["special-attack"];
  specialDefense.textContent = statsMap["special-defense"];
  speed.textContent = statsMap["speed"];
}

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  try {
    const response = await fetch(`${API_BASE}${query}`);
    if (!response.ok) throw new Error("Creature not found");
    const data = await response.json();
    clearStats();
    updateStats(data);
  } catch (error) {
    clearStats();
    alert("Creature not found");
  }
});