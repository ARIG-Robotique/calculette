<template>
    <div>
        <md-toolbar class="md-primary md-dense arig-page-toolbar">
            Total :&nbsp;<md-chip class="md-accent">{{total}}</md-chip>

            <div class="md-toolbar-section-end">
                <ShareButton :year="year" :value="serializedForm"></ShareButton>
                <Favorites :year="year" :value="{ total, form }" @apply="applyFavorite"></Favorites>
            </div>
        </md-toolbar>
         <form class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <InputNumber label="Modules lunaires dans la zone de départ (2 pts)"
                            v-model="form.modulesDepart">
                    <template v-slot:help>
                        2 points par module lunaire de sa couleur ou polychrome dans sa zone de départ.
                    </template>
                </InputNumber>

                <InputNumber label="Minerais dans la zone de départ (2 pts)"
                            v-model="form.mineraiDepart">
                    <template v-slot:help>
                        2 points par minerai valide dans sa zone de départ.
                    </template>
                </InputNumber>

                <InputNumber label="Minerais dans la soute (3 pts)"
                            v-model="form.mineraiSoute">
                    <template v-slot:help>
                        3 points par minerai dans la soute de sa navette.
                    </template>
                </InputNumber>

                <InputNumber label="Modules lunaires dans une base (10 pts)"
                            v-model="form.modulesBase">
                    <template v-slot:help>
                       10 points par module lunaire valide.
                    </template>
                </InputNumber>

                <InputCheckbox label="Funny action (20 pts)"
                            v-model="form.funnyAction">
                    <template v-slot:help>
                       20 points si au moins un engin spatial réussit son décollage pour Mars..
                    </template>
                </InputCheckbox>

                <InputCheckbox label="Non forfait (15 pts)"
                            v-model="form.nonForfait">
                    <template v-slot:help>
                        15 points bonus sont attribués à toutes les équipes qui ne sont pas "forfait".
                    </template>
                </InputCheckbox>

                <div style="display: flex; justify-content: flex-end;">
                    <md-button class="md-accent" @click="reset">
                        <md-icon>backspace</md-icon>
                        Reset
                    </md-button>
                </div>
            </div>

            <div class="md-layout-item md-small-size-100"></div>
        </form>
    </div>
</template>

<script lang="ts">
    import { Favorite } from 'src/models/Favorite';
    import { Component } from 'vue-property-decorator';
    import Favorites from '../components/Favorites.vue';
    import InputCheckbox from '../components/InputCheckbox.vue';
    import InputNumber from '../components/InputNumber.vue';
    import ShareButton from '../components/ShareButton.vue';
    import { AbstractPage } from './AbstractPage';
    import { Form2017, Data2017 } from '../data/Data2017';

    @Component({
        components: {
            InputNumber,
            InputCheckbox,
            Favorites,
            ShareButton,
        },
    })
    export default class Page2017 extends AbstractPage<Form2017> {

        readonly year = '2017';
        readonly data = Data2017;

        // FIXME methods are not "seen" if not re-declared

        created() {
            super.created();
        }

        mounted() {
            super.mounted();
        }

        reset() {
            super.reset();
        }

        applyFavorite(favorite: Favorite) {
            super.applyFavorite(favorite);
        }
    }
</script>
