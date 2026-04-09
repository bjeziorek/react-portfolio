import { Card, Heading, Text } from "@radix-ui/themes";
import { BeforeAfter } from "../../shared/BeforeAfter";

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
  `import { Table } from "@radix-ui/themes";
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
            <TableHeader
                setDragged={setDragged}
                handleDrop={handleDrop}
                columns={columns}
                toggleSort={toggleSort}
                sort={sort}
            />
            <TableBody
                paginated={paginated}
                columns={columns}
            />
        </Table.Root>
    )
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
        komponencie i całkowicie nie re-używalne (co jest normalne dla prototypów R&D - case study z Sudoku demonstruje z kolei odwrotne podejście z ładnym kodem od początku i w duchu TDD - ja dostosowuję podejście do typu projektu i poziomu eksperymentalności). To była tabela dla konkretnych danych. Rozbiłam ją na części, zrobiłam reużywalną i skróciłam do około 40 linijek.
      </Text>

      <BeforeAfter
        before={before1}
        after={after1}
        commentAfter={commentAfter1}
        commentBefore={commentBefore1}
      />

      <Heading size="4" mb="3">Rozplątywanie funkcji statefull i customowe hooki</Heading>

      <Heading size="4" mb="3">Podział na pod-komponenty i API tabeli</Heading>

      <Heading size="4" mb="3">Typowanie</Heading>

      <Heading size="6" mb="3">Pokrycie testami</Heading>

      <Heading size="4" mb="3">Testy jednostkowe</Heading>

      <Heading size="4" mb="3">Testy integracyjne</Heading>

      <Heading size="4" mb="3">Testy RTL</Heading>

      <Heading size="6" mb="3">Wyodrębnienie tabeli do osobnej biblioteki</Heading>

      <Heading size="4" mb="3">Stworzenie dema</Heading>

      <Heading size="4" mb="3">Bundling, yalc i npm link</Heading>

      <Heading size="4" mb="3">Dokumentacja i publikacja na npm</Heading>

      <Heading size="6" mb="3">Demo i zademonstrowane umiejętności</Heading>
      // tu tabela z lp, opisem i tagami 
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
