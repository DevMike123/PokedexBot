const fetch = require('node-fetch');
var Pokedex = require('pokedex-promise-v2');
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
var P = new Pokedex();

async function getPokemon(pokemon) {
    let response = await fetch(`${BASE_URL}/${pokemon}`);
    return await response.json();
}

module.exports = { getPokemon };
