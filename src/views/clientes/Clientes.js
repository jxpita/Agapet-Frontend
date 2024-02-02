import React, { useState, useEffect } from "react";
import { GetClientes } from "../../services/api";
import TableTemplateView from "../../components/tableTemplateView/TableTemplateView";
import "./Clientes.css";

const Clientes = () => {

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        fetchClientes()
    }
        , [setClientes])

    const fetchClientes = async () => {
        const data = await GetClientes();
        setClientes(data);
    }

    return (
        <div className="display-flex">
            <div className="display-flex__header">
                <h1>Clientes</h1>
                <span />
            </div>
            <div className="display-flex__table">
                <TableTemplateView
                    headers={["Nombre", "Apellido", "Correo", "Teléfono", "Dirección"]}
                    fields={["first_name", "last_name", "email", "perfil.telefono", "perfil.direccion"]}
                    data={clientes}
                />
            </div>
        </div>
    );
}

export default Clientes;