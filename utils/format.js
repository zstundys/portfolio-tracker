export const format = {
  /**
   * @param {number | null} value
   * @returns {string | null}
   */
  percent(value) {
    if (typeof value === "number") {
      return `${this.decimal(value * 100, 2)}%`;
    }

    return null;
  },

  /**
   * @param {number | null} value
   * @returns {string | null}
   */
  currency(value) {
    if (typeof value === "number") {
      const sign = value < 0 ? "-" : "";

      return `${sign}$${this.decimal(Math.abs(value), 2)}`;
    }

    return null;
  },

  /**
   *
   * @param {number | null} value
   * @param {number} precision
   * @returns {string | null}
   */
  decimal(value, precision = 2) {
    if (typeof value === "number") {
      return value.toFixed(precision);
    }

    return null;
  },
};
