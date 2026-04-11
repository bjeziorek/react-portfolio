import { Card, Text, Heading, Flex } from "@radix-ui/themes";
import { Video } from "../shared/Video";
import { ExternalLink } from "lucide-react";
import { SidebarNavItem } from "../navigation/SidebarNavItem";
import { useTranslation } from "react-i18next";

export function VideoCaseStudy() {
    const { t } = useTranslation()

    return (
        <Card>
            <Flex direction="column" gap="4">
                <Heading size="6">{t('sudoku.title')}</Heading>

                <Text>{t('sudoku.intro1')}</Text>
                <Text>{t('sudoku.intro2')}</Text>
                <Heading size="4">{t('sudoku.h_plan')}</Heading>
                <Text>{t('sudoku.plan1')}</Text>
                <Flex gap="4" align="center">
                    <Text>{t('universal.plan')}</Text>


                    <SidebarNavItem
                        to="https://youtu.be/TZ2YIjxjXcg"
                        label={t('universal.youtube')}
                        icon={<ExternalLink size={18} />}
                        buttonVariant="outline"
                        isIconBehind={true}
                    />
                </Flex>
                <Text>{t('sudoku.plan2')}</Text>

                <Flex gap="4" align="center">
                    <Text>{t('universal.jira')}</Text>
                    <SidebarNavItem
                        to="https://youtu.be/yAgob3irRbk"
                        label={t('universal.youtube')}
                        icon={<ExternalLink size={18} />}
                        buttonVariant="outline"
                        isIconBehind={true}
                    />
                </Flex>


                <Heading size="4">{t('sudoku.h_rowCheck')}</Heading>
                <Text>{t('sudoku.rowCheck1')}</Text>
                <ul>
                    <li>{t('sudoku.list_rowCheck1')}</li>
                    <li>{t('sudoku.list_rowCheck2')}</li>
                    <ul>
                        <li>{t('sudoku.subList_RowCheck1')}</li>
                        <li>{t('sudoku.subList_RowCheck2')}</li>
                    </ul>
                </ul>
                <Text>{t('sudoku.rowCheck2')}</Text>
                <Text>{t('sudoku.rowCheck3')}</Text>

                <Video
                    title={"rowCheck"}
                    url={"https://www.youtube.com/embed/Z_uvgwrmnpM"}
                />
                <Heading size="4">{t('sudoku.h_twoVersions')}</Heading>
                <Text>{t('sudoku.twoVersions1')}</Text>
                <ul>
                    <li>{t('sudoku.list_twoVersions1')}</li>
                    <li>{t('sudoku.list_twoVersions2')}</li>
                </ul>
                <Text>{t('sudoku.twoVersions2')}</Text>

                <Video
                    title={"rowCheck"}
                    url={"https://www.youtube.com/embed/xI1I1bAxcQE"}
                />

                <Heading size="4">{t('sudoku.h_implementation')}</Heading>
                <Text>{t('sudoku.implementation1')}</Text>
                <Text>{t('sudoku.implementation2')}
                </Text>
                <Video
                    title={"rowCheck"}
                    url={"https://www.youtube.com/embed/it_YCPOTw8A"}
                />

                <Heading size="4">{t('sudoku.h_architecture')}</Heading>

                <Text>{t('sudoku.architecture1')}</Text>

                <ul>
                    <li>{t('sudoku.list1_architecture')}</li>
                    <li>{t('sudoku.list2_architecture')}</li>
                </ul>
                <Text>{t('sudoku.architecture2')}</Text>
                <ul>
                    <li>{t('sudoku.list3_architecture')}</li>
                    <li>{t('sudoku.list4_architecture')}</li>
                </ul>
                <Text>{t('sudoku.architecture3')}</Text>

                <Video
                    title={"rowCheck"}
                    url={"https://www.youtube.com/embed/Tr63YN1mnGg"}
                />

                <Heading size="4">{t('sudoku.h_colExtractor')}</Heading>

                <Text>{t('sudoku.colExtractor1')}</Text>
                <Text>{t('sudoku.colExtractor2')}</Text>

                <ul>
                    <li>{t('sudoku.list1_colExtractor')}</li>
                    <li>{t('sudoku.list2_colExtractor')}</li>
                    <li>{t('sudoku.list3_colExtractor')}</li>
                </ul>
                <Text>{t('sudoku.colExtractor3')}</Text>
                <Video
                    title={"rowCheck"}
                    url={"https://www.youtube.com/embed/_SFri3_WlRk"}
                />
                <Heading size="4">{t('sudoku.h_subsquares')}</Heading>

                <Text>{t('sudoku.subsquares1')}</Text>
                <Text>{t('sudoku.subsquares2')}</Text>

                <Video
                    title={"rowCheck"}
                    url={"6"}
                />
                <Heading size="4">{t('sudoku.h_subsquaresTests')}</Heading>

                <Text>{t('sudoku.subsquaresTests1')}</Text>
                <Text>{t('sudoku.subsquaresTests2')}</Text>

                <Video
                    title={"rowCheck"}
                    url={"7"}
                />
                <Heading size="4">{t('sudoku.h_debugging')}</Heading>

                <Text>{t('sudoku.debugging1')}</Text>
                <Text>{t('sudoku.debugging2')}</Text>
                <ul>
                    <li>{t('sudoku.list1_debugging')}</li>
                    <li>{t('sudoku.list2_debugging')}</li>
                    <li>{t('sudoku.list3_debugging')}</li>
                </ul>

                <Text>{t('sudoku.debugging3')}</Text>
                <Video
                    title={"rowCheck"}
                    url={"8"}
                />
                <Heading size="4">{t('sudoku.h_summary')}</Heading>

                <Text>{t('sudoku.summary1')}</Text>
                <ul>
                    <li>{t('sudoku.list1_summary')}</li>
                    <li>{t('sudoku.list2_summary')}</li>
                    <li>{t('sudoku.list3_summary')}</li>
                    <li>{t('sudoku.list4_summary')}</li>
                    <li>{t('sudoku.list5_summary')}</li>
                    <li>{t('sudoku.list6_summary')}</li>
                </ul>

                <Text>{t('sudoku.summary2')}</Text>


                <Flex gap="4" align="center">
                    <Text>{t('universal.part')} 1:</Text> <SidebarNavItem
                        to="https://youtu.be/FTf-m9J2W0g"
                        label={t('universal.youtube')}
                        icon={<ExternalLink size={18} />}
                        buttonVariant="outline"
                        isIconBehind={true}
                    />
                </Flex>

                <Flex gap="4" align="center"> <Text>{t('universal.part')} 2:</Text> <SidebarNavItem
                    to="https://youtu.be/0e4PROt-AtE"
                    label={t('universal.youtube')}
                    icon={<ExternalLink size={18} />}
                    buttonVariant="outline"
                    isIconBehind={true}
                />
                </Flex>
                <Text>{t('sudoku.summary3')}</Text>
                <Text>{t('sudoku.summary4')}</Text>
            </Flex>
        </Card>
    );
}