import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Funcionario, { funcoes } from './Model';
import { Requisicao, errorMsg } from "../Requisicao";
export default function Handle()
{
  // variables and states declarations;
  const History = useNavigate();
  const { state } = useLocation();
  const [stateMat, setMat] = React.useState(state ? state.matricula : 0);
  const [stateNom, setNom] = React.useState(state ? state.nome_colaborador : "");
  const [stateFun, setFun] = React.useState(state ? state.funcao : 0);
  const [stateAdm, setAdm] = React.useState(state ? state.admissao : "");
  const [confir, setConfir] = React.useState(false);
  const [listaAvisos, setlistaAvisos] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
    // hight level functions declarations;
  const onCloseModal = () => {
    if(listaAvisos[0] == "Funcionário não encontrado!") History('/Funcionario');
    if(listaAvisos[0] == "Funcionário excluído!") History('/Funcionario');
    if(listaAvisos[0] == "Funcionário atualizado!") History('/Funcionario');
    if(listaAvisos[0] == "Funcionário cadastrado!") History('/Funcionario');
    setlistaAvisos([]);
    setShowModal(false);
  }
  const updateLista = (msg) => {
    let newarr = listaAvisos;
    newarr.push(msg);
    setlistaAvisos(newarr);
  }
  const sendFuncionario = async () => {
    const funcionario = new Funcionario(stateNom, stateMat, stateFun, stateAdm);
    if(!funcionario.isValidFuncionario())
    {
      setlistaAvisos(funcionario.errors);
      setShowModal(true);
      return;
    }
    let body = JSON.stringify(funcionario);
    let verbo = state ? "PUT" : "POST";
    let param = state ? [state.matricula] : [];
    const res = await Requisicao("Funcionario", verbo, body, param);
    switch(res.status) {
      case 201: setlistaAvisos(["Funcionário cadastrado!"]); break;
      case 204: setlistaAvisos(["Funcionário atualizado!"]); break;
      case 409:
        setlistaAvisos([
          "Matrícula informada está cadastrada com outro funcionário!",
          "Verifique o funcionário já existente com essa matrícula!"
        ]); break;
      default: setlistaAvisos(errorMsg); break;
    }
    setShowModal(!showModal);
  }
  const delFuncionario = async () => {
    if(!confir) {
      setlistaAvisos([
        "Deseja realmente excluir esse funcionario?",
        "Clique novamente no botão 'Excluir' para confirmar!"
      ]);
      setShowModal(true);
      setConfir(true);
      return;
    }
    const res = await Requisicao("Funcionario", "DELETE", null, [state.matricula]);
    switch(res.status) {
      case 204: setlistaAvisos(["Funcionário excluído!"]); break;
      case 404: setlistaAvisos(["Funcionário não encontrado!"]); break;
      default: setlistaAvisos(errorMsg); break;
    }
    setShowModal(!showModal);
  }
  return (
    <>
      {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
      <div className="card p-2 m-2">
      <div className="row">
        <div className="form-group my-2 col-4">
          <label>Matrícula Light:</label>
          <input className="form-control" type="number" value={stateMat} onChange={(e) => {setMat(e.target.value);}} required/>
        </div>
        <div className="form-group py-2 col-8">
          <label>Nome do colaborador:</label>
          <input type="text" className="form-control" value={stateNom} onChange={(e) => {setNom(e.target.value);}} required/>
        </div>
      </div>
      <div className="row">
        <div className="form-group py-2 col-4">
          <label>Data de admissão:</label>
          <input type="date" className="form-control" onChange={ (e) => {setAdm}} required disabled={state}/>
        </div>
        <div className="form-group py-2 col-8">
          <label>Função do colaborador:</label>
          <select value={stateFun} className="form-control" onChange={(e) => {setFun(Number(e.target.value));}}>
          {funcoes.map((f, i) => ( <option key={i} value={i}>{f}</option> ))}
          </select>
      </div>
        </div>
        <div className="form-group py-2">
          <input type="button" className="btn btn-primary btn-block" value="Enviar" onClick={sendFuncionario}/>
          <input type="button" className="btn btn-secondary btn-block" value="Voltar" onClick={() => {History('/Funcionario')}}/>
          {state && <input type="button" className="btn btn-danger btn-block" value="Excluir" onClick={delFuncionario}/>}
        </div>
      </div>
    </>
  );
}