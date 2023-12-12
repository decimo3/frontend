import { isValidMatricula, isValidPalavra } from "../Funcionario/Model";
export default class Autenticacao
{
  constructor(matricula, palavra) {
    this.matricula = matricula;
    this.palavra = palavra;
  }
  isValidAutenticacao() {
    return (isValidMatricula(this.matricula) && isValidPalavra(this.palavra))
  }
}
