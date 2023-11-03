import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './_Shared/Footer';
import Header from './_Shared/Header';
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
        {/* <Route exact path='/Composicao' element={<ReadComposicao/>} />
        <Route exact path='/Relatorio' element={<ReadRelatorio/>} /> */}
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}
ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
