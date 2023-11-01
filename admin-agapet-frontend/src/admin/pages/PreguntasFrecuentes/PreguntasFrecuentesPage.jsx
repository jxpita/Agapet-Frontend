import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { faqAPI } from "../../../api/faqAPI";

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

export const PreguntasFrecuentesPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const idColaborador = localStorage.getItem("idColaborador");
  const idAdministrador = localStorage.getItem("idAdministrador");

  const [pregunta, setpregunta] = useState("");
  const [respuesta, setrespuesta] = useState("");

  const [listPreguntas, setlistPreguntas] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  /*Modal update*/

  const [UpdatemodalIsOpen, setUpdatemodalIsOpen] = useState(false);
  const [preguntaSeleccionada, setpreguntaSeleccionada] = useState({});
  const [idupdateSeleccionada, setidupdateSeleccionada] = useState(null);
  const [preguntaupdateSeleccionada, setpreguntaupdateSeleccionada] =useState("");
  const [respuestaupdateSeleccionada, setrespuestaupdateSeleccionada] =useState("");

  const UpdateopenModal = (pregunta) => {
    setUpdatemodalIsOpen(true);
    setpreguntaSeleccionada(pregunta);
    setidupdateSeleccionada(pregunta.faqid);
    setpreguntaupdateSeleccionada(pregunta.pregunta);
    setrespuestaupdateSeleccionada(pregunta.respuesta);
  };

  const UpdatecloseModal = () => {
    setUpdatemodalIsOpen(false);
  };

  const loadPreguntas = async () => {
    const resp = await faqAPI.get("listpreguntas");
    setlistPreguntas(resp.data);
  };

  useEffect(() => {
    loadPreguntas();
  }, [ignored]);

  const agregarPregunta = async (e) => {
    e.preventDefault();

    try {
      await faqAPI.post("createpregunta", {
        pregunta: pregunta,
        respuesta: respuesta,
        idColaborador:
          idColaborador !== undefined ? Number(idColaborador) : null,
        idAdministrador:
          idAdministrador !== undefined ? Number(idAdministrador) : null,
      });
      Swal.fire({
        title: "Pregunta creada!",
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

    setpregunta("");
    setrespuesta("");
  };

  const updatePregunta = async (e) => {
    e.preventDefault();

    try {
      await faqAPI.put(`uodatepregunta/${idupdateSeleccionada}`, {
        pregunta: preguntaupdateSeleccionada,
        respuesta: respuestaupdateSeleccionada,
        is_active: true,
      });
      Swal.fire({
        title: "Pregunta editada!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        forceUpdate();
        UpdatecloseModal();
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

  const inactivatePregunta = async (pregunta) => {

    const {faqid}= pregunta
    try {
      

      const resp= await faqAPI.get(`detailpregunta/${faqid}`);
      const {pregunta,respuesta}= resp.data;


      Swal.fire({
        title: '¿Está seguro de eliminar la pregunta?',
        text: "No podrá reversar esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then(async(result) => {
        if (result.isConfirmed) {

          await faqAPI.put(`uodatepregunta/${faqid}`,{
            pregunta,
            respuesta,
            is_active:false
          })

          forceUpdate();


          Swal.fire(
            'Pregunta Eliminada!',
            'La pregunta seleccionada fue eliminada',
            'success'
          )
        }
      })





    } catch (error) {
      
    }


  };

  return (
    <div className="mt-4 bg-background-color">
      <div className="w-full mt-10 p-2 ">
        <h1 className="text-xl font-bold mx-2 uppercase">
          Preguntas Frecuentes {"(faq)"}
        </h1>
        <hr />
      </div>

      <div className="bg-white mx-2 p-2 flex gap-4 mt-6">
        <button
          className="border  bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/3"
          onClick={openModal}
        >
          Agregar Pregunta
        </button>

        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full mt-2"
        />
        <img
          src="../src/assets/search.png"
          alt=""
          className="h-[32px] w-[32px] mt-4"
        />
      </div>

      <div className="overflow-x-auto mt-16 mx-2  border rounded-md shadow-md font-bold">
        <table className="table bg-white">
          {/* head */}
          <thead className="bg-table-header text-black text-center">
            <tr>
              <th>Pregunta</th>
              <th>Respuesta</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {listPreguntas.map((pregunta, index) =>
              pregunta.is_active ? (
                <tr key={pregunta.faqid} className="font-semibold">
                  <td>{pregunta.pregunta}</td>
                  <td>{pregunta.respuesta}</td>
                  <td>
                    <div className="flex justify-center">
                      <img
                        src="../src/assets/edit.png"
                        className="cursor-pointer h-[32px] w-[33px]"
                        onClick={() => UpdateopenModal(pregunta)}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <img
                        src="../src/assets/bin.png"
                        className="cursor-pointer h-[32px] w-[33px]"
                        onClick={() => inactivatePregunta(pregunta)}
                      />
                    </div>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>

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

        <div>
          <h2 className="text-xl font-bold p-2">Crear Pregunta</h2>
          <hr />

          <form action="" className="p-2" onSubmit={agregarPregunta}>
            <div className="flex flex-col mb-3">
              <div className="flex flex-col">
                <label htmlFor="" className="mb-1">
                  Pregunta
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm mb-2 "
                  name="pregunta"
                  value={pregunta}
                  onChange={(e) => setpregunta(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="mb-1">
                  Respuesta
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  cols="5"
                  rows="2"
                  name="respuesta"
                  value={respuesta}
                  onChange={(e) => setrespuesta(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="border bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/2"
                type="submit"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* MODAL UPDATE PREGUNTA */}
      <Modal
        isOpen={UpdatemodalIsOpen}
        onRequestClose={UpdatecloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-end">
          <button onClick={UpdatecloseModal} className="">
            X
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold p-2">Editar Pregunta</h2>
          <hr />

          <form action="" className="p-2" onSubmit={updatePregunta}>
            <div className="flex flex-col mb-3">
              <div className="flex flex-col">
                <label htmlFor="" className="mb-1">
                  Pregunta
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm mb-2 "
                  name="pregunta"
                  value={preguntaupdateSeleccionada}
                  onChange={(e) =>
                    setpreguntaupdateSeleccionada(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="mb-1">
                  Respuesta
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  cols="5"
                  rows="2"
                  name="respuesta"
                  value={respuestaupdateSeleccionada}
                  onChange={(e) =>
                    setrespuestaupdateSeleccionada(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="border bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/2"
                type="submit"
              >
                Editar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
