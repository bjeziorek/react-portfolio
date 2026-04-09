import { Box, Card, Tabs } from "@radix-ui/themes";
import { CodeBlock } from "./CodeBlock";
import { useTranslation } from "react-i18next";

interface BeforeAfterProps {
    before: string,
    after: string,
    commentBefore?: React.ReactNode
    commentAfter?: React.ReactNode
}

export function BeforeAfter(props: BeforeAfterProps) {
    const { before, after, commentBefore = null, commentAfter = null } = props;
    const { t } = useTranslation();

    return (
        <Card mb='4'>
            <Tabs.Root defaultValue="before">
                <Tabs.List>
                    <Tabs.Trigger value="before">{t('universal.before')}</Tabs.Trigger>
                    <Tabs.Trigger value="after">{t('universal.after')}</Tabs.Trigger>

                </Tabs.List>

                <Box pt="3">
                    <Tabs.Content value="before">
                        <CodeBlock code={before} />
                        <Box>{commentBefore}</Box>
                    </Tabs.Content>

                    <Tabs.Content value="after">
                        <CodeBlock code={after} />
                        <Box>{commentAfter}</Box>
                    </Tabs.Content>


                </Box>
            </Tabs.Root>

        </Card>
    )

}