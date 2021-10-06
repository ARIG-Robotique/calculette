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
                <InputNumber label="Atomes dans le tableau (1 pt)"
                            v-model="form.atomesTableau">
                    <template v-slot:help>
                        1 point pour chaque atome standard présent dans le tableau périodique.
                    </template>
                </InputNumber>

                <InputNumber label="Atomes classés (5 pts)"
                            v-model="form.atomesTableauClasses" :max="form.atomesTableau">
                    <template v-slot:help>
                        5 points supplémentaires pour chaque atome standard correctement classé dans les cases du tableau
périodique.
                    </template>
                </InputNumber>

                <InputCheckbox label="Goldenium dans le tableau (6 pts)"
                            v-model="form.goldeniumTableau">
                    <template v-slot:help>
                        6 points pour l’atome de "Goldenium" s’il est placé dans n’importe quelle case du tableau périodique.
                    </template>
                </InputCheckbox>

                <InputNumber label="Redium dans la balance (4 pts)"
                            v-model="form.rediumBalance">
                    <template v-slot:help>
                       4 points par atome présent dans le plateau de la balance pour le "Redium".
                    </template>
                </InputNumber>

                <InputNumber label="Greenium dans la balance (8 pts)"
                            v-model="form.greeniumBalance">
                    <template v-slot:help>
                       8 points par atome présent dans le plateau de la balance pour le "Greenium".
                    </template>
                </InputNumber>

                <InputNumber label="Blueium dans la balance (12 pts)"
                            v-model="form.blueiumBalance">
                    <template v-slot:help>
                       12 points par atome présent dans le plateau de la balance pour le "Blueium".
                    </template>
                </InputNumber>

                <InputCheckbox label="Goldenium dans la balance (24 pts)"
                            v-model="form.goldeniumBalance">
                    <template v-slot:help>
                       24 points pour le "Goldenium" présent dans le plateau de la balance.
                    </template>
                </InputCheckbox>

                <InputNumber label="Atomes dans l'accélérateur (10 pts)"
                            v-model="form.atomesAccel">
                    <template v-slot:help>
                        10 points pour chaque atome présent dans l’accélérateur de particules.
                    </template>
                </InputNumber>
            </div>

            <div class="md-layout-item md-small-size-100">
                <InputCheckbox label="Détecteur déverrouillé (10 pts)"
                            v-model="form.detecteurOuvert">
                    <template v-slot:help>
                       10 points supplémentaires lorsque le détecteur a été déverrouillé (le "Goldenium" à été révélé).
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Goldenium extrait (20 pts)"
                            v-model="form.goldeniumPris">
                    <template v-slot:help>
                       20 points supplémentaires si l’atome de "Goldenium" à été extrait du détecteur.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Expérience présente (5 pts)"
                            v-model="form.experiencePresente">
                    <template v-slot:help>
                        5 points pour avoir déposé l’expérience sur la zone d’expérience avant le début match.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Expérience activée (15 pts)"
                            v-model="form.experienceActivee">
                    <template v-slot:help>
                        15 points supplémentaires pour avoir activé l’expérience durant le match.
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Electron arrivé (20 pts)"
                            v-model="form.electron">
                    <template v-slot:help>
                        20 points supplémentaires si l’électron à atteint l’atome d’oxygène avant la fin du match.
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

                <InputCheckbox label="(finale) Meilleure balance (30 pts)"
                            v-model="form.meilleureBalance">
                    <template v-slot:help>
                        Lors des phases finales, un bonus de 30 points sera accordé à l’équipe qui a mis le plus de points
