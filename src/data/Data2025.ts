import { type I18nOptions } from 'vue-i18n';
import { type PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2025 {
    tribune1: number,
    tribune2: number,
    tribune3: number,
    banner: boolean,
    areasWGroupies: number,
    superstar: boolean,
    allSima: boolean,
    freeStageArea: number,
    backstage: boolean,

    estimation: number,
    nonForfait: boolean,
}

export const Data2025: PageData<Form2025> = {
    defaultForm(): Form2025 {
        return {
            tribune1: 0,
            tribune2: 0,
            tribune3: 0,
            banner: false,
            areasWGroupies: 0,
            superstar: false,
            allSima: false,
            freeStageArea: 0,
            backstage: false,

            estimation: 0,
            nonForfait: true,
        };
    },

    parseForm(c: string): Form2025 | null {
        const vals = c.split(',');
        if (vals.length !== 10) {
            return null;
        }

        return {
            tribune1: parseInt(vals[0]),
            tribune2: parseInt(vals[1]),
            tribune3: parseInt(vals[2]),
            banner: toBool(vals[3]),
            areasWGroupies: parseInt(vals[4]),
            superstar: toBool(vals[5]),
            allSima: toBool(vals[6]),
            freeStageArea: parseInt(vals[7]),
            backstage: toBool(vals[8]),

            estimation: parseInt(vals[9]),
            nonForfait: toBool(vals[10]),
        };
    },

    serializeForm(form: Form2025): string {
        return [
            form.tribune1,
            form.tribune2,
            form.tribune3,
            fromBool(form.banner),
            form.areasWGroupies,
            fromBool(form.superstar),
            fromBool(form.allSima),
            form.freeStageArea,
            fromBool(form.backstage),
            form.estimation,
            fromBool(form.nonForfait),
        ].join(',');
    },

    compute(form: Form2025) {
        let subtotal = 0;
        subtotal += 4 * form.tribune1;
        subtotal += 8 * form.tribune2;
        subtotal += 16 * form.tribune3;
        subtotal += form.banner ? 20 : 0;
        subtotal += form.backstage ? 10 : 0;

        const bonus = Math.max(0, Math.min(Math.ceil(20 - Math.abs(form.estimation - subtotal) / 2), subtotal));

        let sima = 0;
        sima += 5 * form.areasWGroupies
        sima += form.superstar ? 5 : 0;
        sima += form.allSima ? 10 : 0;
        sima += [0, 1, 2, 3, 5, 9, 15][form.freeStageArea];

        let total = subtotal + bonus + sima + 1;

        if (!form.nonForfait) {
            total = 0;
        }

        return { subtotal, bonus, sima, total };
    },
};

export const Messages2025: I18nOptions['messages'] = {
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
        help8: '0, 1, 2, 3, 5, 9 ou 15 points supplémentaires fonction de la zone de scène libre derrière la superstar avec la valeur la plus grande',
        help9: '10 points si le robot principal de l’équipe est dans l’aire d’arrivée',
        help10: '1 point bonus est attribué à toutes les équipes qui ne sont pas "forfait"',
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
        help10: '1 bonus point is awarded to all teams that are not "forfeited"',
    },
};
