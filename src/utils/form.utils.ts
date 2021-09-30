export function fromBool(val: boolean): string {
    return val ? '1' : '0';
}

export function toBool(val: string): boolean {
    return val === '1';
}
