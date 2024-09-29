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
            <div class="md-layout-item md-small-size-65">
                <InputNumber :label="$t('action1')" v-model="form.tribune1" :max="10">
                    <template v-slot:help>{{ $t('help1') }}</template>
                </InputNumber>
                <InputNumber :label="$t('action2')" v-model="form.tribune2" :max="10">
                    <template v-slot:help>{{ $t('help2') }}</template>
                </InputNumber>
                <InputNumber :label="$t('action3')" v-model="form.tribune3" :max="10">
                    <template v-slot:help>{{ $t('help3') }}</template>
                </InputNumber>
                <InputCheckbox :label="$t('action4')" v-model="form.banner">
                    <template v-slot:help>{{ $t('help4') }}</template>
                </InputCheckbox>
                <InputNumber :label="$t('action5')" v-model="form.areasWGroupies" :max="3">
                    <template v-slot:help>{{ $t('help5') }}</template>
                </InputNumber>
                <InputCheckbox :label="$t('action6')" v-model="form.superstar">
                    <template v-slot:help>{{ $t('help6') }}</template>
                </InputCheckbox>
                <InputCheckbox :label="$t('action7')" v-model="form.allSima">
                    <template v-slot:help>{{ $t('help7') }}</template>
                </InputCheckbox>
                <InputNumber :label="$t('action8')" v-model="form.freeStageArea" :max="7">
                    <template v-slot:help>{{ $t('help8') }}</template>
                </InputNumber>
                <InputCheckbox :label="$t('action9')" v-model="form.storage">
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
            </div>

            <div class="md-layout-item md-small-size-35">
                <InputNumber label="P1" v-model="form.p1"></InputNumber>
                <InputNumber label="P2" v-model="form.p2"></InputNumber>
                <InputNumber label="P3" v-model="form.p3"></InputNumber>
                <InputNumber label="P4" v-model="form.p4"></InputNumber>
                <InputNumber label="P5" v-model="form.p5"></InputNumber>
                <InputNumber label="P6" v-model="form.p6"></InputNumber>
                <InputNumber label="P7" v-model="form.p7"></InputNumber>
                <div style="height: 60px"></div>
                <InputNumber label="P8" v-model="form.p8"></InputNumber>

                <div style="display: flex; justify-content: flex-end;">
                    <md-button class="md-accent" @click="reset">
                        <md-icon>backspace</md-icon>
                        {{ $t('form.reset') }}
                    </md-button>
                </div>
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
import { Form2025, Data2025 } from '../data/Data2025';

@Component({
    components: {
        InputNumber,
        InputCheckbox,
        Favorites,
        ShareButton,
    },
    i18n: {
        messages: {
            fr: {
                action1: 'Gradins niveau 1 (P1)',
                action2: 'Gradins niveau 2 (P1)',
                action3: 'Gradins niveau 3 (P1)',
                action4: 'Banderole déployée (P4)',
                action5: 'Zones de fosse occupées (P5)',
                action6: 'Superstar sur scène (P6)',
                action7: 'Tous les PAMI (P7)',
                action8: 'Zones de scène libres',
                action9: 'Ranger les outils (P8)',

                help1: 'P1 points par gradin de niveau 1',
                help2: 'P2 points par gradin de niveau 2',
                help3: 'P3 points par gradin de niveau 3',
                help4: 'P4 points si la banderole de l’équipe est déployée',
                help5: 'P5 points par zone de la fosses occupé par au moins une groupie de l’équipe',
                help6: 'P6 points si la superstar de l’équipe est valide sur scène',
                help7: 'P7 points supplémentaires si tous les PAMI font la fête',
                help8: 'X points supplémentaires par zone de scène libre derrière la superstar',
                help9: 'P8 points si le robot principal de l’équipe est dans l’aire d’arrivée',
            },
            en: {
                action1: 'Level 1 tribunes (P1)',
                action2: 'Level 2 tribunes (P2)',
                action3: 'Level 3 tribunes (P3)',
                action4: 'Team banner deployed (P4)',
                action5: 'Pit areas occupied (P5)',
                action6: 'Superstar on stage (P6)',
                action7: 'All SIMA (P7)',
                action8: 'Free stage areas',
                action9: 'Store the tools (P8)',

                help1: 'P1 points per level 1 tribune',
                help2: 'P2 points per level 2 tribune',
                help3: 'P3 points per level 3 tribune',
                help4: 'P4 points if the team banner is deployed',
                help5: 'P5 points per area of the pit occupied by at least one team groupi',
                help6: 'P6 points if the team’s superstar is valid on stage',
                help7: 'P7 additional points if all SIMA make the party',
                help8: 'X additional points per free stage area behind the superstar',
                help9: 'P8 points if team’s robot is in its own valid area',
            }
        }
    },
})
export default class Page2025 extends AbstractPage<Form2025> {

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
