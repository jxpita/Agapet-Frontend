import React, { useState } from "react";
import { useForm } from "../../../../hooks/useForm";
import { vacunasAPI } from "../../../../api/vacunasAPI";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const ModalNuevaVacuna = ({ closeModal, forceUpdateT }) => {
  const navigate = useNavigate();

  const [nombre_vacuna, setnombre_vacuna] = useState("");
  const [descripcion_vacuna, setdescripcion_vacuna] = useState("");

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const idColaborador = localStorage.getItem("idColaborador");
      const idAdministrador = localStorage.getItem("idAdministrador");

      const nuevaVacuna = {
        nombre_vacuna: nombre_vacuna,
        idAdministrador:
          idAdministrador !== undefined ? Number(idAdministrador) : null,
        idColaborador:
          idColaborador !== undefined ? Number(idColaborador) : null,
        descripcion_vacuna: descripcion_vacuna,
      };

      console.log(nuevaVacuna);
      await vacunasAPI.post("createvacuna", nuevaVacuna);

      Swal.fire({
        title: "Vacuna Agregada!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        closeModal();
        //window.location.reload();
        //navigate("/vacunas");
        forceUpdateT();
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
    <>
      <form onSubmit={onSubmit} className="w-full">
        <h3 className="font-bold text-lg">Nueva vacuna</h3>

        <div className="modal-action flex flex-col">
          {/* if there is a button in form, it will close the modal */}

          <div className="flex flex-col">
            <label htmlFor="nombre_vacuna" className="font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full "
              name="nombre_vacuna"
              value={nombre_vacuna}
              onChange={(e) => setnombre_vacuna(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="descripcion_vacuna" className="font-bold mb-2">
              Descripción
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder=""
              cols="10"
              rows="5"
              name="descripcion_vacuna"
              value={descripcion_vacuna}
              onChange={(e) => setdescripcion_vacuna(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              className=" mt-2 border bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/3"
              type="submit"
            >
              Registrar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
