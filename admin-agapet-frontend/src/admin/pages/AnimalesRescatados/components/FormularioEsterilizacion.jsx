import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { updateEsterilizacionForm } from "../../../../store/animal-rescatado/animalRescatadoSlice";

export const FormularioEsterilizacion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [estadoSeleccionado, setestadoSeleccionado] = useState(undefined);

  const esterelizacionAnimal = {
    esterilizado: "",
    fecha_esterilizado: "", //yyyy-mm-dd
    lugar_esterilizado: "",
    descripcion_esterilizado: "",
  };

  const {
    fecha_esterilizado,
    lugar_esterilizado,
    descripcion_esterilizado,
    onInputChange,
  } = useForm(esterelizacionAnimal);

  const onContinueFormEsterelizacion = (e) => {
    e.preventDefault();

    const esterilizadoForm = {
      esterilizado: estadoSeleccionado,
      fecha_esterilizado,
      lugar_esterilizado,
      descripcion_esterilizado,
    };

    console.log(esterilizadoForm);

    dispatch(updateEsterilizacionForm(esterilizadoForm));

    navigate("../info-desparacitacion");
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
            <li className="step">Desparasitación</li>
          </ul>
        </div>


      <div className="bg-white p-2 mt-10 mx-auto border shadow-sm rounded-md w-4/5">
        <h3 className="font-bold text-lg p-4">Esterilización</h3>
        <hr />

      

        <form action="" className="p-2">
          {/* contenedor principal */}
          <div className="flex mt-4 mb-2 justify-around">
            {/* izq */}
            <div className=" w-1/2">
              <div className="flex  gap-7">
                <div className="flex flex-col">
                  <label htmlFor="" className="font-bold">
                    Esterilizado
                  </label>
                  <select
                    className="select select-bordered select-sm "
                    defaultValue={""}
                    value={estadoSeleccionado}
                    onChange={(e) => setestadoSeleccionado(e.target.value)}
                  >
                    <option value="" disabled>
                      Seleccione el estado
                    </option>
                    <option value="S">Si</option>
                    <option value="N">No</option>
                  </select>
                </div>
                <div>
                  <div className="flex flex-col">
                    <label className="font-bold">Fecha Esterilización</label>
                    <input
                      type="date"
                      className="input input-bordered input-sm "
                      name="fecha_esterilizado"
                      value={fecha_esterilizado}
                      onChange={onInputChange}
                      disabled={estadoSeleccionado=="N"}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="mt-4 font-bold">
                  Lugar Esterilización
                </label>
                <input
                  type="text"
                  className="input input-bordered w-3/4 input-sm mt-1"
                  name="lugar_esterilizado"
                  value={lugar_esterilizado}
                  onChange={onInputChange}
                  disabled={estadoSeleccionado=="N"}
                />
              </div>
            </div>

            {/* der */}
            <div className="w-1/2">
              <div className="flex flex-col">
                <label className="font-bold mb-2">
                  Descripción de la Esterilización
                </label>
                <textarea
                  className="textarea textarea-bordered mb-4"
                  placeholder=""
                  cols="10"
                  rows="3"
                  name="descripcion_esterilizado"
                  value={descripcion_esterilizado}
                  onChange={onInputChange}
                  disabled={estadoSeleccionado=="N"}
                />
              </div>

              <div className="flex justify-end gap-2">
                <div className="border p-1 rounded-md mt-2 bg-bg-celeste">
                  <Link
                    to="../info-animal"
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
                <div className="border p-1 rounded-md mt-2 bg-bg-celeste">
                  <button
                    className="flex font-bold uppercase"
                    onClick={onContinueFormEsterelizacion}
                  >
                    Siguiente
                    <img
                      src="../src/assets/flecha.png"
                      alt=""
                      className="h-[20px] w-[20px] -rotate-90 mt-1 ml-2 b"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
