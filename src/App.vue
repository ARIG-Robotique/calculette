<template>
    <md-app id="app" md-mode="fixed-last">
        <md-app-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <img src="./assets/logo.png" style="height: 3em;">
                <span class="md-title">Calculette CDR : Age of Bots</span>
            </div>
            <div class="md-toolbar-row">
                Total actions :&nbsp;<md-chip>{{value.subtotal}}</md-chip>&nbsp;/ Total :&nbsp;<md-chip>{{value.total}}</md-chip>

                <div class="md-toolbar-section-end">
                    <ShareButton :value="value"></ShareButton>
                    <md-button class="md-icon-button" @click="showFavorites = true">
                        <md-icon>star</md-icon>
                    </md-button>
                </div>
            </div>
        </md-app-toolbar>

        <md-app-drawer class="md-right" :md-active.sync="showFavorites">
            <md-toolbar class="md-accent">
                <span class="md-title">Configs. sauvegardées</span>

                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button" @click="showFavorites = false">
                        <md-icon>cancel</md-icon>
                    </md-button>
                </div>
            </md-toolbar>

            <Favorites :value="value" @apply="applyFavorite"></Favorites>
        </md-app-drawer>

        <md-app-content>
            <Calculette v-model="value"/>

            <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="updateExists" md-persistent>
                <span>Une nouvelle version est disponible.</span>
                <md-button class="md-primary" @click="updateApp">
                    Mettre à jour
                </md-button>
                <md-button class="md-icon-button md-accent" @click="showHelp = false">
                    <md-icon>cancel</md-icon>
                </md-button>
            </md-snackbar>

            <md-content class="md-primary arig-footer">
                Fait avec amour par <a href="https://arig-robotique.github.io/" class="md-accent">ARIG Robotique</a>.<br>
                Contribuez sur <a href="https://github.com/ARIG-Robotique/calculette" class="md-accent">GitHub</a>.<br>
                <img src="./assets/logo-arig.png" style="width: 150px; margin: 1rem auto;">
            </md-content>
        </md-app-content>
    </md-app>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Calculette from './components/Calculette.vue';
    import Favorites from './components/Favorites.vue';
    import ShareButton from './components/ShareButton.vue';
    import { defaultForm, parseForm } from './utils/form.utils';
    import { Favorite } from './models/Favorite';

    @Component({
        components: {
            Calculette,
            ShareButton,
            Favorites,
        },
    })
    export default class App extends Vue {
        value = {
            subtotal: 0,
            total   : 1,
            form    : defaultForm(),
        };

        showFavorites = false;

        private registration: ServiceWorkerRegistration = null;
        updateExists = false;
        refreshing = false;

        created() {
            document.addEventListener('swUpdated', this.updateAvailable as any, { once: true });

            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (!this.refreshing) {
                    this.refreshing = true;
                    window.location.reload();
                }
            });
        }

        mounted() {
            const params = new URLSearchParams(window.location.search);
            const c = params.get('c');

            if (c) {
                this.value = {
                    subtotal: 0,
                    total   : 0,
                    form    : parseForm(c),
                };
            }
        }

        applyFavorite(favorite: Favorite) {
            this.value = favorite;
            this.showFavorites = false;
        }

        updateAvailable(event: CustomEvent) {
            this.registration = event.detail;
            this.updateExists = true;
        }

        updateApp() {
            this.updateExists = false;
            if (this.registration && this.registration.waiting) {
                this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
        }
    }
</script>

<style scoped lang="scss">
    #app {
        height: 100vh;
    }

    .md-app-content {
        padding: 20px; // fix buggy layout gutter
    }

    .md-app-toolbar .md-chip {
        background: white;
        font-weight: bold;
    }

    .arig-footer {
        margin: 2rem -20px -20px -20px;
        padding: 16px;
        text-align: center;
    }
</style>
