import { PageData } from "../models/PageData";
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
        };
    },

    parseForm(c: string): Form2025 {
        const vals = c.split(',');
        if (vals.length !== 18) {
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

        const total = subtotal + bonus + sima;

        return { subtotal, bonus, sima, total };
    },
};
