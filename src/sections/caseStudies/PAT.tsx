import { Card, Heading, Text } from "@radix-ui/themes";
import { BeforeAfter } from "../../shared/BeforeAfter";
import { CodeBlock } from "../../shared/CodeBlock";
import { CodeTest } from "../../shared/CodeTest";

const before1 =
  `import { Badge, Button, Card, DropdownMenu, Flex, Select, Spinner, Table, Text, TextField, Tooltip } from "@radix-ui/themes";
import { t } from "i18next";
import { models as modelsDBstub } from "../stubs/modelsDB";
import { useState, useTransition } from "react";
import { Header } from "@radix-ui/themes/components/table";
import type { Model } from "../model/Models";
import { TagIcon } from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";

export default function Models() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState({
        query: "",  
        status: "",    
        type: "",       
        tag: "",          
        baseModel: "",   
        loraMin: "",    
        loraMax: "",     
        sizeMin: "",     
        sizeMax: "",    
    });

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState({
        column: null,     // np. "name", "size", "status"
        direction: "asc", 
    });

    const [dragged, setDragged] = useState(null);


    const [columns, setColumns] = useState([
        {
            id: "name",
            label: t("models.name"),
            visible: true,
            render: (model: Model) => model.name
        },
        {
            id: "description",
            label: t("models.description"),
            visible: true,
            render: (model: Model) => model.description
        },
        {
            id: "baseModel",
            label: t("models.base"),
            visible: true,
            render: (model: Model) => model.baseModel
        },
        {
            id: "version",
            label: t("models.version"),
            visible: true,
            render: (model: Model) => model.version
        },
        {
            id: "loraCount",
            label: t("models.lora"),
            visible: true,
            render: (model: Model) => model.loraCount
        },
        {
            id: "status",
            label: t("models.status"),
            visible: true,
            render: (model: Model) => (
                <Badge color={model.status === "ready" ? "green" : "amber"}>
                    {model.status}
                </Badge>
            )
        },
        {
            id: "actions",
            label: t("models.actions"),
            visible: true,
            render: (model: Model) => (
                <Button 
                disabled={model.status!=="ready"?true:false}
                variant="soft" 
                onClick={() => loadModel(model.id.toString())}
                >
                    {t("models.load")}
                </Button>
            )
        },
        {
            id: "id",
            label: t("models.id"),
            visible: true,
            render: (model: Model) => model.id
        },
        {
            id: "type",
            label: t("models.type"),
            visible: true,
            render: (model: Model) => model.type
        },
        {
            id: "size",
            label: t("models.size"),
            visible: true,
            render: (model: Model) => formatSize(model.size)
        },
        {
            id: "details",
            label: t("models.details"),
            visible: true,
            render: (model: Model) => model.details
        },
        {
            id: "tags",
            label: t("models.tags"),
            visible: true,
            render: (model: Model) => (
                <Flex gap="2" wrap="wrap">
                    {model.tags.map(tag => (
                        <Tooltip key={tag} content={tag}>
                            <Badge
                                key={tag}
                                variant="soft"
                                radius="full"
                                color={tagColor(tag)}
                            >
                                <TagIcon size={12} />
                                {tag}
                            </Badge>
                        </Tooltip>
                    ))}
                </Flex>
            )
        }
    ]);

    const [isPending, startTransition] = useTransition();


    const handleReset = () => {
        startTransition(() => {
            setFilters(defaultFilters);
        });
    };

    const loadModel = (id: string) => {
        // todo
        console.log(id)
    }
    // todo: tu ma wczytać z kontekstu czy serwi set demo czy full
    // eslint-disable-next-line prefer-const
    let serviceStatus = 'demo';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let models: any[] = [];
    if (serviceStatus === 'demo') {
        models = modelsDBstub.map(m => ({
            ...m,
            size: parseSize(m.size),
        }));
    }

    const toggleSort = (column) => {
  setSort((prev) => {

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
  });
};


const handleDrop = (targetKey) => {
  if (!dragged) return;

  const newOrder = [...columns];
  const fromIndex = newOrder.findIndex(c => c.id === dragged);
  const toIndex = newOrder.findIndex(c => c.id === targetKey);

  const [moved] = newOrder.splice(fromIndex, 1);
  newOrder.splice(toIndex, 0, moved);

  setColumns(newOrder);
  setDragged(null);
};

    function parseSize(value: string | number): number {
        if (typeof value === "number") return value;

        const num = parseFloat(value);

        if (value.toLowerCase().endsWith("b")) {
            return num * 1_000_000_000;
        }
        if (value.toLowerCase().endsWith("m")) {
            return num * 1_000_000;
        }
        if (value.toLowerCase().endsWith("k")) {
            return num * 1_000;
        }
        if (value.toLowerCase().endsWith("g")) {
            return num * 1_000_000_000;
        }

        return num;
    }


    function formatSize(bytes: number): string {
        if (bytes >= 1_000_000_000) {
            return (bytes / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
        }
        if (bytes >= 1_000_000) {
            return (bytes / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
        }
        if (bytes >= 1_000) {
            return (bytes / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
        }
        return bytes + "B";
    }

    const filteredModels = models
        .filter(m =>
            JSON.stringify(m).toLowerCase().includes(search.toLowerCase())
        )
        .filter(m => {
            if (filters.query && !(
                m.name.toLowerCase().includes(filters.query.toLowerCase()) ||
                m.description.toLowerCase().includes(filters.query.toLowerCase())
            )) return false;

            if (filters.status && filters.status !== '__all__' && m.status !== filters.status) return false;

            if (filters.type && filters.type !== '__all__' && m.type !== filters.type) return false;

            if (filters.tag && !m.tags.includes(filters.tag)) return false;

            if (filters.baseModel && !m.baseModel.toLowerCase().includes(filters.baseModel.toLowerCase())) return false;

            if (filters.loraMin && m.loraCount < Number(filters.loraMin)) return false;
            if (filters.loraMax && m.loraCount > Number(filters.loraMax)) return false;

            if (filters.sizeMin && Number(m.size) < Number(filters.sizeMin)) return false;
            if (filters.sizeMax && Number(m.size) > Number(filters.sizeMax)) return false;

            return true;
        });

        const sorted = [...filteredModels].sort((a, b) => {
  if (!sort.column) return 0;

  const col = sort.column;
  const dir = sort.direction === "asc" ? 1 : -1;

  const valA = a[col];
  const valB = b[col];

  if (typeof valA === "number" && typeof valB === "number") {
    return (valA - valB) * dir;
  }

  return String(valA).localeCompare(String(valB)) * dir;
});

    const total = sorted.length;
    const totalPages = Math.ceil(total / pageSize);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const paginated = sorted.slice(start, end);


    const defaultFilters = {
        query: "",
        status: "",
        type: "",
        tag: "",
        baseModel: "",
        loraMin: "",
        loraMax: "",
        sizeMin: "",
        sizeMax: "",
    };

    const tagColor = (tag: string) => {
        if (tag.includes("coding")) return "blue";
        if (tag.includes("chat")) return "green";
        if (tag.includes("math")) return "purple";
        if (tag.includes("polish")) return "red";
        return "gray";
    };

    const toggleColumn = (id: string) => {
        setColumns(cols =>
            cols.map(col =>
                col.id === id ? { ...col, visible: !col.visible } : col
            )
        );
    };

    return (
        <>
            <Card>
                <Header>
                    <Text>{t("models.models")}</Text>
                </Header>
                <Flex justify="between" align="center" mb="4">
                    <TextField.Root
                        placeholder={t("models.searchSimplePlaceholder")}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: "300px" }}
                    />

                </Flex>
                <Collapsible.Root open={open} onOpenChange={setOpen}>
                    <Collapsible.Trigger>
                        <Button variant="ghost">{t("models.advancedFiltering")} {open ? "▲" : "▼"}</Button>
                    </Collapsible.Trigger>

                    {open && (
                        <Collapsible.Content>

                            <div style={{ position: "relative" }}>
                                {isPending && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "rgba(33, 33, 33, 0.6)",
                                            backdropFilter: "blur(3px)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            zIndex: 10,
                                            borderRadius: "var(--radius-3)",
                                        }}
                                    >
                                        <Spinner size="3" />
                                    </div>
                                )}
                                <Flex direction="column" gap="3" mt="3">
                                    <Flex direction="column" gap="4">

                                        {/* Nazwa / opis */}
                                        <TextField.Root
                                            placeholder="Nazwa lub opis"
                                            value={filters.query}
                                            onChange={(e) => setFilters(f => ({ ...f, query: e.target.value }))}
                                        />

                                        {/* Status */}
                                        <Select.Root
                                            value={filters.status}
                                            onValueChange={(value) => setFilters(f => ({ ...f, status: value }))}
                                        >
                                            <Select.Trigger placeholder="Status" />
                                            <Select.Content>
                                                <Select.Item value="__all__">Wszystkie</Select.Item>
                                                <Select.Item value="ready">ready</Select.Item>
                                                <Select.Item value="loading">loading</Select.Item>
                                                <Select.Item value="not_downloaded">not_downloaded</Select.Item>
                                            </Select.Content>
                                        </Select.Root>

                                        {/* Typ */}
                                        <Select.Root
                                            value={filters.type}
                                            onValueChange={(value) => setFilters(f => ({ ...f, type: value }))}
                                        >
                                            <Select.Trigger placeholder="Typ modelu" />
                                            <Select.Content>
                                                <Select.Item value="__all__">Wszystkie</Select.Item>
                                                <Select.Item value="chat">chat</Select.Item>
                                                <Select.Item value="coding">coding</Select.Item>
                                                <Select.Item value="science">science</Select.Item>
                                                <Select.Item value="creative">creative</Select.Item>
                                                <Select.Item value="language">language</Select.Item>
                                            </Select.Content>
                                        </Select.Root>

                                        {/* Tag */}
                                        <TextField.Root
                                            placeholder="Tag (np. coding)"
                                            value={filters.tag}
                                            onChange={(e) => setFilters(f => ({ ...f, tag: e.target.value }))}
                                        />

                                        {/* Base model */}
                                        <TextField.Root
                                            placeholder="Base model (np. llama3)"
                                            value={filters.baseModel}
                                            onChange={(e) => setFilters(f => ({ ...f, baseModel: e.target.value }))}
                                        />

                                        {/* Lora count */}
                                        <Flex gap="2">
                                            <TextField.Root
                                                placeholder="LoRA min"
                                                type="number"
                                                value={filters.loraMin}
                                                onChange={(e) => setFilters(f => ({ ...f, loraMin: e.target.value }))}
                                            />
                                            <TextField.Root
                                                placeholder="LoRA max"
                                                type="number"
                                                value={filters.loraMax}
                                                onChange={(e) => setFilters(f => ({ ...f, loraMax: e.target.value }))}
                                            />
                                        </Flex>

                                        {/* Size */}
                                        <Flex gap="2">
                                            <TextField.Root
                                                placeholder="Rozmiar min"
                                                type="number"
                                                value={filters.sizeMin}
                                                onChange={(e) => setFilters(f => ({ ...f, sizeMin: e.target.value }))}
                                            />
                                            <TextField.Root
                                                placeholder="Rozmiar max"
                                                type="number"
                                                value={filters.sizeMax}
                                                onChange={(e) => setFilters(f => ({ ...f, sizeMax: e.target.value }))}
                                            />
                                        </Flex>

                                        {isPending && (
                                            <div className="overlay">
                                                <Spinner />
                                            </div>
                                        )}


                                        {/* Przyciski */}
                                        <Flex gap="2" mt="2">
                                            <Button variant="soft" onClick={handleReset}>{t("models.reset")}</Button>
                                        </Flex>

                                    </Flex>

                                </Flex>
                            </div>
                        </Collapsible.Content>
                    )}

                </Collapsible.Root>
            </Card>


            <Card className="mt-4">
                <Flex gap="3" align="center" mt="4">
                    <Button
                        variant="soft"
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    >
                        Poprzednia
                    </Button>
                    <Text>
                        Strona {page} z {totalPages}
                    </Text>
                    <Button
                        variant="soft"
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Następna
                    </Button>
                    <Select.Root
                    value={String(pageSize)}
                    onValueChange={(v) => {
                        setPageSize(Number(v));
                        setPage(1);
                    }}
                >
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Item value="4">4</Select.Item>
                        <Select.Item value="10">10</Select.Item>
                        <Select.Item value="20">20</Select.Item>
                        <Select.Item value="50">50</Select.Item>
                    </Select.Content>
                </Select.Root>
                </Flex>
                
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Button variant="soft">{t("models.columns")}</Button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content>
                        {columns.map(col => (
                            <DropdownMenu.CheckboxItem
                                key={col.id}
                                checked={col.visible}
                                onCheckedChange={() => toggleColumn(col.id)}
                            >
                                {col.label}
                            </DropdownMenu.CheckboxItem>
                        ))}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            {columns.filter(c => c.visible).map(col => (
                                <Table.ColumnHeaderCell 
                                key={col.id} 
                                draggable
                                onDragStart={() => setDragged(col.id)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => handleDrop(col.id)}
                                onClick={() => toggleSort(col.id)}
                                >
                                    {col.label} {sort.column === col.id && (sort.direction === "asc" ? "▲" : "▼")}
                                </Table.ColumnHeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {paginated.map((model: Model) => (
                            <Table.Row key={model.id}>
                                {columns.filter(c => c.visible).map(col => (
                                    <Table.Cell key={col.id}>
                                        {col.render(model)}
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Card>
        </>
    );
}
`

