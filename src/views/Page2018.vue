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
                <InputNumber label="Bâtiment étage 1 (1 pt)"
                            v-model="form.etage1">
                    <template v-slot:help>
                       1 point par cube valide dans la zone de construction pour le premier niveau (sol).
                    </template>
                </InputNumber>

                <InputNumber label="Bâtiment étage 2 (2 pts)"
                            v-model="form.etage2">
                    <template v-slot:help>
                       2 points par cube valide dans la zone de construction pour le niveau 2.
                    </template>
                </InputNumber>

                <InputNumber label="Bâtiment étage 3 (3 pts)"
                            v-model="form.etage3">
                    <template v-slot:help>
                       3 points par cube valide dans la zone de construction pour le niveau 3.
                    </template>
                </InputNumber>

                <InputNumber label="Bâtiment étage 4 (4 pts)"
                            v-model="form.etage4">
                    <template v-slot:help>
                       4 points par cube valide dans la zone de construction pour le niveau 4.
                    </template>
                </InputNumber>

                <InputNumber label="Bâtiment étage 5 (5 pts)"
                            v-model="form.etage5">
                    <template v-slot:help>
                       5 points par cube valide dans la zone de construction pour le niveau 5.
                    </template>
                </InputNumber>

                <InputNumber label="Combinaisons correctes (30 pts)"
                            v-model="form.combinaisons">
                    <template v-slot:help>
                       30 points pour une combinaison de cubes correspondant au schéma de construction.
                    </template>
                </InputNumber>
            </div>

            <div class="md-layout-item md-small-size-100">
                <InputNumber label="Récupérateurs vidés (10 pts)"
                            v-model="form.recuperateursVides">
                    <template v-slot:help>
                        10 points pour chaque récupérateur au moins vidé d’une balle par l’équipe à qui il appartient.
                    </template>
                </InputNumber>

                <InputNumber label="Balles dans le chateau (5 pts)"
                            v-model="form.ballesChateau">
                    <template v-slot:help>
                        5 points pour chaque balle de la bonne couleur dans le château d’eau.
                    </template>
                </InputNumber>

                <InputCheckbox label="Aucune mauvaise balles"
                            v-model="form.chateauOk">
                    <template v-slot:help>
                        Une balle de la mauvaise couleur annule la totalité des points du château d’eau.
                    </template>
                </InputCheckbox>

                <InputNumber label="Balles dans la station (10 pts)"
                            v-model="form.ballesStation">
                    <template v-slot:help>
                       10 points par balle de la couleur adverse dans la station d’épuration.
                    </template>
                </InputNumber>

                <InputCheckbox label="Panneau domotique présent (5 pts)"
                            v-model="form.panneauPresent">
                    <template v-slot:help>
                       5 points pour la dépose du panneau devant le château d’eau.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Panneau domotique alimenté (25 pts)"
                            v-model="form.panneauActive">
                    <template v-slot:help>
                        25 points pour un panneau alimenté (interrupteur fermé) à la fin du match.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Abeille déposée sur la ruche (5 pts)"
                            v-model="form.abeillePresente">
                    <template v-slot:help>
                        5 points pour la dépose de l’abeille sur la ruche.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Fleur butinée (50 pts)"
                            v-model="form.fleurButinee">
                    <template v-slot:help>
                        50 points pour une fleur butinée (ballon éclaté).
                    </template>
                </InputCheckbox>

                <InputNumber label="Estimation de score" v-model="form.estimation" :buttons="false">
                    <md-button class="md-icon-button md-raised md-accent md-dense" @click="setEstimation" tabindex="-1">
                        <md-icon>input</md-icon>
                    </md-button>
                </InputNumber>

                <InputCheckbox label="Non forfait (10 pts)"
                            v-model="form.nonForfait">
                    <template v-slot:help>
                        10 points bonus sont attribués à toutes les équipes qui ne sont pas "forfait".
                    </template>
                </InputCheckbox>

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
    import { Form2018, Data2018 } from '../data/Data2018';
    

    @Component({
        components: {
            InputNumber,
            InputCheckbox,
            Favorites,
            ShareButton,
        },
    })
    export default class Page2018 extends AbstractPage<Form2018> {

        readonly year = '2018';
        readonly data = Data2018;

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
