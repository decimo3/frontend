import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { atividade, regional } from './Utils';
import { baseURL } from "../Environment";
import Modal from "../Modal";
export default function Edit()
{
  const { state } = useLocation();
  const History = useNavigate();
  const [stateDia, setDia] = React.useState(state.dia);
  const [stateAdesivo, setAdesivo] = React.useState(state.adesivo);
  const [statePlaca, setPlaca] = React.useState(state.placa);
  const [stateRecurso, setRecurso] = React.useState(state.recurso);
  const [stateAtividade, setAtividade] = React.useState(state.atividade);
  const [stateMat1, setMat1] = React.useState(state.id_motorista);
  const [stateMat2, setMat2] = React.useState(state.id_ajudante);
  const [stateElet1, setElet1] = React.useState(state.motorista);
  const [stateElet2, setElet2] = React.useState(state.ajudante);
  const [stateTel, setTel] = React.useState(state.telefone);
  const [stateMat3, setMat3] = React.useState(state.id_supervisor);
  const [stateSup, setSup] = React.useState(state.supervisor);
  const [stateReg, setReg] = React.useState(state.regional);
  const [confir, setConfir] = React.useState(false);
  const [listaAvisos, setlistaAvisos] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const onCloseModal = () => {
    if(listaAvisos[0] == "Composição não encontrada!") History('/Composicao');
    if(listaAvisos[0] == "Composição excluída!") History('/Composicao');
    setlistaAvisos([]);
    setShowModal(false);
  }
  const updateLista = (msg) => {
    let newarr = listaAvisos;
    newarr.push(msg);
    setlistaAvisos(newarr);
  }
  // TODO: =====================================
  const editComposicao = async () => {
    if(true)
    {
      updateLista("O nome digitado não é válido!");
    }
    if(true)
    {
      updateLista("O número de matrícula inserida não é válida!");
    }
    if(listaAvisos.length > 0) {
      setShowModal(true);
      return;
    }
    const data = JSON.stringify({
      dia: stateDia
    })
    const req = {
      method: "PUT",
      body: data,
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    const res = await fetch(`${baseURL}/Composicao`, req)
    .then((r) => {
      if (r.status === 204) {
        updateLista("Composição atualizada!");
        setShowModal(true);
        return;
      }
      if(r.status === 404) {
        updateLista("Composição não encontrado!");
        updateLista(r.text);
        setShowModal(true);
        return;
      }
      updateLista("Algo de errado aconteceu. Tente novamente ou verifique com o administrador!");
      updateLista(r.text);
      setShowModal(true);
      return;
    })
    .catch((r) => {
      updateLista("Algo de errado aconteceu. Tente novamente ou verifique com o administrador!");
      updateLista(r);
      setShowModal(true);
      return;
    });
  }
  const delComposicao = async () => {
    if(!confir) {
      updateLista("Deseja realmente excluir essa composição?");
      updateLista("Clique novamente no botão 'Excluir' para confirmar!");
      setShowModal(true);
      setConfir(true);
      return;
    }
    return await fetch(`${baseURL}/Composicao/${stateDia}${stateRecurso}`, {method: "DELETE"})
      .then((r) => {
        if (r.status === 204) {
          updateLista("Composição excluída!");
          setShowModal(true);
          return;
        }
        if(r.status === 404) {
          updateLista("Composição não encontrado!");
          updateLista(r.text);
          setShowModal(true);
          return;
        }
        updateLista("Algo de errado aconteceu. Tente novamente ou verifique com o administrador!");
        updateLista(r);
        setShowModal(true);
        return;
      })
      .catch((r) => {
        updateLista("Algo de errado aconteceu. Tente novamente ou verifique com o administrador!");
        updateLista(r);
        setShowModal(true);
        return;
      });
  }
  return (
    <>
      {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
      <form className="form-control p-2 m-2">
        <div className="row py-2">
          <div className="form-group col-4">
            <label>Dia:</label>
            <input className="form-control" type="data" value={stateDia} onChange={(e) => {setDia(e.target.value)}}/>
          </div>
          <div className="form-group col-4">
            <label>Atividade:</label>
            <input className="form-control" type="text" value={stateAtividade} onChange={(e) => {setAtividade(e.target.value)}}/>
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
            <input className="form-control" type="number" value={stateMat1} onChange={(e) => {setMat1(e.target.value)}}/>
          </div>
          <div className="form-group col-8">
            <label>Motorista:</label>
            <input className="form-control" type="text" value={stateElet1} onChange={(e) => {setElet1(e.target.value)}}/>
          </div>
        </div>
        <div className="row py-2">
          <div className="form-group col-4">
            <label>Mat. 2:</label>
            <input className="form-control" type="number" value={stateMat2} onChange={(e) => {setMat2(e.target.value)}}/>
          </div>
          <div className="form-group col-8">
            <label>Ajudante:</label>
            <input className="form-control" type="text" value={stateElet2} onChange={(e) => {setElet2(e.target.value)}}/>
          </div>
        </div>
        <div className="row py-2">
          <div className="form-group col-4">
            <label>Mat. Sup.:</label>
            <input className="form-control" type="number" value={stateMat3} onChange={(e) => {setMat3(e.target.value)}}/>
          </div>
          <div className="form-group col-8">
            <label>Supervisor:</label>
            <input className="form-control" type="text" value={stateSup} onChange={(e) => {setSup(e.target.value)}}/>
          </div>
        </div>
        <div className="form-group">
          <label>Regional:</label>
          <input className="form-control" type="text" value={stateReg} onChange={(e) => {setReg(e.target.value)}}/>
        </div>
        <div className="form-group py-2">
          <input type="button" className="btn btn-primary btn-block" value="Enviar" onClick={editComposicao}/>
          <input type="button" className="btn btn-secondary btn-block" value="Voltar" onClick={() => {History('/Composicao')}}/>
          <input type="button" className="btn btn-danger btn-block" value="Excluir" onClick={delComposicao}/>
        </div>
      </form>
    </>
  );
}