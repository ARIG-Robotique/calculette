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
                <InputNumber label="Bouées au port (1 pt)"
                            v-model="form.boueesPort">
                    <template v-slot:help>
                        1 point par bouée valide dans le port.
                    </template>
                </InputNumber>

                <InputNumber label="Bouées dans les chenaux (1 pt)"
                            v-model="form.boueesChenaux" :max="form.boueesPort">
                    <template v-slot:help>
                        1 point supplémentaire par bouée valide sur la ligne de chenal de la même couleur.
                    </template>
                </InputNumber>

                <InputNumber label="Paires de bouées (2 pts)"
                            v-model="form.boueesPaires" :max="form.boueesChenaux / 2">
                    <template v-slot:help>
                       2 points par paires de bouées valides sur les lignes de chenaux d’un même port. Une paire valide est
composée d’une bouée verte et d’une bouée rouge.
                    </template>
                </InputNumber>

                <InputNumber label="Manches à air levées (5-15 pts)"
                            v-model="form.manchesAir" :max="2">
                    <template v-slot:help>
                        5 points si une seule manche à air est relevée à la fin du match. 15 points si les deux manches à air sont relevées en fin de match.
                    </template>
                </InputNumber>

                <InputToggle label="Nombre de robots"
                            v-model="form.nbRobots" 
                            :options="{'Un robot': 1, 'Deux robots': 2}">
                </InputToggle>

                <InputNumber :label="form.nbRobots === 1  ? 'Robot dans le bon mouillage (20 pts)' : 'Robots dans le bon mouillage (10 pts)'"
                            v-model="form.bonPort" :max="form.nbRobots">
                    <template v-slot:help>
                        {{form.nbRobots === 1 ? '20 points si le robot est valide dans la zone de mouillage indiquée par la girouette.' : '10 points par robot valide dans la zone de mouillage indiquée par la girouette.'}}
                    </template>
                </InputNumber>

                <InputNumber :label="form.nbRobots === 1  ? 'Robot dans le mauvais mouillage (6 pts)' : 'Robots dans le mauvais mouillage (3 pts)'"
                            v-model="form.mauvaisPort" :max="form.nbRobots">
                    <template v-slot:help>
                        {{form.nbRobots === 1 ? '6 points si le robot est valide dans l’autre zone de mouillage.' : '3 points par robot valide dans l’autre zone de mouillage.'}}
                    </template>
                </InputNumber>
            </div>

            <div class="md-layout-item md-small-size-100">
                <InputCheckbox label="Phare présent (2 pts)"
                            v-model="form.pharePresent">
                    <template v-slot:help>
                        2 points pour avoir déposé le phare sur la zone zone rocheuse avant le début match.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Phare activé (3 pts)"
                            v-model="form.phareActive">
                    <template v-slot:help>
                        3 points supplémentaires pour avoir activé le phare durant le match.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Phare déployé (10 pts)"
                            v-model="form.phareDeploye">
                    <template v-slot:help>
                        10 points supplémentaires si le phare est correctement déployé et allumé avant la fin du match.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Pavillon hissé (10 pts)"
                            v-model="form.pavillonHisse">
                    <template v-slot:help>
                        10 points si au moins un robot parvient à hisser ses pavillons.
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

                <InputCheckbox label="Non forfait (5 pts)"
                            v-model="form.nonForfait">
                    <template v-slot:help>
                        5 points bonus sont attribués à toutes les équipes qui ne sont pas "forfait".
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
    import InputToggle from '../components/InputToggle.vue';
    import ShareButton from '../components/ShareButton.vue';
    import { AbstractPage } from './AbstractPage';
    import { Form2021, Data2021 } from '../data/Data2021';

    @Component({
        components: {
            InputNumber,
            InputCheckbox,
            InputToggle,
            Favorites,
            ShareButton,
        },
    })
    export default class Page2021 extends AbstractPage<Form2021> {

        readonly year = '2021';
        readonly data = Data2021;

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
