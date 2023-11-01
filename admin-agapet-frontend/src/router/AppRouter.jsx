import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { AdminPage } from '../admin/pages/AdminPage';
import { useSelector } from 'react-redux';
import { CheckingAuth } from '../auth/components/CheckingAuth';
import { useAuthstore } from '../hooks/useAuthstore';

export const AppRouter = () => {

  //const authStatus = 'authenticated'; // 'authenticated'; // 'not-authenticated';

  const{ status, checkAuthToken}=useAuthstore();


  useEffect(() => {
    checkAuthToken();
  }, [])
  

  /** 
   *  if(status == 'checking'){
    return (<h1>Verificando..</h1>)
  }
  
  */
 




  return (
    <Routes>
        {

          (status ==='authenticated') 
          ?<Route path='/*' element={<AdminPage/>} ></Route>
          :<Route path='/auth/*' element={<LoginPage />}> </Route>
          
        }

    <Route path="/*" element={ <Navigate to="/auth/login" /> } />

    </Routes>
  )
}
