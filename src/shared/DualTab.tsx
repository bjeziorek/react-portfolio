import { Box, Card, Tabs } from "@radix-ui/themes";
import { CodeBlock } from "./CodeBlock";
import { useTranslation } from "react-i18next";

interface BeforeAfterProps {
    tab1Code: string,
    tab2Code: string,
    commentBefore?: React.ReactNode
    commentAfter?: React.ReactNode
    dataType?:'codeTest'|'beforeAfter'
}

export function DualTab(props: BeforeAfterProps) {
    const { tab1Code, tab2Code, commentBefore = null, commentAfter = null, dataType='beforeAfter' } = props;
    const { t } = useTranslation();

    return (
        <Card mb='4'>
            <Tabs.Root defaultValue="after">
                <Tabs.List>
                    <Tabs.Trigger value={dataType==='beforeAfter'?"before":"code"}>{t('universal.'+dataType==='beforeAfter'?"before":"code")}</Tabs.Trigger>
                    <Tabs.Trigger value={dataType==='beforeAfter'?"after":"test"}>{t('universal.'+dataType==='beforeAfter'?"after":"test")}</Tabs.Trigger>
                </Tabs.List>

                <Box pt="3">
                    <Tabs.Content value={dataType==='beforeAfter'?"before":"code"}>
                        <CodeBlock code={tab1Code} />
                        <Box>{commentBefore}</Box>
                    </Tabs.Content>

                    <Tabs.Content value={dataType==='beforeAfter'?"after":"test"}>
                        <CodeBlock code={tab2Code} />
                        <Box>{commentAfter}</Box>
                    </Tabs.Content>

                </Box>
            </Tabs.Root>

        </Card>
    )

}