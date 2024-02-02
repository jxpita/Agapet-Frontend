import React, {useState} from "react";
import MyCalendar from "../../components/myCalendar/MyCalendar";
import "./Eventos.css";
import AgregarRegistro from "../../components/modals/AgregarRegistro";

const listEventos = [
    {
        "title": "Evento 1",
        "start": new Date(2024, 0, 1),
        "end": new Date(2024, 0, 1)
    },
    {
        "title": "Evento 1",
        "start": new Date(2024, 0, 1),
        "end": new Date(2024, 0, 1)
    },
    {
        "title": "Evento 1",
        "start": new Date(2024, 0, 1),
        "end": new Date(2024, 0, 1)
    },
    {
        "title": "Evento 1",
        "start": new Date(2024, 0, 1),
        "end": new Date(2024, 0, 1)
    },
    {
        "title": "Evento 2",
        "start": new Date(2024, 0, 2),
        "end": new Date(2024, 0, 2)
    },
    {
        "title": "Evento 3",
        "start": new Date(2024, 0, 3),
        "end": new Date(2024, 0, 3)
    },
    {
        "title": "Evento 4",
        "start": new Date(2024, 0, 4),
        "end": new Date(2024, 0, 4)
    },
    {
        "title": "Evento 5",
        "start": new Date(2024, 0, 5),
        "end": new Date(2024, 0, 5)
    },
    {
        "title": "Evento 6",
        "start": new Date(2024, 0, 6),
        "end": new Date(2024, 0, 6)
    },
    {
        "title": "Evento 7",
        "start": new Date(2024, 0, 7),
        "end": new Date(2024, 0, 7)
    },
    {
        "title": "Evento 8",
        "start": new Date(2024, 0, 8),
        "end": new Date(2024, 0, 8)
    },
    {
        "title": "Evento 9",
        "start": new Date(2024, 0, 9),
        "end": new Date(2024, 0, 9)
    },
    {
        "title": "Evento 10",
        "start": new Date(2024, 0, 10),
        "end": new Date(2024, 0, 10)
    },
    {
        "title": "Evento 11",
        "start": new Date(2024, 0, 11),
        "end": new Date(2024, 0, 11)
    },
]

const Eventos = () => {

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return ( 
        <div className="eventos">
            <h1>Eventos</h1>
            <div className="eventos__actions">
                <button 
                className="btn__add" 
                onClick={handleShowModal}
                >Agregar evento</button>
            </div>
            <MyCalendar 
                myEventsList={listEventos}
            />
            <AgregarRegistro 
                showModal={showModal}
                onCloseModal={handleCloseModal}
            />
        </div>
     );
}
 
export default Eventos;