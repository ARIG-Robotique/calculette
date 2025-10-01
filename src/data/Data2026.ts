import { type I18nOptions } from 'vue-i18n';
import { type PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2026 {
    nid: number,
    gardeManger: number,
    interressement: number,

    frigoVide: number,
    frigoPlein: number,

    thermometre: number,

    nidPartiel: boolean,
    nidComplet: boolean,

    gardeMangerOccupe: number,
    tousLesEcureuilMange: boolean,
}

export const Data2026: PageData<Form2026> = {
    defaultForm(): Form2026 {
        return {
            nid: 0,
            gardeManger: 0,
            interressement: 0,

            frigoVide: 0,
            frigoPlein: 0,

            thermometre: 0,

            nidPartiel: false,
            nidComplet: false,

            gardeMangerOccupe: 0,
            tousLesEcureuilMange: false,
        };
    },

    parseForm(c: string): Form2026 | null {
        const vals = c.split(',');
        if (vals.length !== 10) {
            return null;
        }

        return {
            nid: parseInt(vals[0]),
            gardeManger: parseInt(vals[1]),
            interressement: parseInt(vals[2]),

            frigoVide: parseInt(vals[3]),
            frigoPlein: parseInt(vals[4]),

            thermometre: parseInt(vals[5]),

            nidPartiel: toBool(vals[6]),
            nidComplet: toBool(vals[7]),

            gardeMangerOccupe: parseInt(vals[8]),
            tousLesEcureuilMange: toBool(vals[9]),
        };
    },

    serializeForm(form: Form2026): string {
        return [
            form.nid,
            form.gardeManger,
            form.interressement,

            form.frigoVide,
            form.frigoPlein,

            form.thermometre,

            fromBool(form.nidPartiel),
            fromBool(form.nidComplet),

            form.gardeMangerOccupe,
            fromBool(form.tousLesEcureuilMange),
        ].join(',');
    },

    compute(form: Form2026) {
        let total = 0;
        total += 2 * form.nid;
        total += 3 * form.gardeManger;
        total += 5 * form.interressement;
        total += 2 * form.frigoVide;
        total += 5 * form.frigoPlein;
        total += form.thermometre;
        total += form.nidPartiel ? 5 : 0;
        total += form.nidComplet ? 5 : 0;
        total += 5 * form.gardeMangerOccupe;
        total += form.tousLesEcureuilMange ? 10 : 0;

        return { subtotal: 0, bonus: 0, total };
    },
};

export const Messages2026: I18nOptions['messages'] = {
    fr: {
        action1: 'Caisses dans le nid (2 pts)',
        action2: 'Caisses dans les garde-manger (3 pts)',
        action3: 'Garde-mangers en majorité (5 pts)',

        action4: 'Frigos vides de caisses pleines (2 pts)',
        action5: 'Frigos pleins de caisses vides (5 pts)',

        action6: 'Thermomètre (X pts)',

        action7: 'Partiellement dans le nid (5 pts)',
        action8: 'Completement dans le nid (5 pts)',

        action9: 'Gardes-manger occupés (5 pts)',
        action10: 'Tous les PAMI mangent (10 pts)',

        help1: '2 points par caisse de noisettes dans le nid',
        help2: '3 points par caisse de noisettes valide dans un garde-manger',
        help3: '5 points par zone rapportant un bonus à l’équipe.',

        help4: '2 points par frigo vide de caisses de noisettes à la fin du match',
        help5: '5 points par frigo plein de caisses de noisettes vides à la fin du match',

        help6: 'X points pour la zone atteinte par le curseur, le nombre de points dépend du numéro indiqué dans la zone dans laquelle pointe le curseur',

        help7: '5 points si le robot principal de l’équipe est partiellement dans une aire d’arrivée',
        help8: '5 points supplémentaires si le robot principal de l’équipe est complètement dans une aire d’arrivée',

        help9: '5 points par garde-manger occupé par l’équipe',
        help10: '10 points si tous les PAMI mangent des noisettes',
    },
    en: {
        action1: 'Hazelnuts crates in the nest (2 pts)',
        action2: 'Hazelnuts crates in a pantry (3 pts)',
        action3: 'Pantries with majority (5 pts)',

        action4: 'Fridges empty of full crates (2 pts)',
        action5: 'Fridges full of empty crates (5 pts)',

        action6: 'Thermometer (X pts)',

        action7: 'Partially in the nest (5 pts)',
        action8: 'Completely in the nest (5 pts)',

        action9: 'Occupied pantries (5 pts)',
        action10: 'All SIMA eating (10 pts)',

        help1: '2 points per hazelnut crate in nest',
        help2: '3 points per hazelnut crate valid in a pantry',
        help3: '5 points per zone granting a bonus for the teams',

        help4: '2 points by fridge empty of hazelnut crates at the end of the match',
        help5: '5 points per fridge full of empty crates at the end of the matc',

        help6: 'X points for the area reached by the cursor, the number of points depends on the number indicated in the area in which the cursor points',

        help7: '5 points if the team’s main robot is partially in its own valid area',
        help8: '5 additional points if the team’s main robot is completely in its own valid area',

        help9: '5 points by pantry occupied by the team',
        help10: '10 points if all SIMA eat the hazelnuts',
    },
};
