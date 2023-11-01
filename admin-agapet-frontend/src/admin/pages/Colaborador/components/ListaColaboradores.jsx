import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAPI } from "../../../../api/userAPI";
import Swal from "sweetalert2";

export const ListaColaboradores = () => {
  const [colaboradores, setcolaboradores] = useState([]);



  const loadColaboradores = async () => {
    try {
      const result = await userAPI.get("colaboradorlist");
      setcolaboradores(result.data);
      console.log(result.data)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadColaboradores();
  }, []);

  const desactivarColaborador = async (id) => {
    try {
      const { data } = await userAPI.get(`/colaboradores/${id}`);

      const colaboradorDesactivado = {
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        direccion: data.direccion,
        fecha_nacimiento: data.fecha_nacimiento,
        telefono: data.telefono,
        id: data.id,
        password: data.password,
        activo: false,
      };

      Swal.fire({
        title: "Está seguro de realizar esta acción?",
        text: "Se procederá a eliminar el colaborador seleccionado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Eliminado!",
            "El colaborador ha sido eliminado",
            "success"
          ).then(async () => {
            await userAPI.put(`/colaboradores/${id}`,colaboradorDesactivado);
            window.location.reload();
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
  };

  return (
    <div className="overflow-x-auto mt-16 mx-2  border rounded-md shadow-md font-bold">
      <table className="table bg-white ">
        <thead className="bg-table-header text-black text-center">
          <tr>
            <th>Nombre</th>
            <th>Perfil</th>
            <th>Eliminar</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {
            colaboradores.map((colab)=>(
              <tr key={colab.idColaborador}>
                <td>{colab.user.name}</td>
                <td>
                  <div className="flex justify-center">
                    <Link to={`perfil-colaborador/${colab.idColaborador}`}>
                      <img
                        src="../src/assets/user.png"
                        className="h-[32px] w-[32px] cursor-pointer"
                      />
                    </Link>
                  </div>
                </td>          
                <td>
                  <div className="flex justify-center">
                    <img
                      src="../src/assets/bin.png"
                      className="h-[32px] w-[32px] cursor-pointer "
                    />
                  </div>
                </td>
              </tr>
            ))


          }
        </tbody>
      </table>
    </div>
  );
};

/*

 onClick={() => desactivarColaborador(colab.id)}
      <td>
                  <div className="flex justify-center">
                    <img
                      src="../src/assets/edit.png"
                      className="h-[32px] w-[32px] cursor-pointer"
                    />
                  </div>
                </td>

{colaboradores.map((colab, index) =>
            colab.activo ? (
              <tr key={colab.id}>
                <td>{colab.nombre}</td>
                <td>
                  <div className="flex justify-center">
                    <Link to={`perfil-colaborador/${colab.id}`}>
                      <img
                        src="../src/assets/user.png"
                        className="h-[32px] w-[32px] cursor-pointer"
                      />
                    </Link>
                  </div>
                </td>

                <td>
                  <div className="flex justify-center">
                    <img
                      src="../src/assets/edit.png"
                      className="h-[32px] w-[32px] cursor-pointer"
                    />
                  </div>
                </td>
                <td>
                  <div className="flex justify-center">
                    <img
                      src="../src/assets/bin.png"
                      className="h-[32px] w-[32px] cursor-pointer "
                     
                    />
                  </div>
                </td>
              </tr>
            ) : null
          )}




*/