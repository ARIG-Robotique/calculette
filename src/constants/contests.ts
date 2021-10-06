export interface Contest {
    year: number;
    name: string;
}

export const CONTESTS: Record<string, Contest> = {
    2022: {
        year: 2022,
        name: 'Age of Bots',
    },
    2021: {
        year: 2021,
        name: 'Sail the World 2',
    },
    2019: {
        year: 2019,
        name: 'Atom Factory',
    },
};
