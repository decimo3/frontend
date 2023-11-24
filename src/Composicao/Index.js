import React from "react";
import { Route, Routes } from "react-router-dom";
import Read from "./Read";
import Handle from "./Handle";
import Send from "./Send";
export default function Composicao() {
  return (
    <Routes>
      <Route path="/" element={<Read/>}/>
      <Route path="/Edit" element={<Handle/>}/>
      <Route path="/Create" element={<Handle/>}/>
      <Route path="/Send" element={<Send/>}/>
    </Routes>
  );
}