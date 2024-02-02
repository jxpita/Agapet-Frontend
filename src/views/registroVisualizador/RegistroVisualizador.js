import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ApiModulos } from "../../services/apiModulos";
import VisualizadorDict from "../../locales/visualizadorDict";
import { Tooltip } from 'react-tooltip'
import "./RegistroVisualizador.css";


const RegistroVisualizador = () => {

    const navigate = useNavigate();

    const [elementData, setElementData] = useState({});
    const [currentModule, setCurrentModule] = useState("");

    useEffect(() => {
        fetchData()
    }, [setElementData])

    const fetchData = async () => {
        try {
            let currentPath = window.location.pathname.split("/")
            let dataModule = currentPath[1];
            setCurrentModule(dataModule);
            const id = currentPath[2];
            const apiModel = ApiModulos[dataModule];
            const data = await apiModel["getById"](id);
            setElementData(data);
        } catch (error) {
            console.error("Error, fetching data", error);
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setElementData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const inputTypeValidation = (key, value) => {
        if (typeof value === 'number') return ['number', value];
        if (key.toLowerCase().includes('password')) return ['password', value || ''];
        if (key.toLowerCase().includes('email')) return ['email', value || ''];
    
        const isDateField = key.toLowerCase().includes('fecha') || key.toLowerCase().includes('date');
        if (isDateField && typeof value === 'string') {
            const date = new Date(value);
            return value.includes('T') ? ['datetime-local', date.toISOString().slice(0, 16)] : ['date', date.toISOString().slice(0, 10)];
        }
    
        if (typeof value === 'boolean') return ['checkbox', value];
        if (key.toLowerCase().includes('fotoPerfil')) return ['file', value || ''];
    
        return ['text', value || ''];
    };

    const isObject = (value) => {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    };

    const buildInputs = (data, path = []) => {
        return Object.entries(data).flatMap(([key, value]) => {
            const fullPath = [...path, key];
            const inputName = fullPath.join('.');

            if (isObject(value)) {
                return buildInputs(value, inputName, fullPath);
            }

            const [inputType, inputValue] = inputTypeValidation(key, value);
            const labelKey = inputName.split(".").pop();
            const labelModule = currentModule === "colaboradores" ? "clientes" : currentModule;
            const labelTitle = VisualizadorDict.es[labelModule][labelKey]?.["title"] || key;
            const labelDescription = VisualizadorDict.es[labelModule][labelKey]?.["detail"] || key;
            return (
                <div key={inputName} className="form__group">
                    <Tooltip id={inputName} />
                    <label 
                    className="form__label" 
                    htmlFor={inputName}
                    data-tooltip-id={inputName}
                    data-tooltip-content={labelDescription}
                    >
                        {labelTitle}
                    </label>
                    <input
                        className="form__input"
                        type={inputType}
                        name={inputName}
                        checked={inputType === 'checkbox' ? inputValue : undefined}
                        value={inputType !== 'checkbox' ? inputValue : undefined}
                        onChange={handleChange}
                    />
                </div>
            );
        });
    };

    const inputsList = buildInputs(elementData);

    const handleBack = () => {
        let currentPath = window.location.pathname.split("/");
        let dataModel = currentPath[1];
        navigate(`/${dataModel}`);
    }

    const handleSaveConfiguration = () => {
        let currentPath = window.location.pathname.split("/");
        let dataModel = currentPath[1];
        const id = currentPath[2];
        const apiModel = ApiModulos[dataModel];
        apiModel["put"](id, elementData);
    }

    return (
        <div className="display-flex">
            <button className="btn__back" onClick={handleBack}>
                <IoMdArrowRoundBack size={"1.5rem"} />
            </button>
            <form className="form__container">
                {inputsList}
            </form>
            <div>
                <button type="submit" className="btn__submit" onClick={handleSaveConfiguration}>Save Changes</button>
            </div>
        </div>
    );
}

export default RegistroVisualizador;