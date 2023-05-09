import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
  FilterFn,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useCallback, useMemo, useState } from "react";
import {
  MdAdd,
  MdAutorenew,
  MdClose,
  MdContentCopy,
  MdExpandMore,
  MdFilterList,
  MdGridView,
  MdMoreVert,
  MdOpenInNew,
  MdOutlineViewColumn,
  MdSort,
  MdStore,
} from "react-icons/md";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import { Seller } from "@/types/sellers";
import copyToClipboard from "@/utils/copyToClipboard";
import { v4 as uuidV4 } from "uuid";
import { useInfiniteQuery } from "@tanstack/react-query";
import supabaseClient from "@/libs/supabaseClient";
import CircularProgress from "@/components/CircularProgress";
import { FilterOperator } from "@/types/FilterOperator";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const columnHelper = createColumnHelper<Seller>();

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

const fetchSellers = async (
  pageParam: number,
  filters: Filter[],
  orders: Sort[]
) => {
  const list = supabaseClient.from("sellers").select("*", { count: "exact" });
  orders.forEach((item) =>
    list.order(item.columnName, { ascending: item.ascending })
  );
  filters.forEach((filter) => {
    if (filter.query.trim() !== "")
      list.filter(filter.columnName, filter.operator, filter.query);
  });
  const pageLimit = 30;
  const from = pageParam * pageLimit;
  const to = from + pageLimit - 1;
  const { data, error, count } = await list.range(from, to);
  if (error) {
    throw error;
  }
  return { data, count };
};

const COLUMN_NAME_TO_LABEL: Record<ColumnName, string> = {
  id: "ID",
  created_at: "Created At",
  updated_at: "Updated At",
  name: "Name",
  estimate_sales: "Estimate Sales",
  latitude: "Latitude",
  longitude: "Longitude",
};

export default function SellerTable({
  onItemClick,
}: {
  onItemClick: (seller: Seller) => void;
}) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [orders, setOrders] = useState<Sort[]>([]);
  const [columnNames, setColumnNames] = useState<ColumnName[]>(COLUMN_NAMES);

  const {
    data,
    isLoading,
    isRefetching,
    isError,
    error,
    refetch,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    [
      "sellers",
      filters
        .map(
          (item) =>
            `${item.id}-${item.columnName}-${item.operator}-${item.query}`
        )
        .join("--"),
      orders
        .map(
          (item) =>
            `${item.id}-${item.columnName}-${item.ascending ? "asc" : "desc"}`
        )
        .join("--"),
    ],
    ({ pageParam = 0 }) => fetchSellers(pageParam, filters, orders),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      getNextPageParam: (_lastPage, allPage) => allPage.length,
      keepPreviousData: true,
    }
  );

  const sellers = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data?.pages]
  );

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white">
      <header className="flex items-center gap-4 overflow-x-auto border-b border-slate-200 px-4 py-2">
        <div className="flex flex-1 items-center gap-2">
          <FilterButton value={filters} onChange={setFilters} />
          <SortButton value={orders} onChange={setOrders} />

          <ColumnsButton value={columnNames} onChange={setColumnNames} />

          <button
            className={clsx(
              "flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-slate-600 hover:border-slate-300 hover:text-slate-900 disabled:opacity-50"
            )}
            disabled={isRefetching || isLoading}
            onClick={() => refetch()}
          >
            <MdAutorenew
              className={clsx(
                "text-2xl md:-ml-1",
                isRefetching ? "animate-spin" : ""
              )}
            />
            <span className="max-md:hidden">Refresh</span>
          </button>
        </div>
      </header>

      {isLoading ? (
        <div className="mx-auto my-16 w-fit">
          <CircularProgress />
        </div>
      ) : isError ? (
        <p>Something went wrong!</p>
      ) : (
        <TableComponent
          data={sellers}
          onItemClick={onItemClick}
          columnNames={columnNames}
          fetchNextPage={() => fetchNextPage()}
          isFetching={isFetching}
          totalRows={data.pages[0].count || 0}
        />
      )}
    </div>
  );
}

