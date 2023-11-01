import React, { useEffect, useReducer, useState } from "react";
import { ListaVacunas } from "./components/ListaVacunas";
import Modal from "react-modal";
import { ModalNuevaVacuna } from "./components/ModalNuevaVacuna";
import Swal from "sweetalert2";
import { vacunasAPI } from "../../../api/vacunasAPI";
import { Volver } from "../../components/Volver";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "900px",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    with: "500px",
  },
};

Modal.setAppElement("#root");

export const VacunasPage = () => {
  const [modalAddOpen, setmodalAddOpen] = useState(false);

  const openAddModal = () => {
    setmodalAddOpen(true);
  };

  const closeAddModal = () => {
    setmodalAddOpen(false);
  };

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

      await vacunasAPI.post("createvacuna", nuevaVacuna);

      Swal.fire({
        title: "Vacuna Agregada!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        
        //window.location.reload();
        //navigate("/vacunas");
        forceUpdate();
        closeAddModal();
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

  /*UPDATE VACUNA */
  const [modalIsOpen, setIsOpen] = useState(false);

  const [nombreSeleccionado, setnombreSeleccionado] = useState("");
  const [descripcionSeleccionada, setdescripcionSeleccionada] = useState("");
  const [idVacunaSeleccionada, setidVacunaSeleccionada] = useState("");

  const openModal = (vacuna) => {
    setIsOpen(true);
    setnombreSeleccionado(vacuna.nombre_vacuna);
    setdescripcionSeleccionada(vacuna.descripcion_vacuna);
    setidVacunaSeleccionada(vacuna.vacuna_id);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [vacunas, setvacunas] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const loadVacunas = async () => {
    const result = await vacunasAPI.get("listvacuna");
    setvacunas(result.data);
  };
  useEffect(() => {
    loadVacunas();
  }, [ignored]);

  const getVacunaDetail = async (id) => {
    try {
      const resp = await vacunasAPI.get(`vacunadetail/${id}`);

      const vacunadetail = { ...resp.data };

      Swal.fire({
        title: "¿Está seguro de eliminar la vacuna?",
        text: "No podrá reversar esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
      }).then(async(result) => {
        if (result.isConfirmed) {
          await vacunasAPI.put(`updatevacuna/${id}`, {
            ...vacunadetail,
            is_active: false,
          });
          forceUpdate();

          Swal.fire(
            "Vacuna Eliminada!",
            "La vacuna seleccionada fue eliminada",
            "success"
          );
        }
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
  const updateVacuna = async (e) => {
    e.preventDefault();
    try {
      await vacunasAPI.put(`updatevacuna/${idVacunaSeleccionada}`, {
        nombre_vacuna: nombreSeleccionado,
        descripcion_vacuna: descripcionSeleccionada,
      });
      Swal.fire({
        title: "Vacuna editada!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        forceUpdate();
        closeModal();
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
    <div className="mt-4 bg-background-color ">
      <div className="w-full mt-10 p-2 ">
      <Volver/>
        <h1 className="text-xl font-bold mx-2 uppercase">Listado de vacunas</h1>
        <hr />
      </div>

      <div className="bg-white mx-2 p-2 flex gap-4 mt-6">
        <button
          className="border bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/3"
          onClick={openAddModal}
        >
          Agregar Nueva Vacuna
        </button>

        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="searchVacuna"
          onChange={(e) => setsearchVacuna(e.target.value)}
        />
        <img
          src="../src/assets/search.png"
          alt=""
          className="h-[32px] w-[32px] mt-2"
        />
      </div>

      {/* <ListaVacunas /> */}

      <div className="overflow-x-auto mt-16 mx-2 w-full border rounded-md shadow-md font-bold">
        <table className="table bg-white">
          {/* head */}
          <thead className="bg-table-header text-black">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vacunas?.map((vacuna) =>
              vacuna.is_active ? (
                <tr key={vacuna.vacuna_id} className="font-semibold">
                  <td>{vacuna.nombre_vacuna}</td>
                  <td>{vacuna.descripcion_vacuna}</td>
                  <td>
                    <div className="flex justify-center">
                      {/* <Link to={`editar-vacuna/${vacuna.vacuna_id}`}></Link> */}
                      <img
                        src="../src/assets/edit.png"
                        className="h-[32px] w-[32px] cursor-pointer"
                        onClick={() => openModal(vacuna)}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <img
                        src="../src/assets/bin.png"
                        className="h-[32px] w-[32px] cursor-pointer "
                        onClick={() => getVacunaDetail(vacuna.vacuna_id)}
                      />
                    </div>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="flex justify-end">
            <button onClick={closeModal} className="">
              X
            </button>
          </div>

          <form className="w-full" onSubmit={updateVacuna}>
            <h3 className="font-bold text-lg">Actualizar vacuna</h3>

            <div className="modal-action flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="nombre_vacuna" className="font-bold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full "
                  name="nombreSeleccionado"
                  value={nombreSeleccionado}
                  onChange={(e) => setnombreSeleccionado(e.target.value)}
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
                  name="descripcionSeleccionada"
                  value={descripcionSeleccionada}
                  onChange={(e) => setdescripcionSeleccionada(e.target.value)}
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
        </Modal>
      </div>

      <Modal
        isOpen={modalAddOpen}
        onRequestClose={closeAddModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-end">
          <button onClick={closeAddModal} className="">
            X
          </button>
        </div>

        {/* <ModalNuevaVacuna closeAddModal={closeAddModal} forceUpdateT={forceUpdateT}/> */}

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
      </Modal>
    </div>
  );
};
