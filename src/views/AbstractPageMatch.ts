import { Vue, Watch } from 'vue-property-decorator';
import { PageData } from '../models/PageData';

export abstract class AbstractPageMatch<T> extends Vue {

    abstract readonly year: string;
    abstract readonly data: PageData<T>;

    teamA: T = {} as T;
    teamB: T = {} as T;
    subtotalA = 0;
    bonusA = 0;
    simaA = 0;
    totalA = 0;

    subtotalB = 0;
    bonusB = 0;
    simaB = 0;
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
        ({ subtotal: this.subtotalA, bonus: this.bonusA, sima: this.simaA, total: this.totalA } = this.data.compute(this.teamA));
    }

    computeB() {
        ({ subtotal: this.subtotalB, bonus: this.bonusB, sima: this.simaB, total: this.totalB } = this.data.compute(this.teamB));
    }

    setEstimation(team: 'A' | 'B') {
        switch (team) {
            case 'A':
                this.computeA();
                // @ts-ignore
                this.teamA.estimation = this.subtotalA;
                break;
            case 'B':
                this.computeB();
                // @ts-ignore
                this.teamB.estimation = this.subtotalB;
                break;
        }
    }

}
