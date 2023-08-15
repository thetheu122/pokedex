import React, { useState } from 'react';
import './App.scss';
import axios from 'axios';

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0)
  const [mensagem, setMensagem] = useState('Encontrar Pokémons')
  const [verify, setVerify] = useState(false)


  async function buscarPokemons() {
    
    try {
      let url = 'https://pokeapi.co/api/v2/pokemon?limit=8&offset=' + offset;
      let response = await axios.get(url);
      let listaPokemons = [];

      for (let item of response.data.results) {
        let pokemonResp = await axios.get(item.url);
        let imagem = pokemonResp.data.sprites.other['official-artwork'].front_default;

          let tipos = pokemonResp.data.types.map((t) => t.type.name).join(', ');

          listaPokemons.push({
          nome: maiusculo(item.name),
          imagem: imagem,
          tipos: tipos,
        });
      }

      setPokemons(listaPokemons);
    } catch (error) {
      console.error('Erro ao buscar pokémons:', error);
    }
    setOffset(offset + 8)

    if(verify == false){
      setMensagem('Encontrar mais Pokémons')
    }
  }

  function maiusculo(p) {
    return p.charAt(0).toUpperCase() + p.slice(1);
  }

 

  return (
    <div className="Pokedex">
      <div className='topo-pokemon'>
        <img src='./assets/image/logoP.png' alt="Pokemon Logo" />
        <button onClick={buscarPokemons}>{mensagem}</button>
      </div>

      <div className='s2-cards'>
        {pokemons.map((item, index) => (
          <div className='cards' key={index}>
            <div className='card-foto'>
              <img className='foto-pok' src={item.imagem} alt={item.nome} />
            </div>
            <h3>{item.nome}</h3>
            <p>{item.tipos}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
