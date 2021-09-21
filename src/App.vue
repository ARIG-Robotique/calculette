<template>
    <md-app id="app" md-mode="fixed-last">
        <md-app-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <span class="md-title">Age of Bots</span>
            </div>
            <div class="md-toolbar-row">
                Total actions :&nbsp;<md-chip>{{values.subtotal}}</md-chip>&nbsp;/ Total :&nbsp;<md-chip>{{values.total}}</md-chip>
            </div>
        </md-app-toolbar>
        <md-app-content>
            <Calculette @change="values = $event"/>
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

<style scoped>
    #app {
        height: 100vh;
        max-width: 800px;
        margin: 0 auto;
    }

    .md-app-toolbar .md-chip {
        background: white;
        font-weight: bold;
    }
</style>
