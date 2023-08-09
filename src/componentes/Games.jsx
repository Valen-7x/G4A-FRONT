import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Search from "./Search";
import Card from "./Card";
import axios from "axios"; // Importa Axios

export default function Games() {
  const [games, setGames] = useState([]); // Estado para los juegos
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [gamesPerPage] = useState(12); // Número de juegos por página

  useEffect(() => {
    // Hacer una llamada a la API para obtener los datos de los juegos
    axios
      .get("http://localhost:8080/api/games") // Cambia la URL a tu API
      .then((response) => {
        setGames(response.data.games); // Actualiza el estado con los juegos recibidos
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSearch = (filteredGames) => {
    setGames(filteredGames);
    setCurrentPage(1); // Reinicia la página actual al realizar una búsqueda
  };

  // Calcula los índices de los juegos para la página actual
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-[90vh] flex gap-8 p-8 pt-0 bg-gray-900">
      <Sidebar />
      <div className="flex-1 h-full">
        <h1>
          <b className="flex left text-white text-3xl mb-[1rem]">All Games</b>
        </h1>
        <Search games={games} onSearch={handleSearch} />
        <div className="flex mt-[2rem] md:grid-cols-2 xl:flex items-center justify-around lg:justify-between flex-wrap gap-5">
          {currentGames.map((game) => (
            <Card
              key={game._id}
              img={game.header_image}
              title={game.name}
              category={game.category}
              price={game.price}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
        <button
            onClick={() => paginate(currentPage - 1)}
            className={`px-4 py-2 rounded-lg mr-2 ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                : 'bg-blue-500 text-white'
            }`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {/* Botones de paginación */}
          {Array.from({ length: Math.ceil(games.length / gamesPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mr-2 px-4 py-2 rounded-lg ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          {/* Botón Next */}
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === Math.ceil(games.length / gamesPerPage)
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                : 'bg-blue-500 text-white'
            }`}
            disabled={currentPage === Math.ceil(games.length / gamesPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