const after1 =
  `import { Card } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { useSort } from "../hooks/useSort/useSort";
import { useFilter } from "../hooks/useFilter/useFilter";
import { usePagination } from "../hooks/usePagination/usePagination";
import { useColumns } from "../hooks/useColumns/useColumns";
import { SimpleSearch } from "../components/SimpleSearch";
import { TableMenu } from "../components/TableMenu";
import { TableFull } from "../components/table/TableFull";
import type { TableData } from "../types/data";
import type { TableFiltersFilters } from "../types/filters";
import type { TableColumnsColumns } from "../types/columns";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { type TablePaginationPageSizeConfig } from "../types";
import { defaultPaginationConfig } from "../defaultConfigs/defaultPaginationConfig";
import { defaultTranslations } from "../components/translations/defaultTranslations";
import { v4 as uuid } from "uuid"
import { TableContext } from "../providers/TableProvider";

interface ProbablyATableProps<Data extends { id: string | number; }, Filters> {
    columns: TableColumnsColumns<Data>,
    data: TableData<Data>,
    filters: TableFiltersFilters<Filters>,
    defaultFilters: TableFiltersFilters<Filters>,
    paginationConfig?: TablePaginationPageSizeConfig
}

export default function ProbablyATable<Data extends { id: string | number; }, Filters>(props: ProbablyATableProps<Data, Filters>) {

    // PROPS
    const {
        columns: propCols,
        data: propData,
        filters: propFilters,
        defaultFilters,
        paginationConfig = defaultPaginationConfig
    } = props;

    // STATES
    const [search, setSearch] = useState("");
    // const [open, setOpen] = useState(false);

    // CONSTS
    const debouncedSearch = useDebouncedValue(search, 300);
    const tableUUID = useRef(uuid())

    // HOOKS
    const { filtered } = useFilter<Data, Filters>(propData, debouncedSearch, propFilters, defaultFilters);
    const { sortedData, sort, toggleSort } = useSort(filtered)
    const { paginated,
        page,
        setPage,
        totalPages,
        pageSize,
        setPageSize } = usePagination(sortedData, paginationConfig.defaultPageSize)
    const { toggleColumn,
        columns,
        handleDrop,
        setDragged } = useColumns(propCols)

    return (
         <TableContext.Provider value={{ tableUUID: tableUUID.current }}>
            <h2 className='sr-only'>{defaultTranslations.tableSR}</h2>
            <Card>
                <SimpleSearch search={search} setSearch={setSearch}></SimpleSearch>
                {/* <Filters open={open} setOpen={setOpen} isPending={isPending} filters={filters} setFilters={setFilters} handleReset={handleReset} ></Filters> */}
            </Card>

            <Card className="mt-4">
                <TableMenu page={page} setPage={setPage} totalPages={totalPages} setPageSize={setPageSize} pageSize={pageSize} columns={columns} toggleColumn={toggleColumn} paginationConfig={paginationConfig}></TableMenu>

                <TableFull columns={columns} setDragged={setDragged} handleDrop={handleDrop} toggleSort={toggleSort} sort={sort} paginated={paginated}></TableFull>
            </Card>
         </TableContext.Provider>
    );
}

`

