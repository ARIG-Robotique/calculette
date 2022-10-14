import { PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2023 {
    etagesGateaux  : number,
    gateauxComplets: number,
    cerisesGateaux : number,
    panierPresent  : boolean,
    cerisesPanier  : number,
    panierOk       : boolean,
    retourOk       : boolean,
    funnyAction    : boolean,
    estimation     : number,
    nonForfait     : boolean,
}

export const Data2023: PageData<Form2023> = {
    defaultForm(): Form2023 {
        return {
            etagesGateaux  : 0,
            gateauxComplets: 0,
            cerisesGateaux : 0,
            panierPresent  : false,
            cerisesPanier  : 0,
            panierOk       : false,
            retourOk       : false,
            funnyAction    : false,
            estimation     : 0,
            nonForfait     : true,
        };
    },

    parseForm(c: string): Form2023 {
        const vals = c.split(',');
        if (vals.length !== 10) {
            return null;
        }

        return {
            etagesGateaux  : parseInt(vals[0]),
            gateauxComplets: parseInt(vals[1]),
            cerisesGateaux : parseInt(vals[2]),
            panierPresent  : toBool(vals[3]),
            cerisesPanier  : parseInt(vals[4]),
            panierOk       : toBool(vals[5]),
            retourOk       : toBool(vals[6]),
            funnyAction    : toBool(vals[7]),
            estimation     : parseInt(vals[8]),
            nonForfait     : toBool(vals[9]),
        };
    },

    serializeForm(form: Form2023): string {
        return [
            form.etagesGateaux,
            form.gateauxComplets,
            form.cerisesGateaux,
            fromBool(form.panierPresent),
            form.cerisesPanier,
            fromBool(form.panierOk),
            fromBool(form.retourOk),
            fromBool(form.funnyAction),
            form.estimation,
            fromBool(form.nonForfait),
        ].join(',');
    },

    compute(form: Form2023) {
        let subtotal = 0;
        subtotal += form.etagesGateaux;
        subtotal += form.gateauxComplets * 3;
        subtotal += form.cerisesGateaux * 4;
        subtotal += form.panierPresent ? 5 : 0;
        subtotal += form.cerisesPanier;
        subtotal += form.panierOk ? 5 : 0;
        subtotal += form.retourOk ? 15 : 0;
        subtotal += form.funnyAction ? 5 : 0;

        let total = subtotal;
        total += Math.max(0, Math.ceil(20 - Math.abs(form.estimation - subtotal)));
        total += 1;

        if (!form.nonForfait) {
            total = 0;
        }

        return { subtotal, total };
    },
};
