<template>
    <InputHelp>
        <template v-slot:help v-if="$slots.help">
            <slot name="help"></slot>
        </template>

        <md-switch v-model="internalValue" @change="update">{{label}}</md-switch>

        <slot></slot>
    </InputHelp>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import InputHelp from './InputHelp.vue';

    @Component({
        components: {
            InputHelp,
        },
    })
    export default class InputCheckbox extends Vue {

        @Prop(Boolean) value: boolean;
        @Prop({ type: String, default: '' }) label: string;

        internalValue = false;

        @Watch('value')
        onValueChange(newValue: boolean) {
            this.internalValue = newValue;
        }

        mounted() {
            this.internalValue = this.value;
        }
        
        update() {
            this.$emit('input', this.internalValue);
        }
    }
</script>

<style scoped lang="scss">
    .arig-input-help {
        height: 60px;
    }
    .md-switch {
        margin-top: 8px;
        margin-bottom: 8px;
    }
</style>
