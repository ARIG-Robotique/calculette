<template>
    <md-app id="app" md-mode="fixed-last">
        <md-app-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <img src="./assets/logo.png" style="height: 3em;">
                <span class="md-title">Calculette CDR : Age of Bots</span>
            </div>
            <div class="md-toolbar-row">
                Total actions :&nbsp;<md-chip>{{values.subtotal}}</md-chip>&nbsp;/ Total :&nbsp;<md-chip>{{values.total}}</md-chip>
            </div>
        </md-app-toolbar>
        <md-app-content>
            <Calculette @change="values = $event"/>

            <md-content class="md-primary arig-footer">
                Fait avec amour par <a href="https://arig-robotique.github.io/" class="md-accent">ARIG Robotique</a>.<br>
                Contribuez sur <a href="https://github.com/ARIG-Robotique/calculette" class="md-accent">GitHub</a>.<br>
                <img src="./assets/logo-arig.png" style="width: 150px; margin: 1rem auto;">
            </md-content>
        </md-app-content>
    </md-app>
</template>

<script>
    import Calculette from './components/Calculette.vue';

    export default {
        name      : 'App',
        components: {
            Calculette,
        },
        data: () => ({
            values: {
                subtotal: 0,
                total: 0,
            },
        }),
    };
</script>

<style scoped lang="scss">
    #app {
        height: 100vh;
        max-width: 800px;
        margin: 0 auto;
    }

    .md-app-toolbar .md-chip {
        background: white;
        font-weight: bold;
    }

    .arig-footer {
        margin: 2rem -16px -16px -16px;
        padding: 16px;
        text-align: center;
    }
</style>
