import React from "react";
import { Navbar } from "../components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { ColaboradorPage } from "./Colaborador/ColaboradorPage";
import { AnimalesRescatados } from "./AnimalesRescatados/AnimalesRescatados";
import { AdoptantesPage } from "./Adoptantes/AdoptantesPage";
import { ActividadesPage } from "./Actividades/ActividadesPage";
import { CursosPage } from "./Cursos/CursosPage";
import { VacunasPage } from "./Vacunas/VacunasPage";
import { PreguntasFrecuentesPage } from "./PreguntasFrecuentes/PreguntasFrecuentesPage";
import { DashboardPage } from "./Dashboard/DashboardPage";
import { FormularioInformación } from "./AnimalesRescatados/components/FormularioInformación";
import { FormularioEsterilizacion } from "./AnimalesRescatados/components/FormularioEsterilizacion";
import { FormularioDesparacitacion } from "./AnimalesRescatados/components/FormularioDesparacitacion";
import { FormColaborador } from "./Colaborador/components/FormColaborador";
import { PerfilColaborador } from "./Colaborador/components/PerfilColaborador";
import { VacunasInoculadas } from "./AnimalesRescatados/pages/VacunasInoculadas";
import { NuevaVacuna } from "./AnimalesRescatados/components/NuevaVacuna";
import { PerfilAdoptante } from "./Adoptantes/PerfilAdoptante";
import { EditarVacuna } from "./Vacunas/components/EditarVacuna";
import { UpdateVacunaInoculada } from "./AnimalesRescatados/components/UpdateVacunaInoculada";
import { UpdateFormularioInformacion } from "./AnimalesRescatados/components/UpdateFormularioInformacion";
import { AsignarAnimal } from "./Adoptantes/components/AsignarAnimal";
import { TimelinePage } from "./Adoptantes/TimelinePage";
import { NuevaPregunta } from "./PreguntasFrecuentes/components/NuevaPregunta";
import { ConfiguracionesPage } from "./Configuraciones/ConfiguracionesPage";
import { PerfilPage } from "./Perfil/PerfilPage";

export const AdminPage = () => {

  //verificar si es admin o si es colaborador

  //get y guardarlo en un arreglo
  //permisos['animales-rescatados','']


  return (
    <>
      <div className="flex bg-background-color h-screen">
        <div className="w-1/5 bg-white ">
          <Navbar />
        </div>

        {/* Router Outlet */}


        <div className="mx-2 w-4/5 bg-background-color">
          <Routes>

            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="colaborador">
              <Route index element={<ColaboradorPage />} />
              <Route  path="nuevo-colaborador" element={<FormColaborador/>} />
              <Route path="perfil-colaborador/:id" element={<PerfilColaborador/>}/>
            </Route>

            <Route path="animales-rescatados">
              <Route index element={<AnimalesRescatados />} />
              <Route path="info-animal" element={<FormularioInformación />} />
              <Route path="perfil-animal/:id" element={<UpdateFormularioInformacion/>} />
              
              <Route path="info-esterilizacion"element={<FormularioEsterilizacion />}/>
              <Route path="info-desparacitacion" element={<FormularioDesparacitacion />}/>
              <Route path="vacunas-inoculadas/:id" element={<VacunasInoculadas/>}/>
              <Route path="vacunas-inoculadas/:id/nueva-vacuna" element={<NuevaVacuna />} />
              <Route path="vacunas-inoculadas/:id/update-vacuna/:idVacuna" element={<UpdateVacunaInoculada />} />
            </Route>

            <Route path="adoptantes" >
              <Route index element={<AdoptantesPage />}/>
              <Route path="perfil-adoptante/:id" element={<PerfilAdoptante/>}/>
              <Route path="perfil-adoptante/:id/asignar-animal" element={<AsignarAnimal/>}/>
              <Route path="perfil-adoptante/:id/timeline" element={<TimelinePage/>}/>
            </Route>


            <Route path="actividades" element={<ActividadesPage />} />
            <Route path="cursos" element={<CursosPage />} />

            <Route path="vacunas">
            <Route index element={<VacunasPage />} />
            <Route path="editar-vacuna/:id" element={<EditarVacuna />} />
            </Route>

            <Route path="preguntas-frecuentes" >
              <Route index element={<PreguntasFrecuentesPage />}/>
              <Route  path="nueva-pregunta" element={<NuevaPregunta/>} />
            </Route>


            <Route path="configuraciones" element={<ConfiguracionesPage />} />
            <Route path="perfil" element={<PerfilPage />} />

              {/* La pagina que se me carga al iniciar sesion */}
            <Route path="/*" element={<Navigate to="/dashboard" />} /> 
          </Routes>
        </div>
      </div>
    </>
  );
};
