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
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/Interface/INotificacao";
import useNotificador from '../../hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const nomeDoProjeto = ref("");
    const store = useStore();
    const { notificar } = useNotificador();
    // Usamos useRouter para ter acesso as rotas e useRoute para pegar parâmentros em uma rota
    const router = useRouter();

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }

    const salvar = () => {
      if (props.id) {
        //edição
        store.dispatch(ALTERAR_PROJETO, {
          id: props.id,
          nome: nomeDoProjeto.value,
        }).then(() => successRequests());
      } else {
        // Chama a multation para adicionar o projeto na lista de projetos.
        store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
          .then(() => successRequests())
      }
    }

    const successRequests = () => {
      nomeDoProjeto.value = "";
      notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'Projeto Salvo com Sucesso');
      // fazer redirect
      router.push("/projetos");
    }


    return {
      nomeDoProjeto,
      salvar
      // retorna a lista de projetos atualizadas , vindo do store
      // projetos: computed(() => store.state.projetos)
    };
  },
});
</script>
