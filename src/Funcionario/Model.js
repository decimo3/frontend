export const funcoes = ['ELETRICISTA', 'SUPERVISOR'];
export const situacao = ['ATIVO', 'DESLIGADO', 'FÉRIAS', 'AFASTADO'];
export function isValidMatricula(mat)
{
  return RegExp(/^[0-9]{7}$/).test(mat);
}
export function isValidName(nom)
{
  return RegExp(/^([A-z\s]{2,}){2,}([A-z]{4,}){1}$/).test(nom);
}
export function isValidPalavra(nom)
{
  return RegExp(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/g).test(nom);
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
    if(!isValidMatricula(this.matricula))
      this.errors.push("Matrícula inserida não é válida!");
    if(!isValidName(this.nome_colaborador))
      this.errors.push("Nome inserido não é válido!");
    return (this.errors.length === 0);
  }
}
