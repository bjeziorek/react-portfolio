import { Text, Heading, Flex } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

export function PATSkills() {

    const { t } = useTranslation()
    return (
        <Flex direction='column'>
            <Heading size="6">{t('pat.h_skills')}</Heading>
            <Text>{t('pat.skills1')}</Text>
            <ul>
                <li>{t('pat.list1_skills')}</li>
                <li>{t('pat.list2_skills')}</li>
                <li>{t('pat.list3_skills')}</li>
                <li>{t('pat.list4_skills')}</li>
                <li>{t('pat.list5_skills')}</li>
                <li>{t('pat.list6_skills')}</li>
                <li>{t('pat.list7_skills')}</li>
                <li>{t('pat.list8_skills')}</li>
            </ul>
            <Heading size="4">{t('pat.h2_skills2')}</Heading>
            <Text>{t('pat.skills2')}</Text>
            <Text>{t('pat.skills3')}</Text>

            <ul>
                <li>{t('pat.list9_skills')}</li>
                <li>{t('pat.list10_skills')}</li>
            </ul>
            <Text>{t('pat.skills4')}</Text>
        </Flex>
    )
}