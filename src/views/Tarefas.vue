<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="listaEstaVazia">
            Você não está muito produtivo hoje :/
        </Box>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from '../components/Box.vue';
import ITarefas from "../Interface/ITarefa";

export default defineComponent({
    name: "App",
    components: {
        Box,
        Formulario,
        Tarefa,
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        }

    },
    data() {
        return {
            tarefas: [] as ITarefas[],
            modoEscuroAtivo: false
        };
    },
    methods: {
        salvarTarefa(tarefa: ITarefas) {
            this.tarefas.push(tarefa);
        }
    },
});
</script>
  
<style>
.lista {
    padding: 1.25rem;
}
</style>
  