import React from "react";
import { Link } from "react-router-dom";

export const ConfiguracionesPage = () => {
  return (
    <>
      <div className="mt-4">
        <div className="w-full mt-10 p-1">
          <h1 className="text-xl font-bold mx-2 uppercase">Configuraciones</h1>
          <hr />
        </div>

        <div className="w-4/5 p-2 mt-1">
          <button className="border  bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/3">
            <Link to="../vacunas">Agregar Nueva Vacuna</Link>
          </button>
        </div>
      </div>
    </>
  );
};
