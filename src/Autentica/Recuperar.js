import React from "react";
export default function Recuperar() {
  return (
    <>
      <main className="card w-50 start-50 translate-middle-x p-4 m-2">
        <h2 className="text-center">Trocar a senha:</h2>
        <hr/>
        <label>Data de admissão:</label>
        <input type="date" className="form-control"/>
        <label>Nome completo:</label>
        <input type="text" className="form-control"/>
        <input type="button" className="btn btn-secondary btn-block"/>
      </main>
    </>
  );
}