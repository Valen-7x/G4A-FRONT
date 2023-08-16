import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import Search from "./Search";
import Card from "./Card";

export default function Games() {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState([]); // Agregamos el estado searchText aquí
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/games/") // Cambia la URL a tu API
      .then((response) => {
        setGames(response.data.games);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSearch = (newSearchText) => {
    setSearchText(newSearchText); // Actualizamos el estado searchText con el nuevo valor de búsqueda
    setCurrentPage(1); // Restablecemos la página actual
    // Realizar el filtrado basado en las categorías seleccionadas y el nuevo término de búsqueda
    // Aquí también puedes utilizar el estado selectedCategories como lo estás haciendo en el componente Games originalmente
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredGames =
    selectedCategories.size > 0
      ? games.filter(
          (game) =>
            selectedCategories.has("All") ||
            selectedCategories.has(game.genres[0].description)
        )
      : games;
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
  const categories = [
    "All",
    ...new Set(games.map((game) => game.genres[0].description)),
  ];

  const toggleCategory = (category) => {
    const newSelectedCategories = new Set(selectedCategories);
    if (category === "All") {
      if (newSelectedCategories.has("All")) {
        newSelectedCategories.clear();
      } else {
        newSelectedCategories.clear();
        newSelectedCategories.add("All");
      }
    } else {
      if (newSelectedCategories.has(category)) {
        newSelectedCategories.delete(category);
      } else {
        newSelectedCategories.add(category);
        newSelectedCategories.delete("All");
      }
    }
    setSelectedCategories(newSelectedCategories);
  };
  const addToCart = (game) => {
    setCart([...cart, game]);
  }; console.log(cart);
  return (
    <div className="min-h-[90vh] flex gap-8 p-8 pt-0 bg-gray-900">
      <Sidebar games={games} setFilteredCategory={toggleCategory} />
      <div className="flex-1 h-full ">
        <h1>
          <b className="flex left text-white text-3xl mb-[1rem]">All Games</b>
        </h1>

        <div className="flex mt-4">
          {categories.map((category, index) => (
            <button
              variant="outlined"
              key={index}
              onClick={() => toggleCategory(category)}
              className={`mr-2 px-4 py-2 rounded-lg ${
                selectedCategories.has(category) ||
                (selectedCategories.size === 0 && category === "All")
                  ? "bg-orange-600 text-white"
                  : "bg-gray-700 text-white"
              } hover:bg-orange-400 hover:text-white hover:cursor-pointer`}
            >
              {category}
            </button>
          ))}
        </div>

        

        <div className="flex mt-[2rem] md:grid-cols-2 xl:flex items-center justify-around flex-wrap gap-3">
          {currentGames.map((game) => (
            <Card
              key={game.id}
              id={game._id}
              img={game.header_image}
              title={game.name}
              category={game.genres[0].description}
              price={game.price}
              descr={game.short_description}
              addToCart={addToCart} // Pasar la función addToCart como prop
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
        <button
            onClick={() => paginate(currentPage + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === Math.ceil(filteredGames.length / gamesPerPage)
                ? "bg-gray-700 text-gray-700 cursor-not-allowed"
                : "bg-orange-600 text-white"
            }`}
            disabled={
              currentPage === Math.ceil(filteredGames.length / gamesPerPage)
            }
          >
            Prev
          </button>
          {Array.from(
            { length: Math.ceil(filteredGames.length / gamesPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-4 py-2 rounded-lg text-white ${
                  currentPage === index + 1
                    ? "bg-orange-500"
                    : "bg-gray-700"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === Math.ceil(filteredGames.length / gamesPerPage)
                ? "bg-gray-700 text-gray-700 cursor-not-allowed"
                : "bg-orange-600 text-white"
            }`}
            disabled={
              currentPage === Math.ceil(filteredGames.length / gamesPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}