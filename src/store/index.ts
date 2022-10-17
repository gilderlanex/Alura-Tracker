// Configurando gerenciamento de estado

import { INotificacao, TipoNotificacao } from "@/Interface/INotificacao";
import IProjeto from "@/Interface/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from "./tipo-multacoes";

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
        notificacoes: [
            {
                id: 1,
                texto: 'Uma notificacao de sucesso',
                titulo: 'sucesso',
                tipo: TipoNotificacao.SUCESSO
            },
            {
                id: 2,
                texto: 'Uma notificacao falha',
                titulo: 'falha',
                tipo: TipoNotificacao.FALHA
            },
            {
                id: 3,
                texto: 'Uma notificacao atenção',
                titulo: 'Atenção',
                tipo: TipoNotificacao.ATENCAO
            },
        ]
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
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);

}