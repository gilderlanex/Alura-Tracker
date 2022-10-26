// Configurando gerenciamento de estado

import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { INotificacao } from "@/Interface/INotificacao";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from "./tipo-multacoes";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "./tipo-acoes";
import http from "@/http";
import ITarefas from "@/Interface/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projeto";

export interface Estado {
    notificacoes: INotificacao[],
    tarefas: ITarefas[],
    projeto: EstadoProjeto,
}


// Definindo chave de acesso
export const key: InjectionKey<Store<Estado>> = Symbol();


// Definindo estado inicial
export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        tarefas: [],
        projeto: {
            projetos: []
        },
    },
    // adicionando itens a lista de projetos
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime(),
                state.notificacoes.push(novaNotificacao);

            // Definindo o tempo que a notificação ficará aberta
            setTimeout(() => {
                // Remove a notificação
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000);


        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefas[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefas) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefas) {
            const index = state.tarefas.findIndex(proj => proj.id == tarefa.id);
            state.tarefas[index] = tarefa; 
        },
    },
    actions: {
        [OBTER_TAREFAS] ({commit}){
            http.get('tarefas').then(response => commit(DEFINIR_TAREFAS, response.data))
        },
        [CADASTRAR_TAREFA]({commit}, tarefa: ITarefas) {
            return http.post('/tarefas', tarefa)
            // Pega a resposta e adiciona somente a tarefa para não precisar ficar carregando a cada adição
            .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA] ({commit}, tarefa: ITarefas){
            return http.put(`/tarefas/${tarefa.id}`, tarefa).then(() => commit(ALTERA_TAREFA, tarefa))
        },
            
    },
    modules :{
        projeto
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);

}