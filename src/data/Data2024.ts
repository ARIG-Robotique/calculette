import { PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2024 {
    p1: number,
    p2: number,
    p3: number,
    p4: number,
    p5: number,
    p6: number,
    p7: number,

    plantes: number,
    pots: number,
    panneaux: number,
    zonesWCoccinelle: number,
    zonesWContact: number,
    retour: boolean,

    estimation     : number,
    nonForfait     : boolean,
}

export const Data2024: PageData<Form2024> = {
    defaultForm(): Form2024 {
        return {
            p1: 1,
            p2: 1,
            p3: 1,
            p4: 1,
            p5: 1,
            p6: 1,
            p7: 1,

            plantes: 0,
            pots: 0,
            panneaux: 0,
            zonesWCoccinelle: 0,
            zonesWContact: 0,
            retour: false,

            estimation: 0,
            nonForfait: true,
        };
    },

    parseForm(c: string): Form2024 {
        const vals = c.split(',');
        if (vals.length !== 15) {
            return null;
        }

        return {
            plantes: parseInt(vals[0]),
            pots: parseInt(vals[1]),
            panneaux: parseInt(vals[2]),
            zonesWCoccinelle: parseInt(vals[3]),
            zonesWContact: parseInt(vals[4]),
            retour: toBool(vals[5]),

            estimation: parseInt(vals[6]),
            nonForfait: toBool(vals[7]),

            p1: parseInt(vals[8]),
            p2: parseInt(vals[9]),
            p3: parseInt(vals[10]),
            p4: parseInt(vals[11]),
            p5: parseInt(vals[12]),
            p6: parseInt(vals[13]),
            p7: parseInt(vals[14]),
        };
    },

    serializeForm(form: Form2024): string {
        return [
            form.plantes,
            form.pots,
            form.panneaux,
            form.zonesWCoccinelle,
            form.zonesWContact,
            fromBool(form.retour),
            form.estimation,
            fromBool(form.nonForfait),
            form.p1,
            form.p2,
            form.p3,
            form.p4,
            form.p5,
            form.p6,
            form.p7,
        ].join(',');
    },

    compute(form: Form2024) {
        let subtotal = 0;
        subtotal += form.p1 * form.plantes;
        subtotal += form.p2 * form.pots;
        subtotal += form.p3 * form.panneaux;
        subtotal += form.retour ? form.p6 : 0;

        const bonus = Math.max(0, Math.ceil(form.p7 - Math.abs(form.estimation - subtotal)));

        let total = subtotal;
        total += bonus;
        total += form.p4 * form.zonesWCoccinelle;
        total += form.p5 * form.zonesWContact;
        total += 1;

        if (!form.nonForfait) {
            total = 0;
        }

        return { subtotal, bonus, total };
    },
};
