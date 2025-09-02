<template>
    <div>
        <md-toolbar class="md-primary md-dense arig-page-toolbar">
            <div class="md-layout md-gutter md-alignment-center-left">
                <div class="md-layout-item md-xsmall-size-100">
                    <md-chip class="chip-2025">Actions: {{ subtotal }}</md-chip>
                    <md-chip class="chip-2025">Bonus: {{ bonus }}</md-chip>
                </div>
                <div class="md-layout-item md-xsmall-size-100">
                    <md-chip class="chip-2025">{{ $t('form.sima') }}: {{ sima }}</md-chip>
                    <md-chip class="md-accent">Total: {{ total }}</md-chip>
                </div>
            </div>

            <div class="md-toolbar-section-end">
                <ShareButton :year="year" :value="serializedForm"></ShareButton>
                <Favorites :year="year" :value="{ total, subtotal, form }" @apply="applyFavorite"></Favorites>
            </div>
        </md-toolbar>
        <form class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <InputNumber :label="$t('action1')" v-model="form.tribune1" :max="18">
                    <template v-slot:help>{{ $t('help1') }}</template>
                </InputNumber>
                <InputNumber :label="$t('action2')" v-model="form.tribune2" :max="form.tribune1">
                    <template v-slot:help>{{ $t('help2') }}</template>
                </InputNumber>
                <InputNumber :label="$t('action3')" v-model="form.tribune3" :max="form.tribune2">
                    <template v-slot:help>{{ $t('help3') }}</template>
                </InputNumber>
                <InputCheckbox :label="$t('action4')" v-model="form.banner">
                    <template v-slot:help>{{ $t('help4') }}</template>
                </InputCheckbox>
                <InputCheckbox :label="$t('action9')" v-model="form.backstage">
                  <template v-slot:help>{{ $t('help9') }}</template>
                </InputCheckbox>

                <InputNumber :label="$t('form.estimation')" v-model="form.estimation" :buttons="false">
                  <md-button class="md-icon-button md-raised md-accent md-dense" @click="setEstimation" tabindex="-1">
                    <md-icon>input</md-icon>
                  </md-button>
                  <template v-slot:help>
                    Bonus = Min(20 - (|Score - Estimation| / 2), Score)
                  </template>
                </InputNumber>
                <InputNumber :label="$t('action5')" v-model="form.areasWGroupies" :max="3">
                    <template v-slot:help>{{ $t('help5') }}</template>
                </InputNumber>
                <InputCheckbox :label="$t('action6')" v-model="form.superstar">
                    <template v-slot:help>{{ $t('help6') }}</template>
                </InputCheckbox>
                <InputNumber :label="$t('action8')" v-model="form.freeStageArea" :max="6">
                    <template v-slot:help>{{ $t('help8') }}</template>
                </InputNumber>
                <InputCheckbox :label="$t('action7')" v-model="form.allSima">
                    <template v-slot:help>{{ $t('help7') }}</template>
                </InputCheckbox>

              <InputCheckbox :label="$t('action10')"
                             v-model="form.nonForfait">
                <template v-slot:help>{{ $t('help10') }}</template>
              </InputCheckbox>

                <div style="display: flex; justify-content: flex-end;">
                    <md-button class="md-accent" @click="reset">
                        <md-icon>backspace</md-icon>
                        {{ $t('form.reset') }}
                    </md-button>
                </div>
            </div>

            <div class="md-layout-item md-small-hide">
                <object :data="pdfUrl + '#view=Fit'" type="application/pdf"
                       style="width: 100%; aspect-ratio: 1.4; border: none;">
                    <p>It appears you don't have a PDF plugin for this browser.
                        No biggie... you can <a :href="pdfUrl">click here to
                            download the PDF file.</a></p>
                </object>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Favorite } from 'src/models/Favorite';
import { Component } from 'vue-property-decorator';
import Favorites from '../components/Favorites.vue';
import InputCheckbox from '../components/InputCheckbox.vue';
import InputNumber from '../components/InputNumber.vue';
import ShareButton from '../components/ShareButton.vue';
import { AbstractPage } from './AbstractPage';
import { Form2025, Data2025, Messages2025 } from '../data/Data2025';
import { CONTESTS } from '../data/contests';

@Component({
    components: {
        InputNumber,
        InputCheckbox,
        Favorites,
        ShareButton,
    },
    i18n: {
        messages: Messages2025,
    },
})
export default class Page2025 extends AbstractPage<Form2025> {

    readonly year = '2025';
    readonly data = Data2025;
    readonly pdfUrl = CONTESTS['2025'].pdfUrl;

    created() {
        super.created();
    }

    mounted() {
        super.mounted();
    }

    reset() {
        super.reset();
    }

    setEstimation() {
        super.setEstimation();
    }

    applyFavorite(favorite: Favorite) {
        super.applyFavorite(favorite);
    }
}
</script>

<style>
.chip-2025 {
    color: white !important;
    border: 1px solid currentColor;
}
</style>
