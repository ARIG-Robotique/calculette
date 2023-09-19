import { PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2018 {
    recuperateursVides: number,
    ballesChateau     : number,
    chateauOk         : boolean,
    ballesStation     : number,
    etage1            : number,
    etage2            : number,
    etage3            : number,
    etage4            : number,
    etage5            : number,
    combinaisons      : number,
    panneauPresent    : boolean,
    panneauActive     : boolean,
    abeillePresente   : boolean,
    fleurButinee      : boolean,
    estimation        : number,
    nonForfait        : boolean,
}

const BONUS: Record<string, Record<string, number>> = {
    10: { 2:2, 5:0, 10:0, 15:0, 25:0, 35:0, 50:0, 100:0, 150:0 },
    20: { 2:5, 5:0, 10:0, 15:0, 25:0, 35:0, 50:0, 100:0, 150:0 },
    40: { 2:10, 5:3, 10:0, 15:0, 25:0, 35:0, 50:0, 100:0, 150:0 },
    60: { 2:17, 5:10, 10:3, 15:0, 25:0, 35:0, 50:0, 100:0, 150:0 },
    80: { 2:23, 5:16, 10:9, 15:2, 25:0, 35:0, 50:0, 100:0, 150:0 },
    100: { 2:30, 5:23, 10:16, 15:9, 25:0, 35:0, 50:0, 100:0, 150:0 },
    130: { 2:37, 5:30, 10:23, 15:16, 25:6, 35:0, 50:0, 100:0, 150:0 },
    160: { 2:43, 5:36, 10:29, 15:22, 25:12, 35:2, 50:0, 100:0, 150:0 },
    190: { 2:50, 5:43, 10:36, 15:29, 25:19, 35:9, 50:0, 100:0, 150:0 },
    220: { 2:57, 5:50, 10:43, 15:36, 25:26, 35:16, 50:4, 100:0, 150:0 },
    260: { 2:63, 5:56, 10:49, 15:42, 25:32, 35:22, 50:10, 100:0, 150:0 },
    300: { 2:70, 5:63, 10:56, 15:49, 25:39, 35:29, 50:17, 100:3, 150:0 },
    340: { 2:77, 5:70, 10:63, 15:56, 25:46, 35:36, 50:24, 100:10, 150:0 },
    380: { 2:83, 5:76, 10:69, 15:62, 25:52, 35:42, 50:30, 100:16, 150:0 },
    420: { 2:90, 5:83, 10:76, 15:59, 25:59, 35:49, 50:37, 100:23, 150:0 },
    500: { 2:97, 5:90, 10:83, 15:76, 25:66, 35:56, 50:44, 100:30, 150:7 },
    999: { 2:103, 5:96, 10:89, 15:82, 25:72, 35:62, 50:50, 100:36, 150:13 },
};

export const Data2018: PageData<Form2018> = {
    defaultForm(): Form2018 {
        return {
            recuperateursVides: 0,
            ballesChateau     : 0,
            chateauOk         : true,
            ballesStation     : 0,
            etage1            : 0,
            etage2            : 0,
            etage3            : 0,
            etage4            : 0,
            etage5            : 0,
            combinaisons      : 0,
            panneauPresent    : false,
            panneauActive     : false,
            abeillePresente   : false,
            fleurButinee      : false,
            estimation        : 0,
            nonForfait        : true,
        };
    },

    parseForm(c: string): Form2018 {
        const vals = c.split(',');
        if (vals.length !== 16) {
            return null;
        }

        return {
            recuperateursVides: parseInt(vals[0]),
            ballesChateau     : parseInt(vals[1]),
            chateauOk         : toBool(vals[2]),
            ballesStation     : parseInt(vals[3]),
            etage1            : parseInt(vals[4]),
            etage2            : parseInt(vals[5]),
            etage3            : parseInt(vals[6]),
            etage4            : parseInt(vals[7]),
            etage5            : parseInt(vals[8]),
            combinaisons      : parseInt(vals[9]),
            panneauPresent    : toBool(vals[10]),
            panneauActive     : toBool(vals[11]),
            abeillePresente   : toBool(vals[12]),
            fleurButinee      : toBool(vals[13]),
            estimation        : parseInt(vals[14]),
            nonForfait        : toBool(vals[15]),
        };
    },

    serializeForm(form: Form2018): string {
        return [
            form.recuperateursVides,
            form.ballesChateau,
            fromBool(form.chateauOk),
            form.ballesStation,
            form.etage1,
            form.etage2,
            form.etage3,
            form.etage4,
            form.etage5,
            form.combinaisons,
            fromBool(form.panneauPresent),
            fromBool(form.panneauActive),
            fromBool(form.abeillePresente),
            fromBool(form.fleurButinee),
            form.estimation,
            fromBool(form.nonForfait),
        ].join(',');
    },

    compute(form: Form2018) {
        let subtotal = 0;
        subtotal += form.recuperateursVides * 10;
        if (form.chateauOk) {
            subtotal += form.ballesChateau * 5;
        }
        subtotal += form.ballesStation * 10;
        subtotal += form.etage1;
        subtotal += form.etage2 * 2;
        subtotal += form.etage3 * 3;
        subtotal += form.etage4 * 4;
        subtotal += form.etage5 * 5;
        subtotal += form.combinaisons * 30;
        subtotal += form.panneauPresent ? 5 : 0;
        subtotal += form.panneauActive ? 25 : 0;
        subtotal += form.abeillePresente ? 5 : 0;
        subtotal += form.fleurButinee ? 50 : 0;

        let bonus = 0;
        if (subtotal > 0) {
            const score = subtotal;
            const ecart = Math.abs(form.estimation - score);

            bonus:
            for (const maxScore of Object.keys(BONUS)) {
                if (score <= +maxScore) {
                    for (const maxEcart of Object.keys(BONUS[maxScore])) {
                        if (ecart <= +maxEcart) {
                            bonus = BONUS[maxScore][maxEcart];
                            break bonus;
                        }
                    }
                }
            }
        }

        let total = subtotal;
        total += bonus;
        total += 10;

        if (!form.nonForfait) {
            total = 0;
        }

        return { subtotal, bonus, total };
    },
};
