<template>
    <section>
      <router-link to="/projetos/novo" class="button">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
        <span>Novo projeto</span>
      </router-link>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>
              ID
            </th>
            <th>
              Nome
            </th>
            <th>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="projeto in projetos" :key="projeto.id">
            <td>
              {{projeto.id}}
            </td>
            <td>
              {{projeto.nome}}
            </td>
            <td>
              <router-link :to="`/projetos/${projeto.id}`" class="button">
                <span class="icon is-small">
                  <i class="fas fa-pencil-alt"></i>
                </span>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </template>
  <script lang="ts">
  import { computed, defineComponent } from "vue";
  import { useStore } from "@/store";
  
  export default defineComponent({
    name: "Lista",
    setup() {
      const store = useStore()
      return {
        // retorna a lista de projetos atualizadas , vindo do store
        projetos: computed(() => store.state.projetos)
      }
    }
  });
  </script>