import { Text, Heading } from "@radix-ui/themes";

export function PATLib() {

    return (
        <>
            <Heading size="6" mb="3">Wyodrębnienie tabeli do osobnej biblioteki</Heading>
            <Text>Wydzieliłam kod tabeli do osobnego projektu bibliotecznego.</Text>

            <Heading size="4" mb="3">Stworzenie dema</Heading>
            <Text>Projekt biblioteki zawiera kod demonstracyjny, w który można od razu zobaczyć zmiany.</Text>

            <Heading size="4" mb="3">Bundling, yalc i npm link</Heading>
            <Text>Biblioteka jest budowana za pomocą tsup. Początkowo do testów poza demem, a zanim opubikowałam na npm, używałam narzędzia yalc, które znałam z pracy, i którym budowałam bibblioteki Angularowe. Ale okazało się, że yalc czasem nie widzi się z Vite i jest to znany problem dla tej pary, więc przeniosłam się na stabilniejszy npm link.</Text>

            <Heading size="4" mb="3">Dokumentacja i publikacja na npm</Heading>
            <Text>Biblioteka jest opublikowana na npm. Napisałam pełną dokumentację, roadmapę oraz changelog. Biblioteka ma już parę patchy, bo jak jej używam w innych projektach to zauważam rzeczy, któe mnie swędzą i je poprawiam. Dbam, żeby nie było zmian w API. Na pewno filtry staną się opcjonalne, reszty API nie planuję ruszać, a zmiana na opcjonalne nie zepsuje kodu w starszych wersjach.</Text>

        </>
    )
}