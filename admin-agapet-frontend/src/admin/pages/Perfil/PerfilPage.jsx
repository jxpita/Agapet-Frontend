import React, { useEffect, useState } from "react";
import { userAPI } from "../../../api/userAPI";
import Swal from "sweetalert2";

export const PerfilPage = () => {
  
  
  const jwt = localStorage.getItem("jwt");
  const [userInfo, setuserInfo] = useState({});
  const [generoSeleccionado, setgeneroSeleccionado] = useState(null);

  const getUser = async () => {
    const resp = await userAPI.get("data", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });

    //console.log(resp.data);
    setuserInfo(resp.data);
    setgeneroSeleccionado(resp.data.gender);
  };

  const onInputChange = (e) => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };




  const onSubmit = async (e) => {
    e.preventDefault();

    try {

      const userUpdated = {
        ...userInfo,
        gender: generoSeleccionado !== "" ? generoSeleccionado : userInfo.gender,
        age: Number(userInfo.age) 
      };
  
      await userAPI.put(`modificar/${userInfo.iduser}`,userUpdated);

      Swal.fire({
        title: "Usuario Actualizado",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Lo siento, ha ocurrido un error",
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
    }


  };

  useEffect(() => {
    getUser();
    //getInfo();
  }, []);

  return (
    <>
      <div className="mt-4">
        <div className="w-full mt-10 p-2 ">
          <h1 className="text-xl font-bold mx-2 uppercase">Mi Perfil</h1>
          <hr />
        </div>

        <div className="bg-white mt-10 border shadow-sm rounded-md w-full flex justify-center">
          <form action="" className="w-2/4 mt-5" onSubmit={onSubmit}>
            <div className="flex justify-between mb-2">
              <div className="flex flex-col">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="input input-bordered input-sm mb-2 "
                  name="name"
                  onChange={onInputChange}
                  value={userInfo.name}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastname">Apellido</label>
                <input
                  type="text"
                  className="input input-bordered input-sm mb-2"
                  name="lastname"
                  onChange={onInputChange}
                  value={userInfo.lastname}
                />
              </div>
            </div>

            <div className="flex justify-between mb-2">
              <div className="flex flex-col">
                <label htmlFor="email">Correo</label>
                <input
                  type="email"
                  className="input input-bordered input-sm mb-2"
                  name="email"
                  //onChange={onInputChange}
                  value={userInfo.email}
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Teléfono</label>
                <input
                  type="number"
                  className="input input-bordered input-sm mb-2"
                  name="phone"
                  onChange={onInputChange}
                  value={userInfo.phone}
                />
              </div>
            </div>

            <div className="flex justify-between mb-2">
              <div className="flex flex-col">
                <label htmlFor="direction">Dirección</label>
                <input
                  type="text"
                  className="input input-bordered input-sm "
                  name="direction"
                  onChange={onInputChange}
                  value={userInfo.direction}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="genero">Género</label>
                <select
                  value={generoSeleccionado}
                  className="select select-bordered w-full max-w-xs"
                  defaultValue={""}
                  onChange={(e) => setgeneroSeleccionado(e.target.value)}
                  //disabled={gender !== ""}
                >
                  <option disabled value="">
                    Selecciona el género
                  </option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otros</option>
                </select>
              </div>
            </div>

            <div className="flex">
              <div className="flex flex-col">
                <label htmlFor="nombre">Edad</label>
                 <input
                  type="text"
                  className="input input-bordered input-sm "
                  name="age"
                  onChange={onInputChange}
                  value={userInfo.age}
                />
              </div>
            </div>

            <div className="flex justify-center mt-5 mb-4">
              <button
                className="border bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/3"
                type="submit"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
