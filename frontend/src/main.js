import { createApp } from 'vue';
import App from './App.vue';
import { router } from './routes';
// import { store } from './store';
import { createPinia } from 'pinia';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import VueVirtualScroller from 'vue-virtual-scroller';

const app = createApp(App);
// 虚拟滚动
app.use(VueVirtualScroller);

// app.use(store);
app.use(createPinia())
app.use(router);

app.mount('#app');
