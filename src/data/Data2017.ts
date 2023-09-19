import { PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2017 {
    modulesDepart: number,
    mineraiDepart: number,
    mineraiSoute : number,
    modulesBase  : number,
    funnyAction  : boolean,
    nonForfait   : boolean,
}

export const Data2017: PageData<Form2017> = {
    defaultForm(): Form2017 {
        return {
            modulesDepart: 0,
            mineraiDepart: 0,
            mineraiSoute : 0,
            modulesBase  : 0,
            funnyAction  : false,
            nonForfait   : true,
        };
    },

    parseForm(c: string): Form2017 {
        const vals = c.split(',');
        if (vals.length !== 6) {
            return null;
        }

        return {
            modulesDepart: parseInt(vals[0]),
            mineraiDepart: parseInt(vals[1]),
            mineraiSoute : parseInt(vals[2]),
            modulesBase  : parseInt(vals[3]),
            funnyAction  : toBool(vals[4]),
            nonForfait   : toBool(vals[5]),
        };
    },

    serializeForm(form: Form2017): string {
        return [
            form.modulesDepart,
            form.mineraiDepart,
            form.mineraiSoute,
            form.modulesBase,
            fromBool(form.funnyAction),
            fromBool(form.nonForfait),
        ].join(',');
    },

    compute(form: Form2017) {
        let total = 0;
        total += form.modulesDepart * 2;
        total += form.mineraiDepart * 2;
        total += form.mineraiSoute * 3;
        total += form.modulesBase * 10;
        total += form.funnyAction ? 20 : 0;
        total += 15;

        if (!form.nonForfait) {
            total = 0;
        }

        return { subtotal: 0, bonus: 0, total };
    },
};
