import { Heading , Text} from "@radix-ui/themes";

export function PATSubcomponentCut() {

    return (
        <>
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
        </>
    )
}