import { TipoNotificacao } from "@/Interface/INotificacao"
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipo-multacoes";

type Notificador = {
    notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void;
}

export default (): Notificador => {

    const notificar = (tipo: TipoNotificacao, titulo: string, texto: string): void => {
        store.commit(NOTIFICAR, {
            tipo,
            titulo,
            texto,
        });
    }
    return{
        notificar
    }

}