import { type I18nOptions } from 'vue-i18n';
import { type PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2027 {
    stoneInZone: number, // p1
    wall: number, // p2
    tower: number, // p3
    door: boolean, // p4

    grailPresent: boolean, // p5
    grailLevel: number, // p6

    arrival: boolean, // p7
    fullArrival: boolean, // p8

    moat: number, // p9
    attack: boolean, // p10
    cannonball: number, // p11

    p1: number,
    p2: number,
    p3: number,
    p4: number,
    p5: number,
    p6: number,
    p7: number,
    p8: number,
    p9: number,
    p10: number,
    p11: number,
}

export const Data2027: PageData<Form2027> = {
    defaultForm(): Form2027 {
        return {
            stoneInZone: 0,
            wall: 0,
            tower: 0,
            door: false,
            grailPresent: false,
            grailLevel: 0,
            arrival: false,
            fullArrival: false,
            moat: 0,
            attack: false,
            cannonball: 0,

            p1: 1,
            p2: 1,
            p3: 1,
            p4: 1,
            p5: 1,
            p6: 1,
            p7: 1,
            p8: 1,
            p9: 1,
            p10: 1,
            p11: 1,
        };
    },

    parseForm(c: string): Form2027 | null {
        const vals = c.split(',');
        if (vals.length !== 22) {
            return null;
        }

        return {
            stoneInZone: parseInt(vals[0]),
            wall: parseInt(vals[1]),
            tower: parseInt(vals[2]),
            door: toBool(vals[3]),
            grailPresent: toBool(vals[4]),
            grailLevel: parseInt(vals[5]),
            arrival: toBool(vals[6]),
            fullArrival: toBool(vals[7]),
            moat: parseInt(vals[8]),
            attack: toBool(vals[9]),
            cannonball: parseInt(vals[10]),

            p1: parseInt(vals[11]),
            p2: parseInt(vals[12]),
            p3: parseInt(vals[13]),
            p4: parseInt(vals[14]),
            p5: parseInt(vals[15]),
            p6: parseInt(vals[16]),
            p7: parseInt(vals[17]),
            p8: parseInt(vals[18]),
            p9: parseInt(vals[19]),
            p10: parseInt(vals[20]),
            p11: parseInt(vals[21]),
        };
    },

    serializeForm(form: Form2027): string {
        return [
            form.stoneInZone,
            form.wall,
            form.tower,
            fromBool(form.door),
            fromBool(form.grailPresent),
            form.grailLevel,
            fromBool(form.arrival),
            fromBool(form.fullArrival),
            form.moat,
            fromBool(form.attack),
            form.cannonball,

            form.p1,
            form.p2,
            form.p3,
            form.p4,
            form.p5,
            form.p6,
            form.p7,
            form.p8,
            form.p9,
            form.p10,
            form.p11,
        ].join(',');
    },

    compute(form: Form2027) {
        let total = 0;
        total += form.stoneInZone * form.p1;
        total += form.wall * form.p2;
        total += form.tower * form.p3;
        total += form.door ? form.p4 : 0;
        total += form.grailPresent ? form.p5 : 0;
        total += form.grailLevel * form.p6;
        total += form.arrival ? form.p7 : 0;
        total += form.fullArrival ? form.p8 : 0;
        total += form.moat * form.p9;
        total += form.attack ? form.p10 : 0;
        total += form.cannonball * form.p11;

        return { subtotal: 0, bonus: 0, total };
    },
};

export const Messages2027: I18nOptions['messages'] = {
    fr: {
        action1: 'Pierres dans une zone (P1)',
        action2: 'Murs construits (P2)',
        action3: 'Tours construites (P3)',
        action4: 'Porte construite (P4)',

        action5: 'Graal présent (P5)',
        action6: 'Niveau du Graal (P6)',

        action7: 'Roi arrivé (P7)',
        action8: 'Entièrement arrivé (P8)',

        action9: 'Douves occupées (P9)',
        action10: 'Un chevalier attaque (P10)',
        action11: 'Boulets dans le château (P11)',

        help1: 'P1 points par pierre disposée dans une zone de construction',
        help2: 'P2 points par mur construit',
        help3: 'P3 points par tour construite',
        help4: 'P4 points par porte construite',

        help5: 'P5 points si le Graal est présent dans le château',
        help6: `P6 points par niveau d'élévation du Graal`,

        help7: `P7 points si le robot principal de  l'équipe est partiellement dans une aire d'arrivée`,
        help8: `P8 points supplémentaires si le robot principal de l'équipe est complètement dans une aire d'arrivée`,

        help9: `P9 points par douve occupée par l'équipe`,
        help10: `P10 points si au moins PAMI attaque un PAMI adverse`,
        help11: `P11 points par boulet présent dans le château adverse`,
    },
    en: {
        action1: 'Stones in a zone (P1)',
        action2: 'Walls built (P2)',
        action3: 'Towers built (P3)',
        action4: 'Door built (P4)',

        action5: 'Grail present (P5)',
        action6: 'Grail level (P6)',

        action7: 'King arrived (P7)',
        action8: 'Fully arrived (P8)',

        action9: 'Moats occupied (P9)',
        action10: 'Knight attacks (P10)',
        action11: 'Cannonball ins the castle (P11)',

        help1: 'P1 points per stone placed in a construction zone',
        help2: 'P2 points per wall built.',
        help3: 'P3 points per tower buil',
        help4: 'P4 points per built door',

        help5: 'P5 points if the Grail is present in the castle',
        help6: `P6 points per Grail elevation level`,

        help7: `P7 points if the team's main robot is partially in its own valid area`,
        help8: `P8 additional points if the team's main robot is completely in its own valid area`,

        help9: `P9 points by moat occupied by the team`,
        help10: `P10 points if at least one SIMA attacks an opposing SIMA`,
        help11: `P11 points per cannonball present in the opposing castle`,
    },
};
