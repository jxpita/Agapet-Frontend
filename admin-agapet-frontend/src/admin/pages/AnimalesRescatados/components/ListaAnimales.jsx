import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { animalAPI } from "../../../../api/animalAPI";

export const ListaAnimales = () => {
  const data = [
    {
      id: 1,
      img: "perro.jpg",
      nombre: "Magno",
      estado: "Adoptado",
      genero: "Macho",
    },

    {
      id: 2,
      img: "gato.jpg",
      nombre: "Princesa",
      estado: "Sin Adoptar",
      genero: "Hembra",
    },
  ];

  const [animalesList, setanimalesList] = useState([]);


  const loadAnimales=async()=>{
   const resp= await animalAPI.get("listmascota");
   console.log(resp.data);
   setanimalesList(resp.data);
  }

  useEffect(() => {
    loadAnimales();
  }, [])
  
  return (
    <div className="overflow-x-auto mt-16 mx-2  border rounded-md shadow-md font-bold">
      <table className="table bg-white ">
        <thead className="bg-table-header text-black text-center">
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Genero</th>
            <th>Vacunas</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody className="text-center font-semibold">
          {animalesList.map((mascota) => (
            <tr key={mascota.idpet}>
              <td>
                <div className="flex justify-center">
                  <img
                    src={`${mascota.image64}`}
                    className="h-[100px] w-[100px] object-contain rounded-full "
                  />
                </div>
              </td>
              <td>{mascota.nombre}</td>
              <td>{mascota.estado==="S"?'Disponible':'No Disponible'}</td>
              <td>{mascota.genero==="M"?'Macho':'Hembra'}</td>
              <td>
                <div className="flex justify-center">
                  <Link to={`vacunas-inoculadas/${mascota.idpet}`}>
                    <img
                      src="../src/assets/vacunas.png"
                      className="h-[32px] w-[32px] cursor-pointer"
                    />
                  </Link>
                </div>
              </td>

              <td>
                <div className="flex justify-center">

                  <Link to={`perfil-animal/${mascota.idpet}`}>
                  <img
                    src="../src/assets/edit.png"
                    className="h-[32px] w-[32px] cursor-pointer"
                  />
                  </Link>
                  
                </div>
              </td>
              <td>
                <div className="flex justify-center">
                  <img
                    src="../src/assets/bin.png"
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
