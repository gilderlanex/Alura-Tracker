import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'; //Bíblioteca disponibiliza ícones de forma global instalaçõ : npm i @fortawesome/fontawesome-free
import roteador from './roteador';
import { key, store } from './store';

// Declaramos aqui o uso dos recursos de forma global. Para usar o vue-router e o vuex
createApp(App).use(roteador).use(store, key).mount('#app')
