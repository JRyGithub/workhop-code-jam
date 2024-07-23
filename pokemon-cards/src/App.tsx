import PokeBlurb from "./features/blurb/poke-blurb";
import Header from "./features/header/header";
import PokemonCards from "./features/pokemon-cards/pokemon-cards";

function App() {
  return (
    <div className="flex flex-col h-screen md:flex md:flex-row">
      <Header />
      <div className="flex flex-col content-center align-middle gap-2 bg-cyan-200 w-full h-full">
        <PokeBlurb />
        <PokemonCards />
      </div>
    </div>
  );
}

export default App;
