import { Card, Text, Heading } from "@radix-ui/themes";
import { CodeBlock } from "../../../../shared/CodeBlock";
import { useTranslation } from "react-i18next";

export function PATUntanglingHooks() {
    const { t } = useTranslation()

    return (
        <>
            <Heading size="6" color="crimson">{t("pat.h_hooks")}</Heading>
            <Text>{t("pat.hooks1")}</Text>
            <Text>{t("pat.hooks2")}</Text>
            <ul>
                <li>{t("pat.list1_hooks")}</li>
                <li>{t("pat.list2_hooks")}</li>
                <li>{t("pat.list3_hooks")}</li>
                <li>{t("pat.list4_hooks")}</li>
                <li>{t("pat.list5_hooks")}</li>
            </ul>
            <Text>{t("pat.hooks3")}</Text>
            <Text>{t("pat.hooks4")}</Text>
            <Heading size="4" color="crimson">{t("pat.h2_hooks1")}</Heading>
            <Text>{t("pat.hooks5")}</Text>
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
            </Card>
            <Heading size="4" color="crimson">{t("pat.h2_hooks2")}</Heading>
            <Text>{t("pat.hooks6")}</Text>
            <Text>{t("pat.hooks7")}</Text>
            <ul>
                <li>{t("pat.list6_hooks")}</li>
                <li>{t("pat.list7_hooks")}</li>
                <li>{t("pat.list8_hooks")}</li>
                <li>{t("pat.list9_hooks")}</li>
                <li>{t("pat.list10_hooks")}</li>
                <li>{t("pat.list11_hooks")}</li>
                <li>{t("pat.list12_hooks")}</li>
                <li>{t("pat.list13_hooks")}</li>
            </ul>
            <Text>{t("pat.hooks8")}</Text>
            <ul>
                <li>{t("pat.list14_hooks")}</li>
                <li>{t("pat.list15_hooks")}</li>
                <li>{t("pat.list16_hooks")}</li>
                <li>{t("pat.list17_hooks")}</li>
                <li>{t("pat.list18_hooks")}</li>
            </ul>

            <Text>{t("pat.hooks9")}</Text>
        </>
    )
}