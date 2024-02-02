import React from "react";
import { useNavigate } from "react-router-dom";

import { IoHome, IoPawSharp, IoPerson, IoCalendarSharp, IoSettings } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { FaHouseChimneyUser } from "react-icons/fa6";
import YoAmoAnimalesLogo from "../../assets/images/yo-amo-animales-logo.png";
import "./MySidebar.css";

const routes = [
    {
        "path": "/dashboard",
        "name": "Inicio",
        "icon": <IoHome />,
    },
    {
        "path": "/colaboradores",
        "name": "Colaboradores",
        "icon": <FaUsersGear />,
    },
    {
        "path": "/animales",
        "name": "Animales",
        "icon": <IoPawSharp />,
    },
    {
        "path": "/clientes",
        "name": "Clientes",
        "icon": <FaHouseChimneyUser />,
    },
    {
        "path": "/eventos",
        "name": "Eventos",
        "icon": <IoCalendarSharp />,
    },
    {
        "path": "/perfil",
        "name": "Perfil",
        "icon": <IoPerson />,
    },
    {
        "path": "/configuracion",
        "name": "Configuración",
        "icon": <IoSettings />,
    }

];

const MySidebar = () => {

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <img src={YoAmoAnimalesLogo} alt="Yo Amo Animales" />
            </div>
            <div className="sidebar__menu">
                {
                    routes.map((route, index) => {
                        let currentPath = window.location.pathname;
                        return (
                            <div
                                key={index}
                                className="sidebar__menu__item"
                                style={{
                                    backgroundColor: `${currentPath.includes(route.path) ? "lightgray" : "transparent"}`,
                                    }}
                                onClick={() => handleNavigate(route.path)}
                            >
                                <div className="sidebar__menu__item__icon">
                                    {route.icon}
                                </div>
                                <div className="sidebar__menu__item__name">
                                    {route.name}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className="sidebar__footer">
                <p>Yo Amo Animales</p>
                <button className="sidebar__footer__button">Cerrar sesión</button>
            </div>
 
        </div>
    );
}

export default MySidebar;