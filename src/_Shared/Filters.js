import React from "react";
import { regional, atividade } from "../Composicao/Model";
export default function Filters({links, updateVars}) {
  const [dataStart, setDataStart] = React.useState(Date(Date.now()));
  const [dataStop, setDataStop] = React.useState(Date(Date.now()));
  const [ativ, setAtiv] = React.useState(Number.MAX_VALUE);
  const [reg, setReg] = React.useState(Number.MAX_VALUE);
  return (
    <main className="card p-2 m-2">
      <div className="d-flex justify-content-around">
        {links.map((l, i) => ( <>{l}</> ))}
        <label>Data inicio:</label>
        <input type="date" value={dataStart} onChange={(a) => { setDataStart(a.target.value); updateVars([dataStart, dataStop, ativ, reg]); }}/>
        <label>Data final:</label>
        <input type="date" value={dataStop} onChange={(b) => { setDataStop(b.target.value); updateVars([dataStart, dataStop, ativ, reg]); }}/>
        <label>Tipo atividade:</label>
        <select value={ativ} onChange={(c) => { setAtiv(c.target.value); updateVars([dataStart, dataStop, ativ, reg]); }}>
          <option value={Number.MAX_VALUE}>TODAS</option>
          {atividade.map((r, i) => ( <option value={i} key={i}>{r}</option> ))}
        </select>
        <label>Qual Regional:</label>
        <select value={reg} onChange={(d) => { setReg(d.target.value); updateVars([dataStart, dataStop, ativ, reg]); }}>
          <option value={Number.MAX_VALUE}>TODAS</option>
          {regional.map((r, i) => ( <option value={i} key={i}>{r}</option> ))}
        </select>
      </div>
    </main>
  );
}
