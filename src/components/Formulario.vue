<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="description"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Formulário",
  components: {
    Temporizador,
  },
  emits: ["aoSalvarTarefa"],
  // importando a store através da chave
  // Podemos receber como props outros eventos podendo passar o contexto como 2o parametro
  setup(props, {emit}) {
    const store = useStore(key);
    const description = ref("");
    const  idProjeto = ref("");
    const projetos = computed(() => store.state.projeto.projetos)


    const finalizarTarefa = (tempoDecorrido: number): void => {
      emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: description.value,
        projeto: projetos.value.find(proj => proj.id == idProjeto.value)
      });
      description.value = "";
    }

    return {
      // colocamos dentro de um computed pois a lista é dinâmica precisa ser atualizada.
      projetos,
      finalizarTarefa,
      description,
      idProjeto
    };
  },
});
</script>

<style>
.formulario {
  color: var(--text-primario);
  background-color: var(--bg-primario);
}
</style>
