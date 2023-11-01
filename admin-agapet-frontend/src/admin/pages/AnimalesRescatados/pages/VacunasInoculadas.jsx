import React, { useEffect, useState } from "react";
import { ListaVacunasInoculadas } from "../components/ListaVacunasInoculadas";
import { Link, useParams } from "react-router-dom";
import { animalAPI } from "../../../../api/animalAPI";
import { Volver } from "../../../components/Volver";

export const VacunasInoculadas = () => {
  const { id } = useParams();

  const [mascotaInfo, setmascotaInfo] = useState({});

  const loadInfoMascota = async () => {
    const resp = await animalAPI.get(`detailmascota/${id}`);
    setmascotaInfo(resp.data);
  };

  useEffect(() => {
    loadInfoMascota();
  }, []);

  return (
    <>
      <div className="mt-4 ">
        <div className="w-full mt-10 p-2 ">
          <Volver/>
          <h1 className="text-xl font-bold mx-2 uppercase">
            Listado de vacunas de {mascotaInfo.nombre}
          </h1>
          <hr />
        </div>

        <div className="bg-white mx-2 p-2 flex gap-4 mt-6">
          <button className="border  bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/3">
            <Link to={`nueva-vacuna`}>Agregar Nueva</Link>
          </button>

          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mt-2"
          />
          <img
            src="/src/assets/search.png"
            alt=""
            className="h-[32px] w-[32px] mt-4"
          />
        </div>

        <ListaVacunasInoculadas listaVacunas={mascotaInfo.vacunas} />
      </div>
    </>
  );
};
