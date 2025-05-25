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
    import { Form2025, Data2025 } from '../data/Data2025';

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
            messages: {
                fr: {
                    action1: 'Gradins niveau 1 (4 pts)',
                    action2: 'Gradins niveau 2 (8 pts)',
                    action3: 'Gradins niveau 3 (16 pts)',
                    action4: 'Banderole déployée (20 pts)',
                    action5: 'Zones de fosse occupées (5 pts)',
                    action6: 'Superstar sur scène (5 pts)',
                    action7: 'Tous les PAMI (10 pts)',
                    action8: 'Zones de scène libres (0 à 15 pts)',
                    action9: 'Ranger les outils (10 pts)',
                    action10: 'Non forfait (1 pt)',

                    help1: '4 points par gradin de niveau 1',
                    help2: '8 points par gradin de niveau 2',
                    help3: '16 points par gradin de niveau 3',
                    help4: '20 points si la banderole de l’équipe est déployée',
                    help5: '5 points par zone de la fosses occupé par au moins une groupie de l’équipe',
                    help6: '5 points si la superstar de l’équipe est valide sur scène',
                    help7: '10 points supplémentaires si tous les PAMI font la fête',
                    help8: '0, 1, 2, 3, 5, 9 ou 15 points supplémentaires fonction de la zone de scène libre derrière la superstar avec la valeur la plus grande.',
                    help9: '10 points si le robot principal de l’équipe est dans l’aire d’arrivée',
                    help10: '1 point bonus est attribué à toutes les équipes qui ne sont pas "forfait".'
                },
                en: {
                    action1: 'Level 1 tribunes (4 pts)',
                    action2: 'Level 2 tribunes (8 pts)',
                    action3: 'Level 3 tribunes (16 pts)',
                    action4: 'Team banner deployed (20 pts)',
                    action5: 'Pit areas occupied (5 pts)',
                    action6: 'Superstar on stage (5 pts)',
                    action7: 'All SIMA (10 pts)',
                    action8: 'Free stage areas (0 to 15 pts)',
                    action9: 'Store the tools (10 pts)',
                    action10: 'Non forfeited (1 pt)',

                    help1: '4 points per level 1 tribune',
                    help2: '8 points per level 2 tribune',
                    help3: '16 points per level 3 tribune',
                    help4: '20 points if the team banner is deployed',
                    help5: '5 points per area of the pit occupied by at least one team groupi',
                    help6: '5 points if the team’s superstar is valid on stage',
                    help7: '10 additional points if all SIMA make the party',
                    help8: '0, 1, 2, 3, 5, 9 or 15 additional points based on the high value free stage area behind the superstar',
                    help9: '10 points if team’s robot is in its own backstage area',
                    help10: '1 bonus point is awarded to all teams that are not "forfeited".'
                }
            }
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
