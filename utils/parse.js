export const parse = {
  /**
   *
   * @param {string} floatString
   * @returns {number | null}
   */
  float(floatString) {
    const result = parseFloat(floatString);

    return Number.isNaN(result) ? null : result;
  },

  /**
   *
   * @param {string} currencyString
   * @returns {number | null}
   */
  currency(currencyString) {
    const amountString = currencyString.replace(/\$/, "");
    return this.float(amountString);
  },

  /**
   *
   * @param {string} percentString
   * @returns {number | null}
   */
  percent(percentString) {
    const value = this.float(percentString.replace(/%$/, ""));

    if (typeof value === "number") {
      return value / 100;
    }

    return null;
  },
};
