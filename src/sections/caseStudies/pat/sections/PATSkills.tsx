import { Text, Heading } from "@radix-ui/themes";

export function PATSkills() {

    return (
        <>
           
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

        </>
    )
}