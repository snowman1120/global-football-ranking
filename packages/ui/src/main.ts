import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { META_MANAGER } from './config';

const app = createApp(App);
app.use(router);
app.use(META_MANAGER);

app.mount('#app');
