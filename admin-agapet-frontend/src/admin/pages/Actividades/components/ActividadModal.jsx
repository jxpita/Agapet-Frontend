import React, { useEffect } from "react";
import { useState } from "react";

import Modal from "react-modal";
import DatePicker from "react-datepicker";

import "../components/ActividadModal.css";
import "react-datepicker/dist/react-datepicker.css";

import { useForm } from "../../../../hooks/useForm";
import { addHours, differenceInSeconds } from "date-fns";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import { useUiActividades } from "../../../../hooks/useUiActividades";
import { useActividadesStore } from "../../../../hooks/useActividadesStore";
registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "60%",
    right: "900px",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    with: "500px",
  },
};

Modal.setAppElement("#root");

const ActividadFormValidations = {
  title: [(value) => value.length > 0, "El titulo es obligatorio"],
};

export const ActividadModal = () => {
  const { isActividadModalOpen, closeDateModal } = useUiActividades();
  const { activeEvent, startSavingEvent } = useActividadesStore();


  const idColaborador = localStorage.getItem("idColaborador");
  const idAdministrador = localStorage.getItem("idAdministrador");



  const [ActividadForm, setActividadForm] = useState({
    title: "",
    lugar: "",
    descripcion: "",
    start: new Date(),
    end: addHours(new Date(), 2), //ob
  });

  const closeModal = () => {
    closeDateModal();
  };

  const onActividadFormChange=(e)=>{
    setActividadForm({...ActividadForm,[e.target.name]:e.target.value})
  }

  const onDateChanged =(e,changing)=>{
    setActividadForm({...ActividadForm,[changing]:e});
  }

  /*
  const { title, lugar, descripcion, onInputChange, titleValid } = useForm(
    ActividadForm,
    ActividadFormValidations
  );

*/


  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  const [formSubmitted, setformSubmitted] = useState(false);

 useEffect(() => {
   
  if(activeEvent!==null){
    setActividadForm({...activeEvent});
  }
   
 },[activeEvent])
 
  const onSubmit =async (e) => {
    e.preventDefault();
    setformSubmitted(true);

    const difference = differenceInSeconds(ActividadForm.end,ActividadForm.start);

    if (ActividadForm.title.length <= 0) return;

  
    if (difference <= 0 || isNaN(difference)) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }

 
    //console.log(ActividadForm)

    const actividad={
      title:ActividadForm.title,
      descripcion:ActividadForm.descripcion,
      lugar:ActividadForm.lugar,
      start:ActividadForm.start,
      end:ActividadForm.end,
      colaborador:
          idColaborador !== undefined ? Number(idColaborador) : null,
      administrador:
          idAdministrador !== undefined ? Number(idAdministrador) : null,
    }


    await startSavingEvent(actividad);
    closeDateModal();
    setformSubmitted(false);

  };

  return (
    <Modal
      isOpen={isActividadModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName="modal-fondo"
    >
      <h1 className="text-xl font-bold mb-2"> Nueva Actividad</h1>
      <hr />
      <form className="p-2" onSubmit={onSubmit}>
        <div className="flex flex-col mb-2">
          <label className="font-semibold">Fecha y hora inicio</label>
          <DatePicker
            locale="es"
            selected={ActividadForm.start}
            className="input input-bordered"
            onChange={(e) => onDateChanged(e,'start')}
            showTimeSelect
            dateFormat="Pp"
            timeCaption="Hora"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="font-semibold">Fecha y hora fin</label>
          <DatePicker
            locale="es"
            minDate={ActividadForm.start}
            selected={ActividadForm.end}
            className="input input-bordered"
            onChange={(e) => onDateChanged(e,'end')}
            showTimeSelect
            dateFormat="Pp"
            timeCaption="Hora"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="font-semibold">Título</label>
          <input
            type="text"
            className="input input-bordered mb-2"
            placeholder="Título de la actividad"
            name="title"
            autoComplete="off"
            value={ActividadForm.title}
            onChange={onActividadFormChange}
          />
{/* 
          {formSubmitted && titleValid ? (
            <div className="alert alert-error mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{titleValid}</span>
            </div>
          ) : null} */}
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-semibold">Lugar</label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Lugar"
            name="lugar"
            autoComplete="off"
            value={ActividadForm.lugar}
            onChange={onActividadFormChange}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="font-semibold">Información Adicional</label>
          <textarea
            type="text"
            className="border p-4"
            placeholder="Notas"
            rows="5"
            name="descripcion"
            value={ActividadForm.descripcion}
            onChange={onActividadFormChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="border bg-orange-400 text-white p-2 rounded-md  font-bold uppercase cursor-pointer w-full"
        >
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
