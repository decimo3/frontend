import React from "react";
import { baseURL } from "../Environment";
export default function Read() {
  const [comp, setComp] = React.useState([]);
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
    <Link to='Create'>Criar nova composição</Link>
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
          {comp.map((c) => (
            <tr scope="row" key={c.dia + c.recurso}>
              <td>{c.dia}</td>
              <td>{c.adesivo}</td>
              <td>{c.placa}</td>
              <td>{c.recurso}</td>
              <td>{c.atividade}</td>
              <td>{c.id_motorista}</td>
              <td>{c.motorista}</td>
              <td>{c.id_ajudante}</td>
              <td>{c.ajudante}</td>
              <td>{c.telefone}</td>
              <td>{c.id_supervisor}</td>
              <td>{c.supervisor}</td>
              <td>{c.regional}</td>
              <td>Editar</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}