import React from "react";
import { Link } from 'react-router-dom';
import { baseURL } from "../Environment";
import { atividade, regional } from './Utils';
export default function Read() {
  const [comp, setComp] = React.useState([]);
  const [dataStart, setDataStart] = React.useState(Date(Date.now()));
  const [dataStop, setDataStop] = React.useState(Date(Date.now()));
  const [ativ, setAtiv] = React.useState("");
  const [reg, setReg] = React.useState("");
  React.useEffect(() => {
    async function getComposicoes()
    {
      const data = await fetch(`${baseURL}/Composicao`);
      const composicoes = await data.json();
      setComp(composicoes);
    }
    getComposicoes();
  }, []);
  if (comp.length === 0) {
    return (
      <div className="text-center">
        Carregando...
      </div>
    );
  }
  return (
    <main className="card p-2 m-2">
    <div className="d-flex justify-content-around">
      <Link to='Create'>Criar nova composição</Link>
      <label>Data inicio:</label>
      <input type="date" value={dataStart} onChange={(d) => { setDataStart(d.target.value); }}/>
      <label>Data final:</label>
      <input type="date" value={dataStop} onChange={(d) => { setDataStop(d.target.value); }}/>
      <label>Tipo atividade:</label>
      <select defaultValue={ativ} onChange={(e) => {setAtiv(e.target.value)}}>
        <option value={""}>TODAS</option>
        {atividade.map((r, i) => ( <option value={i} key={i}>{r}</option> ))}
      </select>
      <label>Qual Regional:</label>
      <select defaultValue={reg} onChange={(e) => {setReg(e.target.value)}}>
        <option value={""}>TODAS</option>
        {regional.map((r, i) => ( <option value={i} key={i}>{r}</option> ))}
      </select>
    </div>
    <hr/>
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
            (new Date(c.dia) >= new Date(dataStart)) &&
            (new Date(c.dia) <= new Date(dataStop))
          )).map((c) => (
            <tr scope="row" key={c.dia + c.recurso}>
              <td>{c.dia.substr(0, 10).split('-').reverse().join('/')}</td>
              <td>{c.adesivo}</td>
              <td>{c.placa}</td>
              <td>{c.recurso}</td>
              <td>{atividade[Number(c.atividade)]}</td>
              <td>{c.id_motorista}</td>
              <td>{c.motorista.split(" ", 1)[0]}</td>
              <td>{c.id_ajudante}</td>
              <td>{c.ajudante.split(" ", 1)[0]}</td>
              <td>{c.telefone}</td>
              <td>{c.id_supervisor}</td>
              <td>{c.supervisor.split(" ", 1)[0]}</td>
              <td>{regional[Number(c.regional)]}</td>
              <td>
                <Link to="Edit" state={c}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}