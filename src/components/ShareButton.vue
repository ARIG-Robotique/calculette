<template>
    <md-button class="md-icon-button md-accent md-raised" @click="share()">
        <md-icon>share</md-icon>

        <md-dialog :md-active.sync="showDialog" :md-fullscreen="false">
            <md-dialog-content>{{url}}</md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary md-raised" @click="copy()">Copier</md-button>
                <md-button class="md-primary" @click="close()">Annuler</md-button>
            </md-dialog-actions>
        </md-dialog>
    </md-button>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Favorite } from '../models/Favorite';
    import { serializeForm } from '../utils/form.utils';

    @Component({})
    export default class ShareButton extends Vue {

        @Prop() value: Favorite;


        showDialog = false;
        url = '';

        share() {
            this.url = `//${window.location.host}?c=${serializeForm(this.value.form)}`;

            if (window.navigator.share) {
                window.navigator.share({
                    title: 'Calculette CDR',
                    url  : this.url,
                });
            }
            else {
                this.showDialog = true;
            }
        }

        close() {
            this.showDialog = false;
        }

        copy() {
            if (window.navigator.clipboard) {
                window.navigator.clipboard.writeText(this.url);
            }
            else {
                alert('Clipboard is not available');
            }
            this.showDialog = false;
        }
    }
</script>
