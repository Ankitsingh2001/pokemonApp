import {useState} from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  
  const [pokemonName,setPokemonName] =useState("");
  const [pokemonChosen , setPokemonChosen] = useState(false);
  const [pokemon,setPokemon] = useState({
          name:"" ,
           species: "",
           img:" ",
           hp:"",
           attack :"",
           defense:"",
           type:""
        });
  const searchPokemon =()=>{
    (!pokemonName)?alert("Please enter valid pokemon"):(
      Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) =>{
         setPokemon({
          name:pokemonName.toUpperCase() ,
           species: response.data.species.name,
           img:response.data.sprites.front_default,
           hp:response.data.stats[0].base_stat,
           attack :response.data.stats[1].base_stat,
           defense:response.data.stats[2].base_stat,
           type:response.data.types[0].type.name
           });
           setPokemonChosen(true);
       }
      )
    )
   }
  
  return (
    <div className='App'>
      <div className='titleSection'> 
        <h1>POKEMON STATS</h1>
        <input 
          type="text"
          onChange={(event)=>{
            setPokemonName(event.target.value.toLowerCase());
          }}

        />
        <button onClick={searchPokemon}>Search pokemon</button>
      </div>
      <div className='displaySection'>
         {!pokemonChosen ? (
          <p>Please chose pokemon</p>
         ):(
          <>
            <h2 >{pokemon.name}</h2>
            <img src={pokemon.img} alt={pokemon.name}/>
             <h2>Species: {pokemon.species}</h2> 
            <h5>Type: {pokemon.type}</h5>
            <h5>hp: {pokemon.hp}</h5>
            <h5>Attack: {pokemon.attack}</h5>
            <h5>Defence: {pokemon.defense}</h5>
            
          </>
         )

         }
      </div>
    </div>
  );
}
export default App;
