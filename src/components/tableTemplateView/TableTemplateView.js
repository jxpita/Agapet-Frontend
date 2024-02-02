import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import AgregarRegistro from "../modals/AgregarRegistro";
import './TableTemplateView.css';

const TableTemplateView = (props) => {

    const navigate = useNavigate();

    //Implementation of dinamic pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage,] = useState(20);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
        setFilteredData(props.data.slice(indexOfFirstItem, indexOfLastItem));
    }, [setFilteredData, props.data, indexOfFirstItem, indexOfLastItem])

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
        let currentList = [];
        let newList = [];
        if (e.target.value !== "") {
            currentList = props.data;
            newList = currentList.filter(item => {
                const lc = item.email.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = props.data;
        }
        setFilteredData(newList);
    }

    const handleClickPage = (event) => {
        setCurrentPage(Number(event.target.id));
    }

    const pages = [];

    for (let i = 1; i <= Math.ceil(props.data.length / itemsPerPage); i++) {
        pages.push(i);
    }

    useEffect(() => {
        setFilteredData(props.data.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage, setFilteredData, props.data, indexOfFirstItem, indexOfLastItem])


    const renderPageNumbers = pages.map(number => {
        return (
            <li key={number} id={number} onClick={handleClickPage} className={currentPage === number ? 'page__numbers__active' : ''}>
                {number}
            </li>
        );
    });

    const handlePrevBtn = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setFilteredData(props.data.slice(indexOfFirstItem, indexOfLastItem));
        }
    }

    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);
        setFilteredData(props.data.slice(indexOfFirstItem, indexOfLastItem));
    }

    const handleEditBtn = (item) => {
        let currentPath = window.location.pathname.split("/")[1];
        let myId = Object.keys(item)[0];
        navigate(`/${currentPath}/${item[myId]}`);
    }

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="table__actions">
                <button className="btn__add" onClick={handleShowModal}>Agregar</button>
                <input type="text" placeholder="Buscar Email" value={search} onChange={(e) => { onChangeSearch(e) }} />
            </div>

            <div className="table__container">
                <table>
                    <thead>
                        <tr>
                            {
                                props.headers.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))
                            }
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.length === 0 ? <tr><td colSpan={props.headers.length + 1}>No hay datos</td></tr> : ""
                        }
                        {
                            filteredData.map((item) => (
                                <tr key={Object.values(item)[0]}>
                                    {
                                        props.fields.map((field) => (
                                            //compatible with nested objects
                                            field.split('.').length > 1 ?
                                                <td key={field}>{item[field.split('.')[0]][field.split('.')[1]]}</td>
                                                :
                                                <td key={field}>{item[field]}</td>
                                        ))
                                    }
                                    <td>
                                        <button className="btn__action" onClick={() => handleEditBtn(item)}><IoOpenOutline /></button>
                                        <button className="btn__action"><MdDelete /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <div className="table__pagination">
                    <ul className="page__numbers">
                        <li>
                            <button onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}>Prev</button>
                        </li>
                        {renderPageNumbers}
                        <li>
                            <button onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>Next</button>
                        </li>
                    </ul>
                </div>
            <AgregarRegistro
                onCloseModal={handleCloseModal}
                showModal={showModal}
            />
            </div>
        </>
    );
}

export default TableTemplateView;