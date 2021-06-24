declare interface TableData<T = any[], C = string> {
  columns: C[];
  items: T[];
}

declare interface TableColumn<T> {
  field: keyof T;
  label: string;
}

declare interface HoldingRow {
  stock: string;
  sector: string;
  units: number | null;
  invested: number | null;
  marketPrice: number | null;
  plPrice: number | null;
  plPercent: number | null;
  eps: number | null;
  pe: number | null;
  beta: number | null;
  yield: number | null;
  dividendIncome: number | null;
}

declare interface HoldingRows
  extends TableData<HoldingRow, TableColumn<HoldingRow>> {}
