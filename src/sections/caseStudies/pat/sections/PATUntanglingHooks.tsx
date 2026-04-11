import { Card, Text, Heading } from "@radix-ui/themes";
import { CodeBlock } from "../../../../shared/CodeBlock";

export function PATUntanglingHooks() {


    return (
        <>
            <Heading size="4" mb="3">Rozplątywanie funkcji statefull i customowe hooki</Heading>
            <Text>Tabela miała wszystkie możliwe stany i funkcje w jednym kompnencie i chciałam zacząć refakotor od wydzielenia funkcji czystych, ale okazało sie, że wszystkie są stanowe, więc je wydzieliłam do customowych hooków. Usunęłam też i18n, ponieważ wchodziło w konflikt z i18n w projekcie, gdzie była instalowana biblioteka oraz nie chciałam narzucać narzędzia. Biblioteka ma wewnętrzne tłumaczenia, które można będzie nadpisać w opcjonalnych propsach w kolejnych wersjach.</Text>

            <Text>Przykład hooka:</Text>
            <Card mt="4">
                <Text>Przykład customowego hooka:</Text><pre>useSort.ts</pre>
                <CodeBlock code={`import { useCallback, useMemo, useState } from "react";
import type { TableData } from "../../types/data";
import type { TableColumnsColumn } from "../../types/columns";
import type { TableSortSort } from "../../types/sort";
import { sortColumn } from './utils/sortColumn'
import { toggleSortState } from './utils/toggleSortState'

export function useSort<Data extends { id: string | number; }>(data: TableData<Data>) {
    const [sort, setSort] = useState<TableSortSort<Data>>({
        column: null,
        direction: "asc",
    });

    const sortFn = useMemo(
        () => sortColumn<Data>(sort.column?.id ?? null, sort.direction),
        [sort.column?.id, sort.direction]
    );

    const sortedData = useMemo(() => [...data].sort(sortFn), [data, sortFn]);
    const toggleSort = useCallback((column: TableColumnsColumn<Data> | null) => {
        setSort(prev => toggleSortState(prev, column));
    }, []);

    return {
        sortedData,
        sort,
        setSort,
        toggleSort
    }
}
        `}></CodeBlock>
                <Text>Komentarz: W prototypie sortowanie było implementowane inline w komponencie, razem z UI i stanem.
                    Po refaktoryzacji przeniosłam je do dedykowanego hooka useSort, który:

                    jest w pełni generyczny (Data extends{' { id: string | number }'}),

                    ma czyste API (sortedData, sort, toggleSort),

                    memoizuje funkcję sortującą (useMemo),

                    memoizuje handler zmiany sortowania (useCallback),

                    deleguje logikę do czystych funkcji utilowych (sortColumn, toggleSortState),

                    nie ma żadnych zależności od UI (prawdziwy headless),

                    jest łatwy do testowania i reużywalny.

                    Dzięki temu UI tabeli jest cienką warstwą prezentacji, a logika sortowania pozostaje spójna, przewidywalna i wydajna.</Text>
            </Card>
        </>
    )
}