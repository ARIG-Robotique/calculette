<template>
    <div>
        <md-button class="md-icon-button" @click="showDrawer = true">
            <md-icon>star</md-icon>
        </md-button>

        <md-dialog :md-active.sync="showDrawer" :md-fullscreen="false">
            <md-dialog-title>Configs. sauvegardées</md-dialog-title>

            <md-dialog-content>
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

                <md-empty-state v-if="favorites.length === 0"
                                md-label="Aucune configuration">
                </md-empty-state>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="showDrawer = false">Annuler</md-button>
                <md-button class="md-primary md-raised" @click="showDialog = true">
                    <md-icon>save</md-icon>
                    Sauvegarder cette config
                </md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-dialog-prompt :md-active.sync="showDialog"
                            v-model="favoriteName"
                            @md-confirm="saveFavorite"
                            md-title="Nom de la configuration"
                            md-input-placeholder=""
                            md-cancel-text="Annuler"
                            md-confirm-text="Valider">
        </md-dialog-prompt>

        <md-snackbar md-position="center" :md-duration="2000" :md-active.sync="showSnackbar" md-persistent>
            <span>Configuration sauvegardée.</span>
            <md-button class="md-icon-button md-primary" @click="showSnackbar = false">
                <md-icon>cancel</md-icon>
            </md-button>
        </md-snackbar>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Favorite } from '../models/Favorite';

    @Component({})
    export default class Favorites extends Vue {

        @Prop(String) year: string;
        @Prop(Object) value: Favorite;

        showDrawer = false;
        showDialog = false;
        showSnackbar = false;
        favoriteName = '';
        favorites: Favorite[] = [];

        get lsKey() {
            return `favorites_${this.year}`;
        }

        mounted() {
            if (localStorage[this.lsKey]) {
                this.favorites = JSON.parse(localStorage[this.lsKey]);
            }
        }

        saveFavorite() {
            if (this.favoriteName) {
                const favorite = {
                    name: this.favoriteName,
                    ...this.value,
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
                this.showDrawer = false;
                this.showSnackbar = true;
            }
        }

        deleteFavorite(favorite: Favorite) {
            const idx = this.favorites.indexOf(favorite);
            this.favorites.splice(idx, 1);
            this.persistFavorites();
        }

        applyFavorite(favorite: Favorite) {
            this.favoriteName = favorite.name;

            this.$emit('apply', {
                ...favorite,
                name: undefined,
            });

            this.showDrawer = false;
        }

        persistFavorites() {
            localStorage[this.lsKey] = JSON.stringify(this.favorites);
        }
    }
</script>

<style lang="scss">
.arig-inner-drawer {
    height: 100vh;

    & + .md-overlay {
        height: 100vh;
    }
}
</style>
