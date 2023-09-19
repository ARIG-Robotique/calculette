<template>
    <div>
        <md-toolbar class="md-primary md-dense arig-page-toolbar">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-xsmall-size-100">Actions : <md-chip class="md-accent">{{subtotal}}</md-chip></div>
                <div class="md-layout-item md-xsmall-size-100">Bonus : <md-chip class="md-accent">{{bonus}}</md-chip></div>
                <div class="md-layout-item md-xsmall-size-100">Total : <md-chip class="md-accent">{{total}}</md-chip></div>
            </div>

            <div class="md-toolbar-section-end">
                <ShareButton :year="year" :value="serializedForm"></ShareButton>
                <Favorites :year="year" :value="{ total, subtotal, form }" @apply="applyFavorite"></Favorites>
            </div>
        </md-toolbar>
        <form class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <InputNumber label="Etages de gâteau (1 pt)"
                            v-model="form.etagesGateaux">
                    <template v-slot:help>
                        1 point par étage dans le gâteau
                    </template>
                </InputNumber>

                <InputNumber label="Gâteaux complets (4 pts)"
                            v-model="form.gateauxComplets">
                    <template v-slot:help>
                        4 points supplémentaires si le gâteau respecte la recette légendaire
                    </template>
                </InputNumber>

                <InputNumber label="Cerises sur les gâteaux (3 pts)"
                            v-model="form.cerisesGateaux">
                    <template v-slot:help>
                        3 points pour chaque cerise posée sur un gâteau valide
                    </template>
                </InputNumber>

                <InputCheckbox label="Panier présent (5 pts)"
                            v-model="form.panierPresent">
                    <template v-slot:help>
                        5 points si l’équipe dépose un panier pendant le temps de préparation
                    </template>
                </InputCheckbox>

                <InputNumber label="Cerises dans le panier (1 pt)"
                            v-model="form.cerisesPanier">
                    <template v-slot:help>
                        1 point par cerise dans le panier
                    </template>
                </InputNumber>

                <InputCheckbox label="Comptage panier (5 pts)"
                            v-model="form.panierOk">
                    <template v-slot:help>
                        5 points supplémentaires si le comptage est juste et supérieur à 0
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Les roues dans le plat (15 pts)"
                            v-model="form.retourOk">
                    <template v-slot:help>
                        15 points si tous les robots de l’équipe sont dans leurs plats
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Funny action (5 pts)"
                            v-model="form.funnyAction">
                    <template v-slot:help>
                        5 points si la funny action est réalisée
                    </template>
                </InputCheckbox>

                <InputNumber label="Estimation de score" v-model="form.estimation" :buttons="false">
                    <md-button class="md-icon-button md-raised md-accent md-dense" @click="setEstimation" tabindex="-1">
                        <md-icon>input</md-icon>
                    </md-button>
                    <template v-slot:help>
                        Bonus = 20 - Abs(Score - Estimation)
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

            <div class="md-layout-item md-small-size-100"></div>
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
    import { Form2023, Data2023 } from '../data/Data2023';

    @Component({
        components: {
            InputNumber,
            InputCheckbox,
            Favorites,
            ShareButton,
        },
    })
    export default class Page2023 extends AbstractPage<Form2023> {

        readonly year = '2023';
        readonly data = Data2023;

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
