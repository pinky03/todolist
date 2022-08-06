require('./bootstrap');

import { createApp } from 'vue';
const app = createApp({});

import VueApp from './components/App.vue'
app.component('App', VueApp);


app.mount('#app');