<template>
    <div>
        <md-toolbar class="md-primary md-dense arig-page-toolbar">
            <div class="md-layout md-gutter md-alignment-center-left">
                <div class="md-layout-item md-xsmall-size-100">
                    <md-chip>Actions: {{subtotal}}</md-chip>
                    <md-chip>Bonus: {{bonus}}</md-chip>
                </div>
                <div class="md-layout-item md-xsmall-size-100">
                    <md-chip>Coccinelles: {{coccinelles}}</md-chip>
                    <md-chip class="md-accent">Total: {{total}}</md-chip>
                </div>
            </div>

            <div class="md-toolbar-section-end">
                <ShareButton :year="year" :value="serializedForm"></ShareButton>
                <Favorites :year="year" :value="{ total, subtotal, form }" @apply="applyFavorite"></Favorites>
            </div>
        </md-toolbar>
        <form class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <InputNumber label="Plantes valides (3 pts)"
                            v-model="form.plantes" :max="36">
                    <template v-slot:help>
                        3 points par plante valide dans une zone adaptée
                    </template>
                </InputNumber>
                <InputNumber label="Plantes en pots (1 pt)"
                            v-model="form.plantesPots" :max="form.plantes">
                    <template v-slot:help>
                        1 point supplémentaire si la plante valide est dans un pot
                    </template>
                </InputNumber>
                <InputNumber label="Plantes dans une jardinière (1 pt)"
                            v-model="form.plantesJardiniere" :max="form.plantes">
                    <template v-slot:help>
                        1 point supplémentaire si la plante valide est dans une jardinière
                    </template>
                </InputNumber>
                <InputNumber label="Panneaux valides (5 pts)"
                            v-model="form.panneaux" :max="9">
                    <template v-slot:help>
                        5 points pour chaque panneau valide pour l'équipe
                    </template>
                </InputNumber>
                <InputNumber label="Zones avec coccinelle (5 pts)"
                            v-model="form.zonesCoccinelle" :max="6">
                    <template v-slot:help>
                        5 points par zone de dépose de l'équipe occupée par au moins une coccinelle à la fin du match
                    </template>
                </InputNumber>
                <InputNumber label="Coccinelles en contact (5 pts)"
                            v-model="form.zonesContact" :max="form.zonesCoccinelle">
                    <template v-slot:help>
                        5 points supplémentaires par zone de dépose de l'équipe dans laquelle 
                        au moins une coccinelle est en contact avec une plante ou un pot contenant une plante
                    </template>
                </InputNumber>
                <InputCheckbox label="Robot dans l'aire de recharge (10 pts)"
                            v-model="form.retour">
                    <template v-slot:help>
                        10 points si le robot de l'équipe est dans l'aire valide
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

                <InputCheckbox label="Non forfait (1 pt)"
                            v-model="form.nonForfait">
                    <template v-slot:help>
                        1 point bonus est attribué à toutes les équipes qui ne sont pas "forfait".
                    </template>
                </InputCheckbox>

                <div style="display: flex; justify-content: flex-end;">
                    <md-button class="md-accent" @click="reset">
                        <md-icon>backspace</md-icon>
                        Reset
                    </md-button>
                </div>
            </div>

            <div class="md-layout-item md-small-hide">
                <embed :src="pdfUrl + '#view=Fit'" type="application/pdf"
                       style="width: 100%; aspect-ratio: 1.4; border: none;">
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
    import { Form2024, Data2024 } from '../data/Data2024';
    import { CONTESTS } from '../data/contests';

    @Component({
        components: {
            InputNumber,
            InputCheckbox,
            Favorites,
            ShareButton,
        },
    })
    export default class Page2024 extends AbstractPage<Form2024> {

        readonly year = '2024';
        readonly data = Data2024;
        readonly pdfUrl = CONTESTS['2024'].pdfUrl;

        get coccinelles() {
            return 5 * this.form.zonesCoccinelle + 5 * this.form.zonesContact;
        }

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
