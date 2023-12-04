import React from "react";
import { useLocation } from 'react-router-dom';
import { Requisicao } from "../Requisicao";
import { regional, atividade } from "../Composicao/Model";
export default function Filters({links, updateVars}) {
  const [dataStart, setDataStart] = React.useState(Date(Date.now()));
  const [dataStop, setDataStop] = React.useState(Date(Date.now()));
  const [ativ, setAtiv] = React.useState(Number.MAX_VALUE);
  const [reg, setReg] = React.useState(Number.MAX_VALUE);
  const { pathname } = useLocation();
  React.useEffect(() => {
    async function getData() {
      let param = `${dataStart}/${dataStop}/${reg}/${ativ}`;
      let req = await Requisicao(pathname, "GET", null);
      let res = req.ok ? await req.json() : [];
      console.dir(res);
      updateVars(res);
    }
    getData();
  }, [dataStart, dataStop, ativ, reg]);
  return (
    <main className="card p-2 m-2">
      <div className="input-group">
        {links.map((l, i) => ( <span className="input-group-text" key={i}>{l}</span> ))}
        <span className="input-group-text">Data inicio:</span>
        <input className="form-control" type="date" value={dataStart} onChange={(a) => { setDataStart(a.target.value); updateVars([dataStart, dataStop, ativ, reg]); }}/>
        <span className="input-group-text">Data final:</span>
        <input className="form-control" type="date" value={dataStop} onChange={(b) => { setDataStop(b.target.value); updateVars([dataStart, dataStop, ativ, reg]); }}/>
        <span className="input-group-text">Tipo atividade:</span>
        <select className="form-control" value={ativ} onChange={(c) => { setAtiv(c.target.value); updateVars([dataStart, dataStop, ativ, reg]); }}>
          <option value={Number.MAX_VALUE}>TODAS</option>
          {atividade.map((r, i) => ( <option value={i} key={i}>{r}</option> ))}
        </select>
        <span className="input-group-text">Qual Regional:</span>
        <select className="form-control" value={reg} onChange={(d) => { setReg(d.target.value); updateVars([dataStart, dataStop, ativ, reg]); }}>
          <option value={Number.MAX_VALUE}>TODAS</option>
          {regional.map((r, i) => ( <option value={i} key={i}>{r}</option> ))}
        </select>
      </div>
    </main>
  );
}
