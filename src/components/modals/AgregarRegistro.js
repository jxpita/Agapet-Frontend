import React, { useState } from "react";
import { ApiModulos } from "../../services/apiModulos";
import CrearAnimales from "../modals/crearAnimales/CrearAnimales";
import CrearEvento from "../modals/crearEvento/CrearEvento";

import "./AgregarRegistro.css";



const AgregarRegistro = (props) => {
    
    const [currentModule,] = useState(window.location.pathname.split("/")[1]);
    
    
    if (!props.showModal) {
        return null;
    }
    
    const handleCreateRegister = async (data) => {

        if (currentModule === "eventos") {
            // form-data
            let formData = new FormData();
            formData.append("tituloEvento", data.tituloEvento);
            formData.append("fechaInicio", data.fechaInicio);
            formData.append("fechaFin", data.fechaFin);
            formData.append("descripcion", data.descripcion);
            formData.append("tipoEvento", data.tipoEvento);
            formData.append("lugarEvento", data.lugarEvento);
            formData.append("estado", data.estado);
            formData.append("imagenPromocional", data.imagenPromocional);
            let response = await ApiModulos[currentModule].post(formData);
        }
        else{
            let response = await ApiModulos[currentModule].post(data);
        }
    }
    
    const selectedForm = (currentObject) => {
        switch (currentObject) {
            case "animales":
                return <CrearAnimales 
                    handleCreateRegister={handleCreateRegister}
                />
            case "eventos":
                return <CrearEvento 
                    handleCreateRegister={handleCreateRegister}
                />
            default:
                return <h1>Formulario no encontrado</h1>
        }
    }

    return (
        <div className="modal">
            <div className="modal__overlay" onClick={props.onCloseModal}></div>
            <div className="modal__content">
                <button className="modal__content__form__close" onClick={props.onCloseModal}>X</button>
                {
                    selectedForm(currentModule)
                }
            </div>
        </div>
    );
}

export default AgregarRegistro;