import React, { useState } from "react";


const CrearEvento = ({handleCreateRegister}) => {

    const [eventoData, setEventoData] = useState({
        "tituloEvento":"",
        "fechaInicio":"",
        "fechaFin":"",
        "descripcion":"",
        "tipoEvento":"adopcion",
        "lugarEvento":"",
        "estado":"activado",
        "imagenPromocional":""
    })

    const handleChangeEventoData = (e) => {
        setEventoData({
            ...eventoData,
            [e.target.name]: e.target.value
        })
    }

    return ( 
        <div className="modal__content__form">
            <h3>Crear nuevo evento</h3>

            <div className="form__group">
                <label
                className="form__label"
                htmlFor="tituloEvento"
                >Titulo del evento</label>
                <input type="text" name="tituloEvento" onChange={handleChangeEventoData}/>
            </div>

            <div className="form__group">
                <label
                className="form__label"
                htmlFor="fechaInicio"
                >Fecha de inicio</label>
                <input type="date" name="fechaInicio" onChange={handleChangeEventoData}/>
            </div>

            <div className="form__group">
                <label
                className="form__label"
                htmlFor="fechaFin"
                >Fecha de fin</label>
                <input type="date" name="fechaFin" onChange={handleChangeEventoData}/>
            </div>

            <div className="form__group">
                <label
                className="form__label"
                htmlFor="descripcion"
                >Descripcion del evento</label>
                <input type="text" name="descripcion" onChange={handleChangeEventoData}/>
            </div>

            <div className="form__group">
                <label
                className="form__label"
                htmlFor="tipoEvento"
                >Tipo de evento</label>
                <select name="tipoEvento" onChange={handleChangeEventoData}>
                    <option value="adopcion">Adopcion</option>
                    <option value="campaña">Campaña</option>
                    <option value="voluntariado">Voluntariado</option>
                </select>
            </div>

            <div className="form__group">
                <label
                className="form__label"
                htmlFor="lugarEvento"
                >Lugar del evento</label>
                <input type="text" name="lugarEvento" onChange={handleChangeEventoData}/>
            </div>

            <div className="form__group">
                <label
                className="form__label"
                htmlFor="estado"
                >Estado del evento</label>
                <select name="estado" onChange={handleChangeEventoData}>
                    <option value="activado">Activado</option>
                    <option value="desactivado">Desactivado</option>
                </select>
            </div>

            <div className="form__group">
                <label
                className="form__label"
                htmlFor="imagenPromocional"
                >Imagen promocional</label>
                <input type="file" name="imagenPromocional" onChange={handleChangeEventoData}/>
            </div>

            <div className="form__group">
                <button
                className="btn__submit"
                onClick={() => handleCreateRegister(eventoData)}
                >Crear evento</button>
            </div>
        </div>
     );
}
 
export default CrearEvento;