import { inject, provide, ref, type Ref } from 'vue';

const SnackbarSymbol = Symbol();

type SnackbarCtrl = {
    show: Ref<boolean>;
    content: string;
    timeout: number;
    open(content: string, timeout?: number): void;
    close(): void;
};

export function provideSnackbar() {
    const show = ref(false);
    const content = ref('');
    const timeout = ref(-1);

    const snackbar: SnackbarCtrl = {
        show,
        get content() {
            return content.value;
        },
        get timeout() {
            return timeout.value;
        },
        open(c: string, t = -1) {
            content.value = c;
            timeout.value = t;
            show.value = true;
        },
        close() {
            show.value = false;
        }
    };

    provide(SnackbarSymbol, snackbar);
}

export function useSnackbar(): SnackbarCtrl {
    const data = inject<SnackbarCtrl>(SnackbarSymbol);
    if (!data) {
        throw new Error('useSnackbar() is called without provider.');
    }
    return data;
}
