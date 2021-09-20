<template>
    <md-switch v-model="internalValue" @change="update">{{label}}</md-switch>
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
        }),
        methods: {
            update() {
                this.$emit('input', this.internalValue);
            },
        }
    };
</script>
