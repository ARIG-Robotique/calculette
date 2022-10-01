export interface Contest {
    year: number;
    name: string;
    themeColor: string;
    match: boolean;
}

export const CONTESTS: Record<string, Contest> = {
    2023: {
        year: 2023,
        name: 'Cherry on the Cake',
        themeColor: '#c62828',
        match: false,
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
