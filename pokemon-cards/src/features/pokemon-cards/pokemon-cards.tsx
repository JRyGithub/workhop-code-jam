import { pokemonData } from "@/core/seeds/pokemonData";

const PokemonCards = () => {
  console.log({ YourData: pokemonData });
  return (
    <div className="w-fit self-center flex justify-center items-center">
      <span className="h-fit">TODO</span>
      <img src={pokemonData[0].spriteUrl} alt="pokemon" />
    </div>
  );
};

export default PokemonCards;
