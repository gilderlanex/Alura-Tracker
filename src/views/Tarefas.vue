<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Box v-if="listaEstaVazia">
            Você não está muito produtivo hoje :/
        </Box>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" v-model="filtro" placeholder="Digite para filtrar">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @ao-tarefa-clicada="selecionaTarefa" />
    </div>

    <Modal :mostrar="tarefaSelecionada != null" :tarefaSelecionada="tarefaSelecionada">
        <template v-slot:cabecalho>
            <p class="modal-card-title">Editando uma tarefa</p>
            <button class="delete" aria-label="close" @click="fecharModal"></button>
        </template>
        <template v-slot:corpo>
    
            <div class="field">
                <label for="descricaoDaTarefa" class="label">Descrição da tarefa</label>
                <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa" />
            </div>
    
        </template>
        <template v-slot:rodape>
            <button class="button is-success" @click="alterarTarefa">Salvar aletrações</button>
            <button class="button" @click="fecharModal">Cancelar</button>
        </template>
    </Modal>

</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from '../components/Box.vue';
import Modal from '../components/Modal.vue';
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
        Modal
    },
    data() {
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
        selecionaTarefa(tarefa: ITarefas) {
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

        const filtro = ref("");
        // const  tarefas = computed(() => store.state.tarefas.filter((t) => !filtro.value || t.descricao.includes(filtro.value)));
        

        // Observa a dependência e executa esse código quando a dependencia muda
        watchEffect(() => store.dispatch(OBTER_TAREFAS, filtro.value));
        
        return {
            tarefas: computed(() => store.state.tarefas),
            store,
            notificar,
            filtro
        }

    }
});
</script>
  
<style>
.lista {
    padding: 1.25rem;
}
</style>
  