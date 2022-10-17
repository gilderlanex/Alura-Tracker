<template>
  <div class="projetos">
    <h1 class="title">Projetos</h1>
    <!-- todas as rotas filhas serão renderizadas aqui -->
    <router-view></router-view>
  </div>
</template>
<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: "Projetos",
  }
);
</script>

<style scope>
.projetos {
    padding: 1.25rem;
}
</style>
