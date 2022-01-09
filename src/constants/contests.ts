export interface Contest {
    year: number;
    name: string;
    themeColor: string,
}

export const CONTESTS: Record<string, Contest> = {
    2022: {
        year: 2022,
        name: 'Age of Bots',
        themeColor: '#f9a825',
    },
    2021: {
        year: 2021,
        name: 'Sail the World 2',
        themeColor: '#0288d1',
    },
    2019: {
        year: 2019,
        name: 'Atom Factory',
        themeColor: '#ab47bc',
    },
    2018: {
        year: 2018,
        name: 'Robot Cities',
        themeColor: '#00b8d4',
    },
    2017: {
        year: 2017,
        name: 'Moon Village',
        themeColor: '#26a69a',
    },
};
