export type PageData<T> = {
    defaultForm(): T;
    parseForm(c: string): T;
    serializeForm(f: T): string;
    compute(f: T): { subtotal: number, bonus: number, total: number };
};
