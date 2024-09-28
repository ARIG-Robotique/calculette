<template>
    <div>
        <md-toolbar class="md-primary md-dense arig-page-toolbar">
            <div class="md-layout md-gutter md-alignment-center-left">
                <div class="md-layout-item md-xsmall-size-100">
                    <md-chip class="chip-2025">Actions: {{subtotal}}</md-chip>
                    <md-chip class="chip-2025">Bonus: {{bonus}}</md-chip>
                </div>
                <div class="md-layout-item md-xsmall-size-100">
                    <md-chip class="chip-2025">PAMI: {{sima}}</md-chip>
                    <md-chip class="md-accent">Total: {{total}}</md-chip>
                </div>
            </div>

            <div class="md-toolbar-section-end">
                <ShareButton :year="year" :value="serializedForm"></ShareButton>
                <Favorites :year="year" :value="{ total, subtotal, form }" @apply="applyFavorite"></Favorites>
            </div>
        </md-toolbar>
        <form class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-65">
                <InputNumber label="Gradins niveau 1 (P1)"
                            v-model="form.tribune1" :max="10">
                    <template v-slot:help>
                        P1 points par gradin de niveau 1
                    </template>
                </InputNumber>
                <InputNumber label="Gradins niveau 2 (P2)"
                            v-model="form.tribune2" :max="form.tribune1">
                    <template v-slot:help>
                        P2 points par gradin de niveau 2
                    </template>
                </InputNumber>
                <InputNumber label="Gradins niveau 3 (P3)"
                            v-model="form.tribune3" :max="form.tribune2">
                    <template v-slot:help>
                        P3 points par gradin de niveau 3
                    </template>
                </InputNumber>
                <InputCheckbox label="Banderole déployée (P4)"
                            v-model="form.banner">
                    <template v-slot:help>
                        P4 points si la banderole de l’équipe est déployée
                    </template>
                </InputCheckbox>
                <InputNumber label="Zones de fosse occupées (P5)"
                            v-model="form.areasWGroupies" :max="3">
                    <template v-slot:help>
                        P5 points par zone de la fosses occupé par au moins une groupie de l’équipe
                    </template>
                </InputNumber>
                <InputCheckbox label="Superstar sur scène (P6)"
                            v-model="form.superstar">
                    <template v-slot:help>
                        P6 points si la superstar de l’équipe est valide sur scène
                    </template>
                </InputCheckbox>
                <InputCheckbox label="Tous les PAMI (P7)"
                            v-model="form.allSima">
                    <template v-slot:help>
                        P7 points supplémentaires si tous les PAMI font la fête
                    </template>
                </InputCheckbox>
                <InputNumber label="Zones de scène libres"
                            v-model="form.freeStageArea" :max="7">
                    <template v-slot:help>
                        X points supplémentaires par zone de scène libre derrière la superstar
                    </template>
                </InputNumber>
                <InputCheckbox label="Ranger les outils (P8)"
                            v-model="form.storage">
                    <template v-slot:help>
                        P8 points si le robot principal de l’équipe est dans l’aire d’arrivée
                    </template>
                </InputCheckbox>

                <InputNumber label="Estimation de score" v-model="form.estimation" :buttons="false">
                    <md-button class="md-icon-button md-raised md-accent md-dense" @click="setEstimation" tabindex="-1">
                        <md-icon>input</md-icon>
                    </md-button>
                    <template v-slot:help>
                        Bonus = Min(20 - Écart / 2, Score)
                    </template>
                </InputNumber>
            </div>

            <div class="md-layout-item md-small-size-35">
                <InputNumber label="P1"
                            v-model="form.p1">
                </InputNumber>
                <InputNumber label="P2"
                            v-model="form.p2">
                </InputNumber>
                <InputNumber label="P3"
                            v-model="form.p3">
                </InputNumber>
                <InputNumber label="P4"
                            v-model="form.p4">
                </InputNumber>
                <InputNumber label="P5"
                            v-model="form.p5">
                </InputNumber>
                <InputNumber label="P6"
                            v-model="form.p6">
                </InputNumber>
                <InputNumber label="P7"
                            v-model="form.p7">
                </InputNumber>
                <div style="height: 60px">
                    
                </div>
                <InputNumber label="P8"
                            v-model="form.p8">
                </InputNumber>

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
    import { Favorite } from 'src/models/Favorite';
    import { Component } from 'vue-property-decorator';
    import Favorites from '../components/Favorites.vue';
    import InputCheckbox from '../components/InputCheckbox.vue';
    import InputNumber from '../components/InputNumber.vue';
    import ShareButton from '../components/ShareButton.vue';
    import { AbstractPage } from './AbstractPage';
    import { Form2025, Data2025 } from '../data/Data2025';

    @Component({
        components: {
            InputNumber,
            InputCheckbox,
            Favorites,
            ShareButton,
        },
    })
    export default class Page2025 extends AbstractPage<Form2025> {

        readonly year = '2025';
        readonly data = Data2025;

        setEstimation() {
            this.compute();
            this.form.estimation = this.subtotal;
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

        applyFavorite(favorite: Favorite) {
            super.applyFavorite(favorite);
        }
    }
</script>

<style>
.chip-2025 {
    color: white !important;
    border: 1px solid currentColor;
}
</style>
