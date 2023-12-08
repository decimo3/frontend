import React from "react";
import { Route, Routes } from 'react-router-dom';
import Autenticar from "./Autenticar";
import Autenticado from "./Autenticado";
import { getCookie } from "../_Shared/Cookie";
export default function Usuario()
{
  return (
      <Routes>
        <Route path="/" element={getCookie("MeuCookie") ? <Autenticado/> : <Autenticar/>} />
      </Routes>
  );
}