<template>
    <div style="display: flex; align-items: baseline">
        <md-field>
            <label>{{label}}</label>
            <md-input type="number" min="0" v-model="internalValue" @input="update"></md-input>
        </md-field>
        <md-button v-if="buttons" class="md-icon-button md-raised" @click="minus" tabindex="-1">
            <md-icon>remove_circle</md-icon>
        </md-button>
        <md-button v-if="buttons" class="md-icon-button md-raised" @click="plus" tabindex="-1">
            <md-icon>add_circle</md-icon>
        </md-button>
        <slot></slot>
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
            }
        },
        data   : () => ({
            internalValue: 0,
        }),
        methods: {
            plus() {
                this.internalValue++;
                this.update();
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
        }
    };
</script>
