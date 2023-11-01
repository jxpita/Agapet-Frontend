import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { vacunasAPI } from "../../../../api/vacunasAPI";
import Swal from "sweetalert2";
import { animalAPI } from "../../../../api/animalAPI";
import { Volver } from "../../../components/Volver";

export const NuevaVacuna = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listavacunas, setlistavacunas] = useState([]);
  const [vacunaSeleccionada, setvacunaSeleccionada] = useState(undefined);
  const [fileImage, setfileImage] = useState(null);

  const nuevaVacunaForm = {
    descripcion_vacunacion: "",
    fecha_vacunacion: "",
    lugar_vacunacion: "",
  };

  const {
    descripcion_vacunacion,
    fecha_vacunacion,
    lugar_vacunacion,
    onInputChange,
  } = useForm(nuevaVacunaForm);

  const loadVacunas = async () => {
    const resp = await vacunasAPI.get("/listvacuna");
    setlistavacunas(resp.data);
  };

  useEffect(() => {
    loadVacunas();
  }, []);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const ImagenUpload = async (e) => {
    const base64 = await convertBase64(fileImage);
    return base64;
  };

  const vincularVacuna = async (e) => {
    e.preventDefault();

    try {
      const nuevaVacuna = {
        vacuna: Number(vacunaSeleccionada),
        mascota: Number(id),
        descripcion_vacunacion,
        imagen64: await ImagenUpload(),
        fecha_vacunacion,
        lugar_vacunacion,
      };

      await animalAPI.post("vacunas", nuevaVacuna);

      Swal.fire({
        title: "Vacuna agregada",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(-1);
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
    <div className="mt-4">
      <div className="w-full mt-10 p-2 ">
        <Volver />
        <h1 className="text-xl font-bold mx-2 uppercase">
          Agregar nueva vacuna para MAX
        </h1>
        <hr />
      </div>

      <div className="bg-white p-2 mt-10 mx-auto border shadow-sm rounded-md w-2/3">
        <form action="" className="p-2" onSubmit={vincularVacuna}>
          <h3 className="font-bold text-lg">Agregar nueva vacuna</h3>
          <hr />

          {/* contenedor principal */}
          <div className="flex mt-4">
            {/* izq */}

            <div className=" w-1/2">
              <div className="flex flex-col w-2/3 mb-2">
                <label htmlFor="nombre_vacuna" className="font-bold">
                  Nombre
                </label>
                <select
                  className="select select-bordered select-sm"
                  defaultValue={""}
                  value={vacunaSeleccionada}
                  onChange={(e) => setvacunaSeleccionada(e.target.value)}
                >
                  <option value="" disabled>
                    Seleccione la vacuna
                  </option>
                  {listavacunas.map((vacuna) => (
                    <option key={vacuna.vacuna_id} value={vacuna.vacuna_id}>
                      {vacuna.nombre_vacuna}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col  w-3/4">
                <label
                  htmlFor="descripcion_vacunacion"
                  className="font-bold mb-2"
                >
                  Comentarios
                </label>
                <textarea
                  className="textarea textarea-bordered mb-4"
                  cols="10"
                  rows="3"
                  name="descripcion_vacunacion"
                  value={descripcion_vacunacion}
                  onChange={onInputChange}
                />
              </div>

              <div className="flex flex-col w-2/3 mb-2">
                <label htmlFor="" className="font-bold">
                  Fecha Vacunación
                </label>
                <input
                  type="date"
                  className="input input-bordered input-sm "
                  name="fecha_vacunacion"
                  value={fecha_vacunacion}
                  onChange={onInputChange}
                />
              </div>
            </div>

            {/* der */}
            <div className="w-1/2">
              <div className="flex flex-col">
                <label htmlFor="" className="font-bold">
                  Lugar de la vacunación
                </label>
                <input
                  type="text"
                  className="input input-bordered w-3/4 input-sm mt-1"
                  name="lugar_vacunacion"
                  value={lugar_vacunacion}
                  onChange={onInputChange}
                />
              </div>

              <div className="mt-4 flex flex-col">
                <label htmlFor="">Imagen</label>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                  onChange={(e) => setfileImage(e.target.files[0])}
                />
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
