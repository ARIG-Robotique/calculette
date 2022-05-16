<template>
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-100">
            <label class="main-label">{{label}}</label>
        </div>

        <div class="md-layout-item md-size-50 item">
            <slot name="left"></slot>
        </div>

        <div class="md-layout-item md-size-50 item">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({})
    export default class DualInput extends Vue {

        @Prop({ type: String, required: true }) label: string;
        
    }
</script>

<style scoped lang="scss">
    .main-label {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.54);
    }
    .item {
        margin-top: -16px;
    }
</style>
