import React from "react";
import { useLocation } from "react-router-dom";

export default function Edit()
{
  let { state } = useLocation()
  const [stateMat, setMat] = React.useState(state.matricula);
  const [stateNom, setNom] = React.useState(state.nome_colaborador);
  const [stateFun, setFun] = React.useState(state.funcao);
  return (
      <form className="form-control">
        <div className="form-group my-2">
          <label>Matrícula Light:</label>
          <input className="form-control" type="number" value={stateMat} onChange={(e) => {setMat(e.target.value);}} required/>
        </div>
        <div className="form-group py-2">
          <label>Nome do colaborador:</label>
          <input type="text" className="form-control" value={stateNom} onChange={(e) => {setNom(e.target.value);}} required/>
        </div>
        <div className="form-group py-2">
          <label>Função do colaborador:</label>
          <select value={stateFun} className="form-control" onChange={(e) => {setFun(e.target.value);}}>
            <option value="0">Eletricista</option>
            <option value="1">Supervisor</option>
          </select>
        </div>
        <div className="form-group py-2">
          <input type="button" className="btn btn-primary btn-block" value="Enviar"/>
          <input type="button" className="btn btn-danger btn-block" value="Excluir"/>
        </div>
      </form>
  );
}