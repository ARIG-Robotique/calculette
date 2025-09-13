import { C_QUERY_PARAM } from '@/data/constants';
import { type Favorite } from '@/models/Favorite';
import { type PageData } from '@/models/PageData';
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export function useCdrData<T extends object>(data: PageData<T>) {
    const router = useRouter();

    const form = reactive(data.defaultForm());
    const subtotal = ref(0);
    const sima = ref<number | undefined>(0);
    const bonus = ref(0);
    const total = ref(0);

    watch(form, () => {
        ({
            subtotal: subtotal.value,
            bonus: bonus.value,
            sima: sima.value,
            total: total.value,
        } = data.compute(form as T));
    });

    function setFromHash() {
        const [, params] = /\?(.+)/.exec(window.location.hash) ?? [null, ''];
        const c =  new URLSearchParams(params).get(C_QUERY_PARAM);

        if (c) {
            Object.assign(form, data.parseForm(c) ?? data.defaultForm());
        }
    }

    onMounted(() => {
        window.addEventListener('hashchange', setFromHash);
        setFromHash();
    });

    onUnmounted(() => {
        window.removeEventListener('hashchange', setFromHash);
    });

    return {
        form,

        get subtotal() {
            return subtotal.value;
        },
        get sima() {
            return sima.value;
        },
        get bonus() {
            return bonus.value;
        },
        get total() {
            return total.value;
        },
        get serializedForm() {
            return data.serializeForm(form as T);
        },

        reset() {
            Object.assign(form, data.defaultForm());
            router.replace({ query: { [C_QUERY_PARAM]: undefined }});
        },

        setEstimation() {
            // @ts-expect-error "chut!"
            form.estimation = subtotal.value;
        },

        applyFavorite(favorite: Favorite) {
            Object.assign(form, favorite.form);
        },
    };
}
