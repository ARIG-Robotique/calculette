import { type I18nOptions } from 'vue-i18n';
import { type PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2026 {
    p1: number,
    p2: number,
    p3: number,
    p4: number,
    p5: number,
    p6: number,
    p7: number,
    p8: number,
    p9: number,

    nid: number,
    gardeManger: number,
    interressement: number,

    frigoVide: number,
    frigoPourrie: number,

    thermometre: number,

    nidPartiel: boolean,
    nidComplet: boolean,

    gardeMangerOccupe: number,
    tousLesEcureuilMange: boolean,

    nonForfait: boolean,
}

export const Data2026: PageData<Form2026> = {
    defaultForm(): Form2026 {
        return {
            p1: 1,
            p2: 1,
            p3: 1,
            p4: 1,
            p5: 1,
            p6: 1,
            p7: 1,
            p8: 1,
            p9: 1,

            nid: 0,
            gardeManger: 0,
            interressement: 0,

            frigoVide: 0,
            frigoPourrie: 0,

            thermometre: 0,

            nidPartiel: false,
            nidComplet: false,

            gardeMangerOccupe: 0,
            tousLesEcureuilMange: true,

            nonForfait: true,
        };
    },

    parseForm(c: string): Form2026 | null {
        const vals = c.split(',');
        if (vals.length !== 20) {
            return null;
        }

        return {
            nid: parseInt(vals[0]),
            gardeManger: parseInt(vals[1]),
            interressement: parseInt(vals[2]),

            frigoVide: parseInt(vals[3]),
            frigoPourrie: parseInt(vals[4]),

            thermometre: parseInt(vals[5]),

            nidPartiel: toBool(vals[6]),
            nidComplet: toBool(vals[7]),

            gardeMangerOccupe: parseInt(vals[8]),
            tousLesEcureuilMange: toBool(vals[9]),

            nonForfait: toBool(vals[10]),

            p1: parseInt(vals[11]),
            p2: parseInt(vals[12]),
            p3: parseInt(vals[13]),
            p4: parseInt(vals[14]),
            p5: parseInt(vals[15]),
            p6: parseInt(vals[16]),
            p7: parseInt(vals[17]),
            p8: parseInt(vals[18]),
            p9: parseInt(vals[19]),
        };
    },

    serializeForm(form: Form2026): string {
        return [
            form.nid,
            form.gardeManger,
            form.interressement,

            form.frigoVide,
            form.frigoPourrie,

            form.thermometre,

            fromBool(form.nidPartiel),
            fromBool(form.nidComplet),

            form.gardeMangerOccupe,
            fromBool(form.tousLesEcureuilMange),

            fromBool(form.nonForfait),

            form.p1,
            form.p2,
            form.p3,
            form.p4,
            form.p5,
            form.p6,
            form.p7,
            form.p8,
            form.p9,
        ].join(',');
    },

    compute(form: Form2026) {
        let total = 0;
        total += form.p1 * form.nid;
        total += form.p2 * form.gardeManger;
        total += form.p3 * form.interressement;
        total += form.p4 * form.frigoVide;
        total += form.p5 * form.frigoPourrie;
        total += form.thermometre;
        total += form.nidPartiel ? form.p6 : 0;
        total += form.nidComplet ? form.p7 : 0;
        total += form.p8 * form.gardeMangerOccupe;
        total += form.tousLesEcureuilMange ? form.p9 : 0;
        total += 1;

        if (!form.nonForfait) {
            total = 0;
        }

        return { subtotal: 0, bonus: 0, total };
    },
};

export const Messages2026: I18nOptions['messages'] = {
    fr: {
        action1: 'Caisses dans le nid (p1 pts)',
        action2: 'Caisses dans les garde-manger (p2 pts)',
        action3: 'Intéressement par garde-manger (p3 pts)',

        action4: 'Frigos vide (p4 pts)',
        action5: 'Frigos pourri (p5 pts)',

        action6: 'Thermomètre (X pts)',

        action7: 'Partiellement dans le nid (p6 pts)',
        action8: 'Completement dans le nid (p7 pts)',

        action9: 'Gardes-manger occupés (p8 pts)',
        action10: 'Tous les ecureuils mangent (p9 pts)',

        action11: 'Non forfait (1 pt)',

        help1: 'p1 points par caisse de noisettes dans le nid',
        help2: 'p2 points par caisse de noisettes valide dans un garde-manger',
        help3: 'p3 points d’intéressement par zone valide pour l’équipe',

        help4: 'p4 points par frigo vide de caisses de noisettes à la fin du match',
        help5: 'p5 points par frigo plein de caisses de noisettes pourries à la fin du match',

        help6: 'X points pour la zone atteinte par le curseur, le nombre de points dépend du numéro indiqué dans la zone dans laquelle pointe le curseur',

        help7: 'p6 points si le robot principal de l’équipe est partiellement dans une aire d’arrivée',
        help8: 'p7 points supplémentaires si le robot principal de l’équipe est complètement dans une aire d’arrivée',

        help9: 'p8 points par garde-manger occupé par l’équipe',
        help10: 'p9 points si tous les PAMI mangent des noisettes',

        help11: '1 point bonus est attribué à toutes les équipes qui ne sont pas "forfait"',
    },
    en: {
        action1: 'Hazelnuts crates in the nest (p1 pts)',
        action2: 'Hazelnuts crates in a pantry (p2 pts)',
        action3: 'Interests in pantries (p3 pts)',

        action4: 'Empty fridges (p4 pts)',
        action5: 'Rotten fridges (p5 pts)',

        action6: 'Thermometer (X pts)',

        action7: 'Partially in the nest (p6 pts)',
        action8: 'Completely in the nest (p7 pts)',

        action9: 'Busy pantries (p8 pts)',
        action10: 'All squirrels eating (p9 pts)',

        action11: 'Non forfeited (1 pt)',

        help1: 'p1 points per hazelnuts crate in nest',
        help2: 'p2 points per hazelnuts crate valid in a pantry',
        help3: 'p3 points of interest by valid zone for the teams',

        help4: 'p4 points by fridge empty of hazelnut crates at the end of the match',
        help5: 'p5 points by fridge full of crates of rotten hazelnuts at the end of the match',

        help6: 'X points for the area reached by the cursor, the number of points depends on the number indicated in the area in which the cursor points',

        help7: 'p6 points if the team’s main robot is partially in its own valid area',
        help8: 'p7 additional points if the team’s main robot is completely in its own valid area',

        help9: 'p8 points by pantry occupied by the team',
        help10: 'p9 points if all SIMA eat the hazelnuts',

        help11: '1 bonus point is awarded to all teams that are not "forfeited"',
    },
};
