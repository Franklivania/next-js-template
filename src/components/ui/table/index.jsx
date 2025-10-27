import PropTypes from "prop-types";
import { TableSkeleton } from "./table-skeleton";
import Image from "next/image";

const Table = ({
  columns,
  data,
  onRowClick,
  isUppercase = true,
  isGray,
  isLoading,
  columnOverrides = {},
  emptyInfo,
  transparentHeader,
}) => {
  // Merge column overrides with original columns
  const mergedColumns = columns.map((col) =>
    columnOverrides[col.key] ? { ...col, ...columnOverrides[col.key] } : col
  );

  const colHeaders = mergedColumns?.map(({ title, key }, indx) => (
    <th
      key={key}
      className={`text-foreground ${isUppercase ? "uppercase" : "capitalize"}`}
    >
      <p
        className={`py-4 px-4 text-base font-medium text-left whitespace-nowrap ${
          mergedColumns?.length - 1 === indx
            ? " flex justify-center items-center"
            : ""
        }`}
      >
        {title}
      </p>
    </th>
  ));

  const tableData =
    data &&
    data.map((rowData, i) => (
      <tr
        onClick={() => onRowClick && onRowClick(rowData)}
        key={`row-${i}`}
        className={`${
          onRowClick ? "cursor-pointer hover:bg-accent/50" : "cursor-default"
        } group border-b border-border ${isGray && "bg-card mt-3"}`}
      >
        {mergedColumns.map(({ render, key }, id) => (
          <td
            key={`data-${i}-${id}`}
            className={`py-4 px-4 text-[16px] ${
              mergedColumns?.length - 1 === id
                ? " flex justify-center items-center"
                : ""
            }`}
          >
            {render ? render(rowData, i) : rowData[key] || "-"}
          </td>
        ))}
      </tr>
    ));

  const emptyStateRow = (
    <tr>
      <td
        colSpan={mergedColumns?.length}
        className="py-4 px-6 text-center text-lg text-muted-foreground"
      >
        <div className="flex justify-center items-center flex-col w-full">
          <Image
            src="images/empty-table.svg"
            alt="Empty Table"
            width={0}
            height={0}
            className="w-96 h-96 object-contain"
          />
          <p className="text-xl text-foreground font-semibold text-center mb-3">
            No Data Available
          </p>
          <p className="text-sm text-muted-foreground font-normal text-center">
            {emptyInfo ? (
              emptyInfo
            ) : (
              <>
                <Image
                  src="images/empty-table.svg"
                  alt="Empty Table"
                  width={0}
                  height={0}
                  className="w-96 h-96 object-contain"
                />
                Nothing to show here yet!
              </>
            )}
          </p>
        </div>
      </td>
    </tr>
  );

  // Loading state now handled by TableSkeleton component

  // Show skeleton loader when loading
  if (isLoading) {
    return (
      <TableSkeleton
        columns={mergedColumns}
        rows={5}
        transparentHeader={transparentHeader}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full w-full text-sm border-collapse">
        <thead>
          <tr
            className={`rounded-md ${transparentHeader ? "bg-transparent" : "bg-muted"}`}
          >
            {colHeaders}
          </tr>
        </thead>
        <tbody className="bg-card">
          {data && data.length ? tableData : emptyStateRow}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  isUppercase: PropTypes.bool.isRequired,
  isGray: PropTypes.bool,
  emptyInfo: PropTypes.node,
  transparentHeader: PropTypes.bool,
  columnOverrides: PropTypes.object, // Added to support prop validation
};

export default Table;
