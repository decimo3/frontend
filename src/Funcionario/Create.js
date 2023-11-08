import React from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../Environment";
import { isValidName, isValidMatricula } from './Utils';
export default function Create()
{
  // variables and states declarations;
  const history = useNavigate();
  const [mat, setMat] = React.useState("");
  const [stateMat, setStateMat] = React.useState('d-none');
  const [nom, setNom] = React.useState("");
  const [stateNom, setStateNom] = React.useState('d-none');
  const [fun, setFun] = React.useState("");
  const [stateFun, setStateFun] = React.useState('d-none');
  const [redirect, setRedirect] = React.useState(null);
  // hight level functions declarations;
  async function newFuncionario(mat, nom, fun)
  {
    if(!isValidName(nom))
    {
      setStateNom('invalid-feedback');
      return "rejeitado";
    }
    if(!isValidMatricula(mat))
    {
      setStateMat('invalid-feedback');
      return "rejeitado";
    }
    const data = JSON.stringify({
      matricula: mat,
      nome_colaborador: nom,
      funcao: Number(fun)
    })
    const req = {
      method: "POST",
      body: data,
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    const res = await fetch(`${baseURL}/Funcionario`, req)
      .then((r) => {
        console.dir(r);
        return "aceitado";
      })
      .catch((r) => {
        console.error(r);
        return "rejeitado";
      });
    if (res === "aceitado") history('/Funcionario');
    if (res === "rejeitado") history('/Funcionario/Create');
  }
  return (
    <form className="card p-2 m-2">
      <div className="form-group my-2">
        <label>Matrícula Light:</label>
        <input className="form-control" type="number" value={mat} onChange={(e) => {setMat(e.target.value);}}/>
        <p className={stateMat}>O matrícula digitada é inválida!</p>
      </div>
      <div className="form-group py-2">
        <label>Nome do colaborador:</label>
        <input type="text" className="form-control" value={nom} onChange={(e) => {setNom(e.target.value);}}/>
        <p className={stateNom}>O nome digitado é inválido!</p>
      </div>
      <div className="form-group py-2">
        <label>Função do colaborador:</label>
        <select value={fun} className="form-control" onChange={(e) => {setFun(e.target.value);}}>
          <option value="0">Eletricista</option>
          <option value="1">Supervisor</option>
        </select>
        <p className={stateFun}>A função escolhida não é válida!</p>
      </div>
      <div className="form-group py-2">
        <input type="button" className="btn btn-primary btn-block" value="Enviar" onClick={() => {setRedirect(newFuncionario(mat, nom, fun))}}/>
        <input type="button" className="btn btn-white btn-block border" value="Voltar" onClick={() => {history('/Funcionario');}} />
      </div>
    </form>
  );
}