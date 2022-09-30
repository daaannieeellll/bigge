const validateSet = ({ name, types, probabilities, colors }: any) =>
  typeof name === "string" &&
  Array.isArray(types) &&
  Array.isArray(probabilities) &&
  Array.isArray(colors) &&
  types.every((t: any) => typeof t === "string") &&
  probabilities.every((p: any) => typeof p === "number") &&
  colors.every((c: any) => typeof c === "string");

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

const removeUndefined = (obj: any) => {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj;
};

export { validateSet, validateSubSet, removeUndefined };
