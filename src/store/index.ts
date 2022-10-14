// Configurando gerenciamento de estado

import IProjeto from "@/Interface/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store } from 'vuex';

interface Estado {
    projetos: IProjeto[]
}


// Definindo chave de acesso
export const key: InjectionKey<Store<Estado>> = Symbol();


// Definindo estado inicial
export const store = createStore<Estado>({
    state: {
        projetos:[
            {
                id: new Date().toISOString(),
                nome: "Angular"
            },
            {
                id: new Date().toISOString(),
                nome: "TypeScript"
            },
            {
                id: new Date().toISOString(),
                nome: "React"
            },
            {
                id: new Date().toISOString(),
                nome: "Vue"
            },
            {
                id: new Date().toISOString(),
                nome: "Vuex"
            }

        ]
    }
});