const updateStateArray: <T>(arr: T[], idx: number, val: T) => T[] = (
  array,
  idx,
  val
) => {
  const newArray = [...array];
  newArray[idx] = val;
  return newArray;
};
export { updateStateArray };
