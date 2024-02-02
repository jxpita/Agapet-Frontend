import React, {useEffect, useState} from 'react';
import { GetColaboradores } from '../../services/api';
import TableTemplateView from '../../components/tableTemplateView/TableTemplateView';
import './Colaboradores.css';

const Colaboradores = () => {

    const [colaboradores, setColaboradores] = useState([]);

    useEffect(() => {
        fetchColaboradores()
    }
    , [setColaboradores])

    const fetchColaboradores = async () => {
        const data = await GetColaboradores();
        setColaboradores(data);
    }

    return (
        <div className="display-flex">
            <div className="display-flex__header">
                <h1>Colaboradores</h1>
                <span/>
            </div>
            <div className="display-flex__table">
                <TableTemplateView 
                    headers={["Nombre", "Apellido", "Correo", "Teléfono", "Dirección"]}
                    fields={["first_name", "last_name", "email", "perfil.telefono", "perfil.direccion"]}
                    data={colaboradores}
                />
            </div>
        </div>
    );
}

export default Colaboradores;