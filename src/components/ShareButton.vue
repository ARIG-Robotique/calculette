<template>
    <md-button class="md-icon-button" @click="share()">
        <md-icon>share</md-icon>

        <md-dialog :md-active.sync="showDialog" :md-fullscreen="false">
            <md-dialog-title>{{ $t('share.title') }}</md-dialog-title>

            <md-dialog-content>{{url}}</md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">
                    {{ $t('global.close') }}
                </md-button>
                <md-button class="md-primary md-raised" @click="copy()">
                    {{ $t('share.copy') }}
                </md-button>
            </md-dialog-actions>
        </md-dialog>
    </md-button>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({})
    export default class ShareButton extends Vue {

        @Prop(String) year: string;
        @Prop(String) value: string;

        showDialog = false;
        url = '';

        share() {
            this.url = `${window.location.protocol}//${window.location.host}/#/${this.year}?c=${this.value}`;

            if (window.navigator.share) {
                window.navigator.share({
                    title: this.$t('appName') as string,
                    url  : this.url,
                });
            }
            else {
                this.showDialog = true;
            }
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
