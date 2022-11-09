<template>
  <Notification/>
  <div class="projetos">
    <h1 class="title">Projetos</h1>
    <!-- todas as rotas filhas serão renderizadas aqui -->
    <router-view></router-view>
  </div>
</template>
<script lang="ts">

import { defineComponent } from "vue";
import Notification from '../components/Notificacoes.vue';

export default defineComponent({
  name: "Projetos",
  components :{
    Notification
  }
  }
);
</script>

<style scope>
.projetos {
    padding: 1.25rem;
}
</style>
