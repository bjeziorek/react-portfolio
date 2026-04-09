import { Box, Text, Card, Flex, Heading } from "@radix-ui/themes";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SidebarNavItem, type ButtonVariant } from "../../navigation/SidebarNavItem";

interface Link {
    isExternal: boolean,
    name: string,
    linkURL: string,
    buttonVariant: ButtonVariant,
    isIconBehind?: boolean
}

interface CaseStudyProps {
    title: string,
    description: string,
    skills: string[],
    links: Link[]
}

export function CaseStudy(props: CaseStudyProps) {
    const { t } = useTranslation();
    const { title, description, skills, links } = props;

    return (
        <Card>
            <Box mx="4">
                <Heading size="4">{t(title)}</Heading>
                <Flex gap="5" direction="column" mb="4">
                    <Text>{t(description)}</Text>
                    <Box>
                        <Text>{t("caseStudy.skillsDemonstrated")}:</Text>
                        <ul>
                            {skills.map(skill => (
                                <li>
                                    <Text>{t(skill)}</Text>
                                </li>
                            ))}
                        </ul>
                    </Box>
                    <Flex gap="3" wrap="wrap">
                        {links.map(link => {
                            return link.isExternal
                                ? (
                                    <SidebarNavItem
                                        to={link.linkURL}
                                        label={t(link.name)}
                                        icon={link.isExternal ? <ExternalLink size={18} /> : null}
                                        buttonVariant={link.buttonVariant}
                                        isIconBehind={link.isIconBehind}
                                    />
                                )
                                : (
                                    <SidebarNavItem
                                        to={link.linkURL}
                                        label={t(link.name)}
                                        icon={link.isExternal ? <ExternalLink size={18} /> : null}
                                        buttonVariant={link.buttonVariant}
                                        isIconBehind={link.isIconBehind}
                                    />
                                )
                        })}
                    </Flex>
                </Flex>
            </Box>
        </Card>
    )
}