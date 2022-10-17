<template>
  <section>
    <!-- o form fica ouvindo o evento de submit do botão Salvar e executa o método de salvar -->
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="NomeDoProjeto" />
      </div>
      <div class="field">
        <button class="button" id="salva" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { ADICIONA_PROJETO, ALTERA_PROJETO } from "@/store/tipo-multacoes";

export default defineComponent({
  name: "Formulario",
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  props: {
    id: {
      type: String,
    }
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id === this.id);
      this.nomeDoProjeto = projeto?.nome || '';
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        //edição
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto
        })
      } else {
        // Chama a multation para adicionar o projeto na lista de projetos.
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
        this.nomeDoProjeto = "";
        // fazer redirect
      }
      this.$router.push("/projetos");
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
      // retorna a lista de projetos atualizadas , vindo do store
      // projetos: computed(() => store.state.projetos)
    };
  },
});
</script>