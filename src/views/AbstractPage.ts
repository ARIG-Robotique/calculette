import { Vue, Watch } from 'vue-property-decorator';
import { Favorite } from "../models/Favorite";
import { PageData } from '../models/PageData';

export abstract class AbstractPage<T> extends Vue {

    abstract readonly year: string;
    abstract readonly data: PageData<T>;
    
    form: T = {} as T;
    subtotal = 0;
    sima = 0;
    bonus = 0;
    total = 0;

    get serializedForm(): string {
        return this.data.serializeForm(this.form);
    }

    @Watch('form', { deep: true })
    onFormChange() {
        this.compute();
    }

    created() {
        this.reset();
    }

    mounted() {
        const [, params] = /\?(.+)/.exec(window.location.hash) ?? [null, ''];
        const c =  new URLSearchParams(params).get('c');

        if (c) {
            this.form = this.data.parseForm(c) ?? this.data.defaultForm();
        }
    }

    reset() {
        this.form = this.data.defaultForm();
    }

    setEstimation() {
        this.compute();
        // @ts-ignore
        this.form.estimation = this.subtotal;
    }

    applyFavorite(favorite: Favorite) {
        this.form = favorite.form as any;
    }

    compute() {
        ({
            subtotal: this.subtotal,
            bonus: this.bonus,
            sima: this.sima,
            total: this.total,
        } = this.data.compute(this.form));
    }

}
