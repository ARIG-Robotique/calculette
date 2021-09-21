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

<script>
    import InputHelp from './InputHelp';

    export default {
        name      : 'InputNumber',
        components: {
            InputHelp,
        },
        props     : {
            value  : {
                type: Number,
            },
            label  : {
                type    : String,
                required: true,
            },
            buttons: {
                type   : Boolean,
                default: true,
            },
            max    : {
                type: Number,
            },
        },
        data      : () => ({
            internalValue: 0,
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
            plus() {
                if (!this.max || this.internalValue < this.max) {
                    this.internalValue++;
                    this.update();
                }
            },
            minus() {
                if (this.internalValue > 0) {
                    this.internalValue--;
                    this.update();
                }
            },
            update() {
                this.$emit('input', +this.internalValue);
            },
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
    };
</script>

<style scoped>
    .md-field {
        margin-bottom: 8px;
    }
</style>
