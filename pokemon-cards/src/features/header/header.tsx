import PokemonLogo from "@/assets/pokemon-logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { ChevronDown } from "lucide-react";
import { navDetails } from "./header.props";

const Header = () => {
  const { toast } = useToast();

  const handleClick = (text: string) => {
    toast({
      title: `I told you not to click ${text}`,
      description: "🐤 Clicking this has really hurt my feelings 🐤",
      variant: "brutalism",
    });
  };
  return (
    <div className="h-20 w-screen md:h-screen md:w-40 bg-yellow-200 p-4 border-black border-b-2 md:border-r-2 md:border-black flex justify-between md:flex-col">
      <img
        src={PokemonLogo}
        className="object-cover h-auto w-auto max-h-full max-w-full"
        alt="Pokemon"
      />
      <div className="hidden md:flex flex-col gap-2 md:mt-10">
        <Button variant="brutalismBlue" onClick={() => handleClick("Pokedex")}>
          Pokedex
        </Button>
        <Button
          variant="brutalismSimple"
          onClick={() => handleClick("My Pokemon")}
        >
          My Pokemon
        </Button>
        <Button
          variant="brutalismYellow"
          onClick={() => handleClick("Poke Friends")}
        >
          Poke Friends
        </Button>
        <Button variant="brutalismGreen" onClick={() => handleClick("About")}>
          About
        </Button>
      </div>
      <div className="hidden md:block mt-auto md:w-full text-center text-xs text-gray-500 font-bold italic">
        🔥 Powered By Josh
      </div>
      <div className="flex flex-col justify-center content-center md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="h-fit">
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-5">
            {navDetails.map((nav) => (
              <DropdownMenuItem key={nav} onClick={() => handleClick(nav)}>
                {nav}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
