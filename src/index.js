import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './_Shared/Footer';
import Header from './_Shared/Header';
import Upload from './Upload';
import Startup from './Startup';
import Funcionario from './Funcionario/Index';

export default function App(){
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Startup/>} />
        <Route exact path='/Upload' element={<Upload/>} />
        <Route exact path='/Funcionario/*' element={<Funcionario/>} />
        {/*
          <Route exact path='/Composicao' element={<Composicao/>} />
          <Route exact path='/Relatorio' element={<Relatorio/>} />
          <Route path='*' element={<NotFound/>} />
        */}
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}
ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