dans la balance.
                    </template>
                </InputCheckbox>

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
    import { fromBool, toBool } from '../utils/form.utils';
    import { AbstractPage } from './AbstractPage';

    export interface Form2019 {
        atomesTableau       : number,
        atomesTableauClasses: number,
        goldeniumTableau    : boolean,
        rediumBalance       : number,
        greeniumBalance     : number,
        blueiumBalance      : number,
        goldeniumBalance    : boolean,
        atomesAccel         : number,
        detecteurOuvert     : boolean,
        goldeniumPris       : boolean,
        experiencePresente  : boolean,
        experienceActivee   : boolean,
        electron            : boolean,
        estimation          : number,
        meilleureBalance    : boolean,
        nonForfait          : boolean,
    }

    @Component({
        components: {
            InputNumber,
            InputCheckbox,
            Favorites,
            ShareButton,
        },
    })
    export default class Page2019 extends AbstractPage<Form2019> {

        readonly year = '2019';
        subtotal = 0;
        total = 0;
        form = this.defaultForm();

        defaultForm(): Form2019 {
            return {
                atomesTableau       : 0,
                atomesTableauClasses: 0,
                goldeniumTableau    : false,
                rediumBalance       : 0,
                greeniumBalance     : 0,
                blueiumBalance      : 0,
                goldeniumBalance    : false,
                atomesAccel         : 0,
                detecteurOuvert     : false,
                goldeniumPris       : false,
                experiencePresente  : false,
                experienceActivee   : false,
                electron            : false,
                estimation          : 0,
                meilleureBalance    : false,
                nonForfait          : true,
            };
        }

        parseForm(c: string): Form2019 {
            const vals = c.split(',');
            if (vals.length !== 16) {
                return null;
            }

            return {
                atomesTableau       : parseInt(vals[0]),
                atomesTableauClasses: parseInt(vals[1]),
                goldeniumTableau    : toBool(vals[2]),
                rediumBalance       : parseInt(vals[3]),
                greeniumBalance     : parseInt(vals[4]),
                blueiumBalance      : parseInt(vals[5]),
                goldeniumBalance    : toBool(vals[6]),
                atomesAccel         : parseInt(vals[7]),
                detecteurOuvert     : toBool(vals[8]),
                goldeniumPris       : toBool(vals[9]),
                experiencePresente  : toBool(vals[10]),
                experienceActivee   : toBool(vals[11]),
                electron            : toBool(vals[12]),
                estimation          : parseInt(vals[13]),
                meilleureBalance    : toBool(vals[14]),
                nonForfait          : toBool(vals[15]),
            };
        }

        serializeForm(form: Form2019): string {
            return [
                form.atomesTableau,
                form.atomesTableauClasses,
                fromBool(form.goldeniumTableau),
                form.rediumBalance,
                form.greeniumBalance,
                form.blueiumBalance,
                fromBool(form.goldeniumBalance),
                form.atomesAccel,
                fromBool(form.detecteurOuvert),
                fromBool(form.goldeniumPris),
                fromBool(form.experiencePresente),
                fromBool(form.experienceActivee),
                fromBool(form.electron),
                form.estimation,
                fromBool(form.meilleureBalance),
                fromBool(form.nonForfait),
            ].join(',');
        }

        compute() {
            this.subtotal = 0;
            this.subtotal += this.form.atomesTableau;
            this.subtotal += this.form.atomesTableauClasses * 5;
            this.subtotal += this.form.goldeniumTableau ? 6 : 0

            const balance: ('r' | 'g' | 'b' | 'gold')[] = [];
            for (let i = 0; i < this.form.rediumBalance; i++) balance.push('r');
            for (let i = 0; i < this.form.greeniumBalance; i++) balance.push('g');
            for (let i = 0; i < this.form.blueiumBalance; i++) balance.push('b');
            if (this.form.goldeniumBalance) balance.push('gold');

            this.subtotal += balance.slice(0, 6).reduce((sum, atom) => {
                return sum + { r: 4, g: 8, b: 12, gold: 24 }[atom];
            }, 0);

            this.subtotal += this.form.atomesAccel * 10;
            this.subtotal += this.form.detecteurOuvert ? 10 : 0;
            this.subtotal += this.form.goldeniumPris ? 20 : 0;
            this.subtotal += this.form.experiencePresente ? 5 : 0;
            this.subtotal += this.form.experienceActivee ? 15 : 0;
            this.subtotal += this.form.electron ? 20 : 0;

            this.total = this.subtotal;
            this.total += Math.max(0, Math.round(0.3 * this.subtotal - Math.abs(this.form.estimation - this.subtotal)));
            this.total += this.form.meilleureBalance ? 30 : 0;
            this.total += 10;

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
