import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Modal";
import { Requisicao, errorMsg } from "../Requisicao";
class trocarSenha {
  constructor(atual, nova, confirmacao) {
    this.atual = atual;
    this.nova = nova;
    this.confirmacao = confirmacao;
  }
}
export default function TrocarSenha() {
  const History = useNavigate();
  const { state } = useLocation();
  const [usr, setUsr] = React.useState();
  const [psw0, setPwd0] = React.useState('');
  const [psw1, setPwd1] = React.useState('');
  const [psw2, setPwd2] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [listaAvisos, setListaAviso] = React.useState([]);
  function onCloseModal() {
    if(listaAvisos[0] == "Senha trocada com sucesso!") {
      History('/Usuario');
    }
  }
  async function alterarPalavra() {
    let t = new trocarSenha(psw0, psw1, psw2);
    if(!t.isValidTrocarSenha()) {
      setListaAviso([
        "A senha inserida não é válida!",
        "Verifique e tente novamente."
      ]);
      setShowModal(!showModal);
      return;
    }
    let data = JSON.stringify(t);
    let res = await Requisicao("Autenticacao", "PUT", data, null);
    switch(res.status) {
      case 204: setListaAviso(["Senha trocada com sucesso!"]); break;
      case 401: setListaAviso(["A senha anterior não confere!"]); break;
      default: setListaAviso(errorMsg); break;
    }
    setShowModal(!showModal);
  }
  return (
    <>
      {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
      <main className="card w-50 start-50 translate-middle-x p-4 m-2">
        <label>Senha antiga:</label>
        <input type="password" className="form-control text-right my-2" onChange={(e) => { setPwd0(e.target.value); }} />
        <label>Trocar a senha:</label>
        <input type="password" className="form-control text-right my-2" onChange={(e) => { setPwd1(e.target.value); }} />
        <label>Repita a senha:</label>
        <input type="password" className="form-control text-right my-2" onChange={(e) => { setPwd2(e.target.value); }} />
        <input type="button" className="btn btn-primary my-2" value="Trocar" onClick={ ()=>{ alterarPalavra(); }} />
        <input type="button" className="btn btn-secondary my-2" value="Voltar" onClick={ () => { History('/Usuario'); } } />
      </main>
    </>
  );
}