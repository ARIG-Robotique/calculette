<template>
    <div class="md-layout md-gutter md-alignment-center">
        <div class="md-layout-item item">
            <slot name="left"></slot>
        </div>

        <div class="md-layout-item main-label">
            <label class="main-label">{{label}}</label>
        </div>

        <div class="md-layout-item item">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({})
    export default class DualCheckbox extends Vue {

        @Prop({ type: String, required: true }) label: string;
        
    }
</script>

<style scoped lang="scss">
    .item {
        flex: none;
        box-sizing: content-box;
        width: 40px;
    }
    .main-label {
        width: 100%;
        text-align: center;
    }
</style>
