import React from "react";
import { Link } from "react-router-dom";

export const AnimalAsignado = ({ mascotaAsignada }) => {
  return (
    <div className=" text-xl bg-white border rounded-md shadow-md p-4 h-1/2 w-full">
      <h1>Mascota Asignada</h1>
      <hr />
      <div className="flex justify-center mt-2 p-2">
        <img
          src={mascotaAsignada.image64}
          alt=""
          className="h-[120px] w-[120px] object-cover rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <span>{mascotaAsignada.nombre}</span>
          <img
            src={
              mascotaAsignada.genero == "M"
                ? "/src/assets/male.png"
                : "/src/assets/female.png"
            }
            alt=""
            className=""
          />
        </div>

        <p className="text-orange-400">
          {mascotaAsignada.estado == "N" ? "No disponible" : "Disponible"}
        </p>
      </div>

      <div className="flex justify-around mt-1">
        <div className="w-1/6 flex flex-col bg-gray-200 border rounded-md text-center">
          <span>Edad</span>
          <span className="font-semibold">{mascotaAsignada.edad} años</span>
        </div>
        <div className="w-1/6 flex flex-col bg-gray-200 border rounded-md text-center">
          <span>Peso</span>
          <span className="font-semibold">{mascotaAsignada.peso} kg</span>
        </div>
        <div className="w-1/6 flex flex-col bg-gray-200 border rounded-md text-center">
          <span>Comida </span>
          <span className="font-semibold">{mascotaAsignada.comida} </span>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <div className="flex gap-2 mb-5">
          <div className="flex gap-2  border rounded-md p-4 items-center">
            <img
              src="/src/assets/deportivo.png"
              alt=""
              className="w-[40px] h-[40px] bg-bg-celeste rounded-full"
            />
            <div className="flex flex-col">
              <label htmlFor="">Deportivo</label>
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name="deportivo"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.deportivo == 1 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="deportivo"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.deportivo == 2 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="deportivo"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.deportivo == 3 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="deportivo"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.deportivo == 4 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="deportivo"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.deportivo == 5 ? true : false}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2  border rounded-md p-4 items-center">
            <img
              src="/src/assets/dog-playing.png"
              alt=""
              className="w-[40px] h-[40px] bg-bg-celeste rounded-full"
            />
            <div className="flex flex-col">
              <label>Juguetón</label>
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name="jugueton"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.jugueton == 1 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="jugueton"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.jugueton == 2 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="jugueton"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.jugueton == 3 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="jugueton"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.jugueton == 4 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="jugueton"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.jugueton == 5 ? true : false}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <div className="flex gap-2 border rounded-md p-4 items-center">
            <img
              src="/src/assets/sociable.png"
              alt=""
              className="w-[40px] h-[40px]  bg-bg-celeste rounded-full"
            />
            <div className="flex flex-col">
              <label>Sociable</label>
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name="sociable"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.sociable == 1 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="sociable"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.sociable == 2 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="sociable"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.sociable == 3 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="sociable"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.sociable == 4 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="sociable"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.sociable == 5 ? true : false}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2  border rounded-md p-4 items-center">
            <img
              src="/src/assets/miedo.png"
              alt=""
              className="w-[40px] h-[40px]  bg-bg-celeste rounded-full"
            />
            <div className="flex flex-col">
              <label>Miedoso</label>
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name="miedoso"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.miedoso == 1 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="miedoso"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.miedoso == 2 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="miedoso"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.miedoso == 3 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="miedoso"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.miedoso == 4 ? true : false}
                  readOnly
                />
                <input
                  type="radio"
                  name="miedoso"
                  className="mask mask-star-2 bg-orange-400"
                  checked={mascotaAsignada.miedoso == 5 ? true : false}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button className="border  bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer ">
          <Link to="timeline">ver proceso de adopción</Link>
        </button>
      </div>
    </div>
  );
};
