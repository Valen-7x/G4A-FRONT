import  { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"
import Swal from "sweetalert";

export default function AdminPanel() {
    const [games, setGames] = useState([]); // Estado para los juegos
    // const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    // const [gamesPerPage] = useState(12); // Número de juegos por página
    const [selectedGame, setSelectedGame] = useState('');
    const [selectedProperty, setSelectedProperty] = useState('');
    const [propertyValue, setPropertyValue] = useState('');
    const [selectedGameId, setSelectedGameId] = useState('');
    function fetchGames() {
        axios
        .get("http://localhost:8080/api/games") // Cambia la URL a tu API
        .then((response) => {
          setGames(response.data.games); // Actualiza el estado con los juegos recibidos
        })
        .catch((error) => console.error("Error:", error));
    }
    useEffect(() => {
        // Hacer una llamada a la API para obtener los datos de los juegos
        fetchGames()
      }, []);

      const handleGameSelect = (event) => {
        const selectedGameTitle = event.target.value;
        const selectedGameData = games.find((game) => game.name === selectedGameTitle);
        setSelectedGame(selectedGameData);
        setSelectedGameId(selectedGameData._id);
        setSelectedProperty('');
        setPropertyValue('');
        // dispatch(setEditedChapterProperty(selectedChapterData.title, selectedChapterData.cover_photo, selectedChapterData.order));
      };
      const handlePropertySelect = (event) => {
        setSelectedProperty(event.target.value);
        setPropertyValue(selectedGame[event.target.value]);
      };
      const handlePropertyValueChange = (event) => {
        setPropertyValue(event.target.value);
      };
      const updateSelectedGame = (updatedGame) => {
        setSelectedGame({ ...selectedGame, ...updatedGame });
      };
      const handleEditGame = () => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
        const updatedGameData = {};
        if (selectedProperty) {
          updatedGameData[selectedProperty] = propertyValue;
        }
        axios
          .put(`http://localhost:8080/api/games/${selectedGameId}`, updatedGameData)
          .then((res) => {
            // En caso de éxito, actualizar el estado de Redux y obtener los capítulos nuevamente
            console.log("datos actualizados", res.data);
            const updatedGame = { ...selectedGame, ...updatedGameData };
            updateSelectedGame(updatedGame);
            // dispatch(setEditedChapterProperty(updatedChapter.title, updatedChapter.cover_photo, updatedChapter.order));
            fetchGames()
            Swal({
              title: 'Successful',
              text: 'Updated game',
              icon: 'success',
              button: "OK"
            });
          })
          .catch((error) => {
            console.error(error);
            Swal({
              title: 'Failed',
              text: 'Could not update game',
              icon: 'error',
              button: 'OK',
            });
          });
      };
      // Función para manejar el clic en el botón "Eliminar capítulo"
      const handleDeleteGame = () => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
        axios
          .delete(`http://localhost:8080/api/games/${selectedGameId}`)
          .then((res) => {
            // En caso de éxito, obtener los capítulos nuevamente
            console.log("datos eliminados", res.data);
            // dispatch(setEditedChapterProperty('', '', ''));
            // setSelectedChapter({});
            fetchGames()
            Swal({
              title: 'Successful',
              text: 'Deleted game',
              icon: 'success',
              button: "OK"
            });
          })
          .catch((error) => {
            console.error(error);
            Swal({
              title: 'Failed',
              text: 'Could not update game',
              icon: 'error',
              button: 'OK',
            });
          });
      };
      console.log(selectedGameId);
  return (
    <div className="flex w-full h-screen items-center justify-center bg-[#111827]">
        <div className="flex flex-wrap flex-col justify-start items-center w-screen h-screen " >
        <Sidebar/>
        <div className="flex justify-center items-center bg-[#080C13] rounded-lg py-4 px-12 w-3/5 h-1/2">
        <div className="flex flex-col justify-center items-center" >
        <h1 className="text-white font-bold text-xl">Admin Panel</h1>
        {/* <p className="text-amber-500 font-bold text-lg">Select Game</p> */}
        {/* <input type="text" /> */}
        <select
          className="w-2/3 text-white my-2 border-b-2 bg-transparent border-amber-500"
          value={selectedGame?.name || ""}
          onChange={handleGameSelect}
        >
          <option disabled value="">
            Select Game
          </option>
          {games?.map((game) => (
            <option className="text-white bg-[#111827]" key={game.name} value={game.name}>
              {game.name}
            </option>
          ))}
        </select>
        {selectedGame && (
          <>
            <select
              className="w-2/3 text-white my-2 border-b-2 bg-transparent border-amber-500"
              value={selectedProperty}
              onChange={handlePropertySelect}
            >
              <option disabled value="">
                Select data
              </option>
              {selectedGame &&
                Object.keys(games[0]).map((property) => property !== '_id' ?(
                  <option className="text-white bg-[#111827]" key={property} value={property}>
                    {property}
                  </option>
                ):null)}
            </select>
            <input
              className="w-2/3 text-white my-2 border-b-2 bg-transparent border-amber-500"
              type="text"
              placeholder="Data to edit"
              value={propertyValue}
              onChange={handlePropertyValueChange}
            />
            <div className="flex justify-between items-center my-2 w-2/3">
            <button className="bg-green-200 text-green-500 hover:bg-green-500 hover:text-green-200 font-semibold w-1/4 p-1 rounded-xl " onClick={handleEditGame}>Edit</button>
            <button className="bg-rose-200 text-rose-500 hover:bg-rose-500 hover:text-rose-200 font-semibold w-1/4 p-1 rounded-xl " onClick={handleDeleteGame}>Delete</button>
            </div>
            </>
        )}
        </div>
        <img className="w-2/5" src={selectedGame?.header_image} alt="" />
        </div>
        </div>
        </div>
  )
}
