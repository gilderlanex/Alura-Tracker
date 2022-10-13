<template>
    <div class="box has-text-weight-bold" :style="estilo">
        <!-- serve para dizer que meu componente terá um filho a ser renderizado. -->
        <slot></slot>
    </div>

</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Box',
    data() {
        return {
            estilo: {
                backgroundColor: '#faf0ca'
            }
        }
    }
});
</script>

<!-- scoped - será aplicado somente a esse componente e seus filhos -->
<!-- <style scoped>
.box {
    background: #faf0ca;
}
</style> -->