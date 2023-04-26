import { createApp } from 'vue';

import App from './App.vue';

import router from './router'; // 引入路由
import './css/reset.css'; //全局重置样式

// 引入ElementPlus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 引入状态管理
import store from './store';

createApp(App).use(router).use(store).use(ElementPlus).mount('#app');
