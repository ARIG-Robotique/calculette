import { PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2025 {
    p1: number,
    p2: number,
    p3: number,
    p4: number,
    p5: number,
    p6: number,
    p7: number,
    p8: number,

    tribune1: number,
    tribune2: number,
    tribune3: number,
    banner: boolean,
    areasWGroupies: number,
    superstar: boolean,
    allSima: boolean,
    freeStageArea: number,
    storage: boolean,

    estimation: number,
}

export const Data2025: PageData<Form2025> = {
    defaultForm(): Form2025 {
        return {
            p1: 1,
            p2: 1,
            p3: 1,
            p4: 1,
            p5: 1,
            p6: 1,
            p7: 1,
            p8: 1,

            tribune1: 0,
            tribune2: 0,
            tribune3: 0,
            banner: false,
            areasWGroupies: 0,
            superstar: false,
            allSima: false,
            freeStageArea: 0,
            storage: false,

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
            storage: toBool(vals[8]),

            estimation: parseInt(vals[9]),

            p1: parseInt(vals[10]),
            p2: parseInt(vals[11]),
            p3: parseInt(vals[12]),
            p4: parseInt(vals[13]),
            p5: parseInt(vals[15]),
            p6: parseInt(vals[15]),
            p7: parseInt(vals[16]),
            p8: parseInt(vals[17]),
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
            fromBool(form.storage),
            form.estimation,
            form.p1,
            form.p2,
            form.p3,
            form.p4,
            form.p5,
            form.p6,
            form.p7,
            form.p8,
        ].join(',');
    },

    compute(form: Form2025) {
        let subtotal = 0;
        subtotal += form.p1 * form.tribune1;
        subtotal += form.p2 * form.tribune2;
        subtotal += form.p3 * form.tribune3;
        subtotal += form.banner ? form.p4 : 0;
        subtotal += form.storage ? form.p8 : 0;

        const bonus = Math.max(0, Math.min(Math.ceil(20 - Math.abs(form.estimation - subtotal) / 2), subtotal));

        let sima = 0;
        sima += form.p5 * form.areasWGroupies
        sima += form.superstar ? form.p6 : 0;
        sima += form.allSima ? form.p7 : 0;
        sima += [0, 1, 2, 3, 5, 8, 13, 21][form.freeStageArea];

        const total = subtotal + bonus + sima;

        return { subtotal, bonus, sima, total };
    },
};
