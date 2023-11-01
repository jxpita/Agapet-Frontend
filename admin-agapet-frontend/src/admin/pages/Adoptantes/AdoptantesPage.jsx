import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userAPI } from "../../../api/userAPI";



export const AdoptantesPage = () => {

  const [adoptantes, setadoptantes] = useState([]);

  const loadAdoptantes =async()=>{
    const resp= await userAPI.get("adoptanteslist");
    console.log(resp.data);
    setadoptantes(resp.data);
  }

  useEffect(() => {
    loadAdoptantes();
  }, [])


  
  
  return (
    <>
      <div className="w-full mt-5 p-2 ">
        <h1 className="text-xl font-bold mx-2 uppercase">Adoptantes</h1>
        <hr />
      </div>

      <div className="bg-white mx-2 p-2 flex gap-4 mt-6 mb-5">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full mt-2"
        />
        <img
          src="../src/assets/search.png"
          alt=""
          className="h-[32px] w-[32px] mt-4"
        />
      </div>

      {/* <div className="flex flex-wrap justify-around">
        {adoptantes.map((adoptante,index) => (

          <div className="bg-white border rounded-md flex justify-around shadow-md mb-2 w-1/3" key={adoptante.idAdoptante}>
            <div className="flex items-center">
              <img
                src={adoptante.imagen64!==""?adoptante.imagen64:'/src/assets/user.png'}
                alt=""
                className="h-[120px] w-[120px] object-contain rounded-full "
              />
            </div>

            <div className="flex flex-col  p-3">

              <div className="flex flex-col">
                <span className="font-bold">Nombre</span>
                <span> {adoptante.user.name}</span>
              </div>

              <div className="flex flex-col">
                  <span className="font-bold">Correo</span>
                  <span> {adoptante.user.email}</span>
              </div>

              <div className="flex flex-col">
                  <span className="font-bold">Dirección</span>
                  <span>{adoptante.user.direction}</span>
              </div>

              <div className="flex flex-col">
                  <span className="font-bold">Teléfono</span>
                  <span>{adoptante.user.phone}</span>
              </div>

              <div className="flex justify-end font-bold ">
                <Link className="border-b-2 border-b-orange-500" to={`perfil-adoptante/${adoptante.idAdoptante}`}>Ver Perfil</Link>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      <div className="overflow-x-auto mt-16 mx-2  border rounded-md shadow-md font-bold">
      <table className="table bg-white ">
      <thead className="bg-table-header text-black text-center">
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            {/* <th>Etapa</th>
            <th>Estado</th> */}
            <th>Perfil</th>
            
          </tr>
        </thead>
        <tbody className="text-center font-semibold"> 
        {
          adoptantes?.map((adp)=>(
            <tr key={adp.idAdoptante}>
               <td>
                <div className="flex justify-center">
                  <img
                    src={`${adp.imagen64}`}
                    className="h-[100px] w-[100px] object-cover rounded-full "
                  />
                </div>
              </td>
              <td>{adp.user.name}</td>
              <td>{adp.user.email}</td>
              <td>{adp.user.direction}</td>
              <td>{adp.user.phone}</td>
              
              <td className="underline">
                <Link to={`perfil-adoptante/${adp.idAdoptante}`}>Ver Perfil</Link>
              </td>
            </tr>
          ))
        }
        
        
        
        </tbody>



      </table>

      </div>


      {/* <div className="avatar">
        <div className="w-24 rounded-full">
          <img src="../src/assets/user.png" />
        </div>
      </div> */}
    </>
  );
};
