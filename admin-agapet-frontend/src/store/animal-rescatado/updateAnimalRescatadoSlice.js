import { createSlice } from '@reduxjs/toolkit';

export const updateAnimalRescatadoSlice = createSlice({
    name: 'updateAnimalRescatadoSlice',
    initialState: {  
        nombre:'',
        estado:'',
        peso:'',
        comida:'',
        deportivo:0,
        jugueton:0,
        sociable:0,
        miedoso:0,
        genero:'',
        anios:0,//edad
        meses:0,
        descripcion:'',
        image64:"",
        idanimal:null,
        esterilizado:'',
        fecha_esterilizado:'',//yyyy-mm-aa,
        lugar_esterilizado:'',
        descripcion_esterilizado:'',
        desparacitado:'',
        fecha_desparacitado:'',
        lugar_desparacitado:'',
        descripcion_desparacitado:''
    },
    reducers: {  
        updateAnimalInfoForm:(state,{payload})=>{

            state.nombre=payload.nombre;
            state.estado=payload.estado;
            state.peso=payload.peso;
            state.comida=payload.comida;
            state.deportivo=payload.deportivo;
            state.jugueton=payload.jugueton;
            state.sociable=payload.sociable;
            state.miedoso=payload.miedoso;
            state.genero=payload.genero;
            state.anios=payload.anios,
            state.meses=payload.meses;
            state.descripcion=payload.descripcion;
            state.image64=payload.image64;
            state.idanimal=payload.idanimal

        },
        updateAnimalEsterilizacionForm:(state,{payload})=>{

            state.esterilizado=payload.esterilizado;
            state.fecha_esterilizado=payload.fecha_esterilizado;
            state.lugar_esterilizado=payload.fecha_esterilizado;
            state.descripcion_esterilizado=payload.descripcion_esterilizado;
        },
        
        updateAnimalDesparacitadoForm:(state,{payload})=>{

            state.desparacitado=payload.desparacitado;
            state.fecha_desparacitado=payload.fecha_desparacitado;
            state.lugar_desparacitado=payload.lugar_desparacitado;
            state.descripcion_desparacitado=payload.descripcion_desparacitado;
        },

        onSendUpdateAnimalTotalForm:()=>{
            
        }
    },
});

export const {updateAnimalInfoForm,updateAnimalEsterilizacionForm,updateAnimalDesparacitadoForm} = updateAnimalRescatadoSlice.actions;