import { Card, Text, Heading } from "@radix-ui/themes";
import { CodeBlock } from "../../../../shared/CodeBlock";
import { CodeTest } from "../../../../shared/CodeTest";

export function PATTests() {

    return (
        <>
             <Heading size="6" mb="3">Pokrycie testami</Heading>
            <Text>Do testów usiadłam dopiero jak w miarę określiłam architekturę i skończyłam eksperymenty. Ten projekt był zbyt eksperymentalny na TDD, testy miały sesn dopiero po stabilizacji projektu.</Text>

            <Heading size="4" mb="3">Testy jednostkowe</Heading>
            <Text> Z hooków udało się wyodrębnić czyste funkcje, gdy już nie były poplątane ze stanami i do nich napisałam testy jednostowe.</Text>

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


            toggleSortState — czysta logika sortowania + testy jednostkowe

            Logika zmiany stanu sortowania została wyodrębniona do czystej funkcji toggleSortState.
            Funkcja:

            jest w pełni generyczna (Data),

            nie ma side‑effectów,

            nie mutuje poprzedniego stanu,

            obsługuje wszystkie przypadki (ta sama kolumna, inna kolumna, null),

            jest łatwa do testowania i reużywalna.

            Do funkcji napisałam testy jednostkowe w Vitest, które pokrywają wszystkie scenariusze i edge‑cases.
            Testy są w pełni typowane, co dodatkowo zwiększa bezpieczeństwo API.

            Ten fragment świetnie pokazuje, jak rozbijam logikę domenową na małe, czyste, testowalne elementy — w przeciwieństwie do prototypu, gdzie sortowanie było wymieszane z UI i stanem.


            <Heading size="4" mb="3">Testy integracyjne</Heading>
            <Text>Testy integracyjne spawdzały przepływ między funkcjami.</Text>
            <Text>
                Oprócz testów jednostkowych napisałam test integracyjny, który sprawdza współdziałanie dwóch modułów: toggleSortState i sortColumn.
                Test odwzorowuje realny przepływ sortowania w tabeli i weryfikuje, że zmiana stanu sortowania wpływa na rzeczywiste ułożenie danych.
                Dzięki temu logika sortowania jest stabilna, przewidywalna i niezależna od UI.
            </Text>
            <Card my="4">
                <Text>Przykład: Testy integracyjne logiki sortowania</Text><pre>toggleAndSort.integration.test.ts</pre>
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

            <Heading size="4" mb="3">Testy RTL</Heading>
            <Text>Testów RTL użyłam do sprawdzenia sanity komponentu głównego oraz kilku przykładowych elementów. Testy RTL w bibliotece wymagają więcej pracy, ponieważ po migracji większa część przestała działać, choć w oryginalnym projekcie, z którego są wyciągnięte (MLOps) działają. Problem jest ujęty w roadmapie.</Text>

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

            <Text>Testy RTL — integracja UI z logiką headless

                Oprócz testów jednostkowych i integracyjnych logiki napisałam także testy RTL, które sprawdzają zachowanie komponentów UI w realnych scenariuszach użytkownika.

                Testy weryfikują:

                renderowanie nagłówków i wierszy,

                przekazywanie kolumn do headera i body,

                wywoływanie toggleSort po kliknięciu nagłówka,

                obsługę drag & drop (setDragged, handleDrop),

                poprawne renderowanie liczby wierszy.

                Testy są w pełni typowane i sprawdzają integrację UI z logiką headless — bez mockowania całej tabeli.
                Dzięki temu mam pewność, że komponenty prezentacyjne poprawnie delegują zachowanie do hooków i utili.</Text>
        </>
    )
}