import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { atividade, regional } from './Model';
import Filters from "../_Shared/Filters";
import Requisicao, { errorMsg } from "../Requisicao";
import Modal from "../Modal";
export default function Read() {
  const History = useNavigate();
  const [comp, setComp] = React.useState([]);
  const [dataStart, setDataStart] = React.useState(Date(Date.now()));
  const [dataStop, setDataStop] = React.useState(Date(Date.now()));
  const [ativ, setAtiv] = React.useState(Number.MAX_VALUE);
  const [reg, setReg] = React.useState(Number.MAX_VALUE);
  const [showModal, setShowModal] = React.useState(false);
  const onCloseModal = () => { History('/'); }
  const onUpdateVars = (vars) => {
    setDataStart(vars[0]);
    setDataStop(vars[1]);
    setAtiv(vars[2]);
    setReg(vars[3]);
  }
  React.useEffect(() => {
    async function getComposicoes()
    {
      const data = await Requisicao("Composicao");
      if(!data.ok) setShowModal(true);
      else setComp(await data.json());
    }
    getComposicoes();
  }, []);
  if (comp.length === 0) {
    return (
      <div className="text-center">
        {showModal && <Modal listaAvisos={errorMsg} onClose={onCloseModal}/>}
        Carregando...
      </div>
    );
  }
  return (
    <>
    <Filters links={[<Link to='Create'>Criar composição</Link>,<Link to='Send'>Enviar Composição</Link>]} updateVars={onUpdateVars}/>
    <main className="card p-2 m-2">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Data:</th>
            <th scope="col">Adesivo:</th>
            <th scope="col">Placa:</th>
            <th scope="col">Recurso:</th>
            <th scope="col">Atividade:</th>
            <th scope="col">Mat.1:</th>
            <th scope="col">Eletricista 1:</th>
            <th scope="col">Mat.2:</th>
            <th scope="col">Eletricista 2:</th>
            <th scope="col">Telefone:</th>
            <th scope="col">Mat. Sup.:</th>
            <th scope="col">Supervisor:</th>
            <th scope="col">Regional:</th>
            <th scope="col">Opções:</th>
          </tr>
        </thead>
        <tbody>
          {comp.filter((c) => (
            ((new Date(c.dia) >= new Date(dataStart)) &&
            (new Date(c.dia) <= new Date(dataStop)) &&
            (ativ == Number.MAX_VALUE || c.atividade == ativ) &&
            (reg == Number.MAX_VALUE || c.regional == reg))
          )).map((c) => (
            <tr scope="row" key={c.dia + c.recurso}>
              <td>{c.dia.substr(0, 10).split('-').reverse().join('/')}</td>
              <td>{c.adesivo}</td>
              <td>{c.placa}</td>
              <td>{c.recurso}</td>
              <td>{atividade[c.atividade]}</td>
              <td>{c.id_motorista}</td>
              <td>{c.motorista.split(" ", 1)[0]}</td>
              <td>{c.id_ajudante}</td>
              <td>{c.ajudante.split(" ", 1)[0]}</td>
              <td>{c.telefone}</td>
              <td>{c.id_supervisor}</td>
              <td>{c.supervisor.split(" ", 1)[0]}</td>
              <td>{regional[c.regional]}</td>
              <td>
                <Link to="Edit" state={c}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
    </>
  );
}