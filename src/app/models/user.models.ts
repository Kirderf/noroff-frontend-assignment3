import { Pokemon } from "./pokemon.models";

export interface User {
    id?:number;
    username?:string;
    pokemons?: Array<Pokemon>;
}