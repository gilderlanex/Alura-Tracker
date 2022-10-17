// Configurando gerenciamento de estado

import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import IProjeto from "@/Interface/IProjeto";
import { INotificacao } from "@/Interface/INotificacao";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-multacoes";

interface Estado {
    projetos: IProjeto[],
    notificacoes : INotificacao[]
}


// Definindo chave de acesso
export const key: InjectionKey<Store<Estado>> = Symbol();


// Definindo estado inicial
export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    // adicionando itens a lista de projetos
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id);
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao ) {
            novaNotificacao.id = new Date().getTime(),
            state.notificacoes.push(novaNotificacao);

            // Definindo o tempo que a notificação ficará aberta
            setTimeout(() => {
                // Remove a notificação
                state.notificacoes = state.notificacoes.filter( notificacao => notificacao.id != novaNotificacao.id)
            },3000);


        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);

}