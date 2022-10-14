<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <!-- o form fica ouvindo o evento de submit do botão Salvar e executa o método de salvar -->
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="NomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" id="salva" type="submit">Salvar</button>
      </div>
    </form>

    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>
                    ID
                </th>
                <th>
                Nome    
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
            </tr>
        </tbody>
    </table>
  </section>
</template>
<script lang="ts">
import IProjeto from "@/Interface/IProjeto";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Projetos",
  data() {
    return {
      nomeDoProjeto: "",
      projetos: [] as IProjeto[]
    };
  },
  methods: {
    salvar() {
      const projeto: IProjeto = {
        nome: this.nomeDoProjeto,
        id: new Date().toISOString(),
      };
      this.projetos.push(projeto); //adicionando projetos em uma lista
      this.nomeDoProjeto = '' //ls
    },
  },
});
</script>

<style scope>
.projetos {
    padding: 1.25rem;
}
</style>
