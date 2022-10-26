import IProjeto from "./IProjeto"

export default interface ITarefas{
    id: number,
    duracaoEmSegundos: number,
    descricao: string,
    projeto: IProjeto
}