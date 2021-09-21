<template>
    <md-app id="app" md-mode="fixed-last">
        <md-app-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <img src="./assets/logo.png" style="height: 3em;">
                <span class="md-title">Calculette CDR : Age of Bots</span>
            </div>
            <div class="md-toolbar-row">
                Total actions :&nbsp;<md-chip>{{values.subtotal}}</md-chip>&nbsp;/ Total :&nbsp;<md-chip>{{values.total}}</md-chip>

                <div class="md-toolbar-section-end">
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

            <md-list class="md-double-line">
                <md-list-item v-for="favorite in favorites" :key="favorite.name" @click="applyFavorite(favorite)">
                    <div class="md-list-item-text">
                        <span>{{favorite.name}}</span>
                        <span>({{favorite.total}} pts)</span>
                    </div>
                    <md-button class="md-icon-button md-list-action" @click.stop="deleteFavorite(favorite)">
                        <md-icon>delete</md-icon>
                    </md-button>
                </md-list-item>
            </md-list>

            <p class="md-caption" v-if="favorites.length === 0">
                Aucune configuration
            </p>
        </md-app-drawer>

        <md-app-content>
            <Calculette ref="calculette" @change="values = $event"/>

            <md-button class="md-accent md-raised" style="margin-top: 1rem" @click="showDialog = true">
                Sauvegarder cette configuration
            </md-button>

            <md-dialog-prompt :md-active.sync="showDialog"
                              v-model="favoriteName"
                              @md-confirm="saveFavorite"
                              md-title="Nom de la configuration"
                              md-input-placeholder=""
                              md-cancel-text="Annuler"
                              md-confirm-text="Valider">
            </md-dialog-prompt>

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

    const LS_KEY = 'favorites';

    export default {
        name      : 'App',
        components: {
            Calculette,
        },
        data      : () => ({
            showFavorites: false,
            showDialog   : false,
            favoriteName : '',
            favorites    : [],
            values       : {
                subtotal: 0,
                total   : 0,
            },
        }),
        methods   : {
            saveFavorite() {
                if (this.favoriteName) {
                    const favorite = {
                        name : this.favoriteName,
                        data : this.$refs.calculette.getData(),
                        total: this.values.total,
                    };
                    const idx = this.favorites.findIndex(item => item.name === favorite.name);
                    if (idx === -1) {
                        this.favorites.push(favorite);
                    }
                    else {
                        this.favorites.splice(idx, 1, favorite);
                    }
                    this.persistFavorites();
                    setTimeout(() => this.favoriteName = ''); // impossible de vider en synchrone
                }
            },
            deleteFavorite(favorite) {
                const idx = this.favorites.indexOf(favorite);
                this.favorites.splice(idx, 1);
                this.persistFavorites();
            },
            applyFavorite(favorite) {
                this.showFavorites = false;
                this.favoriteName = favorite.name;
                this.$refs.calculette.setData(favorite.data);
            },
            persistFavorites() {
                localStorage[LS_KEY] = JSON.stringify(this.favorites);
            },
        },
        mounted() {
            if (localStorage[LS_KEY]) {
                this.favorites = JSON.parse(localStorage[LS_KEY]);
            }
        },
    };
</script>

<style scoped lang="scss">
    #app {
        height: 100vh;
    }

    .md-app-container {
        overflow-x: hidden;
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
