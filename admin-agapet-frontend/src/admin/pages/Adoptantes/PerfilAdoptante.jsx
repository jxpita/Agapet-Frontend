import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userAPI } from "../../../api/userAPI";
import { AnimalAsignado } from "./components/AnimalAsignado";
import { animalAPI } from "../../../api/animalAPI";
import { Volver } from "../../components/Volver";

export const PerfilAdoptante = () => {
  const { id } = useParams();

  const [adoptante, setadoptante] = useState({});
  const [tieneAnimalAsignado, settieneAnimalAsignado] = useState(false);

  const [mascotaAsignada, setmascotaAsignada] = useState({});

  const loadPerfilAdoptante = async () => {
    const resp = await userAPI.get(`adoptantedetail/${id}`);
    setadoptante(resp.data);

    console.log(resp.data);
  };

  useEffect(() => {
    loadPerfilAdoptante();
    loadMascotaAsignada();
  }, []);

  const loadMascotaAsignada = async () => {
    try {
      const resp = await animalAPI.get(`usuario/${id}/`);
      console.log(resp.data[0]);
      setmascotaAsignada(resp.data[0]);
      //settieneAnimalAsignado(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full p-1 ">
      <Volver/>
        <h1 className="text-xl font-bold mx-2 uppercase">Adoptantes</h1>
        <hr />
      </div>

      <div className="flex gap-2 mt-2">
        <div className="bg-white w-1/2 border rounded-md shadow-md">
          <div className="flex justify-center mt-2">
            <img
              src={
                adoptante.imagen64 !== ""
                  ? adoptante.imagen64
                  : "/src/assets/user.png"
              }
              alt=""
              className="h-[150px] w-[150px] object-cover rounded-full"
            />
          </div>

          <div className="px-4">
            <div className="flex flex-col mb-2">
              <label htmlFor="" className="font-bold">
                Nombre
              </label>
              <input
                type="text"
                className="input input-bordered w-3/4 input-sm "
                name="name"
                value={adoptante.user?.name || ""}
                disabled
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="" className="font-bold">
                Dirección
              </label>
              <input
                type="text"
                className="input input-bordered w-3/4 input-sm "
                name=""
                value={adoptante.user?.direction || ""}
                disabled
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="" className="font-bold">
                Teléfono
              </label>
              <input
                type="text"
                className="input input-bordered w-3/4 input-sm "
                name=""
                value={adoptante.user?.phone || ""}
                disabled
              />
            </div>

            <div className="flex">
              <div className="flex flex-col mb-2">
                <label htmlFor="" className="font-bold">
                  Edad
                </label>
                <input
                  type="number"
                  className="input input-bordered w-3/4 input-sm "
                  name=""
                  value={adoptante.user?.age || ""}
                  disabled
                />
              </div>

              <div className="flex flex-col mb-2">
                <label htmlFor="" className="font-bold">
                  Puntos
                </label>
                <input
                  type="text"
                  className="input input-bordered w-3/4 input-sm "
                  name=""
                  value={adoptante.points || "0"}
                  disabled
                />
              </div>
            </div>

            <div className="flex ">
              
              <div className="flex flex-col mb-2">
                <label htmlFor="" className="font-bold text-md">
                  Recompensas Canjeadas
                </label>
                <input
                  type="text"
                  className="input input-bordered w-1/2 input-sm "
                  name=""
                  value="2"
                  disabled
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-bold invisible">
                  Edad
                </label>
                {/* <label className="underline cursor-pointer">Ver más</label> */}
              </div>

            </div>

            <div className="flex">
              <div className="flex flex-col mb-2">
                <label className="font-bold">Cursos Tomados</label>
                <input
                  type="text"
                  className="input input-bordered w-1/2 input-sm "
                  name=""
                  value="1"
                  disabled
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-bold invisible">
                  Edad
                </label>
                {/* <label className="underline cursor-pointer">Ver más</label> */}
              </div>
            </div>
          </div>
        </div>

        {!!mascotaAsignada ? (
          <AnimalAsignado mascotaAsignada={mascotaAsignada} />
        ) : (
          <div className=" font-semibold text-xl bg-white border rounded-md shadow-md p-4 h-1/2">
            <h2>
              Este adoptante aún no tiene asignada una mascota. Si deseas
              asignarle una, haz click en el bóton.
            </h2>
            <div className="flex justify-center mt-5">
              <button className="border  bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer ">
                <Link to="asignar-animal">Asignar Mascota</Link>
              </button>
            </div>
          </div>
        )}

        {/* 
        <div className="bg-white w-2/3 border rounded-md shadow-md">
          <div className="w-full mt-2 ">
            <h1 className="text-xl font-bold mx-2 uppercase text-center">
              Proceso de Adopción
            </h1>
          </div>

          <div className="flex justify-around mt-2">
            <div className="flex flex-col ">
              <h2 className="font-bold mb-2">Etapas</h2>

              {etapas.map((etapa, index) => (
                <div
                  className="p-3 mb-2 border rounded-md border-black"
                  key={index}
                >
                  <label className="">{etapa.nombre}</label>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold mb-2">Procesos</h2>

              {etapas.map((etapa, index) =>
                etapa.estado === "Aprobado" ? (
                  <select
                    name=""
                    id=""
                    key={index}
                    className="select select-bordered w-full mb-3 border-green-400"
                  >
                    <option value={etapa.estado}>{etapa.estado}</option>
                  </select>
                ) : (
                  <select
                    name=""
                    id=""
                    key={index}
                    className="select select-bordered w-full mb-3 "
                  >
                    <option value={etapa.estado}>{etapa.estado}</option>
                  </select>
                )
              )}
            </div>
          </div>
          <div className="flex justify-center mt-1 mb-2">
            <button
              className="border  bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/3"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};
