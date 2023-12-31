import Sidebar from "../componentes/Sidebar";
import React, { useState, useEffect } from "react";
import Card from "../componentes/CardIndex";
import { Link } from "react-router-dom";
import axios from "axios"; // Importa Axios

export default function Index() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    // Hacer una llamada a la API para obtener los datos de los juegos
    axios
      .get("http://localhost:8080/api/games") // Cambia la URL a tu API
      .then((response) => {
        setGames(response.data.games);
        // Establecer el primer juego por defecto
        if (response.data.games.length > 0) {
          setSelectedGame(response.data.games[0]);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  return (
    <main className="min-h-[90vh] flex gap-8 p-8 pt-0">
      <Sidebar />
      <div className="flex-1 h-full">
        <div className="mb-4">
          {/* Mostrar el video del juego seleccionado */}
          {selectedGame && (
            <div className="relative mb-[3rem] flex flex-col justify-center">
              <video
              src={selectedGame.movies[0].webm["480"]}
              className="w-full h-[350px] object-cover object-right rounded-2xl"
              controls
              autoPlay
              />
              <div className="absolute top-0 w-full h-[350px] bg-gradient-to-b from-transparent via-transparent to-gray-900 pointer-events-none items-center " />
              <div className="absolute sm:flex justify-evenly sm:w-[70%] sm:top-[81%] sm:left-[37%] transform sm:-translate-x-1/2 sm:-translate-y-1/2 items-center">
                <b className="shadow-2xl">
                  <h1 className="text-white text-4xl">{selectedGame.name}</h1>
                </b>
                <b>
                  <h2 className="text-white text-2xl">
                    {selectedGame.genres.map((genre) => genre.description).join(", ")}
                  </h2>
                </b>
              </div>
            </div>
          )}
        </div>

        <h1>
          <b className="flex left text-white text-3xl mb-[1rem]">
            Most Popular Games
          </b>
        </h1>
        <div className="flex md:grid-cols-2 xl:flex items-center justify-around lg:justify-between flex-wrap gap-5">
        {games.slice(0, 5).map((game) => (
    <Card
      key={game._id}
      img={game.header_image}
      title={game.name}
      category={game.genres.map((genre) => genre.description).join(", ")}
      price={game.price}
      onClick={() => handleGameClick(game)}
    />
  ))}
          <Link to="/games" className="relative">
            <img
              src="https://s3-alpha-sig.figma.com/img/5d71/7c4a/331cc65c47447ded390aec1122aaf642?Expires=1693180800&Signature=htvWl1H92myfuD0bDJrxe98-aOMoEIqMPoAYVFoyU5E94ZWdqbcAUBxHo-Vj2Rs6qW-YYQ9hAo6nuzXrbKn8w-oHeDQMYAHLozgjl-qXyQSstVCQLETOzsqwxg7eEjk2fQmOtv3xEgTsJsnHIuMm8SJmG63JRwvIoGHa2GUYwI98k6LF5DGd7TDMaBULwFEWdrRZTCRFG0SVa~-~0VCGmF~gzqB4NbGYuOiLgCsqPtAiZqfDljFsvw9GTQOBqDKhjnxmld5K5-er1kgEIvAlzEWZzyu-My9wRod-djBRGpsoDRMt8fy9XIJaMkYoYl7uBAVhRrqGDE-1ZYM2cImvVg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              className="my-card-container
              bg-[#362C29]/50 flex flex-col rounded-sm 
              w-[28rem]
              lg:w-[15rem]
              h-[9rem]
              transition-transform duration-100 transform 
              hover:shadow-lg"
            />
            <b>
              <h3 className="absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl object-cover rounded-2xl">
                See All
                <hr className="text-black" />
              </h3>
            </b>
          </Link>
        </div>
      </div>
    </main>
  );
}
