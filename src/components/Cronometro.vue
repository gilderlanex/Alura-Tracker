<template>
    <section>
        <strong class="display"> {{tempoDecorrido}}</strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Cronometro',
    props: {
        tempoEmSegundos:{ //propriedade que recebe valores do componente Pai
            type: Number, // tipo de dados a ser recebido
            default:0 // estado inicial
        }
    },
    computed: {
        tempoDecorrido(): string {
            // Converte os milisegundos e formato hora
            return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8);
        }

    },

});
</script>

<style scoped>
.display {
    color: var(--texto-primario);
}
</style>