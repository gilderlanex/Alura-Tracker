<template>
    <div class="notificacoes">
        <article class="message is-success" v-for="notificacao in notificacoes" :key="notificacao.id" :class="context[notificacao.tipo]">
            <div class="message-header">{{notificacao.titulo}}</div>
            <div class="message-body">{{notificacao.texto}}</div>
        </article>
    </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/Interface/INotificacao";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
    name: "Notificacoes",
    data () {
        return {
            context: {
                [TipoNotificacao.SUCESSO]: 'is-success',
                [TipoNotificacao.FALHA]: 'is-danger',
                [TipoNotificacao.ATENCAO]: 'is-warning'

            }
        }
    },
    setup() {
        const store = useStore();
        return {
            notificacoes: computed(() => store.state.notificacoes),
        }

    }
});
</script>

<style scope>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300;
    padding: 8px;
    z-index: 105;
}
</style>
