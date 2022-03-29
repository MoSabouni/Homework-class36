'use strict';

/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
    throw new Error(`Request failed.`);
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchAndPopulatePokemons(data) {
  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = 'Get Pokemon!';
  button.type = 'button';
  document.body.appendChild(button);

  const selectElement = document.createElement('select');
  selectElement.classList.add('selectElement');
  document.body.appendChild(selectElement);
  button.addEventListener('click', () => {
    const pokemonResults = data.results;
    pokemonResults.forEach((pokemon) => {
      const option = document.createElement('option');
      option.value = pokemon.name;
      option.text = pokemon.name;
      selectElement.appendChild(option);
    });
  });
  selectElement.addEventListener('change', fetchImage);
}

async function fetchImage(event) {
  const previousImg = document.querySelector('img');
  if (previousImg) {
    previousImg.remove();
  }
  const selectedPokemon = `${event.currentTarget.value}`;
  const url = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`;
  try {
    const data = await fetchData(url);
    const imgElement = document.createElement('img');
    imgElement.classList.add('imgElement');
    imgElement.alt = 'Picture of Pokemon!';
    imgElement.src = data.sprites.front_default;
    document.body.appendChild(imgElement);
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  try {
    const data = await fetchData(
      `https://pokeapi.co/api/v2/pokemon/?limit=30&offset=30`
    );
    fetchAndPopulatePokemons(data);
  } catch (error) {
    console.log(error.message);
  }
}

document.addEventListener('load', main());
