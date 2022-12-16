import axios from "axios";
import { API_POKEMON } from "./consts";

export function APICall<T>(query: string, variables: Object): Promise<T> {
  return axios
    .post(
      API_POKEMON,
      {
        query,
        variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data.data)
    .catch((err) => {
      throw {
        error: err,
      };
    });
}

export function APICallP(api: string) {
  return axios
    .get(
      api,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((response) => {
      return response
    })
    .catch((err) => {
      throw {
        error: err,
      };
    });
}


export const pokemonList = `query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    status
    message
    results {
      id
      url
      name
      artwork
    }
  }
}`;

export const pokemonDetail = ``;

export const pokemonListByType = ``;
