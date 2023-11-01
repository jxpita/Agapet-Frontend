import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { animalAPI } from "../../../../api/animalAPI";
import Swal from "sweetalert2";

export const FormularioDesparacitacion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const idColaborador = localStorage.getItem("idColaborador");
  const idAdministrador = localStorage.getItem("idAdministrador");

  const {
    nombre,
    estado,
    peso,
    comida,
    deportivo,
    jugueton,
    sociable,
    miedoso,
    genero,
    anios,
    meses,
    descripcion,
    esterilizado,
    fecha_esterilizado,
    lugar_esterilizado,
    descripcion_esterilizado,
    idanimal,
    image64,
  } = useSelector((state) => state.animalRescatado);

  const calculateEdad = (anios, meses) => {
    let aniosNumber = Number(anios);
    let mesesNumber = Number(meses);

    return aniosNumber + mesesNumber;
  };

  const [desparacitadoSeleccionado, setdesparacitadoSeleccionado] =
    useState(undefined);

  const desparacitacionAnimal = {
    desparacitado: "",
    fecha_desparacitado: "",
    lugar_desparacitado: "",
    descripcion_desparacitado: "",
  };

  const {
    fecha_desparacitado,
    lugar_desparacitado,
    descripcion_desparacitado,
    onInputChange,
  } = useForm(desparacitacionAnimal);

  const resgistrarAnimal = async (e) => {
    e.preventDefault();

    /*
    {
    "idColaborador": null,
    "idAdministrador": null,
    "idanimal": null,
    "nombre": "",
    "genero": null,
    "estado": "",
    "descripcion": "",
    "image": null,
    "edad": null,
    "peso": null,
    "comida": "",
    "deportivo": null,
    "jugueton": null,
    "sociable": null,
    "miedoso": null,
    "esterilizado": "",
    "fecha_esterilizado": null,
    "lugar_esterilizado": "",
    "descripcion_esterilizado": "",
    "desparacitado": "",
    "fecha_desparacitado": null,
    "lugar_desparacitado": "",
    "descripcion_desparacitado": ""
}
*/

    try {
      const animalFormTotal = {
        colaborador: idColaborador !== undefined ? Number(idColaborador) : null,
        administrador:
          idAdministrador !== undefined ? Number(idAdministrador) : null,
        animal: idanimal,
        nombre,
        genero,
        estado,
        descripcion,
        image64,
        edad: calculateEdad(anios, meses),
        peso,
        comida,
        deportivo,
        jugueton,
        sociable,
        miedoso,
        esterilizado,
        fecha_esterilizado,
        lugar_esterilizado,
        descripcion_esterilizado,
        desparacitado: desparacitadoSeleccionado,
        fecha_desparacitado,
        lugar_desparacitado,
        descripcion_desparacitado,
      };

      console.log(animalFormTotal);

      await animalAPI.post("/createmascota", animalFormTotal);

      Swal.fire({
        title: "Nuevo Animal Agregado!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(-3);
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Lo siento, ha ocurrido un error",
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="mt-4">
      <div className="w-full mt-10 p-2 ">
        <h1 className="text-xl font-bold mx-2 uppercase">
          Agregar nuevo animal
        </h1>
        <hr />
      </div>

      <div className="flex justify-center mt-2">
          <ul className="steps gap-3">
            <li className="step step-info">Información</li>
            <li className="step step-info">Esterilización</li>
            <li className="step step-info">Desparasitación</li>
          </ul>
        </div>


      <div className="bg-white p-2 mt-10 mx-auto border shadow-sm rounded-md w-4/5">
        <h3 className="font-bold text-lg p-4">Desparasitación</h3>
        <hr />

       

        <form action="" className="p-2" onSubmit={resgistrarAnimal}>
          {/* contenedor principal */}
          <div className="flex mt-4 mb-2 justify-around">
            {/* izq */}
            <div className=" w-1/2">
              <div className="flex  gap-7">
                <div className="flex flex-col">
                  <label htmlFor="" className="font-bold">
                    Desparacitado
                  </label>
                  <select
                    className="select select-bordered select-sm "
                    defaultValue={""}
                    value={desparacitadoSeleccionado}
                    onChange={(e) =>
                      setdesparacitadoSeleccionado(e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Estado
                    </option>
                    <option value="S">Si</option>
                    <option value="N">No</option>
                  </select>
                </div>
                <div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-bold">
                      Fecha Desparasitación
                    </label>
                    <input
                      type="date"
                      className="input input-bordered input-sm "
                      name="fecha_desparacitado"
                      value={fecha_desparacitado}
                      onChange={onInputChange}
                      disabled={desparacitadoSeleccionado=="N"}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="mt-4 font-bold">
                  Lugar Desparasitación
                </label>
                <input
                  type="text"
                  className="input input-bordered w-3/4 input-sm mt-1"
                  name="lugar_desparacitado"
                  value={lugar_desparacitado}
                  onChange={onInputChange}
                  disabled={desparacitadoSeleccionado=="N"}
                />
              </div>
            </div>

            {/* der */}
            <div className="w-1/2">
              <div className="flex flex-col">
                <label htmlFor="descripcion" className="font-bold mb-2">
                  Descripción de la Desparasitación
                </label>
                <textarea
                  className="textarea textarea-bordered mb-4"
                  cols="10"
                  rows="3"
                  name="descripcion_desparacitado"
                  value={descripcion_desparacitado}
                  onChange={onInputChange}
                  disabled={desparacitadoSeleccionado=="N"}
                />
              </div>

              <div className="flex justify-end gap-2">
                <div className="border p-1 rounded-md mt-2 bg-bg-celeste">
                  <Link
                    to="../info-esterilizacion"
                    className="flex font-bold uppercase"
                  >
                    <img
                      src="../src/assets/flecha.png"
                      alt=""
                      className="h-[20px] w-[20px] rotate-90 mt-1 ml-2 b"
                    />
                    Atrás
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className="flex justify-end mt-5">
            <button
              type="submit"
              className="border  bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/4"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
