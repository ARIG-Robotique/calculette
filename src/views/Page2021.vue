<template>
    <div>
        <md-toolbar class="md-primary md-dense arig-page-toolbar">
            Total actions :&nbsp;<md-chip>{{subtotal}}</md-chip>&nbsp;/ Total :&nbsp;<md-chip>{{total}}</md-chip>

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
    import { fromBool, toBool } from '../utils/form.utils';
    import { AbstractPage } from './AbstractPage';

    export interface Form2021 {
        boueesPort   : number,
        boueesChenaux: number,
        boueesPaires : number,
        manchesAir   : number,
        nbRobots     : number,
        bonPort      : number,
        mauvaisPort  : number,
        pharePresent : boolean,
        phareActive  : boolean,
        phareDeploye : boolean,
        pavillonHisse: boolean,
        estimation   : number,
        nonForfait   : boolean,
    }

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
        subtotal = 0;
        total = 0;
        form = this.defaultForm();

        defaultForm(): Form2021 {
            return {
                boueesPort   : 0,
                boueesChenaux: 0,
                boueesPaires : 0,
                manchesAir   : 0,
                nbRobots     : 2,
                bonPort      : 0,
                mauvaisPort  : 0,
                pharePresent : false,
                phareActive  : false,
                phareDeploye : false,
                pavillonHisse: false,
                estimation   : 0,
                nonForfait   : true,
            };
        }

        parseForm(c: string): Form2021 {
            const vals = c.split(',');
            if (vals.length !== 13) {
                return null;
            }

            return {
                boueesPort   : parseInt(vals[0]),
                boueesChenaux: parseInt(vals[1]),
                boueesPaires : parseInt(vals[2]),
                manchesAir   : parseInt(vals[3]),
                nbRobots     : parseInt(vals[4]),
                bonPort      : parseInt(vals[5]),
                mauvaisPort  : parseInt(vals[6]),
                pharePresent : toBool(vals[7]),
                phareActive  : toBool(vals[8]),
                phareDeploye : toBool(vals[9]),
                pavillonHisse: toBool(vals[10]),
                estimation   : parseInt(vals[11]),
                nonForfait   : toBool(vals[12]),
            };
        }

        serializeForm(form: Form2021): string {
            return [
                form.boueesPort,
                form.boueesChenaux,
                form.boueesPaires,
                form.manchesAir,
                form.nbRobots,
                form.bonPort,
                form.mauvaisPort,
                fromBool(form.pharePresent),
                fromBool(form.phareActive),
                fromBool(form.phareDeploye),
                fromBool(form.pavillonHisse),
                form.estimation,
                fromBool(form.nonForfait),
            ].join(',');
        }

        compute() {
            this.subtotal = 0;
            this.subtotal += this.form.boueesPort;
            this.subtotal += this.form.boueesChenaux;
            this.subtotal += this.form.boueesPaires * 2;
            this.subtotal += this.form.manchesAir === 2 ? 15 : this.form.manchesAir === 1 ? 5 : 0;
            if (this.form.nbRobots === 2) {
                this.subtotal += this.form.bonPort * 10;
                this.subtotal += this.form.mauvaisPort * 3;
            } else {
                this.subtotal += this.form.bonPort * 20;
                this.subtotal += this.form.mauvaisPort * 6;
            }
            this.subtotal += this.form.pharePresent ? 2 : 0;
            this.subtotal += this.form.phareActive ? 3 : 0;
            this.subtotal += this.form.phareDeploye ? 10 : 0;
            this.subtotal += this.form.pavillonHisse ? 10 : 0;

            this.total = this.subtotal;
            this.total += Math.max(0, Math.round(0.3 * this.subtotal - Math.abs(this.form.estimation - this.subtotal)));
            this.total += 5;

            if (!this.form.nonForfait) {
                this.total = 0;
            }
        }

        setEstimation() {
            this.compute();
            this.form.estimation = this.subtotal;
        }

        // FIXME methods are not "seen" if not re-declared

        reset() {
            super.reset();
        }

        applyFavorite(favorite: Favorite) {
            super.applyFavorite(favorite);
        }

        mounted() {
            super.mounted();
        }
    }
</script>
