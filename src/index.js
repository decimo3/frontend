import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './_Shared/Footer';
import Header from './_Shared/Header';
import Startup from './Startup';
import Relatorio from './Relatorio';
import Funcionario from './Funcionario/Index';
import Composicao from './Composicao/Index';
import NotFound from './NotFound';
import Usuario from './Autentica/Index';
import Servico from './Servico';
export default function App(){
  Servico();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Startup/>} />
        <Route exact path='/Funcionario/*' element={<Funcionario/>} />
        <Route exact path='/Composicao/*' element={<Composicao/>} />
        <Route exact path='/Relatorio' element={<Relatorio/>} />
        <Route exact path='/Usuario/*' element={<Usuario/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
