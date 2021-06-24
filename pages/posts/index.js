import { api } from "@/utils/api";
import { classNames as c } from "@/utils/classNames";
import { format } from "@/utils/format";

/** @type {import("next").GetServerSideProps} */
export async function getServerSideProps() {
  return {
    props: { data: await api.holdings() },
  };
}

/**
 * @param {{ data: HoldingRows }} props
 */
export default function Posts(props) {
  if (!props.data) {
    return <></>;
  }

  const { columns, items } = props.data;

  return (
    <table className="table  table-striped table-hover table-bordered   shadow-lg rounded overflow-hidden my-5  mx-auto ">
      <caption className="caption-top h1 text-center sticky-top bg-white m-0">
        Holdings
      </caption>
      <thead>
        <tr>
          {columns.map((c) => (
            <th scope="col" key={c.field}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((row, i) => (
          <tr key={i}>
            <td>{row.stock}</td>
            <td>{row.units}</td>
            <td>{format.currency(row.invested)}</td>
            <td>{format.currency(row.marketPrice)}</td>
            <td className={c.winLoss(row.plPrice)}>
              {format.currency(row.plPrice)}
            </td>
            <td className={c.winLoss(row.plPercent)}>
              {format.percent(row.plPercent)}
            </td>
            <td className={c.number(row.eps)}>{format.currency(row.eps)}</td>
            <td className={c.number(row.pe)}>{format.decimal(row.pe)}</td>
            <td className={c.number(row.beta)}>{format.decimal(row.beta)}</td>
            <td className={c.number(row.yield)}>{format.percent(row.yield)}</td>
            <td className={c.number(row.dividendIncome)}>
              {format.currency(row.dividendIncome)}
            </td>
            <td>{row.sector}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
