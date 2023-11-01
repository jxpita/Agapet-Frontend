import React, { useState } from "react";

import { Grafica } from "./components/Grafica";
import { ActividadesHoy } from "./components/ActividadesHoy";
import { AdoptantesRegistrados } from "./components/AdoptantesRegistrados";

export const DashboardPage = () => {
  const name = localStorage.getItem("name");

  return (
    <div className="mt-4">
      <div className="bg-white w-full mt-5 p-2 border rounded-md">
        <h1 className="text-xl font-bold mx-2">Bienvenido, {name}</h1>
      </div>

      <div className="flex justify-around gap-3 border rounded-md mt-2 px-1">
        <div className="mt-2 w-3/5 mx-0 bg-white p-2 border rounded-md mb-2">
          <h1 className="text-xl font-bold mx-2 mb-2 ">
            Estadística de registro en Agapet-Móvil
          </h1>
          <Grafica />
        </div>

        <div className="mt-2 w-2/5">
          <h1 className="font-bold text-xl ">Actividades de la semana</h1>
          <ActividadesHoy />
        </div>
      </div>

      <h1 className="text-xl font-bold mx-2 mt-4">
        Usuarios registrados en Agapet-Móvil
      </h1>
      <div className="mt-2 border rounded-md shadow-sm">
        <AdoptantesRegistrados />
      </div>
    </div>
  );
};
