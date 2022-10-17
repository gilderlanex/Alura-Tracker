import { TipoNotificacao } from "@/Interface/INotificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipo-multacoes";

export const notificacaoMixin = {
    methods: {
        notificar(tipo: TipoNotificacao, titulo: string, texto: string) {
            store.commit(NOTIFICAR, {
                tipo,
                titulo,
                texto,
            });
        },
    }
}