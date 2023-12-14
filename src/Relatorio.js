import React from "react";
import { useNavigate } from 'react-router-dom';
import { Requisicao, Carregar, errorMsg } from './Requisicao';
import Modal from "./Modal";
import Espera from "./Espera";
import { Autorizacao } from "./Requisicao";
export default function Relatorio()
{
  const History = useNavigate();
  const [rel, setRel] = React.useState([]);
  const [msg, setMsg] = React.useState("Carregando...");
  const [file, setFile] = React.useState();
  const [confir, setConfir] = React.useState(null);
  const [listaAvisos, setlistaAvisos] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [showWait, setShowWait] = React.useState(false);
  const [status, setStatus] = React.useState();
  const onCloseModal = () => {
    History('/Relatorio');
  }
  React.useEffect(() => {
    async function getRelatorios() {
      let res = await Requisicao("Servico");
      if(res.status != 200) {
        setlistaAvisos(errorMsg);
        setShowModal(!showModal);
      }
      else {
        let r = await res.json();
        if(r.length == 0) setMsg("Não há relatórios!");
        setRel(r);
      }
    }
    getRelatorios();
  }, [status]);
  const sendRelatorio = async () => {
    if(!file) {
      setlistaAvisos(["Necessário escolher algum arquivo válido!"]);
      setShowModal(!showModal);
      return;
    }
    setShowWait(!showWait);
    const res = await Carregar("Servico", file);
    switch(res.status) {
      case undefined: setlistaAvisos(errorMsg); break;
      case 422: setlistaAvisos([await res.text()]); break;
      case 201: setlistaAvisos(["Relatório enviado!"]); break;
      default: setlistaAvisos([await res.text()]); break;
    }
    setShowWait(showWait);
    setShowModal(!showModal);
    setStatus(!status);
  }
  const delRelatorio = async (arg) => {
    if(confir == arg) {
      setShowWait(!showWait);
      const res = await Requisicao("Servico", "DELETE", null, [arg]);
      switch(res.status) {
        case undefined: setlistaAvisos(errorMsg); break;
        case 204: setlistaAvisos(["Relatório excluído!"]); break;
        case 404: setlistaAvisos(["Relatório não encontrado!"]); break;
        default: setlistaAvisos(errorMsg); break;
      }
      setShowWait(showWait);
      setShowModal(!showModal);
      setStatus(!status);
      return;
    }
    if(confir != arg) {
      setlistaAvisos([
        "Deseja realmente excluir esse relatório?",
        "Clique novamente no botão 'Excluir' para confirmar!"
      ]);
      setShowModal(!showModal);
      setConfir(arg);
      return;
    }
  }
  if (rel.length === 0) {
    return (
      <>
        {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
        {Autorizacao() &&
        <div className="card p-2 m-2">
          <div className="input-group">
            <span className="input-group-text">Enviar relatório:</span>
            <input type="file" className="form-control" required accept=".csv" onChange={(e) => { setFile(e.target.files[0]); }}/>
            <button className="btn btn-secondary" type="button" onClick={sendRelatorio}>Enviar</button>
          </div>
        </div>
        }
        <div className="text-center">
          {msg}
        </div>
      </>
    );
  }
  return (
    <>
    {showWait && <Espera/>}
    {showModal && <Modal listaAvisos={listaAvisos} onClose={onCloseModal}/>}
    {Autorizacao() &&
    <div className="card p-2 m-2">
      <div className="input-group">
        <span className="input-group-text">Enviar relatório:</span>
        <input type="file" className="form-control" required accept=".csv" onChange={(e) => { setFile(e.target.files[0]); }}/>
        <button className="btn btn-secondary" type="button" onClick={sendRelatorio}>Enviar</button>
      </div>
    </div>
    }
    <main className="card m-2 p-2">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Data:</th>
            <th scope="col">Nome arquivo:</th>
            <th scope="col">Qnt. recursos:</th>
            <th scope="col">Qnt. serviços:</th>
            {Autorizacao() &&
            <th scope="col">Opções:</th>
            }
          </tr>
        </thead>
        <tbody>
          {rel.sort((a,b) => new Date(b.dia) - new Date(a.dia)).map((r) => (
            <tr scope="row" key={r.filename}>
              <td>{r.dia}</td>
              <td>{r.filename}</td>
              <td>{r.recursos}</td>
              <td>{r.servicos}</td>
              {Autorizacao() &&
              <td onClick={() => { delRelatorio(r.filename); }}><a href="#">Excluir</a></td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </main>
    {status}
    </>
  );
}