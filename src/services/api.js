import Axios from 'axios';

const axiosRequest = async ({url, method = 'get', data = null}) => {
    try {
        const response = await Axios({ url, method, data });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error de respuesta del servidor:", error.response.status);
            throw new Error(`Error ${error.response.status} en la solicitud`);
        } else if (error.request) {
            console.error("Error de solicitud: No se recibió respuesta del servidor");
            throw new Error("Error de solicitud: No se pudo establecer conexión con el servidor");
        } else {
            console.error("Error:", error.message);
            throw new Error("Error desconocido al intentar realizar la solicitud");
        }
    }
};

export const GetColaboradores = () => {
    return axiosRequest({url: "http://localhost:8000/modulos/usuariocolaborador/"});
};

export const GetColaborador = (id) => {
    return axiosRequest({url: `http://localhost:8000/modulos/usuariocolaborador/${id}`});
};

export const GetAnimales = () => {
    return axiosRequest({url: "http://localhost:8000/modulos/animal/"});
};

export const GetAnimal = (id) => {
    return axiosRequest({url: `http://localhost:8000/modulos/animal/${id}`});
};

export const PutAnimal = (id, data) => {
    return axiosRequest({url: `http://localhost:8000/modulos/animal/${id}/`, method: 'put', data});
};

export const PostAnimal = (data) => {
    return axiosRequest({url: "http://localhost:8000/modulos/animal/", method: 'post', data});
};

export const GetClientes = () => {
    return axiosRequest({url: "http://localhost:8000/modulos/usuariocliente/"});
};

export const GetCliente = (id) => {
    return axiosRequest({url: `http://localhost:8000/modulos/usuariocliente/${id}`});
};

export const PutCliente = (id, data) => {
    return axiosRequest({url: `http://localhost:8000/modulos/usuario/${id}/`, method: 'put', data});
};

export const PostCliente = (data) => {
    return axiosRequest({url: "http://localhost:8000/modulos/usuario/", method: 'post', data});
};

export const GetEventos = () => {
    return axiosRequest({url: "http://localhost:8000/modulos/evento/"});
};

export const GetEvento = (id) => {
    return axiosRequest({url: `http://localhost:8000/modulos/evento/${id}`});
};

export const PutEvento = (id, data) => {
    return axiosRequest({url: `http://localhost:8000/modulos/evento/${id}/`, method: 'put', data});
};

export const PostEvento = (data) => {
    return axiosRequest({url: "http://localhost:8000/modulos/evento/", method: 'post', data});
};
