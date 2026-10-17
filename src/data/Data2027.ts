import { type I18nOptions } from 'vue-i18n';
import { type PageData } from "../models/PageData";
import { fromBool, toBool } from "../utils/form.utils";

export interface Form2027 {
    stoneInZone: number,
    wall: number,
    tower: number,
    door: boolean,

    grailPresent: boolean,
    grailLevel: number,

    arrival: boolean,
    fullArrival: boolean,

    moat: number,
    attack: boolean,
    cannonball: boolean,
    cannonballx3: boolean,
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
            cannonball: false,
            cannonballx3: false,
        };
    },

    parseForm(c: string): Form2027 | null {
        const vals = c.split(',');
        if (vals.length !== 12) {
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
            cannonball: toBool(vals[10]),
            cannonballx3: toBool(vals[11]),
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
            fromBool(form.cannonball),
            fromBool(form.cannonballx3),
        ].join(',');
    },

    compute(form: Form2027) {
        let total = 0;
        total += form.stoneInZone;
        total += form.wall * 5;
        total += form.tower * 5;
        total += form.door ? 20 : 0;
        total += form.grailPresent ? 5 : 0;
        total += form.grailLevel * 5;
        total += form.arrival ? 5 : 0;
        total += form.fullArrival ? 10 : 0;
        total += form.moat * 5;
        total += form.attack ? 5 : 0;
        total += form.cannonball ? 5 : 0;
        total += form.cannonballx3 ? 15 : 0;

        return { subtotal: 0, bonus: 0, total };
    },
};

export const Messages2027: I18nOptions['messages'] = {
    fr: {
        action1: 'Pierres dans une zone (1pt)',
        action2: 'Murs construits (5pts)',
        action3: 'Tours construites (5pts)',
        action4: 'Porte construite (20pts)',

        action5: 'Graal présent (5pts)',
        action6: 'Niveau du Graal (5pts)',

        action7: 'Roi arrivé (5pts)',
        action8: 'Entièrement arrivé (10pts)',

        action9: 'Douves occupées (5pts)',
        action10: 'Un chevalier attaque (5pts)',
        action11: '1 boulet dans le château (5pts)',
        action12: '3 boulets dans le château (15pts)',

        help1: '1 point par pierre disposée dans une zone de construction',
        help2: '5 points par mur construit',
        help3: '5 points par tour construite',
        help4: '20 points par porte construite',

        help5: '5 points si le Graal est présent dans le château',
        help6: `5 points par niveau d'élévation du Graal`,

        help7: `5 points si le robot principal de  l'équipe est partiellement dans une aire d'arrivée`,
        help8: `10 points si le robot principal de l'équipe est complètement dans une aire d'arrivée`,

        help9: `5 points par douve occupée par l'équipe`,
        help10: `5 points si au moins PAMI attaque un PAMI adverse`,
        help11: `5 points si un boulet est présent dans le chateau adverse`,
        help12: `15 points supplémentaire si au moins 3 boulets sont présents dans le chateau adverse`,
    },
    en: {
        action1: 'Stones in a zone (1pt)',
        action2: 'Walls built (5pts)',
        action3: 'Towers built (5pts)',
        action4: 'Door built (20pts)',

        action5: 'Grail present (5pts)',
        action6: 'Grail level (5pts)',

        action7: 'King arrived (5pts)',
        action8: 'Fully arrived (10pts)',

        action9: 'Moats occupied (5pts)',
        action10: 'Knight attacks (5pts)',
        action11: '1 cannonball in the castle (5pts)',
        action12: '3 cannonballs in the castle (15pts)',

        help1: '1 point per stone placed in a construction zone',
        help2: '5 points per wall built.',
        help3: '5 points per tower buil',
        help4: '20 points per built door',

        help5: '5 points if the Grail is present in the castle',
        help6: `5 points per Grail elevation level`,

        help7: `5 points if the team's main robot is partially in its own valid area`,
        help8: `10 points if the team's main robot is completely in its own valid area`,

        help9: `5 points by moat occupied by the team`,
        help10: `5 points if at least one SIMA attacks an opposing SIMA`,
        help11: `5 points if a cannonball is present in the opposing castle`,
        help12: `15 additionnal points if at least 3 cannonball are present in the opposing castle`,
    },
};
