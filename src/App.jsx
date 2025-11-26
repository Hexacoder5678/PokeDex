import React from "react";
import "./App.css";
import Pokedex from "./components/PokeDex/Pokedex";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
