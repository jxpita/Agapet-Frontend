import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import AdminGrid from "../layout/adminGrid";
import Login from "../views/login/Login";
import Dashboard from "../views/dashboard/Dashboard";
import Colaboradores from "../views/colaboradores/Colaboradores";
import Animales from "../views/animales/Animales";
import RegistroVisualizador from "../views/registroVisualizador/RegistroVisualizador";
import Eventos from "../views/eventos/Eventos";
import Clientes from "../views/clientes/Clientes";
import NotFound from "../views/notFound/NotFound";

const CreateRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/dashboard" element={
                    <AdminGrid>
                        <Dashboard />
                    </AdminGrid>
                } />

                <Route path="/colaboradores" element={
                    <AdminGrid>
                        <Colaboradores />
                    </AdminGrid>
                } />

                <Route path="/colaboradores/:id" element={
                    <AdminGrid>
                        <RegistroVisualizador />
                    </AdminGrid>
                } />

                <Route path="/animales" element={
                    <AdminGrid>
                        <Animales />
                    </AdminGrid>
                } />

                <Route path="/animales/:id" element={
                    <AdminGrid>
                        <RegistroVisualizador />
                    </AdminGrid>
                } />

                <Route path="/eventos" element={
                    <AdminGrid>
                        <Eventos />
                    </AdminGrid>
                } />

                <Route path="/clientes" element={
                    <AdminGrid>
                        <Clientes />
                    </AdminGrid>
                } />

                <Route path="/clientes/:id" element={
                    <AdminGrid>
                        <RegistroVisualizador />
                    </AdminGrid>
                } />

                <Route path="/perfil" element={
                    <AdminGrid>
                        <Outlet />
                    </AdminGrid>
                } />

                <Route path="/configuracion" element={
                    <AdminGrid>
                        <Outlet />
                    </AdminGrid>
                } />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default CreateRoutes;