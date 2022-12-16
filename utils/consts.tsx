export const API_POKEMON = 'https://graphql-pokeapi.graphcdn.app';
export const OFFICIAL_API_POKEMON = 'https://pokeapi.co/api/v2/';

export const POKEMON_TYPES = {
    'normal': '#A8A878',
    'fighting': '#C03028',
    'flying': '#A890F0',
    'poison': '#A040A0',
    'ground': '#E0C068',
    'rock': '#B8A038',
    'bug': '#A8B820',
    'ghost': '#705898',
    'steel': '#B8B8D0',
    'fire': '#F08030',
    'water': '#6890F0',
    'grass': '#78C850',
    'electric': '#F8D030',
    'psychic': '#F85888',
    'ice': '#98D8D8',
    'dragon': '#7038F8',
    'dark': '#705848',
    'fairy': '#EE99AC',
    'unknown': '#68A090',
    'shadow': '#68A090',
    'netral': '#FFFFFF',
}

export const COLOR_VAR = {
    'card': '#FFCB3B',
    'netral': '#FFFFFF',
    'grey': '#F7F8F8'
}

export const STATS_COLOR = [
  '#0571A6',
  '#E66D00',
  '#E6AB09',
  '#01B956',
  '#3C48CF',
  '#DE2C2C'
]

export const EVOLUTION_COLOR = [
  '#01B956',
  '#E6AB09',
  '#E66D00',
  '#DE2C2C'
]

export interface StatDetail {
  name: string
}

export interface Stats {
  stat: StatDetail,
  base_stat: number
}

export interface poketypeDetail {
  name: keyof typeof POKEMON_TYPES,
  url: string
}
export interface poketypes {
  type: poketypeDetail
}
export interface abilityDetail {
  name: string
} 
export interface Ability {
  ability: abilityDetail,
  isHidden: Boolean
}

export interface officialArtwork {
  front_default: string
}

export interface OtherSprites {
  ['official-artwork']: officialArtwork
}

export interface Sprites {
  front_default: string,
  other: OtherSprites
}

export interface Pokemon {
  name: string,
  url: string,
  id: number,
  weight: number,
  height: number,
  abilities: Array<Ability>,
  types: Array<poketypes>,
  sprites: Sprites,
  stats: Array<Stats>
}
