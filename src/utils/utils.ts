export function todefault<X, Y>(x: X, def: Y) {
    return !x ? def : x;
}