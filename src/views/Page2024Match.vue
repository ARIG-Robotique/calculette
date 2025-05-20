<template>
    <div class="page-dual-2024">
        <md-toolbar class="md-dense arig-page-toolbar">
            <div class="md-toolbar-section-start">
                <md-chip class="md-accent">Total: {{totalA}}</md-chip>
            </div>
            <div class="md-toolbar-section-end">
                <md-chip class="md-accent">Total: {{totalB}}</md-chip>
            </div>
        </md-toolbar>
        <form class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <DualInput label="Plantes valides (3 pts)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.plantes" :max="36"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.plantes" :max="36"></InputNumber>
                    </template>
                </DualInput>

                <DualInput label="Plantes en pots (1 pt)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.plantesPots" :max="teamA.plantes"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.plantesPots" :max="teamB.plantes"></InputNumber>
                    </template>
                </DualInput>

                <DualInput label="Plantes dans une jardinière (1 pt)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.plantesJardiniere" :max="teamA.plantes"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.plantesJardiniere" :max="teamB.plantes"></InputNumber>
                    </template>
                </DualInput>

                <DualInput label="Panneaux valides (5 pts)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.panneaux" :max="9"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.panneaux" :max="9"></InputNumber>
                    </template>
                </DualInput>

                <DualInput label="Zones avec coccinelle (5 pts)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.zonesCoccinelle" :max="6"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.zonesCoccinelle" :max="6"></InputNumber>
                    </template>
                </DualInput>

                <DualInput label="Coccinelles en contact (5 pts)">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.zonesContact" :max="teamA.zonesCoccinelle"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.zonesContact" :max="teamB.zonesCoccinelle"></InputNumber>
                    </template>
                </DualInput>

                <DualCheckbox label="Robot dans l'aire de recharge (10 pts)">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.retour"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.retour"></InputCheckbox>
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
    import { Form2024, Data2024 } from '../data/Data2024';

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
    export default class Page2024Match extends AbstractPageMatch<Form2024> {

        readonly year = '2024';
        readonly data = Data2024;

        created() {
            super.created();
        }

        mounted() {
            super.mounted();
        }

        reset() {
            super.reset();
        }

        setEstimation(team: 'A' | 'B') {
            super.setEstimation(team);
        }
    }
</script>

<style scoped lang="scss">
    .page-dual-2024 {
        border-style: solid;
        border-width: 0 20px;
        border-image-source: url('../assets/page2024_2025dual.png');
        border-image-slice: 40;
        border-image-width: 0 20px;
        border-image-repeat: round;
        border-image-outset: 5px;
        margin: 0 -20px;
    }

    .arig-page-toolbar {
        background: linear-gradient(to right, #005ca3 0% 50%, #fdc10c 50% 100%);
    }
</style>
