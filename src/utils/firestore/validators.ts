const removeUndefined = (obj: any) => {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj;
};

const validateSet = ({ name, types, probabilities, colors, cards }: any) =>
  typeof name === "string" &&
  Array.isArray(types) &&
  Array.isArray(probabilities) &&
  Array.isArray(colors) &&
  Array.isArray(cards) &&
  types.length === probabilities.length &&
  types.length === colors.length &&
  types.length === cards.length &&
  types.every((t) => typeof t === "string") &&
  probabilities.every((p) => typeof p === "number") &&
  colors.every((c) => typeof c === "string") &&
  (probabilities.reduce((a, b) => a + b) as number).toFixed(2) === "1.00";

const validateSubSet = ({ name, types, probabilities, colors }: any) => {
  if (
    typeof name === "undefined" &&
    typeof types === "undefined" &&
    typeof probabilities === "undefined" &&
    typeof colors === "undefined"
  )
    return false;
  return (
    (typeof name === "undefined" || typeof name === "string") &&
    (typeof types === "undefined" ||
      (Array.isArray(types) &&
        types.every((t: any) => typeof t === "string"))) &&
    (typeof probabilities === "undefined" ||
      (Array.isArray(probabilities) &&
        probabilities.every((p: any) => typeof p === "number"))) &&
    (typeof colors === "undefined" ||
      (Array.isArray(colors) &&
        colors.every((c: any) => typeof c === "string")))
  );
};

const validateCards = (data: any) => {
  const { cards, types } = data;

  // Check if cards is an array of string arrays
  if (!Array.isArray(cards)) return false;
  for (let type of cards) {
    if (!Array.isArray(type)) return false;
    for (let card of type) if (typeof card !== "string") return false;
  }
  if (cards.length !== types.length) return false;

  return true;
};

export { removeUndefined, validateSet, validateSubSet, validateCards };
