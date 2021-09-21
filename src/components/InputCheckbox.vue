<template>
    <div style="display: flex; align-items: baseline">
        <md-button class="md-icon-button" v-if="$slots.help" @click="showHelp = true">
            <md-icon>info</md-icon>
        </md-button>
        <md-switch v-model="internalValue" @change="update">{{label}}</md-switch>
        <slot></slot>

        <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="showHelp" md-persistent>
            <span><slot name="help"></slot></span>
            <md-button class="md-icon-button md-primary" @click="showHelp = false">
                <md-icon>cancel</md-icon>
            </md-button>
        </md-snackbar>
    </div>
</template>

<script>
    export default {
        name   : 'InputCheckbox',
        props  : {
            value: {
                type: Boolean,
            },
            label: {
                type    : String,
                required: true,
            },
        },
        data   : () => ({
            internalValue: false,
            showHelp: false,
        }),
        watch: {
            value(newValue) {
                this.internalValue = newValue;
            },
        },
        mounted() {
            this.internalValue = this.value;
        },
        methods: {
            update() {
                this.$emit('input', this.internalValue);
            },
        }
    };
</script>

<style scoped>
.md-icon-button {
    z-index: 0;
}
</style>
