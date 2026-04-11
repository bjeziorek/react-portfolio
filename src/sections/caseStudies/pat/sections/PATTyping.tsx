import { Card, Text, Heading } from "@radix-ui/themes";
import { CodeBlock } from "../../../../shared/CodeBlock";
import { useTranslation } from "react-i18next";

export function PATTyping() {
    const { t } = useTranslation()
    return (
        <>
            <Heading size="6">{t('pat.h_types')}</Heading>
            <Text>{t('pat.types1')}</Text>
            <Text>{t('pat.types2')}</Text>
            <Text>{t('pat.types3')}</Text>
            <Heading size="4">{t('pat.h2_types1')}</Heading>
            <Card my='4'>
                <CodeBlock code={`type TableColumnsColumn<Data> = {
                id: Extract<keyof Data, string>;
                label: string;
                visible: boolean;
                render: (row: Data) => React.ReactNode;
            };
                        `} />
            </Card>
            <Text>{t('pat.types4')}</Text>
            <Text>{t('pat.types5')}</Text>
            <ul>
                <li>{t('pat.list1_types')}</li>
                <ul>
                    <li>{t('pat.sublist1_types')}</li>
                    <li>{t('pat.sublist2_types')}</li>
                    <li>{t('pat.sublist3_types')}</li>
                </ul>
                <li>{t('pat.list2_types')}</li>
            </ul>
            <Text>{t('pat.types6')}</Text>
            <Heading size="4">{t('pat.h2_types2')}</Heading>
            <Card my='4'>
                <CodeBlock code={`type TableFiltersFilters<Filters> = {
                [K in keyof Filters]: string;
            };
            `} /></Card>
            <Text>{t('pat.types7')}</Text>
            <Text>{t('pat.types8')}</Text>
            <Text>{t('pat.types9')}</Text>
            <ul>
                <li>{t('pat.list1_types1')}</li>
                <li>{t('pat.list2_types1')}</li>
                <li>{t('pat.list3_types1')}</li>
                <li>{t('pat.list4_types1')}</li>
            </ul>
            <Text>{t('pat.types10')}</Text>
            <Heading size="4">{t('pat.h2_types3')}</Heading>
            <Card my='4'>
                <CodeBlock code={`interface ProbablyATableProps<Data extends { id: string | number }, Filters> {
                columns: TableColumnsColumns<Data>;
                data: TableData<Data>;
                filters: TableFiltersFilters<Filters>;
                defaultFilters: TableFiltersFilters<Filters>;
                paginationConfig?: TablePaginationPageSizeConfig;
            }
            `} />
            </Card>
            <Text>{t('pat.types11')}</Text>
            <Text>{t('pat.types12')}</Text>
             <ul>
                <li>{t('pat.list5_types1')}</li>
                <li>{t('pat.list6_types1')}</li>
                <li>{t('pat.list7_types1')}</li>
            </ul>
             <Text>{t('pat.types13')}</Text>
             <Text>{t('pat.types14')}</Text>
               <ul>
                <li>{t('pat.list8_types1')}</li>
                <li>{t('pat.list9_types1')}</li>
                <li>{t('pat.list11_types1')}</li>
                <li>{t('pat.list12_types1')}</li>
            </ul>
        </>
    )
}