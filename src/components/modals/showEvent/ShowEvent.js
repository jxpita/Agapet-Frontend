import React from "react";
import "./ShowEvent.css";

const ShowEvent = (props) => {
    
    if (!props.showModal) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal__overlay" onClick={props.onCloseModal}></div>
            <div className="modal__content">
            <button className="modal__content__form__close" onClick={props.onCloseModal}>X</button>
                <div className="modal__content__form">
                    <div className="modal__content__form__header">
                        <h2>Evento</h2>
                    </div>
                    <div className="modal__content__form__body">
                        <div className="modal__content__form__body__row">
                            <div className="modal__content__form__body__row__col">
                                <label>Nombre</label>
                                <input type="text" value={props.currentEvent.title} disabled />
                            </div>
                            <div className="modal__content__form__body__row__col">
                                <label>Fecha de inicio</label>
                                <input type="text" value={props.currentEvent.start} disabled />
                            </div>
                        </div>
                        <div className="modal__content__form__body__row">
                            <div className="modal__content__form__body__row__col">
                                <label>Fecha de fin</label>
                                <input type="text" value={props.currentEvent.end} disabled />
                            </div>
                        </div>
                    </div>
                    <div className="modal__content__form__footer">
                        <button onClick={props.onCloseModal}>Cerrar</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ShowEvent;