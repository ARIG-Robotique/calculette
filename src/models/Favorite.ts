export interface Favorite {
    name: string;
    total: number;
    subtotal: number;
    form: Record<string, number | boolean>;
}
