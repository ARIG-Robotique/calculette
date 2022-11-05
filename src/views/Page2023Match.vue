<template>
    <div class="page-dual-2023">
        <md-toolbar class="md-dense arig-page-toolbar">
            <div class="md-layout md-alignment-center" style="width: 100%;">
                <div class="md-layout-item">
                    <md-chip class="md-accent">{{subtotalA}}</md-chip>&nbsp;/&nbsp;<md-chip class="md-accent">{{totalA}}</md-chip>
                </div>
                <div class="md-layout-item" style="text-align: right;">
                    <md-chip class="md-accent">{{subtotalB}}</md-chip>&nbsp;/&nbsp;<md-chip class="md-accent">{{totalB}}</md-chip>
                </div>
            </div>
        </md-toolbar>
        <form class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <DualInput label="Etages de gâteau (1 pt)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.etagesGateaux"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.etagesGateaux"></InputNumber>
                    </template>
                </DualInput>

                <DualInput label="Gâteaux complets (4 pts)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.gateauxComplets"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.gateauxComplets"></InputNumber>
                    </template>
                </DualInput>

                <DualInput label="Cerises sur les gâteaux (3 pts)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.cerisesGateaux"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.cerisesGateaux"></InputNumber>
                    </template>
                </DualInput>

                <DualCheckbox label="Panier présent (5 pts)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.panierPresent"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.panierPresent"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <DualInput label="Cerises dans le panier (1 pt)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.cerisesPanier"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.cerisesPanier"></InputNumber>
                    </template>
                </DualInput>

                <DualCheckbox label="Comptage panier (5 pts)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.panierOk"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.panierOk"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <DualCheckbox label="Les roues dans le plat (15 pts)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.retourOk"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.retourOk"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <DualCheckbox label="Funny action (5 pts)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.funnyAction"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.funnyAction"></InputCheckbox>
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
    import { Form2023, Data2023 } from '../data/Data2023';

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
    export default class Page2023Match extends AbstractPageMatch<Form2023> {

        readonly year = '2023';
        readonly data = Data2023;

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
    .page-dual-2023 {
        border-style: solid;
        border-width: 0 20px;
        border-image-source: url('../assets/page2023dual.png');
        border-image-slice: 40;
        border-image-width: 0 20px;
        border-image-repeat: round;
        border-image-outset: 5px;
        margin: 0 -20px;
    }

    .arig-page-toolbar {
        background: linear-gradient(to right, #005da4 0% 50%, #007b47 50% 100%);
    }
</style>