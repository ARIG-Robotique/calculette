import type { Favorite } from '@/models/Favorite';
import { inject, onMounted, onUnmounted, provide, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { CONTESTS } from '../data/contests';

const AppCdrSymbol = Symbol();

type AppCdrCtrl = {
    favorites: {
        isVisible: Ref<boolean>;
        data: Ref<{
            year: string;
            total: number;
            form: Favorite['form'];
        }>;

        show(year: string, total: number, form: Favorite['form']): void;
        hide(): void;
        apply(favorite: Favorite): void;
        onApply(cb: (favorite: Favorite) => void): void;
    };

    shareLink: {
        isVisible: Ref<boolean>;
        data: Ref<{
            url: string;
        }>;

        show(year: string, value: string): void;
        hide(): void;
    };

    rulesPdf: {
        isVisible: Ref<boolean>;
        data: Ref<{
            year: string;
        }>;

        show(year: string): void;
        hide(): void;
    };

    snackbar: {
        isVisible: Ref<boolean>;
        data: Ref<{
            content: string;
            timeout: number;
        }>;

        show(content: string, timeout?: number): void;
        hide(): void;
    };
};

export function provideAppCdr() {
    const { t, locale } = useI18n();
    const { mobile } = useDisplay();

    const favoritesIsVisible = ref(false);
    const favoritesData = ref<AppCdrCtrl['favorites']['data']>(null);
    let favoriteCb: (favorite: Favorite) => void = null;

    const shareLinkIsVisible = ref(false);
    const shareLinkData = ref<AppCdrCtrl['shareLink']['data']>(null);

    const rulesPdfIsVisible = ref(false);
    const rulesPdfData = ref<AppCdrCtrl['rulesPdf']['data']>(null);

    const snackbarIsVisible = ref(false);
    const snackbarData = ref({ content: null, timeout: -1 });

    const appCdrCtrl: AppCdrCtrl = {
        favorites: {
            isVisible: favoritesIsVisible,
            data: favoritesData,
            show(year, total, form) {
                favoritesData.value = { year, total, form };
                favoritesIsVisible.value = true;
            },
            hide() {
                favoritesIsVisible.value = false;
            },
            apply(favorite) {
                favoriteCb?.(favorite);
                favoritesIsVisible.value = false;
            },
            onApply(cb) {
                onMounted(() => { favoriteCb = cb; });
                onUnmounted(() => { favoriteCb = null; });
            },
        },

        shareLink: {
            isVisible: shareLinkIsVisible,
            data: shareLinkData,
            show(year, value) {
                const url = `${window.location.protocol}//${window.location.host}/#/${year}?c=${value}`;

                if (window.navigator.share) {
                    window.navigator.share({
                        title: t('appName'),
                        url,
                    });
                }
                else {
                    shareLinkData.value = { url };
                    shareLinkIsVisible.value = true;
                }
            },
            hide() {
                shareLinkIsVisible.value = false;
            },
        },

        rulesPdf: {
            isVisible: rulesPdfIsVisible,
            data: rulesPdfData,

            show(year) {
                if (mobile.value) {
                    window.open(CONTESTS[year].rulesPdf[locale.value]);
                } else {
                    rulesPdfData.value = { year };
                    rulesPdfIsVisible.value = true;
                }
            },
            hide() {
                rulesPdfIsVisible.value = false;
            },
        },

        snackbar: {
            isVisible: snackbarIsVisible,
            data: snackbarData,

            show(content: string, timeout = -1) {
                snackbarData.value = { content, timeout };
                snackbarIsVisible.value = true;
            },
            hide() {
                snackbarIsVisible.value = false;
            },
        },
    };

    provide(AppCdrSymbol, appCdrCtrl);
}

export function useAppCdrCtrl(): AppCdrCtrl {
    const data = inject<AppCdrCtrl>(AppCdrSymbol);
    if (!data) {
        throw new Error('useSnackbar() is called without provider.');
    }
    return data;
}
