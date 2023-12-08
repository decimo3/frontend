import React from "react";
import { Route, Routes } from 'react-router-dom';
import Autentica from "./Autentica";
import Usuario from "./Usuario";
import { getCookie } from "../_Shared/Cookie";
export default function Funcionario()
{
  return (
      <Routes>
        {getCookie("MeuCookie") ? 
        <Route path="/" element={<Usuario/>} />
        :
        <Route path="/" element={<Autentica/>} />
        }
      </Routes>
  );
}