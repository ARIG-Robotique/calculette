import { type PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2024 {
    plantes: number,
    plantesPots: number,
    plantesJardiniere: number,
    panneaux: number,
    zonesCoccinelle: number,
    zonesContact: number,
    retour: boolean,

    estimation: number,
    nonForfait: boolean,
}

export const Data2024: PageData<Form2024> = {
    defaultForm(): Form2024 {
        return {
            plantes: 0,
            plantesPots: 0,
            plantesJardiniere: 0,
            panneaux: 0,
            zonesCoccinelle: 0,
            zonesContact: 0,
            retour: false,

            estimation: 0,
            nonForfait: true,
        };
    },

    parseForm(c: string): Form2024 | null {
        const vals = c.split(',');
        if (vals.length !== 9) {
            return null;
        }

        return {
            plantes: parseInt(vals[0]),
            plantesPots: parseInt(vals[1]),
            plantesJardiniere: parseInt(vals[2]),
            panneaux: parseInt(vals[3]),
            zonesCoccinelle: parseInt(vals[4]),
            zonesContact: parseInt(vals[5]),
            retour: toBool(vals[6]),

            estimation: parseInt(vals[7]),
            nonForfait: toBool(vals[8]),
        };
    },

    serializeForm(form: Form2024): string {
        return [
            form.plantes,
            form.plantesPots,
            form.plantesJardiniere,
            form.panneaux,
            form.zonesCoccinelle,
            form.zonesContact,
            fromBool(form.retour),
            form.estimation,
            fromBool(form.nonForfait),
        ].join(',');
    },

    compute(form: Form2024) {
        let subtotal = 0;
        subtotal += 3 * form.plantes;
        subtotal += form.plantesPots;
        subtotal += form.plantesJardiniere;
        subtotal += 5 * form.panneaux;
        subtotal += form.retour ? 10 : 0;

        const bonus = Math.max(0, Math.min(Math.ceil(20 - Math.abs(form.estimation - subtotal) / 2), subtotal));

        let sima = 0;
        sima += 5 * form.zonesCoccinelle;
        sima += 5 * form.zonesContact;

        let total = subtotal + bonus + sima + 1;

        if (!form.nonForfait) {
            total = 0;
        }

        return { subtotal, bonus, sima, total };
    },
};
