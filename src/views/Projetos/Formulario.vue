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
import { TipoNotificacao } from "@/Interface/INotificacao";
import useNotificador from '../../hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS } from "@/store/tipo-acoes";

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
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (proj) => proj.id === this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        //edição
        this.store.dispatch(ALTERAR_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        }).then(() => this.successRequests());
      } else {
        // Chama a multation para adicionar o projeto na lista de projetos.
        this.store.dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto)
          .then(() => this.successRequests())
      }
    },
    successRequests() {
      this.nomeDoProjeto = "";
      this.notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'Projeto Salvo com Sucesso');
      // fazer redirect
      this.$router.push("/projetos");
    }
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar
      // retorna a lista de projetos atualizadas , vindo do store
      // projetos: computed(() => store.state.projetos)
    };
  },
});
</script>
