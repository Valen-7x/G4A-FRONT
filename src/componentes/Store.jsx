import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Card from "./Card";


const Store = ({ games }) => {
  const [cart, setCart] = useState([]); // Estado para mantener los juegos en el carrito

  const addToCart = (game) => {
    setCart([...cart, game]); // Agregar un juego al carrito
  };
console.log(cart);
  return (
    <div className="flex gap-4 bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="grid grid-cols-2 gap-4">
        {/* Mostrar las tarjetas de juegos */}
        {games?.map((game) => (
          <Card
            key={game.id}
            img={game.img}
            title={game.title}
            category={game.category}
            price={game.price}
            id={game.id}
            addToCart={addToCart} // Pasar la función addToCart como prop
          />
        ))}

        {/* Mostrar los juegos en el carrito */}
        <div className="col-span-2">
  <h2 className="text-2xl font-semibold mb-2">Carrito de compras</h2>
  {cart.length === 0 ? (
    <p className="text-white">Tu carrito está vacío.</p>
  ) : (
    <div className="grid grid-cols-2 gap-4">
      {/* Mostrar las tarjetas en el carrito */}
      {cart.map((game) => (
        <Card
          key={game.id}
          img={game.img}
          title={game.title}
          category={game.category}
          price={game.price}
          id={game.id}
        />
      ))}
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default Store;
