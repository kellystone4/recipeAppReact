import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe"

const App = () => {
  const APP_ID = "bb9dabf6";
  const APP_KEY = "8351f29f178a2def7b1ee31cf841877a";

  const [recipies, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState("chicken")



  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search)
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);

  }


  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Submit
        </button>
      </form>
      <div className = "recipes">
      {recipies.map(recipe =>(
        <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories}
        image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}
        />
      ))};
      </div>
    </div>
  );
};

export default App;
