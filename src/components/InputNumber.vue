<template>
    <InputHelp>
        <template v-slot:help v-if="$slots.help">
            <slot name="help"></slot>
        </template>

        <md-field>
            <label>{{label}}</label>
            <md-input type="number" min="0" :max="max"
                      v-model="internalValue" @input="update" @change="check"></md-input>
        </md-field>
        <md-button v-if="buttons" class="md-icon-button md-dense" @click="minus" tabindex="-1">
            <md-icon class="md-accent">remove_circle</md-icon>
        </md-button>
        <md-button v-if="buttons" class="md-icon-button md-dense" @click="plus" tabindex="-1">
            <md-icon class="md-accent">add_circle</md-icon>
        </md-button>

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
    export default class InputNumber extends Vue {

        @Prop(Number) value: number;
        @Prop({ type: String, required: true }) label: string;
        @Prop({ type: Boolean, default: true }) buttons: boolean;
        @Prop(Number) max: number;

        internalValue = 0;

        @Watch('value')
        onValueChange(newValue: number) {
            this.internalValue = newValue;
        }

        mounted() {
            this.internalValue = this.value;
        }

        plus() {
            if (this.max === undefined || this.internalValue < this.max) {
                this.internalValue++;
                this.update();
            }
        }

        minus() {
            if (this.internalValue > 0) {
                this.internalValue--;
                this.update();
            }
        }

        update() {
            this.$emit('input', +this.internalValue);
        }

        check() {
            if (this.internalValue < 0) {
                this.internalValue = 0;
                this.update();
            }
            if (this.max && this.internalValue > this.max) {
                this.internalValue = this.max;
                this.update();
            }
        }
    }
</script>

<style scoped lang="scss">
    .md-field {
        margin-bottom: 8px;
    }
</style>
