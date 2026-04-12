import { Flex, Heading, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next"

function FAQ() {
    const { t } = useTranslation();
    return (
        <>
            <Heading size='6'>{t("faq.title")}</Heading>
            <Flex direction="column" gap="4">
                <Flex direction="column">
                    <Heading size="4">{t('faq.q1')}</Heading>
                    <Text>{t('faq.a1_1a')}</Text>
                    <Text>{t('faq.a1_1b')}</Text>
                    <Text>{t('faq.a1_2')}</Text>
                    <Text>{t('faq.a1_3')}</Text>
                    <Text>{t('faq.a1_4')}</Text>
                    <Text>{t('faq.a1_5')}</Text>
                </Flex>
                <Flex direction="column">
                    <Heading size="4">{t('faq.q2')}</Heading>
                    <Text>{t('faq.a2_1')}</Text>
                    <Text>{t('faq.a2_2')}</Text>
                    <Text>{t('faq.a2_3')}</Text>
                    <Text>{t('faq.a2_4')}</Text>
                    <Text>{t('faq.a2_5')}</Text>
                    <Text>{t('faq.a2_6')}</Text>
                    <Text>{t('faq.a2_7')}</Text>
                </Flex>
                <Flex direction="column">
                    <Heading size="4">{t('faq.q3')}</Heading>
                    <Text>{t('faq.a3_1')}</Text>
                    <Text>{t('faq.a3_2')}</Text>
                    <Text>{t('faq.list_a3_1')}</Text>
                    <Text>{t('faq.list_a3_2')}</Text>
                    <Text>{t('faq.list_a3_3')}</Text>
                    <Text>{t('faq.a3_3')}</Text>
                    <Text>{t('faq.a3_4')}</Text>
                </Flex>

                <Flex direction="column">
                    <Heading size="4">{t('faq.q4')}</Heading>
                    <Text>{t('faq.a4_1')}</Text>
                    <Text>{t('faq.a4_2')}</Text>
                    <Text>{t('faq.a4_3')}</Text>
                    <Text>{t('faq.a4_4')}</Text>
                    <Text>{t('faq.a4_5')}</Text>
                    <Text>{t('faq.a4_6')}</Text>
                    <Text>{t('faq.a4_7')}</Text>
                    <Text>{t('faq.list_a4_1')}</Text>
                    <Text>{t('faq.list_a4_2')}</Text>
                    <Text>{t('faq.list_a4_3')}</Text>
                    <Text>{t('faq.a4_8')}</Text>
                </Flex>
            </Flex>
        </>

    )
}

export default FAQ