import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAPI } from "../api/authAPI";
import {
  checkingCredentials,
  clearErrorMessage,
  login,
  logout,
} from "../store/auth/authSlice";

export const useAuthstore = () => {

  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {

    console.log({ email, password });
    dispatch(checkingCredentials());

    try {
      const resp = await authAPI.post("login", { email, password });
      console.log(resp);
    
      if(resp.data.user_type=="ADP"){
        dispatch(logout("Usuario no permitido"));
        return;
      }


      localStorage.setItem("jwt", resp.data.access);
      localStorage.setItem("refresh", resp.data.refresh);
      //user_type
      localStorage.setItem("name", resp.data.name);
      localStorage.setItem("user_type", resp.data.user_type);

      //si es colaborador obtengo id
      localStorage.setItem("idColaborador",resp.data.idColaborador);
      localStorage.setItem("idAdministrador",resp.data.idAdministrador);

      dispatch(login(resp.data.name));
    } catch (error) {

      dispatch(logout("Credenciales no válidas"));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {

    const jwt = localStorage.getItem("jwt");
    const refresh = localStorage.getItem("refresh");

    if (!jwt) return dispatch(logout());

    try {

      const resp = await authAPI.post("token/refresh", { refresh });
      localStorage.setItem("jwt", resp.access);
      dispatch(login());

    } catch (error) {

      localStorage.clear();
      dispatch(logout());
      
    }
  };

  return {
    status,
    user,
    errorMessage,

    startLogin,
    checkAuthToken,
  };
};
