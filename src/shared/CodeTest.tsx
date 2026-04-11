import { Box, Card, Text, Tabs } from "@radix-ui/themes";
import { CodeBlock } from "./CodeBlock";
import { useTranslation } from "react-i18next";

interface CodeTestProps {
    code: string,
    test: string,
    title1: string,
    title2: string
}

export function CodeTest(props: CodeTestProps) {
    const { code, test, title1, title2 } = props;
    const { t } = useTranslation();

    return (
        <Card my='4'>
            <Tabs.Root defaultValue="before">
                <Tabs.List>
                    <Tabs.Trigger value="code">{t('universal.code')}</Tabs.Trigger>
                    <Tabs.Trigger value="test">{t('universal.test')}</Tabs.Trigger>
                </Tabs.List>

                <Box pt="3">
                    <Tabs.Content value="code">
                        <Text>{title1}</Text>
                        <CodeBlock code={code} />
                    </Tabs.Content>

                    <Tabs.Content value="test">
                        <Text>{title2}</Text>
                        <CodeBlock code={test} />
                    </Tabs.Content>

                </Box>
            </Tabs.Root>

        </Card>
    )

}