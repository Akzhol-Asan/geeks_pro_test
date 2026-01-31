import { api } from "./axios";

export const getAllPokemons = async () => {
  const response = await api.get("");
  return response.data;
};
