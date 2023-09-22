export interface PokemonData {
    data: {
        pokemons: [
            {
                name: string,
                id: number
            }
        ]
    }
}
export type Pokemon = {
    name: string;
    id: number;
}
