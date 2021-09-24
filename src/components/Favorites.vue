<template>
    <div>
        <md-button class="md-accent md-raised" @click="showDialog = true">
            <md-icon>save</md-icon>
            Sauvegarder cette config
        </md-button>

        <md-dialog-prompt :md-active.sync="showDialog"
                          v-model="favoriteName"
                          @md-confirm="saveFavorite"
                          md-title="Nom de la configuration"
                          md-input-placeholder=""
                          md-cancel-text="Annuler"
                          md-confirm-text="Valider">
        </md-dialog-prompt>

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
    </div>
</template>

<script>
    const LS_KEY = 'favorites';

    export default {
        name   : 'Favorites',
        props  : {
            value: {},
        },
        data   : () => ({
            showDialog  : false,
            favoriteName: '',
            favorites   : [],
        }),
        methods: {
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
                }
            },
            deleteFavorite(favorite) {
                const idx = this.favorites.indexOf(favorite);
                this.favorites.splice(idx, 1);
                this.persistFavorites();
            },
            applyFavorite(favorite) {
                this.favoriteName = favorite.name;

                this.$emit('apply', {
                    ...favorite,
                    name: undefined,
                });
            },
            persistFavorites() {
                localStorage[LS_KEY] = JSON.stringify(this.favorites);
            },
        },
        mounted() {
            if (localStorage[LS_KEY]) {
                this.favorites = JSON.parse(localStorage[LS_KEY]);
            }
        }
    };
</script>
