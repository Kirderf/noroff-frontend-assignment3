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
export interface DetailedPokemonData {
    data: {
        pokemon: [
            {
          name: string,
          id: number,
          evolution_chain_id: number,
          pokemon_v2_pokemonhabitat: {
            name: string
          },
          pokemon_v2_pokemons: [
            {
              pokemon_v2_pokemontypes: [
                {
                    pokemon_v2_type: {
                        name: string
                    }
                },
              ]
            },
          ]
        }
        ]

    },
}
export type DetailedPokemon = {
    name: string;
    id: number;
    evolution_chain_id: number;
    pokemonhabitat: string;
    pokemontypes: string[];


}
