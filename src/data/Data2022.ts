import { PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2022 {
    carresFouille               : number,
    carresFouilleOk             : boolean,
    echantillonsPris            : number,
    echantillonsCampement       : number,
    echantillonsCampementValides: number,
    echantillonsGalerie         : number,
    echantillonsGalerieValides  : number,
    echantillonsAbri            : number,
    retourRobots                : boolean,
    statuettePresente           : boolean,
    statuettePrise              : boolean,
    statuettePosee              : boolean,
    repliquePosee               : boolean,
    vitrinePresente             : boolean,
    vitrineActivee              : boolean,
    estimation                  : number,
    nonForfait                  : boolean,
}

export const Data2022: PageData<Form2022> = {
    defaultForm(): Form2022 {
        return {
            carresFouille               : 0,
            carresFouilleOk             : true,
            echantillonsPris            : 0,
            echantillonsCampement       : 0,
            echantillonsCampementValides: 0,
            echantillonsGalerie         : 0,
            echantillonsGalerieValides  : 0,
            echantillonsAbri            : 0,
            retourRobots                : false,
            statuettePresente           : false,
            statuettePrise              : false,
            statuettePosee              : false,
            repliquePosee               : false,
            vitrinePresente             : false,
            vitrineActivee              : false,
            estimation                  : 0,
            nonForfait                  : true,
        };
    },

    parseForm(c: string): Form2022 {
        const vals = c.split(',');
        if (vals.length !== 17) {
            return null;
        }

        return {
            carresFouille               : parseInt(vals[0]),
            carresFouilleOk             : toBool(vals[1]),
            echantillonsPris            : parseInt(vals[2]),
            echantillonsCampement       : parseInt(vals[3]),
            echantillonsCampementValides: parseInt(vals[4]),
            echantillonsGalerie         : parseInt(vals[5]),
            echantillonsGalerieValides  : parseInt(vals[6]),
            echantillonsAbri            : parseInt(vals[7]),
            retourRobots                : toBool(vals[8]),
            statuettePresente           : toBool(vals[9]),
            statuettePrise              : toBool(vals[10]),
            statuettePosee              : toBool(vals[11]),
            repliquePosee               : toBool(vals[12]),
            vitrinePresente             : toBool(vals[13]),
            vitrineActivee              : toBool(vals[14]),
            estimation                  : parseInt(vals[15]),
            nonForfait                  : toBool(vals[16]),
        };
    },

    serializeForm(form: Form2022): string {
        return [
            form.carresFouille,
            fromBool(form.carresFouilleOk),
            form.echantillonsPris,
            form.echantillonsCampement,
            form.echantillonsCampementValides,
            form.echantillonsGalerie,
            form.echantillonsGalerieValides,
            form.echantillonsAbri,
            fromBool(form.retourRobots),
            fromBool(form.statuettePresente),
            fromBool(form.statuettePrise),
            fromBool(form.statuettePosee),
            fromBool(form.repliquePosee),
            fromBool(form.vitrinePresente),
            fromBool(form.vitrineActivee),
            form.estimation,
            fromBool(form.nonForfait),
        ].join(',');
    },

    compute(form: Form2022) {
        let subtotal = 0;
        if (form.carresFouilleOk && form.carresFouille > 0) {
            subtotal += 5 + form.carresFouille * 5;
        }
        subtotal += form.echantillonsPris;
        subtotal += form.echantillonsCampement;
        subtotal += form.echantillonsCampementValides;
        subtotal += form.echantillonsGalerie * 3;
        subtotal += form.echantillonsGalerieValides * 3;
        subtotal += form.echantillonsAbri * 5;
        subtotal += form.retourRobots ? 20 : 0;
        subtotal += form.statuettePresente ? 2 : 0;
        subtotal += form.statuettePrise ? 5 : 0;
        subtotal += form.statuettePosee ? 15 : 0;
        subtotal += form.repliquePosee ? 10 : 0;
        subtotal += form.vitrinePresente ? 2 : 0;
        subtotal += form.vitrineActivee ? 5 : 0;

        let total = subtotal;
        total += Math.max(0, Math.ceil(0.3 * subtotal - Math.abs(form.estimation - subtotal)));
        total += 1;

        if (!form.nonForfait) {
            total = 0;
        }

        return { subtotal, total };
    },
};