const commentBefore1 = 'Wszystko poplątane ze wszystkim - klasyczne dla prototypów R&D, które i tak idą do kosza, nieakceptowalne dla kodu, który ma pożyć dłużej niż 3 dni.'
const commentAfter1 = 'Pełna separacja odpowiedzialności, czysty kod pokryty testami, architektura domain-driven, silne typowanie z generykami, elastyczność użycia. Usunęłam też i18n z tabeli, żeby nie narzucać sposobu tłumaczeń, tabela ma swoje wewnętrzne tłumaczenia i w jednej z kolejnych wersji będzie mieć też opcjonalne API do ich nadpisania.'

export function PAT() {
  return (
    <Card>

      <Heading size="8" mb="4">
        Probably‑A‑Table — headlessowa biblioteka tabel (npm)
      </Heading>

      <Text as="p" mb="5">
        Własna biblioteka headless UI do tabel w React — modularna, typowana,
        z hookami, paginacją, sortowaniem i drag‑and‑dropem. Powstała jako
        refaktoryzacja prawie 600‑linowego prototypu w projekcie MLOps i została
        opublikowana na npm.
      </Text>

      <Heading size="4" mb="3">Kontekst</Heading>
      <Text as="p" mb="5">
        Projekt powstał w trybie R&D. Najpierw zbudowałam szybki, brzydki
        prototyp tabeli, częściowo generowany przez AI — bo zależało mi na
        czasie i weryfikacji pomysłu dotyczącego projektu ML, tabela była tylko drobnym elementem całości. Gdy prototyp zaczął rosnąć, zdecydowałam
        się na pełną refaktoryzację (tak, wiem, prototypy się wyrzuca, a nie refaktoryzuje, bo są zbyt poplątane jak tu) i stworzenie własnej biblioteki headless UI.
      </Text>

      <Heading size="6" mb="4">
        Refaktor prototypu
      </Heading>

      <Heading size="4" mb="3">Główny komponent tabeli</Heading>
      <Text as="p" mb="3">
        Oryginalna tabela miała prawie 600 linii kodu. Logika, UI, stan,
        sortowanie, paginacja, filtry i drag & drop były wymieszane w jednym
        komponencie i całkowicie nie re-używalne (co jest normalne dla prototypów R&D - case study z Sudoku demonstruje z kolei odwrotne podejście z ładnym kodem od początku i w duchu TDD - ja dostosowuję podejście do typu projektu i poziomu eksperymentalności). To była tabela dla konkretnych danych. Rozbiłam ją na części, zrobiłam reużywalną i skróciłam do około 80 linijek z czego 18 to importy.
      </Text>

      <BeforeAfter
        before={before1}
        after={after1}
        commentAfter={commentAfter1}
        commentBefore={commentBefore1}
      />

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

      <Heading size="4" mb="3">Podział na pod-komponenty i API tabeli</Heading>
      <Text>Gdy miałam hooki gotowe i spokojnie mogłam w nich trzymać stan pomiędzy komponentami zaczęłam dzielić tabelę na części i robić kompozycję hooków.</Text>
      <figure>
  <img
    src="PAT-architecture.png"
    alt="Diagram architektury biblioteki probably‑a‑table"
  />
  <figcaption>
    Architektura probably-a-table.
  </figcaption>
</figure>


      <Heading size="4" mb="3">Typowanie</Heading>
      <Text>Wszystkie typy eksportuję, są oparte na generykach. Przykłady:</Text>
      <Card my='4'>
          <CodeBlock code={`type TableColumnsColumn<Data> = {
    id: Extract<keyof Data, string>;
    label: string;
    visible: boolean;
    render: (row: Data) => React.ReactNode;
};
            `} />
      <Text>{`{To jest najważniejszy typ w całej bibliotece — definiuje pojedynczą kolumnę tabeli i wiąże ją bezpośrednio z typem danych Data.
Użycie Extract<keyof Data, string> gwarantuje, że id kolumny zawsze odpowiada istniejącemu polu w danych, a jednocześnie wymusza, aby klucz był stringiem (co jest istotne dla drag‑and‑drop i identyfikacji kolumn).
render: (row: Data) => ReactNode daje pełną kontrolę nad UI i jest fundamentem headlessowości — logika tabeli jest typowana, ale wygląd pozostaje w rękach użytkownika biblioteki.
Ten typ pokazuje świadome projektowanie API, powiązanie danych z UI oraz wykorzystanie generics do zapewnienia bezpieczeństwa typów.`}</Text></Card>
      <Card my='4'>
  <CodeBlock code={`type TableFiltersFilters<Filters> = {
    [K in keyof Filters]: string;
};
`} /><Text>{`To główny typ opisujący API komponentu ProbablyATable.
Zawiera dwa niezależne generics: Data (typ danych wiersza) i Filters (typ filtrów). Od wersji 0.2 biblioteki filtry będą polami opcjonalnymi, zmienią się też nazwy typów na bardziej czytelne.
Ograniczenie Data extends { id: string | number } zapewnia, że każdy wiersz ma unikalny identyfikator — co jest kluczowe dla Reacta, sortowania i drag‑and‑drop.
Typ łączy wszystkie elementy biblioteki: kolumny, dane, filtry i paginację, a jednocześnie pozostaje prosty i przewidywalny dla użytkownika.
To przykład projektowania API, które jest jednocześnie elastyczne, typowane i odporne na błędy — oraz pokazuje, jak generics mogą spinać wiele modułów w spójny system.`}</Text></Card>
      
      <Card my='4'>
 <CodeBlock code={`interface ProbablyATableProps<Data extends { id: string | number }, Filters> {
    columns: TableColumnsColumns<Data>;
    data: TableData<Data>;
    filters: TableFiltersFilters<Filters>;
    defaultFilters: TableFiltersFilters<Filters>;
    paginationConfig?: TablePaginationPageSizeConfig;
}
`} /><Text>{`To przykład użycia mapped types do automatycznego generowania struktury filtrów na podstawie interfejsu Filters.
Każde pole w Filters staje się kluczem filtra, a jego wartością jest string — dzięki temu typy filtrów są zawsze spójne z danymi, a użytkownik biblioteki nie musi ręcznie powtarzać definicji.
To rozwiązanie jest proste, ale bardzo elastyczne i skalowalne — pozwala na dynamiczne tworzenie filtrów bez duplikacji typów i bez ryzyka literówek.
Ten typ pokazuje, że potrafię projektować API oparte na transformacji typów i wykorzystywać TypeScript jako system typów, a nie tylko jako „lepsze IntelliSense”.`}</Text></Card>
      


      <Heading size="6" mb="3">Pokrycie testami</Heading>
      <Text>Do testów usiadłam dopiero jak w miarę określiłam architekturę i skończyłam eksperymenty. Ten projekt był zbyt eksperymentalny na TDD, testy miały sesn dopiero po stabilizacji projektu.</Text>

      <Heading size="4" mb="3">Testy jednostkowe</Heading>
      <Text> Z hooków udało się wyodrębnić czyste funkcje, gdy już nie były poplątane ze stanami i do nich napisałam testy jednostowe.</Text>

      <CodeTest title1='toggleSortState.ts' title2='toggleSortState.test.ts' code={`import type { TableColumnsColumn } from "../../../types/columns";
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

      <Heading size="6" mb="3">Wyodrębnienie tabeli do osobnej biblioteki</Heading>
      <Text>Wydzieliłam kod tabeli do osobnego projektu bibliotecznego.</Text>

      <Heading size="4" mb="3">Stworzenie dema</Heading>
      <Text>Projekt biblioteki zawiera kod demonstracyjny, w który można od razu zobaczyć zmiany.</Text>

      <Heading size="4" mb="3">Bundling, yalc i npm link</Heading>
      <Text>Biblioteka jest budowana za pomocą tsup. Początkowo do testów poza demem, a zanim opubikowałam na npm, używałam narzędzia yalc, które znałam z pracy, i którym budowałam bibblioteki Angularowe. Ale okazało się, że yalc czasem nie widzi się z Vite i jest to znany problem dla tej pary, więc przeniosłam się na stabilniejszy npm link.</Text>

      <Heading size="4" mb="3">Dokumentacja i publikacja na npm</Heading>
      <Text>Biblioteka jest opublikowana na npm. Napisałam pełną dokumentację, roadmapę oraz changelog. Biblioteka ma już parę patchy, bo jak jej używam w innych projektach to zauważam rzeczy, któe mnie swędzą i je poprawiam. Dbam, żeby nie było zmian w API. Na pewno filtry staną się opcjonalne, reszty API nie planuję ruszać, a zmiana na opcjonalne nie zepsuje kodu w starszych wersjach.</Text>

      <Heading size="6" mb="3">Zademonstrowane umiejętności</Heading>
      <ul style={{ marginBottom: "2rem" }}>
        <li>Headless UI — separacja logiki od widoku</li>
        <li>Zaawansowane typowanie (generics, inferencja)</li>
        <li>Projektowanie API i architektury</li>
        <li>Custom hooks (useSort, useFilter, usePagination, useColumns)</li>
        <li>Testowalność i modularność</li>
        <li>Bundlowanie i publikacja na npm</li>
        <li>Refaktoryzacja dużego komponentu do biblioteki</li>
      </ul>

      <Heading size="4" mb="3">Podsumowanie</Heading>
      <Text as="p">
        Probably‑A‑Table to przykład mojego procesu: szybki prototyp → analiza →
        refaktoryzacja → architektura → biblioteka. Projekt pokazuje zarówno
        umiejętność szybkiego R&D, jak i tworzenia czystych, reużywalnych
        narzędzi dla innych developerów.
      </Text>

    </Card>
  );
}
