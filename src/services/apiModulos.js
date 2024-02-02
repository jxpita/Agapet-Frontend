import { GetAnimal, PutAnimal, PostAnimal, GetColaborador, GetCliente, 
    PutCliente, PostCliente, PostEvento, PutEvento, GetEvento} from './api';


export const ApiModulos = {
    "animales": {
        "getById": GetAnimal,
        "put": PutAnimal,
        "post": PostAnimal,
    },
    "colaboradores": {
        "getById": GetColaborador,
        "put": PutCliente,
        "post": PostCliente,
    },
    "clientes": {
        "getById": GetCliente,
        "put": PutCliente,
        "post": PostCliente,
    },
    "eventos": {
        "getById": GetEvento,
        "put": PutEvento,
        "post": PostEvento,
    },
}