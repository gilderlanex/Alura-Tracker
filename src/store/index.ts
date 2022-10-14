// Configurando gerenciamento de estado

import IProjeto from "@/Interface/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';

interface Estado {
    projetos: IProjeto[]
}


// Definindo chave de acesso
export const key: InjectionKey<Store<Estado>> = Symbol();


// Definindo estado inicial
export const store = createStore<Estado>({
    state: {
        projetos:[]
    },
    // adicionando itens a lista de projetos
    mutations: {
        'ADICIONA_PROJETO'(state, nomeDoProjeto: string){
            const projeto = { 
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        }
    }
});

export function useStore(): Store<Estado>{
    return vuexUseStore(key);

}