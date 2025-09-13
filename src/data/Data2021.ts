import { type PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2021 {
    boueesPort: number,
    boueesChenaux: number,
    boueesPaires: number,
    manchesAir: number,
    nbRobots: number,
    bonPort: number,
    mauvaisPort: number,
    pharePresent: boolean,
    phareActive: boolean,
    phareDeploye: boolean,
    pavillonHisse: boolean,
    estimation: number,
    nonForfait: boolean,
}

export const Data2021: PageData<Form2021> = {
    defaultForm(): Form2021 {
        return {
            boueesPort: 0,
            boueesChenaux: 0,
            boueesPaires: 0,
            manchesAir: 0,
            nbRobots: 2,
            bonPort: 0,
            mauvaisPort: 0,
            pharePresent: false,
            phareActive: false,
            phareDeploye: false,
            pavillonHisse: false,
            estimation: 0,
            nonForfait: true,
        };
    },

    parseForm(c: string): Form2021 | null {
        const vals = c.split(',');
        if (vals.length !== 13) {
            return null;
        }

        return {
            boueesPort: parseInt(vals[0]),
            boueesChenaux: parseInt(vals[1]),
            boueesPaires: parseInt(vals[2]),
            manchesAir: parseInt(vals[3]),
            nbRobots: parseInt(vals[4]),
            bonPort: parseInt(vals[5]),
            mauvaisPort: parseInt(vals[6]),
            pharePresent: toBool(vals[7]),
            phareActive: toBool(vals[8]),
            phareDeploye: toBool(vals[9]),
            pavillonHisse: toBool(vals[10]),
            estimation: parseInt(vals[11]),
            nonForfait: toBool(vals[12]),
        };
    },

    serializeForm(form: Form2021): string {
        return [
            form.boueesPort,
            form.boueesChenaux,
            form.boueesPaires,
            form.manchesAir,
            form.nbRobots,
            form.bonPort,
            form.mauvaisPort,
            fromBool(form.pharePresent),
            fromBool(form.phareActive),
            fromBool(form.phareDeploye),
            fromBool(form.pavillonHisse),
            form.estimation,
            fromBool(form.nonForfait),
        ].join(',');
    },

    compute(form: Form2021) {
        let subtotal = 0;
        subtotal += form.boueesPort;
        subtotal += form.boueesChenaux;
        subtotal += form.boueesPaires * 2;
        subtotal += form.manchesAir === 2 ? 15 : form.manchesAir === 1 ? 5 : 0;
        if (form.nbRobots === 2) {
            subtotal += form.bonPort * 10;
            subtotal += form.mauvaisPort * 3;
        } else {
            subtotal += form.bonPort * 20;
            subtotal += form.mauvaisPort * 6;
        }
        subtotal += form.pharePresent ? 2 : 0;
        subtotal += form.phareActive ? 3 : 0;
        subtotal += form.phareDeploye ? 10 : 0;
        subtotal += form.pavillonHisse ? 10 : 0;

        const bonus = Math.max(0, Math.round(0.3 * subtotal - Math.abs(form.estimation - subtotal)));

        let total = subtotal;
        total += bonus;
        total += 5;

        if (!form.nonForfait) {
            total = 0;
        }

        return { subtotal, bonus, total };
    },
};
