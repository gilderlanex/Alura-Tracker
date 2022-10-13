<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />
    <Botao
      :stopBtnLabel="stop"
      :playBtnLabel="play"
      @iniciarCronometro="iniciar"
      @finalizarCronometro="finalizar"
      :cronometroRodando="cronometroRodando"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
import Botao from "./Button.vue";

export default defineComponent({
  name: "Temporizador",
  emits: ["aoTemporizadorFinalizado"],
  components: {
    Cronometro,
    Botao,
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
      play: "Iniciar",
      stop: "Parar",
    };
  },
  methods: {
    iniciar() {
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },

    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos); //Vai emitir esse evento somente ao clicar no finalizar
      this.tempoEmSegundos = 0;
    },
  },
});
</script>
