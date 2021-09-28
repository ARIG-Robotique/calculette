import { FormAgeOfBots } from "../models/FormAgeOfBots";

function fromBool(val: boolean): string {
    return val ? '1' : '0';
}

function toBool(val: string): boolean {
    return val === '1';
}

export function defaultForm(): FormAgeOfBots {
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
}

export function serializeForm(form: FormAgeOfBots) {
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
    ].join('|');
}

export function parseForm(c: string): FormAgeOfBots {
    const vals = c.split('|');

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
}
