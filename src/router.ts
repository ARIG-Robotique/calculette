import { CONTESTS, LAST_YEAR } from '@/data/contests';
import CdrPage2017 from '@/views/CdrPage2017.vue';
import CdrPage2018 from '@/views/CdrPage2018.vue';
import CdrPage2019 from '@/views/CdrPage2019.vue';
import CdrPage2021 from '@/views/CdrPage2021.vue';
import CdrPage2022 from '@/views/CdrPage2022.vue';
import CdrPage2023 from '@/views/CdrPage2023.vue';
import CdrPage2024 from '@/views/CdrPage2024.vue';
import CdrPage2025 from '@/views/CdrPage2025.vue';
import CdrPage2026 from '@/views/CdrPage2026.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const pages: { [K in keyof typeof CONTESTS]: any } = {
    2026: CdrPage2026,
    2025: CdrPage2025,
    2024: CdrPage2024,
    2023: CdrPage2023,
    2022: CdrPage2022,
    2021: CdrPage2021,
    2019: CdrPage2019,
    2018: CdrPage2018,
    2017: CdrPage2017,
};

// const pagesMatch: { [K in keyof typeof CONTESTS]: any } = {
//     2025: Page2025Match,
//     2024: Page2024Match,
//     2023: Page2023Match,
//     2022: Page2022Match,
// };

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...Object.entries(pages).map(([year, component]) => ({ path: `/${year}`, component })),
        // ...Object.entries(pagesMatch).map(([year, component]) => ({ path: `/${year}/match`, component })),
        { path: '/:pathMatch(.*)*', redirect: `/${LAST_YEAR}` },
    ],
});

export default router;
