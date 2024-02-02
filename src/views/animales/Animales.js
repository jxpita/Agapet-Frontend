import React, {useEffect, useState} from 'react';
import { GetAnimales } from '../../services/api';
import TableTemplateView from '../../components/tableTemplateView/TableTemplateView';
import './Animales.css';

const Animales = () => {

    const [animales, setAnimales] = useState([]);

    useEffect(() => {
        fetchAnimales()
    }
    , [setAnimales])

    const fetchAnimales = async () => {
        const data = await GetAnimales();
        setAnimales(data);
    }

    return (
        <div className="display-flex">
            <div className="display-flex__header">
                <h1>Animales</h1>
                <span/>
            </div>
            <div className="display-flex__table">
                <TableTemplateView 
                    headers={["Nombre", "Fecha de nacimiento", "Sexo", "Tipo", "Origen", "Estado"]}
                    fields={["nombreAnimal","fechaNacimiento","sexo","tipoAnimal.tipoAnimal","origen","estado"]}
                    data={animales}
                />
            </div>
        </div>
    );
}
 
export default Animales;