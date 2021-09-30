import { Vue, Watch } from 'vue-property-decorator';
import { Favorite } from "../models/Favorite";

export abstract class AbstractPage<T> extends Vue {

    abstract readonly year: string;
    abstract form: T;

    get serializedForm(): string {
        return this.serializeForm(this.form);
    }

    abstract defaultForm(): T;

    abstract parseForm(c: string): T;

    abstract serializeForm(form: T): string;

    abstract compute(): void;

    @Watch('form', { deep: true })
    onFormChange() {
        this.compute();
    }

    mounted() {
        const [, params] = /\?(.+)/.exec(window.location.hash) ?? [null, ''];
        const c =  new URLSearchParams(params).get('c');

        if (c) {
            this.form = this.parseForm(c) ?? this.defaultForm();
        }

        this.compute();
    }

    reset() {
        this.form = this.defaultForm();
    }

    applyFavorite(favorite: Favorite) {
        this.form = favorite.form as any;
    }

}
