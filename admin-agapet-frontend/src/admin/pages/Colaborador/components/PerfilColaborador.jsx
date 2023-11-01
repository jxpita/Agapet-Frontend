import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userAPI } from "../../../../api/userAPI";
import Swal from "sweetalert2";
import { Volver } from "../../../components/Volver";

export const PerfilColaborador = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //objeto de colaborador
  const [idColab, setidColab] = useState(null);
  const [user, setuser] = useState({});
  const [permisos, setpermisos] = useState([]);

  const [generoSeleccionado, setgeneroSeleccionado] = useState(undefined);

  const [estadoSeleccionado, setestadoSeleccionado] = useState(undefined);

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const [valor, setvalor] = useState(undefined);

  const loadcolaboradorInfo = async () => {
    const { data } = await userAPI.get(`colaboradordetail/${id}`);

    for (const colab of Object.keys(data)) {
      if (colab === "idColaborador") {
        setidColab(data[colab]);
      } else if (colab === "user") {
        setuser(data[colab]);
      } else if (colab == "permisos") {
        setpermisos(data[colab]);
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    loadcolaboradorInfo();
  }, [ignored]);

  const { name, lastname, email, phone, direction, age, gender } = user;

  const onUserInputChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    const select = e.target;
    const value = select.value;
    setvalor(value);
  };

  const updatePermiso = async (id, estado) => {
    try {
      const fechaActual = new Date();
      const fechaActualFormateada = fechaActual.toISOString().slice(0, 10);

      const updatePermiso = {
        id,
        date_received: fechaActualFormateada,
        estado_permiso: !estado,
      };

      await userAPI.put(`recibepermisoupdate/${id}`, updatePermiso);
      forceUpdate();
      /* 
      Swal.fire({
        title: "Permiso Editado!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload(false);
        navigate(`../perfil-colaborador/${id}`);
        forceUpdate();
      });*/
    } catch (error) {
      Swal.fire({
        title: "Lo siento, ha ocurrido un error",
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      user.gender = gender !== "" ? gender : generoSeleccionado;

      await userAPI.put(`updatecolaborador/${id}`, { user });

      Swal.fire({
        title: "Colaborador Editado!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(`../perfil-colaborador/${id}`);
        //window.location.reload(true);
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

  return (
    <>
      <div className="bg-background-color">
        <div className="w-full mt-10 p-2 ">
          
        <Volver/>
          <h1 className="text-xl font-bold mx-2 uppercase">
            Perfil Colaborador
          </h1>
          <hr />
        </div>

      
      </div>


                
      <div className="flex gap-1 mt-10">
           {/* IZQ*/}
        <div className="bg-white w-1/2 border rounded-md shadow-md p-2">
        <h1 className="p-2 font-bold text-xl uppercase">Información Personal</h1>
          <hr />
          <form action="" onSubmit={onSubmit} className="">
            <div className="flex gap-5 mt-4 p-2">
              <div className="flex flex-col">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="input input-bordered input-sm "
                  name="name"
                  value={name || ""}
                  onChange={onUserInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  className="input input-bordered input-sm "
                  name="lastname"
                  value={lastname || ""}
                  onChange={onUserInputChange}
                />
              </div>
            </div>

            <div className="flex gap-5 p-2">
              <div className="flex flex-col">
                <label htmlFor="nombre">Correo</label>
                <input
                  type="text"
                  className="input input-bordered input-sm "
                  name="correo"
                  disabled
                  value={email || ""}
                  onChange={onUserInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="apellido">Dirección</label>
                <input
                  type="text"
                  className="input input-bordered input-sm "
                  name="direction"
                  value={direction || ""}
                  onChange={onUserInputChange}
                />
              </div>
            </div>

            <div className="flex gap-5 p-2">
              <div className="flex flex-col">
                <label htmlFor="nombre">Edad</label>
                <input
                  type="number"
                  className="input input-bordered input-sm "
                  name="age"
                  value={age || ""}
                  onChange={onUserInputChange}
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="apellido">Teléfono</label>
                <input
                  type="number"
                  className="input input-bordered input-sm "
                  name="phone"
                  value={phone || ""}
                  onChange={onUserInputChange}
                />
              </div>
            </div>

            <div className="flex gap-5 p-2">
              <div className="flex flex-col">
                <label htmlFor="nombre">Género</label>

                <select
                  value={gender !== "" ? gender : generoSeleccionado}
                  className="select select-bordered w-full max-w-xs"
                  defaultValue={""}
                  onChange={(e) => setgeneroSeleccionado(e.target.value)}
                  disabled={gender !== ""}
                >
                  <option disabled value="">
                    Selecciona el género
                  </option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otros</option>
                </select>
              </div>

              <div className="invisible">
                <input
                  type="number"
                  className="input input-bordered input-sm "
                />
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <button
                className="border  bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/3 mb-2"
                type="submit"
              >
                Actualizar 
              </button>
            </div>

            </form>
        </div>

        <div className="bg-white w-1/2 border rounded-md shadow-md p-2">
              {/* DER*/}

              <h2 className=" mt-2 font-bold text-xl uppercase mb-2">Permisos</h2>
              <hr />

              {permisos.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table ">
                    <thead>
                      <tr className="text-center">
                        <th >Permiso</th>
                        <th >Estado</th>
                        <th >Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permisos.map((permiso) => (
                        <tr key={permiso.id}>
                          <td className="text-center capitalize">{(permiso.permiso.nombre).replace('-',' ')}</td>
                          <td
                            
                          >
                            <p  className={`text-center ${
                              permiso.estado_permiso == true
                                ? "text-green-600"
                                : "text-red-600"
                            } `}  >{permiso.estado_permiso == true
                              ? "Permitido"
                              : "No permitido"}</p>
                            
                          </td>

                          <td>
                            <div className=" flex  justify-center">
                              <img
                                src={
                                  permiso.estado_permiso == false
                                    ? "/src/assets/actualizado.png"
                                    : "/src/assets/negar.png"
                                }
                                className="h-[32px] w-[32px] cursor-pointer "
                                onClick={() =>
                                  updatePermiso(
                                    permiso.id,
                                    permiso.estado_permiso
                                  )
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
        </div>
      
      
      
      
      
      
      
      
      
      





    </>
  );
};

/* 

    <div>
                  {permisos.map((permiso) => (
                    <div
                      className="flex justify-between items-center mt-2"
                      key={permiso.id}
                    >
                      <div className="w-1/3">
                        <label htmlFor="">{permiso.permiso.nombre}</label>
                      </div>
                      <div className="w-1/3">

                      <label htmlFor=""  
                      className={` input input-bordered input-md   ${permiso.estado_permiso == true
                              ? "border-green-400"
                              : "border-red-400"} `} 
                              
                      >{permiso.estado_permiso==true?'Permitido':'No permitido'} </label>

                        </div>

                        <div className="w-1/3 flex  justify-center">
                          
                          <img
                            src={permiso.estado_permiso==false?"/src/assets/actualizado.png":"/src/assets/negar.png"}
                            className="h-[32px] w-[32px] cursor-pointer "
                            onClick={() => updatePermiso(permiso.id, permiso.estado_permiso)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

*/ {
  /* <select
                          className={`select select-bordered w-full ${
                            permiso.estado_permiso == true
                              ? "border-green-400"
                              : "border-red-400"
                          }`}
                          defaultValue={permiso.estado_permiso}
                          onChange={handleSelectChange}
                          value={estadoSeleccionado}
                        >
                          <option disabled value="">
                            Permiso
                          </option>
                          <option value={false}>No Permitido</option>
                          <option value={true}>Permitido</option>
                        </select> */
}




/*

  <div className="bg-white p-2 mt-5 mx-auto border shadow-sm rounded-md w-2/3">
          <h1 className="p-2 font-bold text-xl">Información Personal</h1>
          <hr />
          <form action="" onSubmit={onSubmit}>
            <div className="flex justify-around">
              <div className="flex flex-col">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="input input-bordered input-sm "
                  name="name"
                  value={name || ""}
                  onChange={onUserInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  className="input input-bordered input-sm "
                  name="lastname"
                  value={lastname || ""}
                  onChange={onUserInputChange}
                />
              </div>
            </div>

            <div className="flex justify-around">
              <div className="flex flex-col">
                <label htmlFor="nombre">Correo</label>
                <input
                  type="text"
                  className="input input-bordered input-sm "
                  name="correo"
                  disabled
                  value={email || ""}
                  onChange={onUserInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="apellido">Dirección</label>
                <input
                  type="text"
                  className="input input-bordered input-sm "
                  name="direction"
                  value={direction || ""}
                  onChange={onUserInputChange}
                />
              </div>
            </div>

            <div className="flex justify-around">
              <div className="flex flex-col">
                <label htmlFor="nombre">Edad</label>
                <input
                  type="number"
                  className="input input-bordered input-sm "
                  name="age"
                  value={age || ""}
                  onChange={onUserInputChange}
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="apellido">Teléfono</label>
                <input
                  type="number"
                  className="input input-bordered input-sm "
                  name="phone"
                  value={phone || ""}
                  onChange={onUserInputChange}
                />
              </div>
            </div>

            <div className="flex justify-around mt-2">
              <div className="flex flex-col">
                <label htmlFor="nombre">Género</label>

                <select
                  value={gender !== "" ? gender : generoSeleccionado}
                  className="select select-bordered w-full max-w-xs"
                  defaultValue={""}
                  onChange={(e) => setgeneroSeleccionado(e.target.value)}
                  disabled={gender !== ""}
                >
                  <option disabled value="">
                    Selecciona el género
                  </option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otros</option>
                </select>
              </div>

              <div className="invisible">
                <input
                  type="number"
                  className="input input-bordered input-sm "
                />
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <button
                className="border  bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/3 mb-2"
                type="submit"
              >
                Actualizar Información
              </button>
            </div>

            <div className="bg-white  border rounded-md shadow-md p-2 w-full">
              <h2 className=" mt-2 font-bold text-xl uppercase mb-2">Permisos</h2>
              <hr />

              {permisos.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table ">
                    <thead>
                      <tr className="text-center">
                        <th >Permiso</th>
                        <th >Estado</th>
                        <th >Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permisos.map((permiso) => (
                        <tr key={permiso.id}>
                          <td className="text-center">{permiso.permiso.nombre}</td>
                          <td
                            
                          >
                            <p  className={`  border rounded-md text-center ${
                              permiso.estado_permiso == true
                                ? "border-green-400"
                                : "border-red-400"
                            } `}  >{permiso.estado_permiso == true
                              ? "Permitido"
                              : "No permitido"}</p>
                            
                          </td>

                          <td>
                            <div className=" flex  justify-center">
                              <img
                                src={
                                  permiso.estado_permiso == false
                                    ? "/src/assets/actualizado.png"
                                    : "/src/assets/negar.png"
                                }
                                className="h-[32px] w-[32px] cursor-pointer "
                                onClick={() =>
                                  updatePermiso(
                                    permiso.id,
                                    permiso.estado_permiso
                                  )
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          </form>
        </div>

*/