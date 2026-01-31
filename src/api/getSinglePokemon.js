import { api } from "./axios";

export const getSinglePokemon = async (index) => {
  const response = await api.get(`/${index}`);
  return response.data;
};
