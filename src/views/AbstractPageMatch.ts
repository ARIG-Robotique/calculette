import { Vue, Watch } from 'vue-property-decorator';
import { PageData } from '../models/PageData';

export abstract class AbstractPageMatch<T> extends Vue {

    abstract readonly year: string;
    abstract readonly data: PageData<T>;

    teamA: T = {} as T;
    teamB: T = {} as T;
    subtotalA = 0;
    totalA = 0;
    subtotalB = 0;
    totalB = 0;

    @Watch('teamA', { deep: true })
    onTeamAChange() {
        this.computeA();
    }

    @Watch('teamB', { deep: true })
    onTeamBChange() {
        this.computeB();
    }

    created() {
        this.reset();
    }

    mounted() {
    }

    reset() {
        this.teamA = this.data.defaultForm();
        this.teamB = this.data.defaultForm();
    }

    computeA() {
        ({ subtotal: this.subtotalA, total: this.totalA } = this.data.compute(this.teamA));
    }

    computeB() {
        ({ subtotal: this.subtotalB, total: this.totalB } = this.data.compute(this.teamB));
    }

}
