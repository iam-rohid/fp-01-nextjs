import { Database } from "@/types/database";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
  ColumnFiltersState,
  FilterFn,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useState } from "react";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdFilterList,
  MdFirstPage,
  MdGridView,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdLastPage,
  MdMoreVert,
  MdOpenInNew,
  MdOutlineViewColumn,
  MdSearch,
  MdStore,
} from "react-icons/md";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

type Seller = Database["public"]["Tables"]["sellers"]["Row"];
const columnHelper = createColumnHelper<Seller>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Seller",
    size: 300,
  }),
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "Seller Id",
    size: 200,
  }),
  columnHelper.accessor("estimate_sales", {
    cell: (info) => `$${info.getValue()?.toLocaleString()}`,
    header: "Monthly Sales",
    size: 280,
  }),
  columnHelper.accessor(() => "column_1", {
    cell: (info) => "Example Data",
    header: "Column 1",
    size: 300,
  }),
  columnHelper.accessor(() => "column_2", {
    cell: (info) => "Example Data",
    header: "Column 2",
    size: 300,
  }),
  columnHelper.accessor(() => "column_3", {
    cell: (info) => "Example Data",
    header: "Column 3",
    size: 300,
  }),
  columnHelper.accessor(() => "column_4", {
    cell: (info) => "Example Data",
    header: "Column 4",
    size: 300,
  }),
  columnHelper.accessor(() => "column_5", {
    cell: (info) => "Example Data",
    header: "Column 5",
    size: 300,
  }),
  columnHelper.accessor(() => "column_6", {
    cell: (info) => "Example Data",
    header: "Column 6",
    size: 300,
  }),
];

const fuzzyFilter: FilterFn<Seller> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export default function SellerTable({
  sellers,
  onItemClick,
}: {
  sellers: Seller[];
  onItemClick: (seller: Seller) => void;
}) {
  const [data, setData] = useState([...sellers]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    columns,
    data,
    columnResizeMode: "onChange",
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    initialState: {
      pagination: {
        pageSize: 30,
      },
    },
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white">
      <header className="flex h-14 items-center gap-4 border-b border-slate-200 px-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative max-w-sm flex-1">
            <input
              type="text"
              className="h-10 w-full rounded-lg border border-slate-200 pl-10 pr-4 hover:border-slate-300"
              placeholder="Search all columns..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.currentTarget.value)}
            />
            <MdSearch className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-2xl text-slate-400" />
          </div>

          <button className="flex h-10 items-center rounded-lg border border-slate-200 px-4 text-slate-600 hover:border-slate-300 hover:text-slate-900">
            <MdFilterList className="-ml-1 mr-2 text-2xl" />
            Filters
          </button>
          <button className="flex h-10 items-center rounded-lg border border-slate-200 px-4 text-slate-600 hover:border-slate-300 hover:text-slate-900">
            <MdOutlineViewColumn className="-ml-1 mr-2 text-2xl" />
            Columns
          </button>
        </div>

        <div className="flex items-center">
          <button
            className="flex h-8 w-8 items-center justify-center text-2xl text-slate-600 hover:text-slate-900 disabled:text-slate-400"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            title="Go to first page"
          >
            <MdFirstPage />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center text-2xl text-slate-600 hover:text-slate-900 disabled:text-slate-400"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            title="Go to preious page"
          >
            <MdKeyboardArrowLeft />
          </button>
          <p className="mx-1 flex items-center gap-1 text-slate-600">
            <div>Page</div>
            <span className="font-medium text-slate-900">
              {table.getState().pagination.pageIndex + 1}
            </span>
            of{" "}
            <span className="font-medium text-slate-900">
              {table.getPageCount()}
            </span>
          </p>
          <button
            className="flex h-8 w-8 items-center justify-center text-2xl text-slate-600 hover:text-slate-900 disabled:text-slate-400"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            title="Go to next page"
          >
            <MdKeyboardArrowRight />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center text-2xl text-slate-600 hover:text-slate-900 disabled:text-slate-400"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            title="Go to last page"
          >
            <MdLastPage />
          </button>
        </div>
      </header>

      <div className="relative flex-1 overflow-auto">
        <table
          className="h-full w-full border-collapse"
          style={{ width: table.getCenterTotalSize() }}
        >
          <thead className="sticky top-0 z-20 [&_.resizer]:hover:opacity-100 [&_th]:hover:border-r">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="flex w-fit">
                <th className="sticky left-0 z-10 w-10 border-b border-r border-slate-200 bg-slate-100"></th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={clsx(
                      "relative flex cursor-pointer items-center gap-2 truncate border-b border-slate-200 bg-slate-100 p-2 font-semibold",
                      header.id === "name"
                        ? "sticky left-10 z-10 border-r-2"
                        : "border-r"
                    )}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <p className="flex-1 truncate">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </p>
                    {{
                      asc: (
                        <MdArrowUpward
                          title="Ascending"
                          className="text-xl text-slate-600"
                        />
                      ),
                      desc: (
                        <MdArrowDownward
                          title="Descending"
                          className="text-xl text-slate-600"
                        />
                      ),
                    }[header.column.getIsSorted() as string] ?? null}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={clsx(
                        "resizer absolute -right-px top-0 h-full w-2 cursor-col-resize touch-none select-none opacity-0"
                      )}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="flex w-fit [&_td]:hover:bg-slate-100">
                <td className="sticky left-0 z-10 w-10 border-b border-r border-slate-200 bg-white">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button
                        title="Menu"
                        className="flex h-full w-full items-center justify-center text-xl text-slate-400 hover:text-slate-900"
                      >
                        <MdMoreVert />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        align="start"
                        side="bottom"
                        className="z-50 rounded-lg bg-white p-1 shadow-xl ring-1 ring-slate-200"
                      >
                        <DropdownMenu.Item asChild>
                          <button
                            onClick={() => onItemClick(row.original)}
                            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
                          >
                            <MdGridView className="text-2xl" />
                            View Details
                          </button>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild>
                          <Link
                            target="_blank"
                            href={`https://amazon.com/sp?seller=A10111992WJRYRFBZH9IS`}
                            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
                          >
                            <MdStore className="text-2xl" />
                            View Storefront
                            <MdOpenInNew className="ml-2 text-xl" />
                          </Link>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={clsx(
                      "flex items-center truncate border-b border-slate-200 bg-white p-2",
                      cell.column.id === "name"
                        ? "sticky left-10 z-10 border-r-2"
                        : "border-r"
                    )}
                    style={{ width: cell.column.getSize() }}
                  >
                    <p className="flex-1 truncate">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
