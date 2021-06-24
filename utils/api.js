import { google } from "googleapis";
import { parse } from "./parse";

export const api = {
  /**
   * Gets specified range from Google Sheets API
   * @param {string} range
   */
  async range(range) {
    // Auth
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      range,
      spreadsheetId: process.env.SHEET_ID,
    });

    return response.data.values;
  },

  /**
   * Gets specified range with parsed table headers
   * @param {string} rangeWithHeaders
   * @returns {Promise<TableData>}
   */
  async table(rangeWithHeaders) {
    const [header, ...items] = (await this.range(rangeWithHeaders)) ?? [];

    return { columns: header, items };
  },

  /**
   *
   * @returns {Promise<HoldingRows>}
   */
  async holdings() {
    const { columns: header, items } = await this.table("Holdings!A7:Q34");

    return {
      columns: [
        { label: header[0], field: "stock" },
        { label: header[1], field: "units" },
        { label: header[2], field: "invested" },
        { label: header[3], field: "marketPrice" },
        { label: header[4], field: "plPrice" },
        { label: header[5], field: "plPercent" },
        { label: header[11], field: "eps" },
        { label: header[12], field: "pe" },
        { label: header[13], field: "beta" },
        { label: header[14], field: "yield" },
        { label: header[15], field: "dividendIncome" },
        { label: header[16], field: "sector" },
      ],
      items: items.map((row) => {
        const [
          stock,
          units,
          invested,
          marketPrice,
          plPrice,
          plPercent,
          ,
          ,
          ,
          ,
          ,
          eps,
          pe,
          beta,
          dividendYield,
          dividendIncome,
          sector,
        ] = row;

        /** @type {HoldingRow} */
        const holding = {
          sector,
          stock,
          beta: parse.float(beta),
          dividendIncome: parse.currency(dividendIncome),
          eps: parse.currency(eps),
          invested: parse.currency(invested),
          marketPrice: parse.currency(marketPrice),
          pe: parse.currency(pe),
          plPercent: parse.percent(plPercent),
          plPrice: parse.currency(plPrice),
          units: parse.float(units),
          yield: parse.percent(dividendYield),
        };

        return holding;
      }),
    };
  },
};
