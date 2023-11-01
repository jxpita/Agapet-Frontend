import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export const ListaVacunasInoculadas = ({ listaVacunas }) => {
  return (
    <div className="overflow-x-auto mt-16 mx-2  border rounded-md shadow-md font-bold">
      <table className="table bg-white ">
        <thead className="bg-table-header text-black text-center">
          <tr>
            <th>Nombre</th>
            <th>Descripción de la vacuna</th>
            <th>Fecha inoculación</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center font-semibold">
          {listaVacunas?.map((vacuna) => (
            <tr key={vacuna.id}>
              <td>{vacuna.vacuna.nombre_vacuna}</td>
              <td>{vacuna.descripcion_vacunacion}</td>
              <td>{vacuna.fecha_vacunacion}</td>
              <td>
                <div className="flex justify-center">
                  <Link to={`update-vacuna/${vacuna.id}`}>
                    <img
                      src="/src/assets/edit.png"
                      className="h-[32px] w-[32px] cursor-pointer"
                    />
                  </Link>
                </div>
              </td>
              <td>
                <div className="flex justify-center">
                  <img
                    src="/src/assets/bin.png"
                    className="h-[32px] w-[32px] cursor-pointer "
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
