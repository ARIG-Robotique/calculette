<template>
    <div>
        <md-toolbar class="md-primary md-dense arig-page-toolbar">
            Total actions :&nbsp;<md-chip class="md-accent">{{subtotal}}</md-chip>&nbsp;/ Total :&nbsp;<md-chip class="md-accent">{{total}}</md-chip>

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
    import { fromBool, toBool } from '../utils/form.utils';
    import { AbstractPage } from './AbstractPage';

    export interface Form2018 {
        recuperateursVides: number,
        ballesChateau     : number,
        chateauOk         : boolean,
        ballesStation     : number,
        etage1            : number,
        etage2            : number,
        etage3            : number,
        etage4            : number,
        etage5            : number,
        combinaisons      : number,
        panneauPresent    : boolean,
        panneauActive     : boolean,
        abeillePresente   : boolean,
        fleurButinee      : boolean,
        estimation        : number,
        nonForfait        : boolean,
    }

    const BONUS: Record<string, Record<string, number>> = {
        10: { 2:2, 5:0, 10:0, 15:0, 25:0, 35:0, 50:0, 100:0, 150:0 },
        20: { 2:5, 5:0, 10:0, 15:0, 25:0, 35:0, 50:0, 100:0, 150:0 },
        40: { 2:10, 5:3, 10:0, 15:0, 25:0, 35:0, 50:0, 100:0, 150:0 },
        60: { 2:17, 5:10, 10:3, 15:0, 25:0, 35:0, 50:0, 100:0, 150:0 },
        80: { 2:23, 5:16, 10:9, 15:2, 25:0, 35:0, 50:0, 100:0, 150:0 },
        100: { 2:30, 5:23, 10:16, 15:9, 25:0, 35:0, 50:0, 100:0, 150:0 },
        130: { 2:37, 5:30, 10:23, 15:16, 25:6, 35:0, 50:0, 100:0, 150:0 },
        160: { 2:43, 5:36, 10:29, 15:22, 25:12, 35:2, 50:0, 100:0, 150:0 },
        190: { 2:50, 5:43, 10:36, 15:29, 25:19, 35:9, 50:0, 100:0, 150:0 },
        220: { 2:57, 5:50, 10:43, 15:36, 25:26, 35:16, 50:4, 100:0, 150:0 },
        260: { 2:63, 5:56, 10:49, 15:42, 25:32, 35:22, 50:10, 100:0, 150:0 },
        300: { 2:70, 5:63, 10:56, 15:49, 25:39, 35:29, 50:17, 100:3, 150:0 },
        340: { 2:77, 5:70, 10:63, 15:56, 25:46, 35:36, 50:24, 100:10, 150:0 },
        380: { 2:83, 5:76, 10:69, 15:62, 25:52, 35:42, 50:30, 100:16, 150:0 },
        420: { 2:90, 5:83, 10:76, 15:59, 25:59, 35:49, 50:37, 100:23, 150:0 },
        500: { 2:97, 5:90, 10:83, 15:76, 25:66, 35:56, 50:44, 100:30, 150:7 },
        999: { 2:103, 5:96, 10:89, 15:82, 25:72, 35:62, 50:50, 100:36, 150:13 },
    };

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
        subtotal = 0;
        total = 0;
        form = this.defaultForm();

        defaultForm(): Form2018 {
            return {
                recuperateursVides: 0,
                ballesChateau     : 0,
                chateauOk         : true,
                ballesStation     : 0,
                etage1            : 0,
                etage2            : 0,
                etage3            : 0,
                etage4            : 0,
                etage5            : 0,
                combinaisons      : 0,
                panneauPresent    : false,
                panneauActive     : false,
                abeillePresente   : false,
                fleurButinee      : false,
                estimation        : 0,
                nonForfait        : true,
            };
        }

        parseForm(c: string): Form2018 {
            const vals = c.split(',');
            if (vals.length !== 16) {
                return null;
            }

            return {
                recuperateursVides: parseInt(vals[0]),
                ballesChateau     : parseInt(vals[1]),
                chateauOk         : toBool(vals[2]),
                ballesStation     : parseInt(vals[3]),
                etage1            : parseInt(vals[4]),
                etage2            : parseInt(vals[5]),
                etage3            : parseInt(vals[6]),
                etage4            : parseInt(vals[7]),
                etage5            : parseInt(vals[8]),
                combinaisons      : parseInt(vals[9]),
                panneauPresent    : toBool(vals[10]),
                panneauActive     : toBool(vals[11]),
                abeillePresente   : toBool(vals[12]),
                fleurButinee      : toBool(vals[13]),
                estimation        : parseInt(vals[14]),
                nonForfait        : toBool(vals[15]),
            };
        }

        serializeForm(form: Form2018): string {
            return [
                form.recuperateursVides,
                form.ballesChateau,
                fromBool(form.chateauOk),
                form.ballesStation,
                form.etage1,
                form.etage2,
                form.etage3,
                form.etage4,
                form.etage5,
                form.combinaisons,
                fromBool(form.panneauPresent),
                fromBool(form.panneauActive),
                fromBool(form.abeillePresente),
                fromBool(form.fleurButinee),
                form.estimation,
                fromBool(form.nonForfait),
            ].join(',');
        }

        compute() {
            this.subtotal = 0;
            this.subtotal += this.form.recuperateursVides * 10;
            if (this.form.chateauOk) {
                this.subtotal += this.form.ballesChateau * 5;
            }
            this.subtotal += this.form.ballesStation * 10;
            this.subtotal += this.form.etage1;
            this.subtotal += this.form.etage2 * 2;
            this.subtotal += this.form.etage3 * 3;
            this.subtotal += this.form.etage4 * 4;
            this.subtotal += this.form.etage5 * 5;
            this.subtotal += this.form.combinaisons * 30;
            this.subtotal += this.form.panneauPresent ? 5 : 0;
            this.subtotal += this.form.panneauActive ? 25 : 0;
            this.subtotal += this.form.abeillePresente ? 5 : 0;
            this.subtotal += this.form.fleurButinee ? 50 : 0;

            this.total = this.subtotal;
            if (this.subtotal > 0) {
                const score = this.subtotal;
                const ecart = Math.abs(this.form.estimation - score);

                bonus:
                for (let maxScore of Object.keys(BONUS)) {
                    if (score <= +maxScore) {
                        for (let maxEcart of Object.keys(BONUS[maxScore])) {
                            if (ecart <= +maxEcart) {
                                this.total += BONUS[maxScore][maxEcart];
                                break bonus;
                            }
                        }
                    }
                }
            }
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
