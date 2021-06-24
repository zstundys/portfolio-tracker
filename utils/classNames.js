export const classNames = {
  /**
   * @param {*} value
   */
  winLoss(value) {
    return typeof value === "number" && value < 0
      ? "text-danger text-end"
      : "text-success text-end";
  },

  /**
   * @param {*} value
   */
  number(value) {
    return typeof value === "number" ? "text-end" : undefined;
  },
};
