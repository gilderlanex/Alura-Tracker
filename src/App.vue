<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuroAtivo}">
    <div class="column is-one-quarter">
      <BarraLateral  @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="listaEstaVazia">
        Você não está muito produtivo hoje :/
      </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Formulario from "./components/Formulario.vue";
import Tarefa from "./components/Tarefa.vue";
import Box from './components/Box.vue';
import ITarefas from "./Interface/ITarefa";

export default defineComponent({
  name: "App",
  components: {
    BarraLateral,
    Box,
    Formulario,
    Tarefa,
  },
  computed: {
    listaEstaVazia(): boolean{
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
        },

        trocarTema(modoEscuro: boolean){
          this.modoEscuroAtivo = modoEscuro;
        }
    },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>
