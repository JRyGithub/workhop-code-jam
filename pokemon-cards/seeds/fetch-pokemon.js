import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const getRandomItems = (items, count) => {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const fetchPokemonDetails = async (pokemon) => {
  try {
    const pokemonDetails = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    );

    const detailsResponse = await axios.get(pokemon.url);

    const descriptionEntry = detailsResponse.data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );

    const move1 = await axios.get(
      `https://pokeapi.co/api/v2/move/${pokemonDetails.data.moves[0].move.name}`
    );
    const move2 = await axios.get(
      `https://pokeapi.co/api/v2/move/${pokemonDetails.data.moves[1].move.name}`
    );
    const move3 = await axios.get(
      `https://pokeapi.co/api/v2/move/${pokemonDetails.data.moves[2].move.name}`
    );

    const movesDataArray = [move1.data, move2.data, move3.data];

    const movesArray = movesDataArray.map((x) => ({
      name: x.name,
      description: x.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      ).flavor_text,
      power: x.power,
    }));

    const types = pokemonDetails.data.types.map((x) => x.type.name);

    const shiny = Math.floor(Math.random() * 11);
    return {
      name: pokemon.name,
      description: descriptionEntry
        ? descriptionEntry.flavor_text
        : "No description available",
      spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        shiny === 1 ? "shiny/" : ""
      }${detailsResponse.data.id}.png`,
      moves: movesArray,
      types: types,
    };
  } catch (error) {
    console.error(`Error fetching details for ${pokemon.name}:`, error.message);
    return null;
  }
};

const fetchRandomGen1Pokemon = async () => {
  try {
    const gen1Response = await axios.get(
      "https://pokeapi.co/api/v2/generation/1"
    );
    const randomPokemon = getRandomItems(gen1Response.data.pokemon_species, 10);

    const pokemonDetails = await Promise.all(
      randomPokemon.map(fetchPokemonDetails)
    );

    // Filter out any null results from failed fetches
    const validPokemonDetails = pokemonDetails.filter((p) => p !== null);

    const fileContent = `import { BasicPokemon } from "../types/basic-pokemon";

export const pokemonData: BasicPokemon[] = ${JSON.stringify(
      validPokemonDetails,
      null,
      2
    )};
`;

    // Write the file to the project directory
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    fs.writeFileSync(
      path.resolve(__dirname + "/../src/core/seeds", "pokemonData.ts"),
      fileContent
    );

    console.log("Pokemon data has been written to pokemonData.ts");
  } catch (error) {
    console.error("Error fetching Generation 1 Pokémon:", error.message);
  }
};

fetchRandomGen1Pokemon();
