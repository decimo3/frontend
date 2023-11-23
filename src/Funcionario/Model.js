export const funcoes = ["Eletricista", "Supervisor"];
export function isValidMatricula(mat)
{
  return RegExp(/^[0-9]{7}$/).test(mat);
}
export function isValidName(nom)
{
  return RegExp(/^([A-z\s]{4,}){2,}([A-z]{4,}){1}$/).test(nom);
}
export default class Funcionario
{
  constructor(nom, mat, fun) {
    this.nome_colaborador = nom;
    this.matricula = Number(mat);
    this.funcao = fun;
    this.errors = [];
  }
  isValidFuncionario() {
    if(!isValidMatricula(this.matricula)) return false;
    if(!isValidName(this.colaborador)) return false;
    return true;
  }
}
