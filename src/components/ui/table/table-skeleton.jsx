import { Skeleton } from "../skeleton";

/**
 * TableSkeleton - A skeleton loader specifically designed for table components
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions to match table structure
 * @param {number} props.rows - Number of skeleton rows to display (default: 5)
 * @param {boolean} props.transparentHeader - Whether header should be transparent
 */
export function TableSkeleton({
  columns = [],
  rows = 5,
  transparentHeader = false,
}) {
  // Create skeleton header cells based on columns
  const headerCells = columns.map((col, index) => (
    <th key={`header-skeleton-${index}`} className="text-left">
      <div className="py-4 px-4">
        <Skeleton className="h-4 w-20" />
      </div>
    </th>
  ));

  // Create skeleton data rows
  const skeletonRows = Array.from({ length: rows }, (_, rowIndex) => (
    <tr key={`skeleton-row-${rowIndex}`} className="border-b border-border">
      {columns.map((col, colIndex) => (
        <td key={`skeleton-cell-${rowIndex}-${colIndex}`} className="py-4 px-4">
          {/* Vary skeleton widths for more realistic appearance */}
          <Skeleton
            className={`h-4 ${
              colIndex === 0
                ? "w-32"
                : colIndex === columns.length - 1
                  ? "w-16"
                  : "w-24"
            }`}
          />
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full w-full text-sm border-collapse">
        <thead>
          <tr
            className={`rounded-md ${transparentHeader ? "bg-transparent" : "bg-muted"}`}
          >
            {headerCells}
          </tr>
        </thead>
        <tbody className="bg-card">{skeletonRows}</tbody>
      </table>
    </div>
  );
}

/**
 * TableRowSkeleton - Individual table row skeleton for incremental loading
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions
 */
export function TableRowSkeleton({ columns = [] }) {
  return (
    <tr className="border-b border-border animate-pulse">
      {columns.map((col, index) => (
        <td key={`row-skeleton-${index}`} className="py-4 px-4">
          <Skeleton
            className={`h-4 ${
              index === 0
                ? "w-32"
                : index === columns.length - 1
                  ? "w-16"
                  : "w-24"
            }`}
          />
        </td>
      ))}
    </tr>
  );
}
