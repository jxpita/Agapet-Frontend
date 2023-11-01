import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { vacunasAPI } from "../../../../api/vacunasAPI";

export const EditarVacuna = () => {
  const { id } = useParams();

  const [vacuna, setvacuna] = useState({});

  const loadInfoVacuna = async () => {
    const resp = await vacunasAPI.get(`vacunadetail/${id}`);
    console.log(resp.data);
    setvacuna(resp.data);
  };

  useEffect(() => {
    loadInfoVacuna();
  }, []);


  const {nombre_vacuna, descripcion_vacuna, idAdministrador, idColaborador}=vacuna;

  const onVacunaInputChange = (e) => {
    setvacuna({ ...vacuna, [e.target.name]: e.target.value });
  };


  const onSubmit =async(e)=>{
    e.preventDefault();

    try {
      console.log(vacuna)

      const vacunaUpdate={
        nombre_vacuna:nombre_vacuna,
        descripcion_vacuna:descripcion_vacuna,
        //idAdministrador:idAdministrador !== null ? Number(idAdministrador) : null,
        //idColaborador:idColaborador !== null ? Number(idColaborador) : null,
      }
  
      await vacunasAPI.put(`updatevacuna/${id}`, vacunaUpdate);


    } catch (error) {
      console.log(error);
    }
   
  }



  return (
    <>
      <div className="mt-4">
        <div className="w-full mt-10 p-2 ">
          <h1 className="text-xl font-bold mx-2 uppercase">Editar Vacuna</h1>
          <hr />
        </div>

        <div className="flex justify-center">
          <div className="mt-10 bg-white p-7 border rounded-md shadow-md flex justify-center">
            <form action="" onSubmit={onSubmit}>

            <div className="flex flex-col p-2">
              <label htmlFor="nombre_vacuna" className="font-bold mb-2">Nombre</label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered "
                name="nombre_vacuna"
                value={nombre_vacuna || ""}
                onChange={onVacunaInputChange}
              />
            </div>
            <div className="flex flex-col mt-4 p-2 ">
            <label htmlFor="descripcion_vacuna" className="font-bold mb-2">
              Descripción
            </label>
            <textarea
              className="textarea textarea-bordered "
              placeholder=""
              cols="10"
              rows="5"
              name="descripcion_vacuna"
              value={descripcion_vacuna || ""}
              onChange={onVacunaInputChange}
            ></textarea>
          </div>


          <div className="flex justify-center mb-2">
            <button
              className="mt-2 border bg-orange-400 p-2 rounded-md text-white font-bold uppercase cursor-pointer w-1/2"
              type="submit"
            >
              Editar
            </button>
          </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
