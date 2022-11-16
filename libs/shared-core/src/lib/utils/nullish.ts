// a short hand function to replace a === null ? a : b
export const nullish = <T>(object: T, fallback: T | null = null) =>
    object !== null ? object : fallback;
