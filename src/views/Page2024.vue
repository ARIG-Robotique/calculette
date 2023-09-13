<template>
    <div>
        <md-toolbar class="md-primary md-dense arig-page-toolbar">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-xsmall-size-100">Actions : <md-chip class="md-accent">{{subtotal}}</md-chip></div>
                <div class="md-layout-item md-xsmall-size-100">Coccinelles : <md-chip class="md-accent">{{coccinelles}}</md-chip></div>
                <div class="md-layout-item md-xsmall-size-100">Total : <md-chip class="md-accent">{{total}}</md-chip></div>
            </div>

            <div class="md-toolbar-section-end">
                <ShareButton :year="year" :value="serializedForm"></ShareButton>
                <Favorites :year="year" :value="{ total, subtotal, form }" @apply="applyFavorite"></Favorites>
            </div>
        </md-toolbar>
        <form class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-65">
                <InputNumber label="Plantes valides (P1)"
                            v-model="form.plantes">
                    <template v-slot:help>
                        P1 points par plante valide dans une zone adaptée
                    </template>
                </InputNumber>
                <InputNumber label="Plantes en pots (P2)"
                            v-model="form.pots" :max="form.plantes">
                    <template v-slot:help>
                        P2 points supplémentaires si la plante valide est dans un pot
                    </template>
                </InputNumber>
                <InputNumber label="Panneaux valides (P3)"
                            v-model="form.panneaux" :max="9">
                    <template v-slot:help>
                        P3 points pour chaque panneau valide pour l'équipe
                    </template>
                </InputNumber>
                <InputNumber label="Zones avec coccinelle (P4)"
                            v-model="form.zonesWCoccinelle">
                    <template v-slot:help>
                        P4 points par zone de dépose de l'équipe occupée par au moins une coccinelle à la fin du match
                    </template>
                </InputNumber>
                <InputNumber label="Coccinelles en contact (P5)"
                            v-model="form.zonesWContact" :max="form.zonesWCoccinelle">
                    <template v-slot:help>
                        P5 points supplémentaires par zone de dépose de l'équipe dans laquelle 
                        au moins une coccinelle est en contact avec une plante ou un pot contenant une plante
                    </template>
                </InputNumber>
                <InputCheckbox label="Robot dans l'aire de recharge (P6)"
                            v-model="form.retour">
                    <template v-slot:help>
                        P6 points si le robot de l'équipe est dans l'aire valide
                    </template>
                </InputCheckbox>

                <InputNumber label="Estimation de score (P7)" v-model="form.estimation" :buttons="false">
                    <md-button class="md-icon-button md-raised md-accent md-dense" @click="setEstimation" tabindex="-1">
                        <md-icon>input</md-icon>
                    </md-button>
                    <template v-slot:help>
                        Bonus = P7 - Abs(Score - Estimation)
                    </template>
                </InputNumber>

                <InputCheckbox label="Non forfait (1 pt)"
                            v-model="form.nonForfait">
                    <template v-slot:help>
                        1 point bonus est attribué à toutes les équipes qui ne sont pas "forfait".
                    </template>
                </InputCheckbox>
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
    import { Form2024, Data2024 } from '../data/Data2024';

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

        get coccinelles() {
            return this.form.p4 * this.form.zonesWCoccinelle + this.form.p5 * this.form.zonesWContact;
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
