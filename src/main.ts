import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import VueRouter from 'vue-router';
import App from './App.vue';
import { CONTESTS } from './data/contests';
import './registerServiceWorker';
import './style.scss';
import Page2017 from './views/Page2017.vue';
import Page2018 from './views/Page2018.vue';
import Page2019 from './views/Page2019.vue';
import Page2021 from './views/Page2021.vue';
import Page2022 from './views/Page2022.vue';
import Page2023 from './views/Page2023.vue';
import Page2024 from './views/Page2024.vue';
import Page2025 from './views/Page2025.vue';
import Page2022Match from './views/Page2022Match.vue';
import Page2023Match from './views/Page2023Match.vue';
import Page2024Match from './views/Page2024Match.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueMaterial);

// @ts-ignore
Vue.material.ripple = false;

const pages: { [K in keyof typeof CONTESTS]: any } = {
    2025: Page2025,
    2024: Page2024,
    2023: Page2023,
    2022: Page2022,
    2021: Page2021,
    2019: Page2019,
    2018: Page2018,
    2017: Page2017,
};

const pagesMatch: { [K in keyof typeof CONTESTS]: any } = {
    2024: Page2024Match,
    2023: Page2023Match,
    2022: Page2022Match,
};

const router = new VueRouter({
    routes: [
        ...Object.entries(pages).map(([year, component]) => ({ path: `/${year}`, component })),
        ...Object.entries(pagesMatch).map(([year, component]) => ({ path: `/${year}/match`, component })),
        { path: '*', redirect: `/${Math.max(...Object.keys(pages).map(y => +y))}` },
    ],
});

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');
