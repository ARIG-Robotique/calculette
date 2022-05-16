import { Vue, Watch } from 'vue-property-decorator';

export abstract class AbstractPageMatch<T> extends Vue {

    abstract readonly year: string;

    teamA: T = this.defaultForm();
    teamB: T = this.defaultForm();
    subtotalA = 0;
    totalA = 0;
    subtotalB = 0;
    totalB = 0;

    abstract defaultForm(): T;

    abstract compute(team: T): { subtotal: number, total: number };

    @Watch('teamA', { deep: true })
    onTeamAChange() {
        this.computeA();
    }

    @Watch('teamB', { deep: true })
    onTeamBChange() {
        this.computeB();
    }

    mounted() {
        this.computeA();
        this.computeB();
    }

    reset() {
        this.teamA = this.defaultForm();
        this.teamB = this.defaultForm();
    }

    computeA() {
        ({ subtotal: this.subtotalA, total: this.totalA } = this.compute(this.teamA));
    }

    computeB() {
        ({ subtotal: this.subtotalB, total: this.totalB } = this.compute(this.teamB));
    }

}
