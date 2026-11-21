/** "We need to [make a decision]." → ["We need to ", "make a decision", "."] (odd indexes are the phrase). */
export const splitExample = (example: string) => example.split(/\[|\]/);

export const plainExample = (example: string) => example.replace(/\[|\]/g, "");

/** Lowercase, no Vietnamese tone marks, so "quyet dinh" finds "quyết định". */
export const foldText = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
