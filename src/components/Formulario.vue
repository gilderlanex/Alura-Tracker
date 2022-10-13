<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="description" />
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Formulário",
  components: {
    Temporizador,
  },
  data() {
    return {
      description: ''
    }
  },
  emits: ['aoSalvarTarefa'],
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit('aoSalvarTarefa', { duracaoEmSegundos: tempoDecorrido, descricao: this.description })
    },
  },
});
</script>

<style>
.formulario {
  color: var(--text-primario);
  background-color: var(--bg-primario);
}

</style>
