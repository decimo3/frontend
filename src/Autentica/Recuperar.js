import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { Requisicao, errorMsg } from "../Requisicao";
import { isValidMatricula, isValidName } from "../Funcionario/Model";
import Autenticacao from "./Model";
class VerificarInfo {
  constructor(admissao, matricula, nome_colaborador) {
    this.admissao = admissao;
    this.matricula = new Number(matricula);
    this.nome_colaborador = nome_colaborador;
  }
  isValidRecuperarInfo() {
    if(!isValidName(this.name)) return false;
    if(!isValidMatricula(this.matricula)) return false;
    if(!RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).test(this.admissao)) return false;
    return true;
  }
}
export default function Recuperar() {
  const History = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [listaAvisos, setListaAviso] = React.useState([]);
  const [mat, setMat] = React.useState();
  const [date, setDate] = React.useState();
  const [nome, setNome] = React.useState('');
  const [temp, setTemp] = React.useState('');
  function onCloseModal() {
    if(listaAvisos[0] == "Informações verificadas!") {
      History('/Usuario/TrocarSenha', {state: temp});
    }
  }
  async function verificarInfo() {
    let r = new VerificarInfo(date, mat, nome);
    if(!r.isValidRecuperarInfo()) {
      setListaAviso([
        "Informações inseridas incorretamente!",
        "Verifique o preenchimento e tente novamente."
      ]);
      setShowModal(!showModal);
      return;
    }
    let data = JSON.stringify(r);
    let res = await Requisicao("/Funcionario/Verificar", "POST", data, null);
    switch(res.status) {
      case 200:
        let s = await res.json();
        let data = new Autenticacao(r.matricula, s.palavra);
        let body = JSON.stringify(data);
        await Requisicao("/Autenticacao", "POST", body, null);
        setTemp(s);
        setListaAviso(["Informações verificadas!"]);
      break;
      case 404: setListaAviso([
        "As informações não batem!",
        "Verifique e tente novamente"
      ]); break;
      default: setListaAviso(errorMsg); break;
    }
    setShowModal(!showModal);
  }
  return (
    <>
      {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
      <main className="card w-50 start-50 translate-middle-x p-4 m-2">
        <h2 className="text-center">Trocar a senha:</h2>
        <hr/>
        <label>Matrícula Light:</label>
        <input type="number" className="form-control my-2" onChange={ (e) => {setMat(e.target.value)} } />
        <label>Data de admissão:</label>
        <input type="date" className="form-control my-2" onChange={ (e) => {setDate(e.target.value)} } />
        <label>Nome completo:</label>
        <input type="text" className="form-control my-2" onChange={ (e) => {setNome(e.target.value)} } />
        <input type="button" className="btn btn-primary btn-block my-2" value="Enviar" onClick={() => {verificarInfo();}} />
        <input type="button" className="btn btn-secondary my-2" value="Voltar" onClick={ () => { History('/Usuario'); } } />
      </main>
    </>
  );
}