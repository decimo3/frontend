import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Composicao, { atividade, regional } from './Model';
import Modal from "../Modal";
import Requisicao, { errorMsg } from "../Requisicao";
export default function Handle()
{
  const { state } = useLocation();
  const History = useNavigate();
  const [stateDia, setDia] = React.useState(state ? state.dia : "");
  const [stateAdesivo, setAdesivo] = React.useState(state ? state.adesivo : 0);
  const [statePlaca, setPlaca] = React.useState(state ? state.placa : "");
  const [stateRecurso, setRecurso] = React.useState(state ? state.recurso : "");
  const [stateAtividade, setAtividade] = React.useState(state ? state.atividade : 0);
  const [stateMat1, setMat1] = React.useState(state ? state.id_motorista : 0);
  const [stateMat2, setMat2] = React.useState(state ? state.id_ajudante : 0);
  const [stateElet1, setElet1] = React.useState(state ? state.motorista : "Insira a matrícula que o nome será carregado automáticamente");
  const [stateElet2, setElet2] = React.useState(state ? state.ajudante : "Insira a matrícula que o nome será carregado automáticamente");
  const [stateTel, setTel] = React.useState(state ? state.telefone : 0);
  const [stateMat3, setMat3] = React.useState(state ? state.id_supervisor : 0);
  const [stateSup, setSup] = React.useState(state ? state.supervisor : "Insira a matrícula que o nome será carregado automáticamente");
  const [stateReg, setReg] = React.useState(state ? state.regional : 0);
  const [confir, setConfir] = React.useState(false);
  const [listaAvisos, setlistaAvisos] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const onCloseModal = () => {
    if(listaAvisos[0] == "Composição não encontrada!") History('/Composicao');
    if(listaAvisos[0] == "Composição excluída!") History('/Composicao');
    if(listaAvisos[0] == "Composição cadastrada!") History('/Composicao');
    if(listaAvisos[0] == "Composição atualizada!") History('/Composicao');
    setlistaAvisos([]);
    setShowModal(false);
  }
  const nomeColaborador = async (mat, campo) => {
    let valor = "";
    if(mat.length == 7) {
      const res = await Requisicao("Funcionario", "GET", null, Number(mat));
      if(res.status === undefined) {
        setlistaAvisos(errorMsg);
        setShowModal(!showModal);
        valor = "Não foi possível consultar o colaborador";
      }
      else {
        if(res.status != 200) {
          valor = "A matrícula não foi encontrada!";
        }
        else {
          let f = await res.json();
          valor = f.nome_colaborador;
        }
      }
    }
    else {
      valor = "A matrícula inserida é inválida!";
    }
    switch(campo) {
      case 'mot': setElet1(valor); break;
      case 'aju': setElet2(valor); break;
      case 'sup': setSup(valor); break;
      default:
        setlistaAvisos(errorMsg);
        setShowModal(!showModal);
      break;
    }
  }
  // TODO: =====================================
  const sendComposicao = async () => {
    let composicao = new Composicao(stateDia, stateAdesivo, statePlaca, stateRecurso, stateAtividade, stateElet1, stateMat1, stateElet2, stateMat2, stateTel, stateMat3, stateSup, stateReg);
    if(!composicao.isValidComposicao())
    {
      setlistaAvisos(composicao.errors);
      setShowModal(!showModal);
      return;
    }
    let body = JSON.stringify(composicao);
    let verbo = state ? "PUT" : "POST";
    let param = state ? `${state.dia}/${state.recurso}` : null;
    const res = await Requisicao("Composicao", verbo, body, param);
    switch(res.status) {
      case 201: setlistaAvisos(["Composição cadastrada!"]); break;
      case 204: setlistaAvisos(["Composição atualizada!"]); break;
      case 409:
        setlistaAvisos([
          "O recurso informado já está cadastrado nesse dia!",
          "Verifique a composição desse dia para esse recurso!"
        ]); break;
      default: setlistaAvisos(errorMsg); break;
    }
    setShowModal(!showModal);
  }
  const delComposicao = async () => {
    if(!confir) {
      setlistaAvisos([
        "Deseja realmente excluir essa composição?",
        "Clique novamente no botão 'Excluir' para confirmar!"
      ]);
      setShowModal(true);
      setConfir(true);
      return;
    }
    const res = await Requisicao("Composicao", "DELETE", null, `${state.dia}/${state.recurso}`);
    switch(res.status) {
      case 204: setlistaAvisos(["Composição excluída!"]); break;
      case 404: setlistaAvisos(["Composição não encontrada!"]); break;
      default: setlistaAvisos(errorMsg); break;
    }
    setShowModal(!showModal);
  }
  return (
    <>
      {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
      <form className="form-control p-2 m-2">
        <div className="row py-2">
          <div className="form-group col-4">
            <label>Dia:</label>
            <input type="date" className="form-control" value={stateDia} onChange={(e) => {setDia(e.target.value)}}/>
          </div>
          <div className="form-group col-4">
            <label>Atividade:</label>
            <select value={stateAtividade} className="form-control" onChange={(e) => { setAtividade(e.target.value); }}>
              {atividade.map((a, i) => ( <option value={i} key={i}>{a}</option> ))}
            </select>
          </div>
          <div className="form-group col-4">
            <label>Recurso:</label>
            <input className="form-control" type="text" value={stateRecurso} onChange={(e) => {setRecurso(e.target.value)}}/>
          </div>
        </div>
        <div className="row py-2">
          <div className="form-group col-4">
            <label>Telefone:</label>
            <input className="form-control" type="number" value={stateTel} onChange={(e) => {setTel(e.target.value)}}/>
          </div>
          <div className="form-group col-4">
            <label>Adesivo:</label>
            <input className="form-control" type="number" value={stateAdesivo} onChange={(e) => {setAdesivo(e.target.value)}}/>
          </div>
          <div className="form-group col-4">
            <label>Placa:</label>
            <input className="form-control" type="text" value={statePlaca} onChange={(e) => {setPlaca(e.target.value)}}/>
          </div>
        </div>
        <div className="row py-2">
          <div className="form-group col-4">
            <label>Mat. 1:</label>
            <input className="form-control" type="number" value={stateMat1} onChange={(e) => { setMat1(e.target.value); nomeColaborador(e.target.value, "mot"); }}/>
          </div>
          <div className="form-group col-8">
            <label>Motorista:</label>
            <input className="form-control" type="text" value={stateElet1} disabled/>
          </div>
        </div>
        <div className="row py-2">
          <div className="form-group col-4">
            <label>Mat. 2:</label>
            <input className="form-control" type="number" value={stateMat2} onChange={(e) => { setMat2(e.target.value); nomeColaborador(e.target.value, "aju"); }}/>
          </div>
          <div className="form-group col-8">
            <label>Ajudante:</label>
            <input className="form-control" type="text" value={stateElet2} disabled/>
          </div>
        </div>
        <div className="row py-2">
          <div className="form-group col-4">
            <label>Mat. Sup.:</label>
            <input className="form-control" type="number" value={stateMat3} onChange={(e) => { setMat3(e.target.value); nomeColaborador(e.target.value, "sup"); }}/>
          </div>
          <div className="form-group col-8">
            <label>Supervisor:</label>
            <input className="form-control" type="text" value={stateSup} disabled/>
          </div>
        </div>
        <div className="form-group">
          <label>Regional:</label>
          <select value={stateReg} className="form-control" onChange={(e) => { setReg(e.target.value); }}>
              {regional.map((a, i) => ( <option value={i} key={i}>{a}</option> ))}
            </select>
        </div>
        <div className="form-group py-2">
          <input type="button" className="btn btn-primary btn-block" value="Enviar" onClick={sendComposicao}/>
          <input type="button" className="btn btn-secondary btn-block" value="Voltar" onClick={() => {History('/Composicao')}}/>
          {state && <input type="button" className="btn btn-danger btn-block" value="Excluir" onClick={delComposicao}/>}
        </div>
      </form>
    </>
  );
}