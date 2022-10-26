<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @ao-tarefa-clicada="selecionaTarefa"/>
        <Box v-if="listaEstaVazia">
            Você não está muito produtivo hoje :/
        </Box>
    </div>

    <div class="modal" :class="{'is-active': tarefaSelecionada}" v-if="tarefaSelecionada">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Editando uma tarefa</p>
      <button class="delete" aria-label="close" @click="fecharModal"></button>
    </header>
    <section class="modal-card-body">

        <div class="field">
        <label for="descricaoDaTarefa" class="label">Descrição da tarefa</label>
        <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa" />
      </div>

    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="alterarTarefa">Salvar aletrações</button>
      <button class="button" @click="fecharModal">Cancelar</button>
    </footer>
  </div>
</div>

</template>
  
<script lang="ts">
import { computed, defineComponent } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from '../components/Box.vue';
import { useStore } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS } from "@/store/tipo-acoes";
import ITarefas from "@/Interface/ITarefa";
import useNotificador from '../hooks/notificador';
import { TipoNotificacao } from "@/Interface/INotificacao";

export default defineComponent({
    name: "App",
    components: {
        Box,
        Formulario,
        Tarefa,
    },
    data () {
        return {
            tarefaSelecionada: null as ITarefas | null,
            modoEscuroAtivo: false,
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        }

    },
    methods: {
        salvarTarefa(tarefa: ITarefas): void {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        selecionaTarefa(tarefa: ITarefas){
            console.log(tarefa)
            this.tarefaSelecionada = tarefa
        },
        fecharModal() {
            this.tarefaSelecionada = null
        },
        alterarTarefa() {
            this.store.dispatch('ALTERAR_TAREFA', this.tarefaSelecionada)
            .then(() => this.fecharModal())
            this.notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'Projeto Salvo com Sucesso');
        }
    },
    setup() {
        const store = useStore();
        const { notificar } = useNotificador();
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);
        return {
            tarefas: computed(() => store.state.tarefas),
            store, 
            notificar
        }

    }
});
</script>
  
<style>
.lista {
    padding: 1.25rem;
}
</style>
  