import { Flex, Heading, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

export function PATSubcomponentCut() {
    const { t } = useTranslation();
    return (
        <Flex direction="column">
            <Heading size="6">{t("pat.h_components")}</Heading>
            <Text>{t("pat.components1")}</Text>
            <Text>{t("pat.components2")}</Text>
            <Text>{t("pat.components3")}</Text>
            <ul>
                <li>{t("pat.list1_components")}</li>
                <li>{t("pat.list2_components")}</li>
                <li>{t("pat.list3_components")}</li>
                <li>{t("pat.list4_components")}</li>
            </ul>
            <Heading size="4">{t("pat.h2_components1")}</Heading>


            <figure>
                <img
                    src="PAT-architecture.png"
                    alt="Diagram architektury biblioteki probably‑a‑table"
                />
                <figcaption>
                    {t("pat.components4")}
                </figcaption>
            </figure>
            <Heading size="4">{t("pat.h2_components2")}</Heading>
            <Text>{t("pat.components5")}</Text>

            <ul>
                <li>{t("pat.list5_components")}</li>
                <li>{t("pat.list6_components")}</li>
                <li>{t("pat.list7_components")}</li>
                <li>{t("pat.list8_components")}</li>
            </ul>
            <Text>{t("pat.components6")}</Text>
            <ul>
                <li>{t("pat.list9_components")}</li>
                <li>{t("pat.list10_components")}</li>
                <li>{t("pat.list11_components")}</li>
                <li>{t("pat.list12_components")}</li>
            </ul>
            <Text>{t("pat.components7")}</Text>
        </Flex>
    )
}