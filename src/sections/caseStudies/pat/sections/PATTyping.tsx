import { Card, Text, Heading } from "@radix-ui/themes";
import { CodeBlock } from "../../../../shared/CodeBlock";

export function PATTyping() {

    return (
        <>
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
            `} /><Text>
                    {`To przykład użycia mapped types do automatycznego generowania struktury filtrów na podstawie interfejsu Filters.
            Każde pole w Filters staje się kluczem filtra, a jego wartością jest string — dzięki temu typy filtrów są zawsze spójne z danymi, a użytkownik biblioteki nie musi ręcznie powtarzać definicji.
            To rozwiązanie jest proste, ale bardzo elastyczne i skalowalne — pozwala na dynamiczne tworzenie filtrów bez duplikacji typów i bez ryzyka literówek.
            Ten typ pokazuje, że potrafię projektować API oparte na transformacji typów i wykorzystywać TypeScript jako system typów, a nie tylko jako „lepsze IntelliSense”.`}
                </Text>
            </Card>
        </>
    )
}