<template>
  <div>
    <md-toolbar class="md-primary md-dense arig-page-toolbar">
      <div class="md-layout md-gutter md-alignment-center-left">
        <div class="md-layout-item md-xsmall-size-100">
          <md-chip class="chip-2026">Actions: {{ subtotal }}</md-chip>
          <md-chip class="chip-2026">{{ $t('form.fridge') }}: {{ bonus }}</md-chip>
        </div>
        <div class="md-layout-item md-xsmall-size-100">
          <md-chip class="chip-2026">{{ $t('form.sima') }}: {{ sima }}</md-chip>
          <md-chip class="md-accent">Total: {{ total }}</md-chip>
        </div>
      </div>

      <div class="md-toolbar-section-end">
        <ShareButton :year="year" :value="serializedForm"></ShareButton>
        <Favorites :year="year" :value="{ total, subtotal, form }" @apply="applyFavorite"></Favorites>
      </div>
    </md-toolbar>
    <form class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-65">
        <InputNumber :label="$t('action1')" v-model="form.nid" :max="6">
          <template v-slot:help>{{ $t('help1') }}</template>
        </InputNumber>
        <InputNumber :label="$t('action2')" v-model="form.gardeManger" :max="48">
          <template v-slot:help>{{ $t('help2') }}</template>
        </InputNumber>
        <InputNumber :label="$t('action3')" v-model="form.interressement" :max="10">
          <template v-slot:help>{{ $t('help3') }}</template>
        </InputNumber>

        <InputNumber :label="$t('action6')" v-model="form.thermometre">
          <template v-slot:help>{{ $t('help6') }}</template>
        </InputNumber>

        <InputCheckbox :label="$t('action7')" v-model="form.nidPartiel">
          <template v-slot:help>{{ $t('help7') }}</template>
        </InputCheckbox>
        <InputCheckbox :label="$t('action8')" v-model="form.nidComplet">
          <template v-slot:help>{{ $t('help8') }}</template>
        </InputCheckbox>

        <InputNumber :label="$t('action4')" v-model="form.frigoVide" :max="4">
          <template v-slot:help>{{ $t('help4') }}</template>
        </InputNumber>
        <InputNumber :label="$t('action5')" v-model="form.frigoPourrie" :max="4">
          <template v-slot:help>{{ $t('help5') }}</template>
        </InputNumber>

        <InputNumber :label="$t('action9')" v-model="form.gardeMangerOccupe" :max="7">
          <template v-slot:help>{{ $t('help9') }}</template>
        </InputNumber>
        <InputCheckbox :label="$t('action10')" v-model="form.tousLesEcureuilMange">
          <template v-slot:help>{{ $t('help10') }}</template>
        </InputCheckbox>

        <InputCheckbox :label="$t('action11')" v-model="form.nonForfait">
          <template v-slot:help>{{ $t('help11') }}</template>
        </InputCheckbox>
      </div>

      <div class="md-layout-item md-small-size-35">
        <InputNumber label="P1"
                     v-model="form.p1">
        </InputNumber>
        <InputNumber label="P2"
                     v-model="form.p2">
        </InputNumber>
        <InputNumber label="P3"
                     v-model="form.p3">
        </InputNumber>
        <div style="height: 60px">

        </div>
        <InputNumber label="P6"
                     v-model="form.p6">
        </InputNumber>
        <InputNumber label="P7"
                     v-model="form.p7">
        </InputNumber>
        <InputNumber label="P4"
                     v-model="form.p4">
        </InputNumber>
        <InputNumber label="P5"
                     v-model="form.p5">
        </InputNumber>
        <InputNumber label="P8"
                     v-model="form.p8">
        </InputNumber>
        <InputNumber label="P9"
                     v-model="form.p9">
        </InputNumber>

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
import {Favorite} from 'src/models/Favorite';
import {Component} from 'vue-property-decorator';
import Favorites from '../components/Favorites.vue';
import InputCheckbox from '../components/InputCheckbox.vue';
import InputNumber from '../components/InputNumber.vue';
import ShareButton from '../components/ShareButton.vue';
import {AbstractPage} from './AbstractPage';
import {Form2026, Data2026, Messages2026} from '../data/Data2026';
import {CONTESTS} from '../data/contests';

@Component({
  components: {
    InputNumber,
    InputCheckbox,
    Favorites,
    ShareButton,
  },
  i18n: {
    messages: Messages2026,
  },
})
export default class Page2026 extends AbstractPage<Form2026> {

  readonly year = '2026';
  readonly data = Data2026;
  readonly pdfUrl = CONTESTS['2026'].pdfUrl;

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
.chip-2026 {
  color: white !important;
  border: 1px solid currentColor;
}
</style>
