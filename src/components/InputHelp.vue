<template>
    <div class="arig-input-help">
        <md-button class="md-icon-button md-dense" v-if="$slots.help" @click="showHelp = true">
            <md-icon>info</md-icon>
        </md-button>

        <slot></slot>

        <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="showHelp" md-persistent>
            <span><slot name="help"></slot></span>
            <md-button class="md-icon-button md-accent" @click="showHelp = false">
                <md-icon>cancel</md-icon>
            </md-button>
        </md-snackbar>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({})
    export default class InputHelp extends Vue {
        showHelp = false;
    }
</script>

<style scoped lang="scss">
    .arig-input-help {
        display: flex;
        align-items: center;
        margin-left: -12px;
    }

    .md-icon-button {
        z-index: 0;
    }

    .md-snackbar-content .md-icon-button {
        flex: none;
        margin-left: 0;
        height: 30px;
        width: 30px;
    }
</style>
