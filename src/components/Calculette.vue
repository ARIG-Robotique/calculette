<template>
    <form>
        <InputNumber label="Carrés de fouille" v-model="form.carresFouille"></InputNumber>
        <InputNumber label="Echantillons enlevés (distrib.)" v-model="form.echantillonsPris"></InputNumber>
        <InputNumber label="Echantillons dans l'abri" v-model="form.echantillonsAbri"></InputNumber>
        <InputNumber label="Echantillons au campement" v-model="form.echantillonsCampement"></InputNumber>
        <InputNumber label="Echantillons valides au campement"
                     v-model="form.echantillonsCampementValides"></InputNumber>
        <InputNumber label="Echantillons dans la galerie" v-model="form.echantillonsGalerie"></InputNumber>
        <InputNumber label="Echantillons valides dans la galerie"
                     v-model="form.echantillonsGalerieValides"></InputNumber>
        <InputCheckbox label="Tous les robots revenus" v-model="form.retourRobots"></InputCheckbox>
        <InputCheckbox label="Statuette présente" v-model="form.statuettePresente"></InputCheckbox>
        <InputCheckbox label="Statuette prise" v-model="form.statuettePrise"></InputCheckbox>
        <InputCheckbox label="Statuette posée dans la vitrine" v-model="form.statuettePosee"></InputCheckbox>
        <InputCheckbox label="Réplique posée" v-model="form.repliquePosee"></InputCheckbox>
        <InputCheckbox label="Vitrine activée" v-model="form.vitrineActivee"></InputCheckbox>

        <md-content class="md-primary">Total actions : {{subtotal}}</md-content>

        <md-divider></md-divider>

        <InputNumber label="Estimation de score" v-model="form.estimation" :buttons="false">
            <md-button class="md-icon-button md-raised" @click="setEstimation"  tabindex="-1">
                <md-icon>input</md-icon>
            </md-button>
        </InputNumber>

        <md-content>Points bonus : 1</md-content>
        <md-content class="md-primary">Total : {{total}}</md-content>
    </form>
</template>

<script>
    import InputNumber from './InputNumber.vue';
    import InputCheckbox from './InputCheckbox.vue';

    export default {
        name      : 'Calculette',
        components: {
            InputNumber,
            InputCheckbox,
        },
        data      : () => ({
            subtotal: 0,
            total   : 0,
            form    : {
                carresFouille               : 0,
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
            },
        }),
        watch     : {
            form: {
                deep: true,
                handler() {
                    this.compute();
                },
            },
        },
        mounted() {
            this.compute();
        },
        methods   : {
            compute() {
                this.subtotal = 0;
                this.subtotal += this.form.carresFouille * 5 + (this.form.carresFouille > 0 ? 5 : 0);
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
            },
            setEstimation() {
                this.compute();
                this.form.estimation = this.subtotal;
            }
        },
    };
</script>

<style scoped>

</style>
