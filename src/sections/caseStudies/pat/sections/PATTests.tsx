import { Card, Text, Heading } from "@radix-ui/themes";
import { CodeBlock } from "../../../../shared/CodeBlock";
import { CodeTest } from "../../../../shared/CodeTest";
import { useTranslation } from "react-i18next";

export function PATTests() {
  const { t } = useTranslation()
  return (
    <>
      <Heading size="6">{t('pat.h_tests')}</Heading>
      <Text>{t('pat.tests1')}</Text>
      <Text>{t('pat.tests2')}</Text>

      <Heading size="4">{t('pat.h2_tests1')}</Heading>
      <Text>{t('pat.tests3')}</Text>

      <CodeTest title1='toggleSortState.ts' title2='toggleSortState.test.ts'
        code={`import type { TableColumnsColumn } from "../../../types/columns";
import type { TableSortSort } from "../../../types/sort";

export function toggleSortState<Data>(
  prev: TableSortSort<Data>,
  column: TableColumnsColumn<Data> | null
): TableSortSort<Data> {
  if (prev.column === column) {
    return {
      column,
      direction: prev.direction === "asc" ? "desc" : "asc",
    };
  }

  return {
    column,
    direction: "asc",
  };
}
        `}
        test={`import {it, describe, expect} from "vitest";
import { toggleSortState } from "./toggleSortState";
import type { TableSortSort } from "../../../types/sort";
import type { TableColumnsColumn } from "../../../types/columns";

interface Data {
    id: string,
    size: number,
    options: ['a','b']
}

describe('toggleSortState', () => {
  const colA:TableColumnsColumn<Data> = {
    id: 'id',
    label: 'sdsd',
    visible: true,
    render: function (): React.ReactNode {
      throw new Error("Function not implemented.");
    }
  };
    const colB:TableColumnsColumn<Data> = {
    id: 'size',
    label: 'dssdsd',
    visible: false,
    render:()=>null
  };

  it('switches direction when clicking same column', () => {
    const prev:TableSortSort<Data> = { column: colA, direction: 'asc' };
    const result = toggleSortState<Data>(prev, colA);
    expect(result.direction).toBe('desc');
  });

  it('resets to asc when clicking different column', () => {
    const prev:TableSortSort<Data> = { column: colA, direction: 'desc' };
    const result = toggleSortState<Data>(prev, colB);
    expect(result).toEqual({ column: colB, direction: 'asc' });
  });

  it('handles null column', () => {
    const prev:TableSortSort<Data> = { column: colA, direction: 'asc' };
    const result = toggleSortState<Data>(prev, null);
    expect(result).toEqual({ column: null, direction: 'asc' });
  });

  it('does not mutate previous state', () => {
    const prev:TableSortSort<Data> = { column: colA, direction: 'asc' };
    const result = toggleSortState<Data>(prev, colA);
    expect(result).not.toBe(prev);
  });
});
        `} />
      <Heading size="4">{t('pat.h2_tests3')}</Heading>
      <Text>{t('pat.tests4')}</Text>
      <ul>
        <li>{t('pat.list1_tests')}</li>
        <li>{t('pat.list2_tests')}</li>
        <li>{t('pat.list3_tests')}</li>
        <li>{t('pat.list4_tests')}</li>
        <li>{t('pat.list5_tests')}</li>
      </ul>
      <Text>{t('pat.tests5')}</Text>
      <Text>{t('pat.tests6')}</Text>
      <Text>{t('pat.tests7')}</Text>
      <Heading size="4">{t('pat.h2_tests4')}</Heading>
      <Text>{t('pat.tests8')}</Text>
      <Text>{t('pat.tests9')}</Text>
      <ul>
        <li>{t('pat.list6_tests')}</li>
        <li>{t('pat.list7_tests')}</li>
        <li>{t('pat.list8_tests')}</li>
        <li>{t('pat.list9_tests')}</li>
      </ul>
      <Text>{t('pat.tests10')}</Text>
      <Card my="4">
        <pre>toggleAndSort.integration.test.ts</pre>
        <CodeBlock code={`import type { TableColumnsColumn } from "@/shared/components/table/types/columns";
import type { TableSortDirection, TableSortSort } from "@/shared/components/table/types/sort";
import { describe, it, expect } from "vitest"
import { toggleSortState } from "../../utils/toggleSortState";
import { sortColumn } from "../../utils/sortColumn";

describe('integration of toggle and sort', () => {
    interface Data {
        id: string,
        size: number
    }

    const data: Data[] = [
        { id: 'aaa', size: 6 },
        { id: 'bbb', size: 9 },
        { id: 'ccc', size: 6 },
    ]

    const colA: TableColumnsColumn<Data> = {
        id: 'id',
        label: 'sdsd',
        visible: true,
        render: ()=>null
    };
    const colB: TableColumnsColumn<Data> = {
        id: 'size',
        label: 'dssdsd',
        visible: false,
        render: () => null
    };

    const toggleState: TableSortDirection = "asc";

    it('when toggle is changed, sorting changes direction', () => {
        const prev: TableSortSort<Data> = { column: colA, direction: toggleState }
        const result = toggleSortState<Data>(prev, colA);
        const sortFn = sortColumn(result.column?.id ?? null, result.direction)
        expect([...data].sort(sortFn)).toEqual([
            { id: 'ccc', size: 6 },
            { id: 'bbb', size: 9 },
            { id: 'aaa', size: 6 },
        ])
    });

    it('when column and toggle is changed, sorting changes direction', () => {
        const prev: TableSortSort<Data> = { column: colB, direction: toggleState }
        const result = toggleSortState<Data>(prev, colB);
        const sortFn = sortColumn(result.column?.id ?? null, result.direction)
        expect([...data].sort(sortFn)).toEqual([
            { id: 'bbb', size: 9 },
            { id: 'aaa', size: 6 },
            { id: 'ccc', size: 6 },
        ])
    })
})
`} />
      </Card>
      <Heading size="4">{t('pat.h2_tests5')}</Heading>
      <Text>{t('pat.tests11')}</Text>
      <Text>{t('pat.tests12')}</Text>
      <ul>
        <li>{t('pat.list10_tests')}</li>
        <li>{t('pat.list11_tests')}</li>
        <li>{t('pat.list12_tests')}</li>
        <li>{t('pat.list13_tests')}</li>
      </ul>
      <Heading size="4">{t('pat.h2_tests')}</Heading>
      <Text>{t('pat.tests13')}</Text>
      <Text>{t('pat.tests14')}</Text>
      <Text>{t('pat.tests15')}</Text>
      <CodeTest
        code={`import { Table } from "@radix-ui/themes";
import { TableBody } from "./components/TableBody";
import { TableHeader } from "./components/TableHeader";
import type { TableColumnsColumns } from "../../types/columns";
import type { TableData } from "../../types/data";
import type { TableSortSort, TableSortToggleSort } from "../../types/sort";
import type { TableDragHandleDrop, TableDragSetDragged } from "../../types/drag";

interface TableFullProps<Data extends { id: string | number; }> {
    columns: TableColumnsColumns<Data>,
    setDragged: TableDragSetDragged,
    handleDrop: TableDragHandleDrop,
    toggleSort: TableSortToggleSort<Data>,
    sort: TableSortSort<Data>,
    paginated: TableData<Data>
}

export function TableFull<Data extends { id: string | number; }>(props: TableFullProps<Data>) {
    const {
        columns,
        setDragged,
        handleDrop,
        toggleSort,
        sort,
        paginated
    } = props;

    return (
        <Table.Root>
            <TableHeader setDragged={setDragged} handleDrop={handleDrop} columns={columns} toggleSort={toggleSort} sort={sort}></TableHeader>
            <TableBody paginated={paginated} columns={columns}></TableBody>
        </Table.Root>
    )
}`}
        test={`import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from "@testing-library/user-event";
import { TableFull } from './TableFull';
import type { TableColumnsColumns } from '../../types/columns';

describe('TableFull integration tests', () => {

  interface Data {
    name: string,
    id: number,
    age: number
  }

  it("renders TableHeader and TableBody", () => {
    const columns: TableColumnsColumns<Data> = [
      { id: "name", label: "Name", visible: true, render: (row: Data) => row.name },
    ];
    const data = [{ id: 1, name: "Alice", age: 20 }];

    render(
      <TableFull
        columns={columns}
        paginated={data}
        setDragged={() => { }}
        handleDrop={() => { }}
        toggleSort={() => { }}
        sort={{ column: columns[0], direction: 'asc' }}
      />
    );

    expect(screen.getByText((t) => t.includes("Name"))).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("passes columns to header and body", () => {
    const columns: TableColumnsColumns<Data> = [
      { id: "name", label: "Name", visible: true, render: (row: Data) => row.name },
    ];
    const data = [{ id: 1, name: "Alice", age: 20 }];

    render(
      <TableFull
        columns={columns}
        paginated={data}
        setDragged={() => { }}
        handleDrop={() => { }}
        toggleSort={() => { }}
        sort={{ column: columns[0], direction: 'asc' }}
      />
    );

    expect(screen.getByText((t) => t.includes("Name"))).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });
  it("calls toggleSort when header is clicked", async () => {
    const user = userEvent.setup();
    const toggleSort = vi.fn();

    const columns: TableColumnsColumns<Data> = [
      { id: "name", label: "Name", visible: true, render: (row) => row.name },
    ];
    const data = [{ id: 1, name: "Alice", age: 20 }];

    render(
      <TableFull
        columns={columns}
        paginated={data}
        setDragged={() => { }}
        handleDrop={() => { }}
        toggleSort={toggleSort}
        sort={{ column: columns[0], direction: 'asc' }}
      />
    );

    const header = screen.getByText((t) => t.includes("Name"));
    await user.click(header);

    expect(toggleSort).toHaveBeenCalledWith(columns[0]);
  });
  it("calls setDragged and handleDrop on drag events", () => {
    const setDragged = vi.fn();
    const handleDrop = vi.fn();

    const columns: TableColumnsColumns<Data> = [
      { id: "name", label: "Name", visible: true, render: (row) => row.name },
    ];
    const data = [{ id: 1, name: "Alice", age: 20 }];

    render(
      <TableFull
        columns={columns}
        paginated={data}
        setDragged={setDragged}
        handleDrop={handleDrop}
        toggleSort={() => { }}
        sort={{ column: columns[0], direction: 'asc' }}
      />
    );

    const header = screen.getByText((t) => t.includes("Name"));

    fireEvent.dragStart(header);
    fireEvent.drop(header);

    expect(setDragged).toHaveBeenCalledWith("name");
    expect(handleDrop).toHaveBeenCalledWith("name");
  });

  it("renders one row per item in paginated", () => {
    const columns: TableColumnsColumns<Data> = [
      { id: "name", label: "Name", visible: true, render: (row) => row.name },
    ];
    const data = [
      { id: 1, name: "Alice", age: 30 },
      { id: 2, name: "Bob", age: 20 },
    ];

    render(
      <TableFull
        columns={columns}
        paginated={data}
        setDragged={() => { }}
        handleDrop={() => { }}
        toggleSort={() => { }}
        sort={{ column: columns[0], direction: 'asc' }}
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(1 + data.length);
  });

});
`}
        title1={"TableFull.tsx"}
        title2={"TableFull.rtl.test.tsx"}
      />
      <Heading size="4">{t('pat.h2_tests2')}</Heading>
      <Text>{t('pat.tests16')}</Text>
      <ul>
        <li>{t('pat.list14_tests')}</li>
        <li>{t('pat.list15_tests')}</li>
        <li>{t('pat.list16_tests')}</li>
        <li>{t('pat.list17_tests')}</li>
        <li>{t('pat.list18_tests')}</li>
      </ul>
      <Text>{t('pat.tests17')}</Text>
    </>
  )
}