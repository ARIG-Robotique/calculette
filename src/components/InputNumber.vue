<template>
    <div style="display: flex; align-items: baseline">
        <md-button class="md-icon-button" v-if="$slots.help" @click="showHelp = true">
            <md-icon>info</md-icon>
        </md-button>
        <md-field>
            <label>{{label}}</label>
            <md-input type="number" min="0" :max="max" v-model="internalValue" @input="update" @change="check"></md-input>
        </md-field>
        <md-button v-if="buttons" class="md-icon-button md-raised md-primary" @click="minus" tabindex="-1">
            <md-icon>remove_circle</md-icon>
        </md-button>
        <md-button v-if="buttons" class="md-icon-button md-raised md-primary" @click="plus" tabindex="-1">
            <md-icon>add_circle</md-icon>
        </md-button>
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
        name   : 'InputNumber',
        props  : {
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
            max: {
                type: Number,
            },
        },
        data   : () => ({
            internalValue: 0,
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
.md-icon-button {
    z-index: 0;
}
</style>
