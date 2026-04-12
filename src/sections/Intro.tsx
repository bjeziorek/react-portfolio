import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { SidebarNavItem } from "../navigation/SidebarNavItem";
import { Book, Brain, ChessQueen, ExternalLink, LibraryBig } from "lucide-react";


export function Intro() {
    const { t } = useTranslation()
    return (



        <Flex direction="column" gap="4" m="4">
            <Heading size="6">{t("intro.aboutMe")}</Heading>
            <Card>
                <Box m='4'>
                    <Flex direction="column" gap="4">
                         <Heading size="4" my="0">{t("intro.me")}</Heading>
                        <Text>{t("intro.about1")}</Text>
                        <Text>{t("intro.about2")}</Text>
                        {/* <Text>{t("intro.about3")}</Text> */}
                        {/* <Text>{t("intro.about4")}</Text> */}
                    </Flex>
                </Box>
            </Card>
            <Card>
                <Box m='4'>
                    <Flex direction="column" gap="4">
                         <Heading size="4" my="0">{t("intro.drive")}</Heading>
                        <Text>{t("intro.about5")}</Text>
                        <Text>{t("intro.about6")}</Text>
                        <Text>{t("intro.about7")}</Text>
                    </Flex>

                </Box>
            </Card>

            <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                <Card>
                    <Flex direction="column" gap="4" justify="between" height="100%">
                        <Heading size="4" my="0">{t("intro.architecture")}</Heading>
                        <Text>{t("intro.in_1")}</Text>
                        <SidebarNavItem
                            to="/pat"
                            label="Probably-A-Table"
                            icon={<LibraryBig size={18} />}
                            buttonVariant="outline"
                        />
                    </Flex>
                </Card>
                <Card>
                    <Flex direction="column" gap="4" justify="between"  height="100%">
                        <Heading size="4" my="0">{t("intro.video")}</Heading>
                        <Text>{t("intro.in_2")}</Text>
                        <SidebarNavItem
                            to="/video"
                            label="Sudoku"
                            icon={<ChessQueen size={18} />}
                            buttonVariant="outline"
                        />
                    </Flex>
                </Card>
                <Card>
                    <Flex direction="column" gap="4" justify="between"  height="100%">
                        <Heading size="4" my="0">{t("intro.more")}</Heading>
                        <Text>{t("intro.in_3")}</Text>
                        <SidebarNavItem
                            to="/caseStudies"
                            label={t("menu.caseStudies")}
                            icon={<Brain size={18} />}
                            buttonVariant="outline"
                        />
                    </Flex>
                </Card>
                <Card>
                  
                    <Flex direction="column" gap="4" justify="between"  height="100%"> 
                         <Heading size="4" my="0">{t("intro.qnd")}</Heading>
                        <Text>{t("intro.in_4")}</Text>
                        <SidebarNavItem
                            to="/faq"
                            label="FAQ"
                            icon={<Book size={18} />}
                            buttonVariant="outline"
                        />
                    </Flex>
                </Card>
                <Card>
                    
                    <Flex direction="column" gap="4" justify="between"  height="100%">
                        <Heading size="4" my="0">{t("intro.brain")}</Heading>
                        <Text>{t("intro.in_5")}</Text>
                        <SidebarNavItem
                            to="https://randomindexed.blogspot.com/"
                            label="Blog"
                            icon={<ExternalLink size={18} />}
                            buttonVariant="outline"
                            isIconBehind={true}
                        />
                    </Flex>
                </Card>
            </Grid>
        </Flex>

    )
}