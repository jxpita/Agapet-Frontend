import React, { useEffect, useState } from "react";
import { animalAPI } from "../../../../api/animalAPI";
import { tr } from "date-fns/locale";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { timelineAPI } from "../../../../api/timelineAPI";

export const AsignarAnimal = () => {
  const [animalesDisponibles, setanimalesDisponibles] = useState([]);

  const [animalSeleccionado, setanimalSeleccionado] = useState({});

  const idColaborador = localStorage.getItem("idColaborador");
  const idAdministrador = localStorage.getItem("idAdministrador");

  const navigate = useNavigate();

  const { id } = useParams();

  const getAnimalesDisponibles = async () => {
    const resp = await animalAPI.get("listmascota");
    setanimalesDisponibles(resp.data);
  };

  useEffect(() => {
    getAnimalesDisponibles();
  }, []);

  const seleccionarAnimal = async (mascota) => {
    const {
      idpet,
      nombre,
      genero,
      adopted,
      descripcion,
      image64,
      edad,
      peso,
      comida,
      deportivo,
      jugueton,
      sociable,
      miedoso,
      esterilizado,
      fecha_esterilizado,
      lugar_esterilizado,
      descripcion_esterilizado,
      desparacitado,
      fecha_desparacitado,
      lugar_desparacitado,
      descripcion_desparacitado,
      is_active,
      adoptante,
      animal,
    } = mascota;

    const mascotaUpate = {
      idpet,
      nombre,
      genero,
      adopted,
      descripcion,
      image64,
      edad,
      peso,
      comida,
      deportivo,
      jugueton,
      sociable,
      miedoso,
      esterilizado,
      fecha_esterilizado,
      lugar_esterilizado,
      descripcion_esterilizado,
      desparacitado,
      fecha_desparacitado,
      lugar_desparacitado,
      descripcion_desparacitado,
      is_active,
      adoptante: Number(id),
      animal: animal.idanimal,
    };

    try {
      Swal.fire({
        title: "Está seguro/a de asignar esta mascota?",
        text: "No se puede reversar esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Asignar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Mascota asignada",
            "El usuario podrá ver la mascota asignada en la aplicación móvil",
            "success"
          ).then(async () => {
            await animalAPI.put(`updatemascota/${idpet}`, mascotaUpate); //idmascota
            
            //timeline/timelinecreate

            await timelineAPI.post('timelinecreate',{
              descripcion:`Proceso de adopción de ${nombre}`,
              idAdoptante:Number(id),
              idpet:idpet,
              idAdministrador:idAdministrador !== undefined ? Number(idAdministrador) : null,
              idColaborador:idColaborador !== undefined ? Number(idColaborador) : null,
            })

            navigate(-1);
          });
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Lo siento, ha ocurrido un error",
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    /* 
    
    try {
      const resp=await animalAPI.get(`updatemascota/${id}`);
      setanimalSeleccionado(resp.data);      
    } catch (error) {
      console.log(error);
    }
    
    
    */
  };

  return (
    <>
      <div className="w-full mt-10 p-2 ">
        <h1 className="text-xl font-bold mx-2 uppercase">
          Mascotas Disponibles
        </h1>
        <hr />
      </div>

      <div className="overflow-x-auto mt-16 mx-2  border rounded-md shadow-md font-bold">
        <table className="table bg-white ">
          <thead className="bg-table-header text-black text-center">
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Genero</th>
              <th>Acción</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="text-center font-semibold">
            {animalesDisponibles.map((mascota) =>
              mascota.adoptante === null && mascota.estado === "S" ? (
                <tr key={mascota.idpet}>
                  <td>
                    <div className="flex justify-center">
                      <img
                        src={`${mascota.image64}`}
                        className="h-[100px] w-[100px] object-contain rounded-full "
                      />
                    </div>
                  </td>
                  <td>{mascota.nombre}</td>
                  <td>{mascota.genero === "M" ? "Macho" : "Hembra"}</td>
                  <td>
                    <div className="flex justify-center">
                      <img
                        src="/src/assets/seleccion.png"
                        className="h-[32px] w-[32px] cursor-pointer "
                        onClick={() => seleccionarAnimal(mascota)}
                      />
                    </div>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

/*
 <td>
              <div className="flex justify-center">
                <img
                  src="/src/assets/seleccion.png"
                  className="h-[32px] w-[32px] cursor-pointer "
                  onClick={seleccionarAnimal}
                />
              </div>
            </td>

*/
