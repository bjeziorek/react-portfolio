import { Text, Heading, Flex } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

export function PATLib() {
    const { t } = useTranslation()
    return (
        <Flex direction='column'>
            <Heading size="6" color="crimson">{t('pat.h_lib')}</Heading>
            <Text>{t('pat.lib2')}</Text>
            <Text>{t('pat.lib3')}</Text>
            <Heading size="4" color="crimson">{t('pat.h2_lib1')}</Heading>
            <Text>{t('pat.lib4')}</Text>
            <Text>{t('pat.lib5')}</Text>
            <ul>
                <li>{t('pat.list1_lib')}</li>
                <li>{t('pat.list2_lib')}</li>
                <li>{t('pat.list3_lib')}</li>
            </ul>
            <Text>{t('pat.lib6')}</Text>
            <Heading size="4" color="crimson">{t('pat.h2_lib4')}</Heading>
            <Text>{t('pat.lib7')}</Text>
            <Text>{t('pat.lib8')}</Text>
            <Text>{t('pat.lib9')}</Text>
            <ul>
                <li>{t('pat.list5_lib')}</li>
                <li>{t('pat.list6_lib')}</li>
                <li>{t('pat.list7_lib')}</li>
            </ul>
            <Text>{t('pat.lib10')}</Text>
            <Heading size="4" color="crimson">{t('pat.h2_lib2')}</Heading>
            <Text>{t('pat.lib12')}</Text>
            <ul>
                <li>{t('pat.list9_lib')}</li>
                <li>{t('pat.list10_lib')}</li>
                <li>{t('pat.list11_lib')}</li>
                <li>{t('pat.list12_lib')}</li>
                <li>{t('pat.list13_lib')}</li>
            </ul>
            <Text>{t('pat.lib13')}</Text>
            <Text>{t('pat.lib14')}</Text>
            <Text>{t('pat.lib15')}</Text>

        </Flex>
    )
}