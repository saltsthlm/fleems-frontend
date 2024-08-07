import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { ClientInfoDto, TableTask, Task, Vehicle } from "../types/ApiResponses";

type DataType = Vehicle | ClientInfoDto | Task | TableTask;

interface TableProps {
  data: DataType[];
  callback?: (arg0: DataType) => void;
}

export default function Table({ data, callback }: TableProps) {
  const columnHelper = createColumnHelper<DataType>();
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const replacements: { [key: string]: string } = {
    licenseNumber: "License Number",
    payload: "Payload (kg)",
    height: "Height (m)",
    weight: "Weight (kg)",
    length: "Length (m)",
    distanceDriven: "Distance Driven (km)",
    model: "Model",
    id: "ID",
    contactPerson: "Contact Person",
    contactEmail: "Contact Email",
    contactPhoneNumber: "Contact Number",
    name: "Name",
    startDestination: "Start Destination",
    endDestination: "End Destination",
    dateCreated: "Date Created",
    dateFinished: "Date Finished",
    expectedDistance: "Expected Distance (km)",
    expectedTime: "Expected Time (hours)",
    startDate: "Start Date",
    product: "Product",
    quantity: "Quantity",
    legs: "Legs",
    client: "Client",
    startAddress: "Start Address",
    endAddress: "End Address",
    state: "State",
    legsLength: "No. of legs",
  };

  const columns = Object.keys(data[0] || {})
    .filter((k) => k != "id")
    .map((key) =>
      columnHelper.accessor(key as keyof DataType, {
        cell: (info) => {
          const value = info.getValue();
          if (typeof value === "number" && value > 100) {
            return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })
              .format(value)
              .replace(/,/g, " ");
          }
          return value;
        },

        header: () => <span>{replacements[key]}</span>,
        enableColumnFilter: true,
      })
    );
  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
      columnOrder,
      columnFilters,
      pagination,
    },
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnOrderChange: setColumnOrder,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <div>
      <div className="table_container">
        <div className="flex justify-center">
          <table className="my-auto border">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b text-gray-800 uppercase"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: `${header.getSize()}px` }}
                      className="relative px-4 pr-2 py-4 font-small text-left border"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none flex min-w-[36px]"
                              : "flex min-w-[36px]",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <span className="pl-2">↑</span>,
                            desc: <span className="pl-2">↓</span>,
                          }[header.column.getIsSorted() as string] ?? null}
                          <div
                            {...{
                              onMouseDown: (e) => {
                                e.stopPropagation();
                                header.getResizeHandler()(e);
                              },
                              className: `resizer ${
                                header.column.getIsResizing()
                                  ? "isResizing"
                                  : ""
                              }`,
                            }}
                          />
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b"
                  onClick={
                    callback != undefined
                      ? () => callback(row.original)
                      : () => {}
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`border px-4 pt-[14px] pb-[18px] ${callback && "hover:cursor-pointer"}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex items-center gap-1 mr-2">
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-8 h-6"
            />
          </div>
          <div>
            <select
              className=""
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-4">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1 ml-2"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <span className="flex items-center gap-1 mx-2">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <button
          className="border rounded p-1 mr-2"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
