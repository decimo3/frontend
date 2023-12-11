import React from "react";
import { Route, Routes } from 'react-router-dom';
import Autenticar from "./Autenticar";
import Autenticado from "./Autenticado";
import TrocarSenha from "./TrocarSenha";
import Recuperar from "./Recuperar";
import { getCookie } from "../_Shared/Cookie";
export default function Usuario()
{
  return (
      <Routes>
        <Route path="/" element={getCookie("MeuCookie") ? <Autenticado/> : <Autenticar/>} />
        <Route path="/TrocarSenha" element={<TrocarSenha/>} />
        <Route path="/Recuperar" element={<Recuperar/>} />
      </Routes>
  );
}