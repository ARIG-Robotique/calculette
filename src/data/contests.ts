import colors from 'vuetify/util/colors';

export interface Contest {
    year: number;
    name: string;
    match: boolean;
    pdfUrl: string;
    colors: {
        primary: string;
        accent: string;
    };
}

/**
 * ATTENTION : mettre la couleur primary du dernier concours en dur dans index.html et vite.config.ts pour la PWA
 */

export const CONTESTS: Record<string, Contest> = {
    2026: {
        year: 2026,
        name: 'Winter is coming (beta)',
        match: false,
        pdfUrl: 'https://www.eurobot.org/wp-content/uploads/2025/09/Eurobot2026_Rules_BETA_0.9_FR.pdf',
        colors: {
            primary: colors.lightBlue.darken3,
            accent: colors.orange.accent3,
        },
    },
    2025: {
        year: 2025,
        name: 'The Show Must Go On',
        match: false,
        pdfUrl: 'https://www.eurobot.org/wp-content/uploads/2024/10/Eurobot2025_Rules.pdf',
        colors: {
            primary: colors.grey.darken4,
            accent: colors.red.accent4,
        },
    },
    2024: {
        year: 2024,
        name: 'Farming Mars',
        match: false,
        pdfUrl: 'https://www.coupederobotique.fr/wp-content/uploads/Eurobot2024_Rules_CUP_FR_FINAL.pdf',
        // pdfUrl: 'https://www.coupederobotique.fr/wp-content/uploads/AfficheCDFR2024.pdf',
        colors: {
            primary: colors.red.darken2,
            accent: colors.deepPurple.darken3,
        },
    },
    2023: {
        year: 2023,
        name: 'Cherry on the Cake',
        match: false,
        pdfUrl: 'https://www.coupederobotique.fr/wp-content/uploads/Eurobot2023_Rules_FR_FINALE.pdf',
        colors: {
            primary: colors.amber.darken1,
            accent: colors.red.darken3,
        },
    },
    2022: {
        year: 2022,
        name: 'Age of Bots',
        match: false,
        pdfUrl: 'https://www.coupederobotique.fr/wp-content/uploads/Eurobot2022_Rules-FR.pdf',
        colors: {
            primary: colors.yellow.darken3,
            accent: colors.green.darken4,
        },
    },
    2021: {
        year: 2021,
        name: 'Sail the World 2',
        match: false,
        pdfUrl: 'https://www.coupederobotique.fr/wp-content/uploads/E2021_Rules_FR.pdf',
        colors: {
            primary: colors.lightBlue.darken2,
            accent: colors.blueGrey.lighten1,
        },
    },
    2019: {
        year: 2019,
        name: 'Atom Factory',
        match: false,
        pdfUrl: 'https://www.coupederobotique.fr/wp-content/uploads/Eurobot2019_Rules_Cup_OFFICIAL_FR.pdf',
        colors: {
            primary: colors.purple.lighten1,
            accent: colors.yellow.darken3,
        },
    },
    2018: {
        year: 2018,
        name: 'Robot Cities',
        match: false,
        pdfUrl: 'https://www.coupederobotique.fr/wp-content/uploads/C2018_Rules_final_FR.pdf',
        colors: {
            primary: colors.cyan.accent4,
            accent: colors.lightGreen.darken3,
        },
    },
    2017: {
        year: 2017,
        name: 'Moon Village',
        match: false,
        pdfUrl: 'https://www.coupederobotique.fr/wp-content/uploads/2017/03/C2017_Rules_FR_2.1.pdf',
        colors: {
            primary: colors.teal.lighten1,
            accent: colors.yellow.darken1,
        },
    },
};

export const LAST_YEAR = Math.max(...Object.keys(CONTESTS).map(y => +y));
