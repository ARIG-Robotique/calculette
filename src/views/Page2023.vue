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
                <InputNumber label="Etages de gâteau (1 pt)"
                            v-model="form.etagesGateaux">
                    <template v-slot:help>
                        1 point par étage dans le gâteau
                    </template>
                </InputNumber>

                <InputNumber label="Gâteaux complets (3 pts)"
                            v-model="form.gateauxComplets">
                    <template v-slot:help>
                        3 points supplémentaires si le gâteau respecte la recette légendaire
                    </template>
                </InputNumber>

                <InputNumber label="Cerises sur les gâteaux (4 pts)"
                            v-model="form.cerisesGateaux">
                    <template v-slot:help>
                        4 points pour chaque cerise posée sur un gâteau valide
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
    import { fromBool, toBool } from '../utils/form.utils';
    import { AbstractPage } from './AbstractPage';

    export interface Form2023 {
        etagesGateaux  : number,
        gateauxComplets: number,
        cerisesGateaux : number,
        panierPresent  : boolean,
        cerisesPanier  : number,
        panierOk       : boolean,
        retourOk       : boolean,
        funnyAction    : boolean,
        estimation     : number,
        nonForfait     : boolean,
    }

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
        subtotal = 0;
        total = 0;
        form = this.defaultForm();

        defaultForm(): Form2023 {
            return {
                etagesGateaux  : 0,
                gateauxComplets: 0,
                cerisesGateaux : 0,
                panierPresent  : false,
                cerisesPanier  : 0,
                panierOk       : false,
                retourOk       : false,
                funnyAction    : false,
                estimation     : 0,
                nonForfait     : true,
            };
        }

        parseForm(c: string): Form2023 {
            const vals = c.split(',');
            if (vals.length !== 17) {
                return null;
            }

            return {
                etagesGateaux  : parseInt(vals[0]),
                gateauxComplets: parseInt(vals[1]),
                cerisesGateaux : parseInt(vals[2]),
                panierPresent  : toBool(vals[3]),
                cerisesPanier  : parseInt(vals[4]),
                panierOk       : toBool(vals[5]),
                retourOk       : toBool(vals[6]),
                funnyAction    : toBool(vals[7]),
                estimation     : parseInt(vals[8]),
                nonForfait     : toBool(vals[9]),
            };
        }

        serializeForm(form: Form2023): string {
            return [
                form.etagesGateaux,
                form.gateauxComplets,
                form.cerisesGateaux,
                fromBool(form.panierPresent),
                form.cerisesPanier,
                fromBool(form.panierOk),
                fromBool(form.retourOk),
                fromBool(form.funnyAction),
                form.estimation,
                fromBool(form.nonForfait),
            ].join(',');
        }

        compute() {
            this.subtotal = 0;
            this.subtotal += this.form.etagesGateaux;
            this.subtotal += this.form.gateauxComplets * 3;
            this.subtotal += this.form.cerisesGateaux * 4;
            this.subtotal += this.form.panierPresent ? 5 : 0;
            this.subtotal += this.form.cerisesPanier;
            this.subtotal += this.form.panierOk ? 5 : 0;
            this.subtotal += this.form.retourOk ? 15 : 0;
            this.subtotal += this.form.funnyAction ? 5 : 0;

            this.total = this.subtotal;
            this.total += Math.max(0, Math.ceil(20 - Math.abs(this.form.estimation - this.subtotal)));
            this.total += 1;

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
