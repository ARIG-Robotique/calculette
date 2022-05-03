<template>
    <md-app id="app" :md-theme="contest.year">
        <md-app-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showMenu = !showMenu">
                <md-icon>menu</md-icon>
            </md-button>
            <img :src="'./img/logos/' + contest.year + '.png'" style="height: 40px">
            <span class="md-title">{{contest.year}} : {{contest.name}}</span>
        </md-app-toolbar>

        <md-app-drawer class="md-left" :md-active.sync="showMenu">
            <md-toolbar class="md-primary" md-elevation="0">
                <h3 class="md-title">Règlements</h3>
            </md-toolbar>

            <md-list>
                <md-list-item v-for="c in CONTESTS" :key="c.year" @click="changeYear(c.year)">
                    <md-avatar><img :src="'./img/logos/' + c.year + '.png'"></md-avatar>
                    <span class="md-list-item-text">{{c.year}} : {{c.name}}</span>
                </md-list-item>
            </md-list>
        </md-app-drawer>

        <md-app-content>
            <div class="arig-page">
                <router-view></router-view>
            </div>

            <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="updateExists" md-persistent>
                <span>Une nouvelle version est disponible.</span>
                <md-button class="md-accent" @click="updateApp">
                    Mettre à jour
                </md-button>
                <md-button class="md-icon-button md-primary" @click="showHelp = false">
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
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { Contest, CONTESTS } from './constants/contests';

    @Component({})
    export default class App extends Vue {
        
        readonly CONTESTS = Object.values(CONTESTS).sort((a, b) => b.year - a.year);

        contest: Contest = this.CONTESTS[0];
        showMenu = false;

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

            // migration anciens favories
            if (localStorage['favorites']) {
                localStorage['favorites_2022'] = localStorage['favorites'];
                localStorage.removeItem('favorites');
            }
        }

        @Watch('$route')
        onRouteChange() {
            this.updateYear();
        }

        mounted() {
            this.updateYear();
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

        changeYear(year: number) {
            this.$router.push({path: `/${year}`, query: { c: undefined }});
            this.showMenu = false;
        }

        updateYear() {
            const year = this.$route.path.substring(1);
            this.contest = CONTESTS[year];

            // Apply PWA theme
            document.querySelector('meta[name="theme-color"]').setAttribute("content", this.contest.themeColor);
        }
    }
</script>

<style lang="scss">
    #app {
        height: 100vh;
    }

    .md-app-container {
        overflow-x: hidden;
    }

    .md-app-content {
        padding: 20px; // fix buggy layout gutter
        display: flex;
        flex-direction: column;
    }

    .md-avatar {
        border-radius: none;
    }

    .arig-page {
        flex: 1;
    }

    .arig-footer {
        margin: 2rem -20px -20px -20px;
        padding: 16px;
        text-align: center;
    }
</style>
