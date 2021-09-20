<template>
    <md-switch v-model="value">{{label}}</md-switch>
</template>

<script>
    export default {
        name : 'InputCheckbox',
        props: {
            value: {
                type: Boolean,
            },
            label: {
                type    : String,
                required: true,
            },
        },
        methods: {
            update() {
                this.$emit('input', this.value);
            },
        }
    };
</script>
