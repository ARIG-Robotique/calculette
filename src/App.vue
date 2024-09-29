<template>
    <md-app id="app" :md-theme="contest.year">
        <md-app-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showMenu = !showMenu">
                <md-icon>menu</md-icon>
            </md-button>
            <img :src="'./img/logos/' + contest.year + '.png'" style="height: 40px">
            <span class="md-title">{{contest.year}} : {{contest.name}}</span>
            <div class="md-toolbar-section-end">
                <md-button class="md-icon-button" v-if="contest.pdfUrl" @click="showPdfDialog = true">
                    <md-icon>description</md-icon>
                </md-button>
                <md-button class="md-icon-button" v-if="contest.match" @click="switchMatch()">
                    <md-icon>sports_score</md-icon>
                </md-button>
            </div>
        </md-app-toolbar>

        <md-app-drawer class="md-left" :md-active.sync="showMenu">
            <md-toolbar class="md-primary" md-elevation="0">
                <h3 class="md-title" style="flex:1">{{ $t('global.contests') }}</h3>
                <md-menu md-direction="bottom-end">
                    <md-button md-menu-trigger class="md-icon-button">
                        <md-icon>translate</md-icon>
                    </md-button>

                    <md-menu-content>
                        <md-menu-item @click="setLocale('fr')">🇫🇷 Français</md-menu-item>
                        <md-menu-item @click="setLocale('en')">🇬🇧 English</md-menu-item>
                    </md-menu-content>
                </md-menu>
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
                <span>{{ $t('update.msg') }}</span>
                <md-button class="md-accent" @click="updateApp">
                    {{ $t('update.btn') }}
                </md-button>
                <md-button class="md-icon-button md-primary" @click="updateExists = false">
                    <md-icon>cancel</md-icon>
                </md-button>
            </md-snackbar>

            <md-dialog :md-active.sync="showPdfDialog" :md-fullscreen="true">
                <md-dialog-content class="md-dialog-no-padding">
                    <embed :src="contest.pdfUrl" type="application/pdf"
                           style="width: 100%; height: 100%; border: none;">
                </md-dialog-content>

                <md-dialog-actions>
                    <md-button class="md-primary" @click="showPdfDialog = false">Fermer</md-button>
                </md-dialog-actions>
            </md-dialog>

            <md-content class="md-primary arig-footer">
                Fait avec amour par <a href="https://arig-robotique.github.io/" class="md-accent">ARIG Robotique</a>.<br>
                Contribuez sur <a href="https://github.com/ARIG-Robotique/calculette" class="md-accent">GitHub</a>.<br>
                <img src="./assets/logo-arig.png" style="width: 150px; margin: 1rem auto 0 auto;">
            </md-content>
        </md-app-content>
    </md-app>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { Contest, CONTESTS } from './data/contests';

    @Component({})
    export default class App extends Vue {
        
        readonly CONTESTS = Object.values(CONTESTS).sort((a, b) => b.year - a.year);

        contest: Contest = this.CONTESTS[0];
        showMenu = false;
        showPdfDialog = false;

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

        @Watch('$route')
        onRouteChange() {
            this.updateYear();
        }

        mounted() {
            this.updateYear();
            document.title = this.$t('appName') as string;
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

        switchMatch() {
            const isMatch = this.$route.path.substring(1).split('/')[1] === 'match';
            if (isMatch) {
                this.$router.push({path: `/${this.contest.year}`});
            } else {
                this.$router.push({path: `/${this.contest.year}/match`, query: { c: undefined }});
            }
        }

        setLocale(locale: string) {
            this.$i18n.locale = locale;
            this.showMenu = false;
            localStorage['locale'] = locale;
            document.title = this.$t('appName') as string;
        }

        updateYear() {
            const year = this.$route.path.substring(1).split('/')[0];
            this.contest = CONTESTS[year];

            // Apply PWA theme
            document.querySelector('meta[name="theme-color"]').setAttribute('content', this.contest.themeColor);
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

    .md-toolbar {
        flex-wrap: nowrap;
    }

    .md-avatar {
        border-radius: none;
    }

    .md-dialog-no-padding {
        padding: 0 !important;
    }

    .arig-page {
        flex: 1;
    }

    .arig-page-toolbar {
        position: sticky;
        top: 0;
        margin: -20px -20px 20px -20px;
        padding-top: 5px;
        padding-bottom: 5px;
        width: auto;
        z-index: 2;
        white-space: nowrap;

        .md-chip {
            font-weight: bold;
        }
    }

    .arig-footer {
        margin: 0 -20px -20px -20px;
        padding: 20px;
        text-align: center;
    }

    @media (max-width: 960px) {
        .md-app-content {
            padding: 10px;
        }

        .arig-page-toolbar {
            margin: -10px -10px 10px -10px;
        }

        .arig-footer {
            margin: 0 -10px -10px -10px;
        }
    }
</style>
