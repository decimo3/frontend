import React from "react";
import { useLocation } from "react-router-dom";

export default function Edit()
{
  const [stateMat, setStateMat] = React.useState("d-none");
  const [stateNom, setStateNom] = React.useState("d-none");
  let { state } = useLocation()
  return (
      <form className="form-control">
        <div className="form-group my-2">
          <label>Matrícula Light:</label>
          <input className="form-control" type="number" value={state.matricula}/>
          <p className={stateMat}>O matrícula digitada é inválida!</p>
        </div>
        <div className="form-group py-2">
          <label>Nome do colaborador:</label>
          <input type="text" className="form-control" value={state.nome_colaborador}/>
          <p className={stateNom}>O nome digitado é inválido!</p>
        </div>
        <div className="form-group py-2">
          <label>Função do colaborador:</label>
          <select className="form-control">
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