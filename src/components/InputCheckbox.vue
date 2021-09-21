<template>
    <InputHelp>
        <template v-slot:help v-if="$slots.help">
            <slot name="help"></slot>
        </template>

        <md-switch v-model="internalValue" @change="update">{{label}}</md-switch>

        <slot></slot>
    </InputHelp>
</template>

<script>
    import InputHelp from './InputHelp';

    export default {
        name      : 'InputCheckbox',
        components: {
            InputHelp,
        },
        props     : {
            value: {
                type: Boolean,
            },
            label: {
                type    : String,
                required: true,
            },
        },
        data      : () => ({
            internalValue: false,
        }),
        watch     : {
            value(newValue) {
                this.internalValue = newValue;
            },
        },
        mounted() {
            this.internalValue = this.value;
        },
        methods   : {
            update() {
                this.$emit('input', this.internalValue);
            },
        }
    };
</script>

<style scoped>
    .md-switch {
        margin-top: 8px;
        margin-bottom: 8px;
    }
</style>
