import App from '@/App.vue';
import { THEME_PREFIX } from '@/data/constants';
import { CONTESTS, LAST_YEAR } from '@/data/contests';
import router from '@/router.ts';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createVuetify } from 'vuetify';
import {
    VApp,
    VAppBar,
    VAppBarNavIcon,
    VAppBarTitle,
    VBtn,
    VBtnToggle,
    VCard,
    VChip,
    VCol,
    VContainer,
    VDialog,
    VEmptyState,
    VFooter,
    VIcon,
    VList,
    VListItem,
    VMain,
    VMenu,
    VNavigationDrawer,
    VNumberInput,
    VRow,
    VSnackbar,
    VSpeedDial,
    VSwitch,
    VTextField,
    VThemeProvider,
    VToolbar,
    VToolbarTitle,
    VTooltip,
} from 'vuetify/components';
import 'vuetify/styles';
import { MessagesGlobal } from './data/i18n';
import './style.css';

const vuetify = createVuetify({
    components: {
        VApp,
        VAppBar,
        VAppBarNavIcon,
        VAppBarTitle,
        VBtn,
        VBtnToggle,
        VCard,
        VChip,
        VCol,
        VContainer,
        VDialog,
        VEmptyState,
        VFooter,
        VIcon,
        VList,
        VListItem,
        VMain,
        VMenu,
        VNavigationDrawer,
        VNumberInput,
        VRow,
        VSnackbar,
        VSpeedDial,
        VSwitch,
        VTextField,
        VThemeProvider,
        VToolbar,
        VToolbarTitle,
        VTooltip,
    },
    defaults: {
        VAppBar: {
            color: 'primary',
        },
        VBtnToggle: {
            density: 'compact',
            border: true,
            rounded: 'xl',
        },
        VFooter: {
            color: 'primary',
        },
        VToolbar: {
            color: 'primary',
        },
        VNumberInput: {
            variant: 'underlined',
            controlVariant: 'split',
        },
        VSwitch: {
            color: 'accent',
            density: 'compact',
        },
    },
    theme: {
        defaultTheme: THEME_PREFIX + LAST_YEAR,
        themes: Object.values(CONTESTS).reduce((themes, contest) => ({
            ...themes,
            [THEME_PREFIX + contest.year]: { colors: contest.colors },
        }), {}),
    },
    display: {
        mobileBreakpoint: 'sm',
    },
});

const locale = localStorage['locale'] ?? (window.navigator.language.toLowerCase().includes('fr') ? 'fr' : 'en');
const i18n = createI18n({
    locale,
    fallbackLocale: 'en',
    messages: MessagesGlobal,
    allowComposition: true,
    legacy: false,
    fallbackRoot: true,
    silentFallbackWarn: true,
    fallbackWarn: false,
    missingWarn: false,
});

createApp(App)
    .use(i18n)
    .use(router)
    .use(vuetify)
    .mount('#app');
