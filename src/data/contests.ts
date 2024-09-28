export interface Contest {
    year: number;
    name: string;
    themeColor: string;
    match: boolean;
    pdfUrl?: string;
}

export const CONTESTS: Record<string, Contest> = {
    2025: {
        year: 2025,
        name: 'The Show Must Go On (beta)',
        themeColor: '#212121',
        match: false,
    },
    2024: {
        year: 2024,
        name: 'Farming Mars',
        themeColor: '#d32f2f',
        match: true,
        pdfUrl: 'https://www.coupederobotique.fr/wp-content/uploads/AfficheCDFR2024.pdf',
    },
    2023: {
        year: 2023,
        name: 'Cherry on the Cake',
        themeColor: '#ffb300',
        match: true,
    },
    2022: {
        year: 2022,
        name: 'Age of Bots',
        themeColor: '#f9a825',
        match: true,
    },
    2021: {
        year: 2021,
        name: 'Sail the World 2',
        themeColor: '#0288d1',
        match: false,
    },
    2019: {
        year: 2019,
        name: 'Atom Factory',
        themeColor: '#ab47bc',
        match: false,
    },
    2018: {
        year: 2018,
        name: 'Robot Cities',
        themeColor: '#00b8d4',
        match: false,
    },
    2017: {
        year: 2017,
        name: 'Moon Village',
        themeColor: '#26a69a',
        match: false,
    },
};
