<template>
    <div class="page-dual-2025">
        <md-toolbar class="md-dense arig-page-toolbar">
            <div class="md-toolbar-section-start md-layout">
                <div class="md-layout-item">
                    <md-chip class="chip-2025">Actions: {{ subtotalA }}</md-chip>
                    <md-chip class="chip-2025">Bonus: {{ bonusA }}</md-chip>
                </div>
                <div class="md-layout-item">
                    <md-chip class="chip-2025">{{ $t('form.sima') }}: {{ simaA }}</md-chip>
                    <md-chip class="md-accent">Total: {{ totalA }}</md-chip>
                </div>
            </div>
            <div class="md-toolbar-section-end md-layout">
                <div class="md-layout-item">
                    <md-chip class="chip-2025">Actions: {{ subtotalB }}</md-chip>
                    <md-chip class="chip-2025">Bonus: {{ bonusB }}</md-chip>
                </div>
                <div class="md-layout-item">
                    <md-chip class="chip-2025">{{ $t('form.sima') }}: {{ simaB }}</md-chip>
                    <md-chip class="md-accent">Total: {{ totalB }}</md-chip>
                </div>
            </div>
        </md-toolbar>
        <form class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <DualInput :label="$t('action1')">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.tribune1" :max="18"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.tribune1" :max="18"></InputNumber>
                    </template>
                </DualInput>

                <DualInput :label="$t('action2')">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.tribune2" :max="teamA.tribune1"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.tribune2" :max="teamB.tribune1"></InputNumber>
                    </template>
                </DualInput>

                <DualInput :label="$t('action3')">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.tribune3" :max="teamA.tribune2"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.tribune3" :max="teamB.tribune2"></InputNumber>
                    </template>
                </DualInput>

                <DualCheckbox :label="$t('action4')">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.banner"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.banner"></InputCheckbox>
                    </template>
                </DualCheckbox>

              <DualCheckbox :label="$t('action9')">
                <template v-slot:left>
                  <InputCheckbox v-model="teamA.backstage"></InputCheckbox>
                </template>
                <template v-slot:right>
                  <InputCheckbox v-model="teamB.backstage"></InputCheckbox>
                </template>
              </DualCheckbox>

              <DualInput :label="$t('form.estimation')">
                <template v-slot:left>
                  <InputNumber v-model="teamA.estimation" :buttons="false">
                    <md-button class="md-icon-button md-raised md-accent md-dense" @click="setEstimation('A')" tabindex="-1">
                      <md-icon>input</md-icon>
                    </md-button>
                  </InputNumber>
                </template>
                <template v-slot:right>
                  <InputNumber v-model="teamB.estimation" :buttons="false">
                    <md-button class="md-icon-button md-raised md-accent md-dense" @click="setEstimation('B')" tabindex="-1">
                      <md-icon>input</md-icon>
                    </md-button>
                  </InputNumber>
                </template>
              </DualInput>

                <DualInput :label="$t('action5')">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.areasWGroupies" :max="3"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.areasWGroupies" :max="3"></InputNumber>
                    </template>
                </DualInput>

                <DualCheckbox :label="$t('action6')">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.superstar"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.superstar"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <DualInput :label="$t('action8')">
                    <template v-slot:left>
                        <InputNumber v-model="teamA.freeStageArea" :max="6"></InputNumber>
                    </template>
                    <template v-slot:right>
                        <InputNumber v-model="teamB.freeStageArea" :max="6"></InputNumber>
                    </template>
                </DualInput>

              <DualCheckbox :label="$t('action7')">
                <template v-slot:left>
                  <InputCheckbox v-model="teamA.allSima"></InputCheckbox>
                </template>
                <template v-slot:right>
                  <InputCheckbox v-model="teamB.allSima"></InputCheckbox>
                </template>
              </DualCheckbox>

                <DualCheckbox :label="$t('action10')">
                    <template v-slot:left>
                        <InputCheckbox v-model="teamA.nonForfait"></InputCheckbox>
                    </template>
                    <template v-slot:right>
                        <InputCheckbox v-model="teamB.nonForfait"></InputCheckbox>
                    </template>
                </DualCheckbox>

                <div style="display: flex; justify-content: flex-end;">
                    <md-button class="md-accent" @click="reset">
                        <md-icon>backspace</md-icon>
                        Reset
                    </md-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import Favorites from '../components/Favorites.vue';
    import InputCheckbox from '../components/InputCheckbox.vue';
    import InputNumber from '../components/InputNumber.vue';
    import ShareButton from '../components/ShareButton.vue';
    import { AbstractPageMatch } from './AbstractPageMatch';
    import DualInput from '../components/DualInput.vue';
    import DualCheckbox from '../components/DualCheckbox.vue';
    import { Form2025, Data2025, Messages2025 } from '../data/Data2025';

    @Component({
        components: {
            InputNumber,
            InputCheckbox,
            DualInput,
            DualCheckbox,
            Favorites,
            ShareButton,
        },
        i18n: {
            messages: Messages2025,
        },  
    })
    export default class Page2025Match extends AbstractPageMatch<Form2025> {

        readonly year = '2025';
        readonly data = Data2025;

        created() {
            super.created();
        }

        mounted() {
            super.mounted();
        }

        reset() {
            super.reset();
        }

        setEstimation(team: 'A' | 'B') {
            super.setEstimation(team);
        }
    }
</script>

<style scoped lang="scss">
    .page-dual-2025 {
        border-style: solid;
        border-width: 0 20px;
        border-image-source: url('../assets/page2024_2025dual.png');
        border-image-slice: 40;
        border-image-width: 0 20px;
        border-image-repeat: round;
        border-image-outset: 5px;
        margin: 0 -20px;
    }

    .arig-page-toolbar {
        background: linear-gradient(to right, #005ca3 0% 50%, #fdc10c 50% 100%);
    }
</style>
