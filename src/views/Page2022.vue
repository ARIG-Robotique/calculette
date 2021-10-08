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
    import { fromBool, toBool } from '../utils/form.utils';
    import { AbstractPage } from './AbstractPage';

    export interface Form2022 {
        carresFouille               : number,
        carresFouilleOk             : boolean,
        echantillonsPris            : number,
        echantillonsCampement       : number,
        echantillonsCampementValides: number,
        echantillonsGalerie         : number,
        echantillonsGalerieValides  : number,
        echantillonsAbri            : number,
        retourRobots                : boolean,
        statuettePresente           : boolean,
        statuettePrise              : boolean,
        statuettePosee              : boolean,
        repliquePosee               : boolean,
        vitrinePresente             : boolean,
        vitrineActivee              : boolean,
        estimation                  : number,
        nonForfait                  : boolean,
    }

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
        subtotal = 0;
        total = 0;
        form = this.defaultForm();

        defaultForm(): Form2022 {
            return {
                carresFouille               : 0,
                carresFouilleOk             : true,
                echantillonsPris            : 0,
                echantillonsCampement       : 0,
                echantillonsCampementValides: 0,
                echantillonsGalerie         : 0,
                echantillonsGalerieValides  : 0,
                echantillonsAbri            : 0,
                retourRobots                : false,
                statuettePresente           : false,
                statuettePrise              : false,
                statuettePosee              : false,
                repliquePosee               : false,
                vitrinePresente             : false,
                vitrineActivee              : false,
                estimation                  : 0,
                nonForfait                  : true,
            };
        }

        parseForm(c: string): Form2022 {
            const vals = c.split(',');
            if (vals.length !== 17) {
                return null;
            }

            return {
                carresFouille               : parseInt(vals[0]),
                carresFouilleOk             : toBool(vals[1]),
                echantillonsPris            : parseInt(vals[2]),
                echantillonsCampement       : parseInt(vals[3]),
                echantillonsCampementValides: parseInt(vals[4]),
                echantillonsGalerie         : parseInt(vals[5]),
                echantillonsGalerieValides  : parseInt(vals[6]),
                echantillonsAbri            : parseInt(vals[7]),
                retourRobots                : toBool(vals[8]),
                statuettePresente           : toBool(vals[9]),
                statuettePrise              : toBool(vals[10]),
                statuettePosee              : toBool(vals[11]),
                repliquePosee               : toBool(vals[12]),
                vitrinePresente             : toBool(vals[13]),
                vitrineActivee              : toBool(vals[14]),
                estimation                  : parseInt(vals[15]),
                nonForfait                  : toBool(vals[16]),
            };
        }

        serializeForm(form: Form2022): string {
            return [
                form.carresFouille,
                fromBool(form.carresFouilleOk),
                form.echantillonsPris,
                form.echantillonsCampement,
                form.echantillonsCampementValides,
                form.echantillonsGalerie,
                form.echantillonsGalerieValides,
                form.echantillonsAbri,
                fromBool(form.retourRobots),
                fromBool(form.statuettePresente),
                fromBool(form.statuettePrise),
                fromBool(form.statuettePosee),
                fromBool(form.repliquePosee),
                fromBool(form.vitrinePresente),
                fromBool(form.vitrineActivee),
                form.estimation,
                fromBool(form.nonForfait),
            ].join(',');
        }

        compute() {
            this.subtotal = 0;
            if (this.form.carresFouilleOk && this.form.carresFouille > 0) {
                this.subtotal += 5 + this.form.carresFouille * 5;
            }
            this.subtotal += this.form.echantillonsPris;
            this.subtotal += this.form.echantillonsCampement;
            this.subtotal += this.form.echantillonsCampementValides;
            this.subtotal += this.form.echantillonsGalerie * 3;
            this.subtotal += this.form.echantillonsGalerieValides * 3;
            this.subtotal += this.form.echantillonsAbri * 5;
            this.subtotal += this.form.retourRobots ? 20 : 0;
            this.subtotal += this.form.statuettePresente ? 2 : 0;
            this.subtotal += this.form.statuettePrise ? 5 : 0;
            this.subtotal += this.form.statuettePosee ? 15 : 0;
            this.subtotal += this.form.repliquePosee ? 10 : 0;
            this.subtotal += this.form.vitrinePresente ? 2 : 0;
            this.subtotal += this.form.vitrineActivee ? 5 : 0;

            this.total = this.subtotal;
            this.total += Math.max(0, Math.round(0.3 * this.subtotal - Math.abs(this.form.estimation - this.subtotal)));
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
