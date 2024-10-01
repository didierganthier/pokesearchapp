const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const pokemonNameElement = document.querySelector('#pokemon-name'); // Renamed this
const pokemonId = document.querySelector('#pokemon-id');
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const types = document.querySelector('#types');
const hp = document.querySelector('#hp');
const attack = document.querySelector('#attack');
const defense = document.querySelector('#defense');
const specialAttack = document.querySelector('#special-attack');
const specialDefense = document.querySelector('#special-defense');
const speed = document.querySelector('#speed');
const pokemonImage = document.querySelector('#sprite');
const resultDiv = document.querySelector('#result');

const fetchPokemon = (pokemonName) => { // Kept this as pokemonName
  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonName}`).then(response => {
    if (!response.ok) {
      alert("Pokémon not found")
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    resultDiv.style.display = 'block';
    height.innerText = `Height: ${data.height}`;
    weight.innerText = `Weight: ${data.weight}`;
    pokemonNameElement.innerText = `Name: ${data.name.toUpperCase()}`; // Use the renamed variable here
    pokemonId.innerText = `ID: ${data.id}`;
    hp.innerText = `HP: ${data.stats[0].base_stat}`;
    attack.innerText = `Attack: ${data.stats[1].base_stat}`;
    defense.innerText = `Defense: ${data.stats[2].base_stat}`;
    specialAttack.innerText = `Special Attack: ${data.stats[3].base_stat}`;
    specialDefense.innerText = `Special Defense: ${data.stats[4].base_stat}`;
    speed.innerText = `Speed: ${data.stats[5].base_stat}`;
    types.innerHTML = '';
    data.types.forEach(type => {
      types.innerHTML += `<li>${type.type.name}</li>`;
    });
    pokemonImage.src = data.sprites.front_default;
    pokemonImage.alt = data.name;
    pokemonImage.style.display = 'block';
  }).catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  })
}

searchButton.addEventListener('click', () => {
  fetchPokemon(searchInput.value.toLowerCase());
});