const TableComponent = ({
  data,
  onItemClick,
  columnNames,
  fetchNextPage,
  isFetching,
  totalRows,
}: {
  data: Seller[];
  onItemClick: (seller: Seller) => void;
  columnNames: ColumnName[];
  fetchNextPage: () => void;
  isFetching: boolean;
  totalRows: number;
}) => {
  const totalFetched = useMemo(() => data.length, [data.length]);

  const columns = useMemo(
    () => [
      ...[...columnNames]
        .sort((a, b) => a.localeCompare(b))
        .sort((a, b) => (b === "name" ? 1 : -1))
        .map((columnName) =>
          columnHelper.accessor(columnName, {
            cell: (info) => info.getValue(),
            header: COLUMN_NAME_TO_LABEL[columnName],
            size: 300,
          })
        ),
      columnHelper.accessor(() => "column_1", {
        cell: () => "Test Data",
        header: "Test Column 1",
        size: 300,
      }),
      columnHelper.accessor(() => "column_2", {
        cell: () => "Test Data",
        header: "Test Column 2",
        size: 300,
      }),
      columnHelper.accessor(() => "column_3", {
        cell: () => "Test Data",
        header: "Test Column 3",
        size: 300,
      }),
      columnHelper.accessor(() => "column_4", {
        cell: () => "Test Data",
        header: "Test Column 4",
        size: 300,
      }),
      columnHelper.accessor(() => "column_5", {
        cell: () => "Test Data",
        header: "Test Column 5",
        size: 300,
      }),
      columnHelper.accessor(() => "column_6", {
        cell: () => "Test Data",
        header: "Test Column 6",
        size: 300,
      }),
    ],
    [columnNames]
  );

  const table = useReactTable({
    columns,
    data: data,
    columnResizeMode: "onChange",
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 300 &&
          !isFetching &&
          totalFetched < totalRows
        ) {
          fetchNextPage();
        }
      }
    },
    [isFetching, totalFetched, totalRows, fetchNextPage]
  );

  return (
    <div
      className="relative flex-1 overflow-auto"
      onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
    >
      <table
        className="h-full w-full border-collapse"
        style={{ width: table.getCenterTotalSize() }}
      >
        <thead className="sticky top-0 z-20">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="flex w-fit">
              <th className="sticky left-0 z-10 w-10 border-b border-r border-slate-200 bg-slate-100"></th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={clsx(
                    "relative flex items-center gap-2 border-b border-slate-200 bg-slate-100 p-2 font-semibold",
                    header.id === "name"
                      ? "sticky left-10 z-10 border-r-2"
                      : "border-r"
                  )}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize() }}
                >
                  <p className="flex-1 truncate">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </p>
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
              <td className="sticky left-0 z-10 flex w-10 items-center justify-center border-b border-r border-slate-200 bg-white">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      title="Menu"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-xl text-slate-400 hover:text-slate-900"
                    >
                      <MdMoreVert />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      align="start"
                      side="bottom"
                      className="z-50 min-w-[200px] rounded-lg bg-white py-2 shadow-xl ring-1 ring-slate-200"
                    >
                      <DropdownMenu.Item asChild>
                        <button
                          onClick={() => onItemClick(row.original)}
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
                        >
                          <MdGridView className="text-2xl" />
                          View Details
                        </button>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <Link
                          target="_blank"
                          href={`https://amazon.com/sp?seller=A10111992WJRYRFBZH9IS`}
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
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
                <ContextMenu.Root key={cell.id}>
                  <ContextMenu.Trigger asChild>
                    <td
                      className={clsx(
                        "flex items-center border-b border-slate-200 bg-white p-2",
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
                  </ContextMenu.Trigger>
                  <ContextMenu.Portal>
                    <ContextMenu.Content className="z-50 min-w-[200px] rounded-lg bg-white py-2 shadow-xl ring-1 ring-slate-200">
                      <ContextMenu.Item asChild>
                        <button
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
                          onClick={() =>
                            copyToClipboard(cell.getValue()?.toString() || "")
                          }
                        >
                          <MdContentCopy className="text-xl" />
                          Copy
                        </button>
                      </ContextMenu.Item>
                      <ContextMenu.Separator className="my-2 h-px bg-slate-200" />
                      <ContextMenu.Item asChild>
                        <button
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
                          onClick={() => onItemClick(row.original)}
                        >
                          <MdGridView className="text-xl" />
                          View details
                        </button>
                      </ContextMenu.Item>
                      <ContextMenu.Item asChild>
                        <Link
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
                          target="_blank"
                          href={`https://amazon.com/sp?seller=A10111992WJRYRFBZH9IS`}
                        >
                          <MdStore className="text-xl" />
                          <p className="flex-1">Storefront</p>
                          <MdOpenInNew className="text-xl" />
                        </Link>
                      </ContextMenu.Item>
                    </ContextMenu.Content>
                  </ContextMenu.Portal>
                </ContextMenu.Root>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type ColumnName = keyof Seller;
type Filter = {
  id: string;
  columnName: ColumnName;
  query: string;
  operator: string;
};

type Sort = {
  id: string;
  columnName: ColumnName;
  ascending: boolean;
};

const COLUMN_NAMES: ColumnName[] = ["id", "name", "estimate_sales"];
const OPERATORS: FilterOperator[] = [
  "eq",
  "neq",
  "gt",
  "gte",
  "lt",
  "lte",
  "like",
  "ilike",
  "is",
  "in",
  "cs",
  "cd",
  "sl",
  "sr",
  "nxl",
  "nxr",
  "adj",
  "ov",
  "fts",
  "plfts",
  "phfts",
  "wfts",
];

const FilterButton = ({
  value,
  onChange,
}: {
  value: Filter[];
  onChange: (filters: Filter[]) => void;
}) => {
  const [filters, setFilters] = useState<Filter[]>(value);

  const addNewFilter = useCallback(() => {
    const filter: Filter = {
      id: uuidV4(),
      columnName: "id",
      operator: "eq",
      query: "",
    };
    setFilters((filters) => [...filters, filter]);
  }, []);

  const removeFilter = useCallback((id: string) => {
    setFilters((filters) => filters.filter((item) => item.id !== id));
  }, []);

  const onApply = useCallback(() => {
    onChange(filters);
  }, [filters, onChange]);

  return (
    <Popover.Root onOpenChange={() => setFilters(value)}>
      <Popover.Trigger asChild>
        <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-slate-600 hover:border-slate-300 hover:text-slate-900">
          <MdFilterList className="text-2xl md:-ml-1" />
          <span className="max-md:hidden">
            {value.length
              ? `Filtered by ${value.length} rule${value.length > 1 ? "s" : ""}`
              : "Filter"}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          className="z-50 w-screen max-w-[512px] rounded-lg bg-white shadow-xl ring-1 ring-slate-200"
        >
          {filters.length ? (
            <div className="space-y-2 p-2">
              {filters.map((filter) => (
                <div key={filter.id} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <select
                      value={filter.columnName}
                      onChange={(e) => {
                        const value = e.currentTarget.value as ColumnName;
                        setFilters((filters) =>
                          filters.map((item) =>
                            item.id === filter.id
                              ? { ...item, columnName: value }
                              : item
                          )
                        );
                      }}
                      className="flex h-10 w-full cursor-pointer appearance-none items-center gap-2 truncate rounded-lg border border-slate-200 pl-4 pr-6 text-start text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    >
                      {COLUMN_NAMES.map((item) => (
                        <option key={item} value={item}>
                          {COLUMN_NAME_TO_LABEL[item]}
                        </option>
                      ))}
                    </select>
                    <MdExpandMore className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xl" />
                  </div>
                  <div className="relative">
                    <select
                      value={filter.operator}
                      onChange={(e) => {
                        const value = e.currentTarget.value;
                        setFilters((filters) =>
                          filters.map((item) =>
                            item.id === filter.id
                              ? { ...item, operator: value }
                              : item
                          )
                        );
                      }}
                      className="flex h-10 w-full cursor-pointer appearance-none items-center gap-2 truncate rounded-lg border border-slate-200 pl-4 pr-6 text-start text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    >
                      {OPERATORS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <MdExpandMore className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xl" />
                  </div>
                  <input
                    type="text"
                    value={filter.query}
                    onChange={(e) => {
                      const value = e.currentTarget.value;
                      setFilters((filters) =>
                        filters.map((item) =>
                          item.id === filter.id
                            ? { ...item, query: value }
                            : item
                        )
                      );
                    }}
                    placeholder="Enter a value"
                    className="h-10 w-40 min-w-0 max-w-none rounded-lg border border-slate-200 px-4"
                  />
                  <button
                    className="flex h-10 w-10 items-center justify-center gap-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    onClick={() => removeFilter(filter.id)}
                  >
                    <MdClose className="text-xl" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2">
              <div className="p-2">
                <p className="text-lg font-medium text-slate-600">
                  No filters applied to this table
                </p>
                <p className="text-slate-400">
                  Add a column below to filter the table
                </p>
              </div>
            </div>
          )}
          <footer className="flex items-center justify-between gap-4 border-t border-slate-200 p-2">
            <button
              className="flex h-10 items-center gap-2 rounded-lg px-4 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              onClick={addNewFilter}
            >
              <MdAdd className="-ml-1 text-xl" />
              Add Filter
            </button>
            <Popover.Close asChild>
              <button
                disabled={filters === value}
                onClick={onApply}
                className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-slate-600 hover:border-slate-300 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-50"
              >
                Apply Filter
              </button>
            </Popover.Close>
          </footer>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const SortButton = ({
  value,
  onChange,
}: {
  value: Sort[];
  onChange: (value: Sort[]) => void;
}) => {
  const [sorts, setSorts] = useState<Sort[]>(value);
  const availableColumns = useMemo(
    () =>
      COLUMN_NAMES.filter(
        (id) => sorts.findIndex((item) => item.columnName === id) === -1
      ),
    [sorts]
  );

  const addNewSort = useCallback((column: ColumnName) => {
    const sort: Sort = {
      id: uuidV4(),
      columnName: column,
      ascending: true,
    };
    setSorts((items) => [...items, sort]);
  }, []);

  const removeSort = useCallback((id: string) => {
    setSorts((items) => items.filter((item) => item.id !== id));
  }, []);

  const onApply = useCallback(() => {
    onChange(sorts);
  }, [sorts, onChange]);

  return (
    <Popover.Root onOpenChange={() => setSorts(value)}>
      <Popover.Trigger asChild>
        <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-slate-600 hover:border-slate-300 hover:text-slate-900">
          <MdSort className="text-2xl md:-ml-1" />
          <span className="max-md:hidden">
            {value.length
              ? `Sorted by ${value.length} rule${value.length > 1 ? "s" : ""}`
              : "Sort"}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          className="z-50 w-screen max-w-[512px] rounded-lg bg-white shadow-xl ring-1 ring-slate-200"
        >
          {sorts.length ? (
            <div className="space-y-2 p-2">
              {sorts.map((order) => (
                <div key={order.id} className="flex items-center gap-2">
                  <p className="flex-1 px-2">
                    <span className="text-slate-600">Sort by: </span>
                    <span className="font-medium text-slate-900">
                      {COLUMN_NAME_TO_LABEL[order.columnName]}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
                    <p className="text-slate-600">Ascending: </p>
                    <button
                      onClick={() => {
                        setSorts((orders) =>
                          orders.map((item) =>
                            item.id === order.id
                              ? { ...item, ascending: !order.ascending }
                              : item
                          )
                        );
                      }}
                      className={clsx(
                        "relative h-7 w-12 rounded-full transition-colors",
                        order.ascending ? "bg-primary-500" : "bg-slate-200"
                      )}
                    >
                      <div
                        className={clsx(
                          "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-[left,color]",
                          order.ascending
                            ? "left-6 bg-white"
                            : "left-1 bg-slate-400"
                        )}
                      />
                    </button>
                  </div>
                  <button
                    className="flex h-10 w-10 items-center justify-center gap-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    onClick={() => removeSort(order.id)}
                  >
                    <MdClose className="text-xl" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2">
              <div className="p-2">
                <p className="text-lg font-medium text-slate-600">
                  No sorts applied to this table
                </p>
                <p className="text-slate-400">
                  Add a column below to sort the table
                </p>
              </div>
            </div>
          )}
          <footer className="flex items-center justify-between gap-4 border-t border-slate-200 p-2">
            {availableColumns.length ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-slate-600 hover:border-slate-300 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-50">
                    Pick a column to sort by
                    <MdExpandMore className="-mr-1 text-xl" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    align="start"
                    side="bottom"
                    className="z-50 min-w-[200px] rounded-lg bg-white py-2 shadow-xl ring-1 ring-slate-200"
                  >
                    {availableColumns.map((column) => (
                      <DropdownMenu.Item asChild key={column}>
                        <button
                          onClick={() => addNewSort(column)}
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
                        >
                          {COLUMN_NAME_TO_LABEL[column]}
                        </button>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <p className="px-2 text-slate-600">All columns have been added</p>
            )}

            <Popover.Close asChild>
              <button
                disabled={sorts === value}
                onClick={onApply}
                className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-slate-600 hover:border-slate-300 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-50"
              >
                Apply Sort
              </button>
            </Popover.Close>
          </footer>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const ColumnsButton = ({
  value,
  onChange,
}: {
  value: ColumnName[];
  onChange: (value: ColumnName[]) => void;
}) => {
  const [columns, setColumns] = useState<ColumnName[]>(value);

  const onApply = useCallback(() => {
    onChange(columns);
  }, [columns, onChange]);

  return (
    <Popover.Root onOpenChange={() => setColumns(value)}>
      <Popover.Trigger asChild>
        <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-slate-600 hover:border-slate-300 hover:text-slate-900">
          <MdOutlineViewColumn className="text-2xl md:-ml-1" />
          <span className="max-md:hidden">Columns</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          className="z-50 w-screen max-w-[320px] rounded-lg bg-white shadow-xl ring-1 ring-slate-200"
        >
          <div className="p-2">
            <p className="mb-2 pl-2 text-slate-400">Hide or show columns</p>
            <div className="space-y-2 ">
              {COLUMN_NAMES.map((columnName) => {
                const isActive = columns.includes(columnName);
                return (
                  <div key={columnName} className="flex items-center gap-2">
                    <p className="flex-1 truncate px-2 text-slate-900">
                      {COLUMN_NAME_TO_LABEL[columnName]}
                    </p>

                    <div className="flex items-center gap-2">
                      <p className="text-slate-600">Show: </p>
                      <button
                        onClick={() => {
                          setColumns((items) =>
                            isActive
                              ? items.filter((item) => item !== columnName)
                              : [...items, columnName]
                          );
                        }}
                        className={clsx(
                          "relative h-7 w-12 rounded-full transition-colors",
                          isActive ? "bg-primary-500" : "bg-slate-200"
                        )}
                      >
                        <div
                          className={clsx(
                            "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-[left,color]",
                            isActive ? "left-6 bg-white" : "left-1 bg-slate-400"
                          )}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <footer className="flex items-center justify-between gap-4 border-t border-slate-200 p-2">
            <div className="flex-1"></div>

            <Popover.Close asChild>
              <button
                disabled={columns === value}
                onClick={onApply}
                className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-slate-600 hover:border-slate-300 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-50"
              >
                Apply
              </button>
            </Popover.Close>
          </footer>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
