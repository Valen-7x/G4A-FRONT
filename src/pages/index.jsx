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
          {games.map((game) => (
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
              src="https://s3-alpha-sig.figma.com/img/5d71/7c4a/331cc65c47447ded390aec1122aaf642?Expires=1691971200&Signature=YEMfTCCHpvnzyeQpkeG4wNzhYHmS8t6Os4izMifoaATtUB8-eHgMPtmI8lGc2s8ohq2tTpIV8h-HokE7KOPO7PB1eB6wDmo8FDqYAhEll8jr0VmKcV9aJqpRXGFf9Y7c7CMPKaJ1K481H7OvDUrW4TmGji5LbgWATWtmtkBCcgk9mJGEi~JpAik8ZjWKRtNDqiXaH3j60EyztBqss2jNRb-ZmpJFC9Cc3roPiCsF1Vlx~ABtm8IXSDzO-4bnY~xqYIut9DvKRItCb4V9mybDzakGSsXXOqpN5co9EKqyqu1aeQ5L-xhp3aX26KZ5Xf6ZjFkqJqk6FzURmIolETHKaw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              className="relative w-[150px] xl:w-[12rem] h-72 lg:h-64 object-cover rounded-2xl"
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
