<template>
    <header>
        <h1>
            <img src="@/assets/logo.png" alt="logo-alura-tracker">
        </h1>
        <button class="button" @click="alterarTema">
           {{textoBotao}}
        </button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BarraLateral',
    emits: ['aoTemaAlterado'],
    data() {
        return {
            modoEscuroAtivado: false,
        }

    },
    computed: {
        textoBotao(): string {
             return this.modoEscuroAtivado ? "Modo escuro ativado" : "Ativar modo escuro";
        }
        
    },
    methods: {
        alterarTema() {
            this.modoEscuroAtivado = !this.modoEscuroAtivado;
            this.$emit('aoTemaAlterado', this.modoEscuroAtivado);
        }
    }
})
</script>

<style>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;

}

/* Estilo para o mobile */
@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>