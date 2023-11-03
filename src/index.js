import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Rodape from './Public/Rodape';
import Header from './Public/Header';
import Upload from './Upload';
import Startup from './Startup';
import ReadFuncionario from './Funcionario/Read';

export default function App(){
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Startup/>} />
        <Route exact path='/Upload' element={<Upload/>} />
        <Route exact path='/Funcionario' element={<ReadFuncionario/>} />
        {/* <Route exact path='/Composicao' element={<Composicao/>} />
        <Route exact path='/Relatorio' element={<Relatorio/>} /> */}
      </Routes>
      <Rodape /> 
    </BrowserRouter>
  );
}
ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
