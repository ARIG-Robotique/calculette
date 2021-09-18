<template>
    <form>
        <div>
            <label>Carrés de fouille</label>
            <input type="number" min="0" v-model="form.carresFouille">
        </div>
        <div>
            <label>Echantillons enlevés (distrib.)</label>
            <input type="number" min="0" v-model="form.echantillonsPris">
        </div>
        <div>
            <label>Echantillons au campement</label>
            <input type="number" min="0" v-model="form.echantillonsCampement">
        </div>
        <div>
            <label>Echantillons valides au campement</label>
            <input type="number" min="0" v-model="form.echantillonsCampementValides">
        </div>
        <div>
            <label>Echantillons dans la galerie</label>
            <input type="number" min="0" v-model="form.echantillonsGalerie">
        </div>
        <div>
            <label>Echantillons valides dans la galerie</label>
            <input type="number" min="0" v-model="form.echantillonsGalerieValides">
        </div>
        <div>
            <label>Echantillons dans l'abri</label>
            <input type="number" min="0" v-model="form.echantillonsAbri">
        </div>
        <div>
            <label>Tous les robots revenus</label>
            <input type="checkbox" v-model="form.retourRobots">
        </div>
        <div>
            <label>Statuette présente</label>
            <input type="checkbox" v-model="form.statuettePresente">
        </div>
        <div>
            <label>Statuette prise</label>
            <input type="checkbox" v-model="form.statuettePrise">
        </div>
        <div>
            <label>Statuette posée dans la vitrine</label>
            <input type="checkbox" v-model="form.statuettePosee">
        </div>
        <div>
            <label>Statuette posée</label>
            <input type="checkbox" v-model="form.repliquePosee">
        </div>
        <div>
            <label>Vitrine présente</label>
            <input type="checkbox" v-model="form.vitrinePresente">
        </div>
        <div>
            <label>Vitrine activée</label>
            <input type="checkbox" v-model="form.vitrineActivee">
        </div>

        <h5>sous-total : {{subtotal}}</h5>
        <div>
            <label>Estimation de score</label>
            <input type="number" min="0" v-model="form.estimation">
        </div>
        <div>
            <label>Points bonus</label>
            <strong>1</strong>
        </div>
        <h5>total : {{total}}</h5>
    </form>
</template>

<script>
    export default {
        name   : 'Calculette',
        data   : () => ({
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
            }
        }),
        watch  : {
            form: {
                deep: true,
                handler() {
                    this.compute();
                }
            }
        },
        methods: {
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
            }
        }
    }
</script>

<style scoped>

</style>
