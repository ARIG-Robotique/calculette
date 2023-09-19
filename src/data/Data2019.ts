import { PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2019 {
    atomesTableau       : number,
    atomesTableauClasses: number,
    goldeniumTableau    : boolean,
    rediumBalance       : number,
    greeniumBalance     : number,
    blueiumBalance      : number,
    goldeniumBalance    : boolean,
    atomesAccel         : number,
    detecteurOuvert     : boolean,
    goldeniumPris       : boolean,
    experiencePresente  : boolean,
    experienceActivee   : boolean,
    electron            : boolean,
    estimation          : number,
    meilleureBalance    : boolean,
    nonForfait          : boolean,
}

export const Data2019: PageData<Form2019> = {
    defaultForm(): Form2019 {
        return {
            atomesTableau       : 0,
            atomesTableauClasses: 0,
            goldeniumTableau    : false,
            rediumBalance       : 0,
            greeniumBalance     : 0,
            blueiumBalance      : 0,
            goldeniumBalance    : false,
            atomesAccel         : 0,
            detecteurOuvert     : false,
            goldeniumPris       : false,
            experiencePresente  : false,
            experienceActivee   : false,
            electron            : false,
            estimation          : 0,
            meilleureBalance    : false,
            nonForfait          : true,
        };
    },

    parseForm(c: string): Form2019 {
        const vals = c.split(',');
        if (vals.length !== 16) {
            return null;
        }

        return {
            atomesTableau       : parseInt(vals[0]),
            atomesTableauClasses: parseInt(vals[1]),
            goldeniumTableau    : toBool(vals[2]),
            rediumBalance       : parseInt(vals[3]),
            greeniumBalance     : parseInt(vals[4]),
            blueiumBalance      : parseInt(vals[5]),
            goldeniumBalance    : toBool(vals[6]),
            atomesAccel         : parseInt(vals[7]),
            detecteurOuvert     : toBool(vals[8]),
            goldeniumPris       : toBool(vals[9]),
            experiencePresente  : toBool(vals[10]),
            experienceActivee   : toBool(vals[11]),
            electron            : toBool(vals[12]),
            estimation          : parseInt(vals[13]),
            meilleureBalance    : toBool(vals[14]),
            nonForfait          : toBool(vals[15]),
        };
    },

    serializeForm(form: Form2019): string {
        return [
            form.atomesTableau,
            form.atomesTableauClasses,
            fromBool(form.goldeniumTableau),
            form.rediumBalance,
            form.greeniumBalance,
            form.blueiumBalance,
            fromBool(form.goldeniumBalance),
            form.atomesAccel,
            fromBool(form.detecteurOuvert),
            fromBool(form.goldeniumPris),
            fromBool(form.experiencePresente),
            fromBool(form.experienceActivee),
            fromBool(form.electron),
            form.estimation,
            fromBool(form.meilleureBalance),
            fromBool(form.nonForfait),
        ].join(',');
    },

    compute(form: Form2019) {
        let subtotal = 0;
        subtotal += form.atomesTableau;
        subtotal += form.atomesTableauClasses * 5;
        subtotal += form.goldeniumTableau ? 6 : 0;

        const balance: ('r' | 'g' | 'b' | 'gold')[] = [];
        for (let i = 0; i < form.rediumBalance; i++) balance.push('r');
        for (let i = 0; i < form.greeniumBalance; i++) balance.push('g');
        for (let i = 0; i < form.blueiumBalance; i++) balance.push('b');
        if (form.goldeniumBalance) balance.push('gold');

        subtotal += balance.slice(0, 6).reduce((sum, atom) => {
            return sum + { r: 4, g: 8, b: 12, gold: 24 }[atom];
        }, 0);

        subtotal += form.atomesAccel * 10;
        subtotal += form.detecteurOuvert ? 10 : 0;
        subtotal += form.goldeniumPris ? 20 : 0;
        subtotal += form.experiencePresente ? 5 : 0;
        subtotal += form.experienceActivee ? 15 : 0;
        subtotal += form.electron ? 20 : 0;

        const bonus = Math.max(0, Math.round(0.3 * subtotal - Math.abs(form.estimation - subtotal)));

        let total = subtotal;
        total += bonus;
        total += form.meilleureBalance ? 30 : 0;
        total += 10;

        if (!form.nonForfait) {
            total = 0;
        }

        return { subtotal, bonus, total };
    },
};
