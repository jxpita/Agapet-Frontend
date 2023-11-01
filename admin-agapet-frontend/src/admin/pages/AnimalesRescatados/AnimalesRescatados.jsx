import React from "react";
import { ListaAnimales } from "./components/ListaAnimales";
import { Link } from "react-router-dom";

export const AnimalesRescatados = () => {
  return (
    <>
      <div className="mt-4 border">
        <div className="w-full mt-10 p-2 ">
          <h1 className="text-xl font-bold mx-2 uppercase">
            Animales Rescatados
          </h1>
          <hr />
        </div>

        <div className="bg-white mx-2 p-2 flex gap-4 mt-6">
          <button className="border  bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/3">
            <Link to="info-animal">Agregar Nuevo animal</Link>
          </button>

          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mt-2"
          />
          <img
            src="../src/assets/search.png"
            alt=""
            className="h-[32px] w-[32px] mt-4"
          />
        </div>

        <ListaAnimales />
      </div>
    </>
  );
};
