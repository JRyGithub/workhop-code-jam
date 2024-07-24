export interface BasicPokemon {
  name: string;
  description: string;
  spriteUrl: string;
  moves: Array<{ name: string; description: string; power: number | null }>;
  types: Array<string>;
}
