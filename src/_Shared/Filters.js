import React from "react";
import { useLocation } from 'react-router-dom';
import { Requisicao } from "../Requisicao";
import { regional, atividade } from "../Composicao/Model";
export default function Filters({links, updateVars}) {
  const [dataStart, setDataStart] = React.useState(new Date(Date.now()).toISOString().substring(0,10));
  const [dataStop, setDataStop] = React.useState(new Date(Date.now()).toISOString().substring(0,10));
  const [ativ, setAtiv] = React.useState(0);
  const [reg, setReg] = React.useState(0);
  const { pathname } = useLocation();
  React.useEffect(() => {
    let inicio = new Date(dataStart).toISOString().substring(0,10);
    let final = new Date(dataStop).toISOString().substring(0,10)
    async function getData() {
      let param = [inicio, final, reg, ativ];
      let req = await Requisicao(pathname, "GET", null, param);
      let res = req.ok ? await req.json() : [];
      updateVars(res);
    }
    getData();
  }, [dataStart, dataStop, ativ, reg]);
  return (
    <main className="card p-2 m-2">
      <div className="input-group">
        {links.map((l, i) => ( <span className="input-group-text" key={i}>{l}</span> ))}
        <span className="input-group-text">Data inicio:</span>
        <input className="form-control" type="date" value={dataStart} onChange={(a) => { setDataStart(a.target.value); }}/>
        <span className="input-group-text">Data final:</span>
        <input className="form-control" type="date" value={dataStop} onChange={(b) => { setDataStop(b.target.value); }}/>
        <span className="input-group-text">Tipo atividade:</span>
        <select className="form-control" value={ativ} onChange={(c) => { setAtiv(c.target.value); }}>
          {atividade.map((r, i) => ( <option value={i} key={i}>{r}</option> ))}
        </select>
        <span className="input-group-text">Qual Regional:</span>
        <select className="form-control" value={reg} onChange={(d) => { setReg(d.target.value); }}>
          {regional.map((r, i) => ( <option value={i} key={i}>{r}</option> ))}
        </select>
      </div>
    </main>
  );
}
