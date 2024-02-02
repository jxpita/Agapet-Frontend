import React, {useState, useEffect} from 'react';
import VisualizadorDict from "../../../locales/visualizadorDict";
import { Tooltip } from 'react-tooltip';
import "./CrearAnimales.css";

const language = "es";

const CrearAnimales = ({handleCreateRegister}) => {
    const [animalData, setAnimalData] = useState({
        "nombreAnimal":"",
        "fechaNacimiento":"",
        "sexo":"",
        "peso":"",
        "esterilizado":false,
        "origen":"",
        "disponibleParaAdopcion":false,
        "alimento":[],
        "tipoAnimal":1
    })

    const handleChangeAnimalData = (e) => {
        setAnimalData({
            ...animalData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="modal__content__form">
            <h3>Crear nuevo animal</h3>

            <div className="form__group">
                <Tooltip id="nombreAnimal" />
                <label
                className="form__label"
                htmlFor="nombreAnimal"
                data-tooltip-id="nombreAnimal"
                data-tooltip-content={VisualizadorDict[language]["animales"]["nombreAnimal"]["detail"]}
                >{VisualizadorDict[language]["animales"]["nombreAnimal"]["title"]}</label>
                <input type="text" name="nombreAnimal" onChange={handleChangeAnimalData}/>
            </div>

            <div className="form__group">
                <Tooltip id="fechaNacimiento" />
                <label
                className="form__label"
                htmlFor="fechaNacimiento"
                data-tooltip-id="fechaNacimiento"
                data-tooltip-content={VisualizadorDict[language]["animales"]["fechaNacimiento"]["detail"]}
                >{VisualizadorDict[language]["animales"]["fechaNacimiento"]["title"]}</label>
                <input type="date" name="fechaNacimiento" onChange={handleChangeAnimalData}/>
            </div>

            <div className="form__group">
                <Tooltip id="sexo" />
                <label
                className="form__label"
                htmlFor="sexo"
                data-tooltip-id="sexo"
                data-tooltip-content={VisualizadorDict[language]["animales"]["sexo"]["detail"]}
                >{VisualizadorDict[language]["animales"]["sexo"]["title"]}</label>
                <select name="sexo" onChange={handleChangeAnimalData}>
                    <option value="macho">Macho</option>
                    <option value="hembra">Hembra</option>
                </select>
            </div>

            <div className="form__group">
                <Tooltip id="peso" />
                <label
                className="form__label"
                htmlFor="peso"
                data-tooltip-id="peso"
                data-tooltip-content={VisualizadorDict[language]["animales"]["peso"]["detail"]}
                >{VisualizadorDict[language]["animales"]["peso"]["title"]}</label>
                <input type="number" name="peso" onChange={handleChangeAnimalData}/>
            </div>

            <div className="form__group">
                <Tooltip id="esterilizado" />
                <label
                className="form__label"
                htmlFor="esterilizado"
                data-tooltip-id="esterilizado"
                data-tooltip-content={VisualizadorDict[language]["animales"]["esterilizado"]["detail"]}
                >{VisualizadorDict[language]["animales"]["esterilizado"]["title"]}</label>
                <select name="esterilizado" onChange={handleChangeAnimalData}>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
            </div>

            <div className="form__group">
                <Tooltip id="origen" />
                <label
                className="form__label"
                htmlFor="origen"
                data-tooltip-id="origen"
                data-tooltip-content={VisualizadorDict[language]["animales"]["origen"]["detail"]}
                >{VisualizadorDict[language]["animales"]["origen"]["title"]}</label>
                <select name="origen" onChange={handleChangeAnimalData}>
                    <option value="adoptado">Adoptado</option>
                    <option value="rescatado">Rescatado</option>
                    <option value="comprado">Comprado</option>
                </select>
            </div>

            <div className="form__group">
                <Tooltip id="disponibleParaAdopcion" />
                <label 
                className="form__label"
                htmlFor="disponibleParaAdopcion"
                data-tooltip-id="disponibleParaAdopcion"
                data-tooltip-content={VisualizadorDict[language]["animales"]["disponibleParaAdopcion"]["detail"]}
                >{VisualizadorDict[language]["animales"]["disponibleParaAdopcion"]["title"]}</label>
                <select name="disponibleParaAdopcion" onChange={handleChangeAnimalData}>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
            </div>

            <div className="form__group">
                <Tooltip id="tipoAnimal" />
                <label 
                className="form__label"
                htmlFor="tipoAnimal"
                data-tooltip-id="tipoAnimal"
                data-tooltip-content={VisualizadorDict[language]["animales"]["tipoAnimal"]["detail"]}
                >{VisualizadorDict[language]["animales"]["tipoAnimal"]["title"]}</label>
                <select name="tipoAnimal" onChange={handleChangeAnimalData}>
                    <option value={1}>Perro</option>
                    <option value={2}>Gato</option>
                </select>
            </div>
            
            <button className="btn__add btn__form__location" onClick={() =>handleCreateRegister(animalData) }>Crear</button>
        </div>
    )
}

export default CrearAnimales;