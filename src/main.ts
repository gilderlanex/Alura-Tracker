import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'; //Bíblioteca disponibiliza ícones de forma global instalaçõ : npm i @fortawesome/fontawesome-free
import roteador from './roteador';

createApp(App).use(roteador).mount('#app')
