<template>
    <div style="display: flex; align-items: baseline">
        <md-field>
            <label>{{label}}</label>
            <md-input type="number" min="0" v-model="value" @input="update"></md-input>
        </md-field>
        <md-button class="md-icon-button md-raised" @click="minus" v-if="buttons">
            <md-icon>remove_circle</md-icon>
        </md-button>
        <md-button class="md-icon-button md-raised" @click="plus" v-if="buttons">
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
        methods: {
            plus() {
                this.value++;
                this.update();
            },
            minus() {
                if (this.value > 0) {
                    this.value--;
                    this.update();
                }
            },
            update() {
                this.$emit('input', this.value);
            },
        }
    };
</script>
