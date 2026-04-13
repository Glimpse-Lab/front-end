export const isPasswordValid = (rules) => {
  return Object.values(rules).every(rule => rule === true);
};

export const ruleStyle = (isValid) => ({
  color: isValid ? "#4caf50" : "#666",
  fontWeight: isValid ? "600" : "400",
  transition: "all 0.3s ease"
});