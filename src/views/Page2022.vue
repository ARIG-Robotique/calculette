<template>
    <div>
        <md-toolbar class="md-primary md-dense arig-page-toolbar">
            <div class="md-layout md-gutter">
                <div class="md-layout-item">Actions : <md-chip class="md-accent">{{subtotal}}</md-chip></div>
                <div class="md-layout-item">Total : <md-chip class="md-accent">{{total}}</md-chip></div>
            </div>

            <div class="md-toolbar-section-end">
                <ShareButton :year="year" :value="serializedForm"></ShareButton>
                <Favorites :year="year" :value="{ total, subtotal, form }" @apply="applyFavorite"></Favorites>
            </div>
        </md-toolbar>
        <form class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <InputNumber label="Carrés de fouille basculés (5 pts)"
                            v-model="form.carresFouille" :max="4">
                    <template v-slot:help>
                        5 points pour chaque carré de fouille basculé à la couleur de l’équipe. 5 points supplémentaires si
                        au moins un carré de fouille est basculé.
                    </template>
                </InputNumber>

                <InputCheckbox label="Aucun carré rouge"
                            v-model="form.carresFouilleOk">
                    <template v-slot:help>
                        Le basculement du carré de fouille rouge d’une équipe entraîne l’invalidation de tout les carrés de
                        fouilles de l’équipe.
                    </template>
                </InputCheckbox>

                <InputNumber label="Echantillons pris (1 pt)"
                            v-model="form.echantillonsPris" :max="9">
                    <template v-slot:help>
                        1 point pour chaque échantillon enlevé d’un distributeur du côté de l’équipe (incluant le
                        distributeur partagé et l’abri de chantier).
                    </template>
                </InputNumber>

                <InputNumber label="Echantillons au campement (1 pt)"
                            v-model="form.echantillonsCampement" :max="24">
                    <template v-slot:help>
                        1 point par échantillon dans le campement.
                    </template>
                </InputNumber>

                <InputNumber label="Echantillons triés au campement (1 pt)"
                            v-model="form.echantillonsCampementValides" :max="form.echantillonsCampement">
                    <template v-slot:help>
                        1 point supplémentaire par échantillon face trésor et trié dans le campement.
                    </template>
                </InputNumber>

                <InputNumber label="Echantillons sur la galerie (3 pts)"
                            v-model="form.echantillonsGalerie" :max="24">
                    <template v-slot:help>
                        3 points par échantillon sur la galerie.
                    </template>
                </InputNumber>

                <InputNumber label="Echantillons triés sur la galerie (3 pts)"
                            v-model="form.echantillonsGalerieValides" :max="form.echantillonsGalerie">
                    <template v-slot:help>
                        3 points supplémentaires par échantillon face trésor et trié dans sa période historique.
                    </template>
                </InputNumber>

                <InputNumber label="Echantillons dans l'abri (5 pts)"
                            v-model="form.echantillonsAbri" :max="24">
                    <template v-slot:help>
                        5 points par échantillon dans l’abri.
                    </template>
                </InputNumber>
            </div>

            <div class="md-layout-item md-small-size-100">
                <InputCheckbox label="Statuette présente (2 pts)"
                            v-model="form.statuettePresente">
                    <template v-slot:help>
                        2 points pour la dépose de la statuette sur le piédestal pendant le temps de préparation.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Statuette prise (5 pts)"
                            v-model="form.statuettePrise">
                    <template v-slot:help>
                        5 points si la statuette n’est plus présente en fin de match sur le piédestal.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Réplique posée (10 pts)"
                            v-model="form.repliquePosee">
                    <template v-slot:help>
                        10 points si la réplique est présente en fin de match sur le piédestal.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Statuette posée dans la vitrine (15 pts)"
                            v-model="form.statuettePosee">
                    <template v-slot:help>
                        15 points si la statuette est présente en fin de match dans la vitrine.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Vitrine présente (2 pts)"
                            v-model="form.vitrinePresente">
                    <template v-slot:help>
                        2 points si l’équipe dépose une vitrine pendant le temps de préparation.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Vitrine activée (5 pts)"
                            v-model="form.vitrineActivee">
                    <template v-slot:help>
                        5 points supplémentaires si la vitrine est activée.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Tous les robots revenus (20 pts)"
                            v-model="form.retourRobots">
                    <template v-slot:help>
                        20 points si tous les robots de l’équipe sont dans le campement ou la zone de fouille.
                    </template>
                </InputCheckbox>

                <InputNumber label="Estimation de score" v-model="form.estimation" :buttons="false">
                    <md-button class="md-icon-button md-raised md-accent md-dense" @click="setEstimation" tabindex="-1">
                        <md-icon>input</md-icon>
                    </md-button>
                    <template v-slot:help>
                        Bonus = (0.3 x Score) - Abs(Score - Estimation)
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
    import { Form2022, Data2022 } from '../data/Data2022';

    @Component({
        components: {
            InputNumber,
            InputCheckbox,
            Favorites,
            ShareButton,
        },
    })
    export default class Page2022 extends AbstractPage<Form2022> {

        readonly year = '2022';
        readonly data = Data2022;

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
