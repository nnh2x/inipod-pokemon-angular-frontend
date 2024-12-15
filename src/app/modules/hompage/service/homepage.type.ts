export interface PokemonTop {
    type1: string;
    id: number;
    name: string;
    total: number;
    image: string;
    ytbUrl: string;
    rank: string;
}

export interface Pokemon {
    id: number;
    createdAt: string;
    createdBy: any;
    updatedBy: any;
    name: string;
    type1: string;
    type2: string;
    total: number;
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
    generation: number;
    legendary: string;
    image: string;
    ytbUrl: string;
    isFavorite?: boolean;
}
