import { useEffect, useReducer, useState } from "react";
import { timelineAPI } from "../../../api/timelineAPI";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import Modal from "react-modal";
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

export const TimelinePage = () => {
  const { id } = useParams();

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  //Timeline
  const [estadoSeleccionado, setestadoSeleccionado] = useState(undefined);
  const [adoptanteTimeline, setadoptanteTimeline] = useState({});

  //Modal Fase
  const [modalIsOpen, setIsOpen] = useState(false);
  const [faseSeleccionadaInfo, setfaseSeleccionadaInfo] = useState({});
  const [estadoFase, setestadoFase] = useState("");
  const [fechainicioFase, setfechainicioFase] = useState("");
  const [fechafinalFase, setfechafinalFase] = useState("");
  const [comentariosFase, setcomentariosFase] = useState("");
  const [idFaseSeleccionada, setidFaseSeleccionada] = useState(null);
  const [nombreFaseSeleccionada, setnombreFaseSeleccionada] = useState("");

  const openModal = (fase) => {
    console.log(fase);
    setfaseSeleccionadaInfo(fase);
    setestadoFase(fase.estado);
    setfechainicioFase(fase.fecha_inicio);
    setfechafinalFase(fase.fecha_final);
    setcomentariosFase(fase.comentarios);
    setidFaseSeleccionada(fase.id);
    setnombreFaseSeleccionada(fase.fase.nombre);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    descripcion,
    estado,
    fecha_inicio,
    fecha_final,
    is_active,
    idtimeline,
  } = adoptanteTimeline;

  const onUserInputChange = (e) => {
    setadoptanteTimeline({
      ...adoptanteTimeline,
      [e.target.name]: e.target.value,
    });
  };

  //http://localhost:8000/timeline/adoptante/1

  const getAdoptanteTimeline = async () => {
    try {
      const resp = await timelineAPI.get(`adoptante/${id}`);
      console.log(resp.data[0]);
      setadoptanteTimeline(resp.data[0]);
      setestadoSeleccionado(resp.data[0].estado);
      console.log(resp.data[0].fases);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdoptanteTimeline();
  }, [ignored]);

  const onTimelineUpdate = async (e) => {
    e.preventDefault();

    try {
      const timelineUpdate = {
        descripcion,
        estado: estadoSeleccionado,
        fecha_inicio,
        fecha_final,
        is_active,
      };

      await timelineAPI.put(`timelineupdate/${idtimeline}`, timelineUpdate);

      Swal.fire({
        title: "Proceso de adopción editado!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        //window.location.reload(false);
        //navigate(`../perfil-colaborador/${id}`);
        forceUpdate();
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

  const updateFaseSeleccionada = async (e) => {
    e.preventDefault();

    try {
      const updateFaseObject = {
        estado: estadoFase,
        comentarios: comentariosFase,
        fecha_inicio: fechainicioFase,
        fecha_final: fechafinalFase,
        is_active: true,
      };

      console.log(updateFaseObject);
      await timelineAPI.put(
        `updatetimelinefase/${idFaseSeleccionada}`,
        updateFaseObject
      );

      Swal.fire({
        title: "Fase editada!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        //window.location.reload(false);
        //navigate(`../perfil-colaborador/${id}`);
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
    <>
      <div className="w-full mt-10 p-2 ">
        <Volver />
        <h1 className="text-xl font-bold mx-2 uppercase">
          Proceso de adopción
        </h1>
        <hr />
      </div>

      <div className="flex gap-1">
        {/* ACTUALIZACIÓN DE TIMELINE*/}
        <div className="bg-white w-1/3 border rounded-md shadow-md p-2">
          <form action="" onSubmit={onTimelineUpdate}>
            <div className="flex flex-col">
              <label className="mb-1">Descripción</label>
              <input
                type="text"
                className="input input-bordered input-sm mb-2 "
                name="descripcion"
                value={descripcion || ""}
                onChange={onUserInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Estado</label>
              <select
                className="select select-bordered w-full max-w-xs mb-2"
                onChange={(e) => setestadoSeleccionado(e.target.value)}
                value={estadoSeleccionado}
                disabled
                //gender !== "" ? gender : generoSeleccionado
              >
                <option disabled value="">
                  Selecciona Estado
                </option>
                <option value="A">Activo</option>
                <option value="I">Inactivo</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Fecha Inicio</label>
              <input
                type="date"
                className="input input-bordered input-sm mb-2"
                name="fecha_inicio"
                value={fecha_inicio || ""}
                onChange={onUserInputChange}
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Fecha Final</label>
              <input
                type="date"
                className="input input-bordered input-sm mb-2"
                name="fecha_final"
                value={fecha_final || ""}
                onChange={onUserInputChange}
                disabled
              />
            </div>

            {/* <div className="flex justify-center mt-2 ">
              <button
                type="submit"
                className="border  bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer"
              >
                Actualizar
              </button>
            </div> */}
          </form>
        </div>

        {/* ACTUALIZACIÓN DE ESTADO FASES*/}
        <div className="bg-white w-2/3 border rounded-md shadow-md p-2">
          <h2 className="text-xl font-bold mb-2">FASES</h2>
          <hr />

          <div className="overflow-x-auto">
          <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Etapa</th>
                  <th>Estado</th>
                  <th className="px-10">Acción</th>
                </tr>
              </thead>
              <tbody>
                {adoptanteTimeline.fases !== undefined
                  ? adoptanteTimeline.fases.map((fase, index) => (
                      <tr key={fase.id}>
                        <td>{index + 1}</td>
                        <td>{fase.fase.nombre}</td>
                        <td>
                          {fase.estado === "E"
                            ? "Espera"
                            : fase.estado === "A"
                            ? "Aprobado"
                            : fase.estado === "S"
                            ? "Suspendido"
                            : fase.estado === "N"
                            ? "Negado"
                            : ""}
                        </td>
                        <td>
                          <button
                            //className="border  bg-orange-400 p-2  px-4 rounded-md text-white font-bold uppercase cursor-pointer"
                            
                            className={`border p-2 px-4 rounded-md font-bold uppercase cursor-pointer ${
                              index > 0 && adoptanteTimeline.fases[index - 1].estado !== "A"
                                ? "bg-gray-400 text-gray-500" 
                                : "bg-orange-400 text-white" 
                            }`}
                            onClick={() => openModal(fase)}
                            disabled={
                              index > 0 &&
                              adoptanteTimeline.fases[index - 1].estado !==
                                "A"
                            }
                          >
                            Ver Etapa
                          </button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
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
          <h2 className="text-xl font-bold p-2">{nombreFaseSeleccionada}</h2>
          <hr />
          <form action="" className="p-2" onSubmit={updateFaseSeleccionada}>
            <div className="flex flex-col mb-3">
              <div className="flex flex-col">
                <label>Estado</label>
                <select
                  className="select select-bordered w-1/2"
                  value={estadoFase || ""}
                  onChange={(e) => setestadoFase(e.target.value)}
                >
                  <option value="" disabled>
                    Seleccione el estado
                  </option>
                  <option value="A">Aprobado</option>
                  <option value="S">Suspendido</option>
                  <option value="E">Espera</option>
                  {/* <option value="N">Negado</option> */}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-1">Fecha Inicio</label>
                <input
                  type="date"
                  className="input input-bordered input-sm mb-2 w-1/2"
                  name="fechainicioFase"
                  value={fechainicioFase || ""}
                  onChange={(e) => setfechainicioFase(e.target.value)}
                  disabled={nombreFaseSeleccionada=="Formulario"?true:false}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1">Fecha Final</label>
                <input
                  type="date"
                  className="input input-bordered input-sm mb-2 w-1/2"
                  name="fechafinalFase"
                  value={fechafinalFase || ""}
                  onChange={(e) => setfechafinalFase(e.target.value)}
                  disabled={nombreFaseSeleccionada=="Formulario"?true:false}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Comentarios</label>
                <textarea
                  className="textarea textarea-bordered"
                  cols="5"
                  rows="2"
                  name="comentarios"
                  value={comentariosFase || ""}
                  onChange={(e) => setcomentariosFase(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button className="border bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer">
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
/* 

 <div key={fase.id} className="p-3 flex justify-between">
                  <label className="w-1/3">{fase.fase.nombre}</label>
                  <label className="w-1/3">
                    {fase.estado === "E"
                      ? "Espera"
                      : fase.estado === "A"
                      ? "Aprobado"
                      : fase.estado === "S"
                      ? "Suspendido"
                      : fase.estado === "N"
                      ? "Negado"
                      : ""}{" "}
                  </label>

                  <button>Ver Etapa</button>
                </div>

*/
