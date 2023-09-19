<template>
    <div class="page-dual-2022">
        <md-toolbar class="md-dense arig-page-toolbar">
            <div class="md-layout md-alignment-center" style="width: 100%;">
                <div class="md-layout-item">
                    Total : <md-chip class="md-accent">{{totalA}}</md-chip>
                </div>
                <div class="md-layout-item" style="text-align: right;">
                    Total : <md-chip class="md-accent">{{totalB}}</md-chip>
                </div>
            </div>
        </md-toolbar>
        <form class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <DualInput label="Carrés de fouille basculés (5 pts)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.carresFouille" :max="4"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.carresFouille" :max="4"></InputNumber>
                    </template>
                </DualInput>

                <DualCheckbox label="Aucun carré rouge">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.carresFouilleOk"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.carresFouilleOk"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <DualInput label="Echantillons pris (1 pt)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.echantillonsPris" :max="9"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.echantillonsPris" :max="9"></InputNumber>
                    </template>
                </DualInput>

                <DualInput label="Echantillons au campement (1 pt)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.echantillonsCampement" :max="24"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.echantillonsCampement" :max="24"></InputNumber>
                    </template>
                </DualInput>

                <DualInput label="Echantillons triés au campement (1 pt)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.echantillonsCampementValides" :max="teamA.echantillonsCampement"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.echantillonsCampementValides" :max="teamB.echantillonsCampement"></InputNumber>
                    </template>
                </DualInput>

                <DualInput label="Echantillons sur la galerie (3 pts)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.echantillonsGalerie" :max="24"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.echantillonsGalerie" :max="24"></InputNumber>
                    </template>
                </DualInput>

                <DualInput label="Echantillons triés sur la galerie (3 pts)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.echantillonsGalerieValides" :max="teamA.echantillonsGalerie"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.echantillonsGalerieValides" :max="teamB.echantillonsGalerie"></InputNumber>
                    </template>
                </DualInput>

                <DualInput label="Echantillons dans l'abri (5 pts)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.echantillonsAbri" :max="24"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.echantillonsAbri" :max="24"></InputNumber>
                    </template>
                </DualInput>
            </div>

            <div class="md-layout-item md-small-size-100">
                <DualCheckbox label="Statuette présente (2 pts)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.statuettePresente"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.statuettePresente"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <DualCheckbox label="Statuette prise (5 pts)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.statuettePrise"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.statuettePrise"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <DualCheckbox label="Réplique posée (10 pts)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.repliquePosee"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.repliquePosee"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <DualCheckbox label="Statuette posée dans la vitrine (15 pts)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.statuettePosee"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.statuettePosee"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <DualCheckbox label="Vitrine présente (2 pts)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.vitrinePresente"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.vitrinePresente"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <DualCheckbox label="Vitrine activée (5 pts)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.vitrineActivee"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.vitrineActivee"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <DualCheckbox label="Tous les robots revenus (20 pts)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.retourRobots"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.retourRobots"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <DualInput label="Estimation de score">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.estimation" :buttons="false">
                            <md-button class="md-icon-button md-raised md-accent md-dense" @click="setEstimation('A')" tabindex="-1">
                                <md-icon>input</md-icon>
                            </md-button>
                        </InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.estimation" :buttons="false">
                            <md-button class="md-icon-button md-raised md-accent md-dense" @click="setEstimation('B')" tabindex="-1">
                                <md-icon>input</md-icon>
                            </md-button>
                        </InputNumber>
                    </template>
                </DualInput>

                <DualCheckbox label="Non forfait (1 pt)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.nonForfait"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.nonForfait"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <div style="display: flex; justify-content: flex-end;">
                    <md-button class="md-accent" @click="reset">
                        <md-icon>backspace</md-icon>
                        Reset
                    </md-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import Favorites from '../components/Favorites.vue';
    import InputCheckbox from '../components/InputCheckbox.vue';
    import InputNumber from '../components/InputNumber.vue';
    import ShareButton from '../components/ShareButton.vue';
    import { AbstractPageMatch } from './AbstractPageMatch';
    import DualInput from '../components/DualInput.vue';
    import DualCheckbox from '../components/DualCheckbox.vue';
    import { Form2022, Data2022 } from '../data/Data2022';

    @Component({
        components: {
            InputNumber,
            InputCheckbox,
            DualInput,
            DualCheckbox,
            Favorites,
            ShareButton,
        },
    })
    export default class Page2022Match extends AbstractPageMatch<Form2022> {

        readonly year = '2022';
        readonly data = Data2022;

        setEstimation(team: 'A' | 'B') {
            switch (team) {
                case 'A':
                    this.computeA();
                    this.teamA.estimation = this.subtotalA;
                    break;
                case 'B':
                    this.computeB();
                    this.teamB.estimation = this.subtotalB;
                    break;
            }
        }

        // FIXME methods are not "seen" if not re-declared

        created() {
            super.created();
        }

        mounted() {
            super.mounted();
        }

        reset() {
            super.reset();
        }
    }
</script>

<style scoped lang="scss">
    .page-dual-2022 {
        border-style: solid;
        border-width: 0 20px;
        border-image-source: url('../assets/page2022dual.png');
        border-image-slice: 40;
        border-image-width: 0 20px;
        border-image-repeat: round;
        border-image-outset: 5px;
        margin: 0 -20px;
    }

    .arig-page-toolbar {
        background: linear-gradient(to right, #7f3a98 0% 50%, #ffbe32 50% 100%);
    }
</style>
