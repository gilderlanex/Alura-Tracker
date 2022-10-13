<template>
    <button class="button" @click="$emit('iniciarCronometro')" :disabled="cronometroRodando">
        <span class="icon">
            <i class="fas fa-play"></i>
        </span>
        <span>{{playBtnLabel}}</span>
    </button>
    <button class="button" @click="$emit('finalizarCronometro')" :disabled="!cronometroRodando">
        <span class="icon">
            <i class="fas fa-stop"></i>
        </span>
        <span>{{stopBtnLabel}}</span>
    </button>

</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Botão',
    emits: ['iniciarCronometro', 'finalizarCronometro'],
    props: {
        stopBtnLabel: {
            type: String
        },
        playBtnLabel: {
            type: String
        },
        cronometroRodando: {
            type: Boolean,
            default: false
        }

    }

});
</script>