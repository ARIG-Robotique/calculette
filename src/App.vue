<template>
    <md-app id="app">
        <md-app-toolbar>
            <span class="md-title">Age of Bots</span>
        </md-app-toolbar>
        <md-app-content>
            <Calculette/>
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
    };
</script>

<style>
    #app {
        height: 100vh;
        max-width: 800px;
        margin: 0 auto;
    }
</style>
