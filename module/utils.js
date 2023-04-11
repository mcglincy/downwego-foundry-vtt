export const upperCaseFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const lowerCaseFirst = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const d20Formula = (modifier) => {
  return modifier ? `1d20 + ${modifier}` : "1d20";
}


