<template>
    <InputHelp>
        <template v-slot:help v-if="$slots.help">
            <slot name="help"></slot>
        </template>

        <div class="arig-buttons-group">
            <md-button v-for="(value, name) in options" :key="name"
                        :class="{ 'md-accent': true, 'md-raised': internalValue === value }"
                        @click="internalValue = value; update();">
                {{name}}
            </md-button>
        </div>

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
    export default class InputToggle extends Vue {

        @Prop(Number) value: number;
        @Prop({ type: Object, required: true }) options: Record<string, number>;

        internalValue: number = null;

        @Watch('value')
        onValueChange(newValue: number) {
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
    .arig-buttons-group {
        width: 100%;
        display: flex;
        justify-content: stretch;

        .md-button {
            flex: 1;
        }
    }
</style>
