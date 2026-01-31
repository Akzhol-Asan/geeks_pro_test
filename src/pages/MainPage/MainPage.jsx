import { useQuery } from "@tanstack/react-query";
import { getAllPokemons } from "../../api/getAllPokemons";
import { Card, Modal } from "antd";
import styles from "./MainPage.module.scss";
import { useState } from "react";
import { getSinglePokemon } from "../../api/getSinglePokemon";

export default function MainPage() {
  //Open & Close modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedPokemon, setClickedPokemon] = useState(null);

  //Get All pokemons
  const { data: pokemons = [], isLoading: isPokemonsLoading } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getAllPokemons,
    select: (data) => data.results,
  });

  //clicked pokemon index
  const [pokemonIndex, setPokemonIndex] = useState(null);

  //Get single pokemon for modal
  const { data: singlePokemon, isLoading: isSinglePokemonLoading } = useQuery({
    queryKey: ["singlePokemon", pokemonIndex],
    queryFn: () => getSinglePokemon(pokemonIndex + 1),
    enabled: pokemonIndex !== null,
  });

  if (isPokemonsLoading) return <p>Loading...</p>;

  return (
    <div className={styles.main_page}>
      <Modal
        title="Pokemon"
        footer={null}
        isLoading={isSinglePokemonLoading}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        {isSinglePokemonLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <img
              src={singlePokemon?.sprites?.front_default}
              alt={singlePokemon?.name}
            />
            <h3>{clickedPokemon?.name}</h3>

            <p>Height: {singlePokemon?.height}</p>
            <p>Weight: {singlePokemon?.weight}</p>
          </div>
        )}
      </Modal>
      {pokemons.map((pokemon, index) => {
        return (
          <Card
            onClick={() => {
              (setPokemonIndex(index),
                setIsModalOpen(true),
                setClickedPokemon(pokemon));
            }}
            hoverable
            key={pokemon.name}
          >
            <p>{pokemon.name}</p>
          </Card>
        );
      })}
    </div>
  );
}
