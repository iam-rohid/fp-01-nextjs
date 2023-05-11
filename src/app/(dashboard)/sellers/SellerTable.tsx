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
import Link from "next/link";
import { Seller } from "@/types/sellers";
import copyToClipboard from "@/utils/copyToClipboard";
import { v4 as uuidV4 } from "uuid";
import { useInfiniteQuery } from "@tanstack/react-query";
import supabaseClient from "@/libs/supabaseClient";
import CircularProgress from "@/components/CircularProgress";
import { FilterOperator } from "@/types/FilterOperator";
import { Button } from "@/components/ui/button";
import {
  ArrowDownUpIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ColumnsIcon,
  CopyIcon,
  ExternalLinkIcon,
  LayoutGridIcon,
  ListFilterIcon,
  MoreVerticalIcon,
  PlusIcon,
  RefreshCcwIcon,
  StoreIcon,
  XIcon,
} from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

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
const FILTER_OPERATOR_TO_LABEL: Record<FilterOperator, [string, string]> = {
  eq: ["=", "equals"],
  neq: ["<>", "not equal"],
  gt: [">", "greater than"],
  lt: ["<", "less than"],
  gte: [">=", "greater than or equal"],
  lte: ["<=", "less than or equal"],
  like: ["~~", "like operator"],
  ilike: ["~~", "ilike operator"],
  in: ["in", "one of a list of value"],
  is: ["is", "checking for (null, not null, true, false)"],
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
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">
      <header className="flex items-center gap-4 overflow-x-auto border-b px-4 py-2">
        <div className="flex flex-1 items-center gap-2">
          <FilterButton value={filters} onChange={setFilters} />

          <SortButton value={orders} onChange={setOrders} />

          <ColumnsButton value={columnNames} onChange={setColumnNames} />

          <Button
            variant="outline"
            disabled={isRefetching || isLoading}
            onClick={() => refetch()}
          >
            <RefreshCcwIcon
              className={clsx(
                "mr-2 h-4 w-4",
                isRefetching ? "animate-spin" : ""
              )}
            />
            Refresh
          </Button>
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
              <th className="sticky left-0 z-10 w-10 border-b border-r bg-slate-100"></th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={clsx(
                    "relative flex items-center gap-2 border-b bg-slate-100 p-2 font-semibold",
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
              <td className="sticky left-0 z-10 flex w-10 items-center justify-center border-b border-r bg-white">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      title="Menu"
                      className="h-8 w-8 p-0"
                    >
                      <MoreVerticalIcon className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="bottom">
                    <DropdownMenuItem onClick={() => onItemClick(row.original)}>
                      <LayoutGridIcon className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        target="_blank"
                        href={`https://amazon.com/sp?seller=A10111992WJRYRFBZH9IS`}
                      >
                        <StoreIcon className="mr-2 h-4 w-4" />
                        View Storefront
                        <ExternalLinkIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
              {row.getVisibleCells().map((cell) => (
                <ContextMenu key={cell.id}>
                  <ContextMenuTrigger asChild>
                    <td
                      className={clsx(
                        "flex items-center border-b bg-white p-2",
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
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() =>
                        copyToClipboard(cell.getValue()?.toString() || "")
                      }
                    >
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Copy
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={() => onItemClick(row.original)}>
                      <LayoutGridIcon className="mr-2 h-4 w-4" />
                      View details
                    </ContextMenuItem>
                    <ContextMenuItem asChild>
                      <Link
                        target="_blank"
                        href={`https://amazon.com/sp?seller=A10111992WJRYRFBZH9IS`}
                      >
                        <StoreIcon className="mr-2 h-4 w-4" />
                        Storefront
                        <ExternalLinkIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
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
  operator: FilterOperator;
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
  "in",
  "is",
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

  const onApply = useCallback(() => {
    onChange(filters);
  }, [filters, onChange]);

  return (
    <Popover onOpenChange={() => setFilters(value)}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ListFilterIcon className="mr-2 h-4 w-4" />
          {value.length
            ? `Filtered by ${value.length} rule${value.length > 1 ? "s" : ""}`
            : "Filter"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[450px] p-0">
        {filters.length ? (
          <div className="space-y-2 p-2">
            {filters.map((filter) => (
              <FilterRow
                key={filter.id}
                filter={filter}
                onChnage={(value) =>
                  setFilters(
                    filters.map((item) =>
                      item.id === filter.id ? value : item
                    )
                  )
                }
                onRemove={() =>
                  setFilters(filters.filter((item) => item.id !== filter.id))
                }
              />
            ))}
          </div>
        ) : (
          <div className="space-y-1 p-4">
            <p className="font-medium text-accent-foreground">
              No filters applied to this table
            </p>
            <p className="text-sm text-muted-foreground">
              Add a column below to filter the table
            </p>
          </div>
        )}
        <footer className="flex items-center justify-between gap-4 border-t p-2">
          <Button onClick={addNewFilter} variant="ghost">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Filter
          </Button>
          <PopoverClose asChild>
            <Button
              disabled={filters === value}
              onClick={onApply}
              variant="outline"
            >
              Apply Filter
            </Button>
          </PopoverClose>
        </footer>
      </PopoverContent>
    </Popover>
  );
};

const FilterRow = ({
  filter,
  onChnage,
  onRemove,
}: {
  filter: Filter;
  onChnage: (filter: Filter) => void;
  onRemove: () => void;
}) => {
  const [columnNamePopoverOpen, setColumnNamePopoverOpen] = useState(false);
  const [operatorPopoverOpen, setOperatorPopoverOpen] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <Popover
        open={columnNamePopoverOpen}
        onOpenChange={setColumnNamePopoverOpen}
      >
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-32">
            <span className="flex-1 truncate text-left">
              {COLUMN_NAME_TO_LABEL[filter.columnName]}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {COLUMN_NAMES.map((name) => (
                <CommandItem
                  key={name}
                  onSelect={() => {
                    onChnage({ ...filter, columnName: name });
                    setColumnNamePopoverOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      filter.columnName === name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {COLUMN_NAME_TO_LABEL[name]}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={operatorPopoverOpen} onOpenChange={setOperatorPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-20">
            <span className="flex-1 truncate text-left">
              {FILTER_OPERATOR_TO_LABEL[filter.operator][0]}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {OPERATORS.map((operator) => (
                <CommandItem
                  key={operator}
                  onSelect={() => {
                    onChnage({ ...filter, operator: operator });
                    setOperatorPopoverOpen(false);
                  }}
                  value={`[${FILTER_OPERATOR_TO_LABEL[operator][0]}] ${FILTER_OPERATOR_TO_LABEL[operator][1]}`}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      filter.operator === operator ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="mr-2 text-muted-foreground">
                    [{FILTER_OPERATOR_TO_LABEL[operator][0]}]
                  </span>
                  <span>{FILTER_OPERATOR_TO_LABEL[operator][1]}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Input
        type="text"
        value={filter.query}
        onChange={(e) => {
          const value = e.currentTarget.value;
          onChnage({ ...filter, query: value });
        }}
        placeholder="Enter a value"
        className="flex-1"
      />

      <Button className="h-10 w-10 p-0" variant="ghost" onClick={onRemove}>
        <XIcon className="h-5 w-5" />
      </Button>
    </div>
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
  const [columnNamePopoverOpen, setColumnNamePopoverOpen] = useState(false);
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

  const onApply = useCallback(() => {
    onChange(sorts);
  }, [sorts, onChange]);

  return (
    <Popover onOpenChange={() => setSorts(value)}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ArrowDownUpIcon className="mr-2 h-4 w-4" />
          {value.length
            ? `Sorted by ${value.length} rule${value.length > 1 ? "s" : ""}`
            : "Sort"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[400px] p-0">
        {sorts.length ? (
          <div className="space-y-2 p-2">
            {sorts.map((order) => (
              <SortRow
                key={order.id}
                sort={order}
                onChange={(value) =>
                  setSorts(
                    sorts.map((item) => (item.id === order.id ? value : item))
                  )
                }
                onRemove={() =>
                  setSorts(sorts.filter((item) => item.id !== order.id))
                }
              />
            ))}
          </div>
        ) : (
          <div className="space-y-1 p-4">
            <p className="font-medium text-accent-foreground">
              No sorts applied to this table
            </p>
            <p className="text-sm text-muted-foreground">
              Add a column below to sort the table
            </p>
          </div>
        )}

        <footer className="flex items-center justify-between gap-4 border-t p-2">
          {availableColumns.length ? (
            <Popover
              open={columnNamePopoverOpen}
              onOpenChange={setColumnNamePopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-56">
                  <span className="flex-1 truncate text-left">
                    Pcik a column to sort by
                  </span>
                  <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {availableColumns.map((name) => (
                      <CommandItem
                        key={name}
                        onSelect={() => {
                          addNewSort(name);
                          setColumnNamePopoverOpen(false);
                        }}
                      >
                        {COLUMN_NAME_TO_LABEL[name]}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          ) : (
            <p className="pl-2 text-sm text-muted-foreground">
              All columns have been added
            </p>
          )}

          <PopoverClose asChild>
            <Button
              disabled={sorts === value}
              onClick={onApply}
              variant="outline"
            >
              Apply Sort
            </Button>
          </PopoverClose>
        </footer>
      </PopoverContent>
    </Popover>
  );
};

const SortRow = ({
  sort,
  onChange,
  onRemove,
}: {
  sort: Sort;
  onChange: (value: Sort) => void;
  onRemove: () => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <p className="flex-1 truncate pl-2 text-sm">
        <span className="text-muted-foreground">Sort by: </span>
        <span className="font-medium text-accent-foreground">
          {COLUMN_NAME_TO_LABEL[sort.columnName]}
        </span>
      </p>

      <div className="flex items-center gap-2">
        <Label htmlFor="airplane-mode">Ascending: </Label>
        <Switch
          id="airplane-mode"
          checked={sort.ascending}
          onCheckedChange={(value) => {
            onChange({ ...sort, ascending: value });
          }}
        />
      </div>

      <Button className="h-10 w-10 p-0" variant="ghost" onClick={onRemove}>
        <XIcon className="h-5 w-5" />
      </Button>
    </div>
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
    <Popover onOpenChange={() => setColumns(value)}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ColumnsIcon className="mr-2 h-4 w-4" />
          Columns
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[320px] p-0">
        <div className="space-y-2 p-2">
          {COLUMN_NAMES.map((columnName) => {
            const isActive = columns.includes(columnName);
            return (
              <div key={columnName} className="flex items-center gap-2 p-2">
                <p className="flex-1 truncate text-sm font-medium text-accent-foreground">
                  {COLUMN_NAME_TO_LABEL[columnName]}
                </p>

                <div className="flex items-center gap-2">
                  <Label htmlFor="airplane-mode">Show: </Label>
                  <Switch
                    id="airplane-mode"
                    checked={isActive}
                    onCheckedChange={() => {
                      if (isActive) {
                        setColumns(
                          columns.filter((item) => item !== columnName)
                        );
                      } else {
                        setColumns([...columns, columnName]);
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <footer className="flex items-center justify-between gap-4 border-t p-2">
          <div className="flex-1"></div>

          <PopoverClose asChild>
            <button
              disabled={columns === value}
              onClick={onApply}
              className="flex h-10 items-center gap-2 rounded-lg border px-4 text-slate-600 hover:border-slate-300 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-50"
            >
              Apply
            </button>
          </PopoverClose>
        </footer>
      </PopoverContent>
    </Popover>
  );
};
