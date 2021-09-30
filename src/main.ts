import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import VueRouter from 'vue-router';
import App from './App.vue';
import { CONTESTS } from './constants/contests';
import './registerServiceWorker';
import './style.scss';
import Page2021 from './views/Page2021.vue';
import Page2022 from './views/Page2022.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueMaterial);

// @ts-ignore
Vue.material.ripple = false;

const pages: { [K in keyof typeof CONTESTS]: any } = {
    2022: Page2022,
    2021: Page2021,
};

const router = new VueRouter({
    routes: [
        ...Object.entries(pages).map(([year, component]) => ({ path: `/${year}`, component })),
        { path: '*', redirect: `/${Math.max(...Object.keys(pages).map(y => +y))}` },
    ],
});

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');
