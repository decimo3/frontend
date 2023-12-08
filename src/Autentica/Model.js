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
export function isValidMatricula(mat)
{
  return RegExp(/^[0-9]{7}$/).test(mat);
}
export function isValidPalavra(nom)
{
  return RegExp(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/g).test(nom);
}