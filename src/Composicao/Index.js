import React from "react";
import { Route, Routes } from "react-router-dom";
import Read from "./Read";
import Handle from "./Handle";
import Send from "./Send";
import { Autorizacao } from "../Requisicao";
import Proibido from "../_Shared/Proibido";
export default function Composicao() {
  return (
    <Routes>
      <Route path="/" element={<Read/>}/>
      <Route path="/Edit" element={Autorizacao() ? <Handle/> : <Proibido/>} />
      <Route path="/Create" element={Autorizacao() ? <Handle/> : <Proibido/>} />
      <Route path="/Send" element={Autorizacao() ? <Send/> : <Proibido/>} />
      <Route path="/Result" element={Autorizacao() ? <Read/> : <Proibido/>} />
    </Routes>
  );
}