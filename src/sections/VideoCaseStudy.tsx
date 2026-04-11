import { Card, Text, Heading, Flex } from "@radix-ui/themes";
import { t } from "i18next";
import { Video } from "../shared/Video";
import { ExternalLink } from "lucide-react";
import { SidebarNavItem } from "../navigation/SidebarNavItem";

export function VideoCaseStudy() {

    return (
        <>
            <Card>
                <Flex direction="column" gap="4">
                    <Heading size="6">Sudoku case study</Heading>

                    <Text>This case study shows my real TDD process while building a Sudoku board generator — recorded as an 8 hour timelapse and presented here as short highlights.</Text>

                    <Heading size="4">Planning & estimation</Heading>

                    <Flex gap="4" align="center">
                        <Text>
                            Here you can see how I plan the project on piece of paper (timelapse speeded up x6):
                        </Text>
                        <SidebarNavItem
                            to="https://youtu.be/TZ2YIjxjXcg"
                            label={t('universal.youtube')}
                            icon={<ExternalLink size={18} />}
                            buttonVariant="outline"
                            isIconBehind={true}
                        />
                    </Flex>

                    <Flex gap="4" align="center">
                        <Text>
                            And here you can see how I fill Jira and how I estimate tasks (timelapse speeded up 6x):</Text>
                        <SidebarNavItem
                            to="https://youtu.be/yAgob3irRbk"
                            label={t('universal.youtube')}
                            icon={<ExternalLink size={18} />}
                            buttonVariant="outline"
                            isIconBehind={true}
                        />
                    </Flex>

                    <Heading size="4">Pierwszy krok TDD: rowCheck</Heading>
                    <Text>
                        I start from making rowCheck, as it’s the easiest of all checks – just checking if the row is correct: had 9 unique digits.
                    </Text>
                    <Text>I write rowCheck taking as argument row of type number[] and for now doing nothing (as I do it in TDD style) and just returning false.</Text>
                    <Text> Then I create test expecting false for [1,1,2,3,4,5,6,7,8] – double “1” are unacceptable – and expecting true for [1,2,3,4,5,6,7,8,9].</Text>
                    <Text>  I also wanted to make a test checking if all elements are numbers but types doesn’t allow to feed the function with something what is not a number.</Text>
                    <Text>Strong types cut a lot of testing edge cases so tests are much quicker and easier.</Text>
                    <Video
                        title={"rowCheck"}
                        url={"https://www.youtube.com/embed/Z_uvgwrmnpM"}
                    />
                    <Heading size="4">Dwie wersje rowCheck</Heading>
                    <Text>
                        But in that moment I realized that I will need rowCheck for checking generated board, but I’ll also need a rowCheck for player, when such function will need to accept empty fields to let the player know he misses something. So I’ll need 2 versions. I added to Jira player’s version to not forget about it and also decided to add JSDocs annotation to both functions to know what’s they are for and how to use them, just in case. Not it looks obvious but… it’s better to have JSDocs.
                    </Text>
                      <Video
                        title={"rowCheck"}
                        url={"https://www.youtube.com/embed/xI1I1bAxcQE"}
                    />

                    <Heading size="4">Implementacja rowCheck</Heading>
                    <Text> Now I write rowCheck body, where I filter row for each ad check if result’s length is exactly 1.
                    </Text>
                     <Video
                        title={"rowCheck"}
                        url={"https://www.youtube.com/embed/it_YCPOTw8A"}
                    />

                    <Heading size="4">Architecture change</Heading>

                    <Text>
                        In that moment I realized that columnCheck and subSquare check also can be checked in this way, so instead of writing something similar 3 times I decided to make universal array checker plus data extractors instead of full checking functions. So I renamed rowCheck to arrayCheck, updated JSDocs.
                    </Text>
                     <Video
                        title={"rowCheck"}
                        url={"https://www.youtube.com/embed/Tr63YN1mnGg"}
                    />

                    <Heading size="4"> Column extractor test and custom types</Heading>
                    <Text>
                        I again start from test expecting array made from column. In this moment I decide to create custom types because I prefer having types guarding that array elements can be only between 1 and 9 instead predicting all edge cases and developer / user creativity.
                    </Text>
                     <Video
                        title={"rowCheck"}
                        url={"https://www.youtube.com/embed/_SFri3_WlRk"}
                    />

                    <Heading size="4"> Column extractor function and one more type</Heading>

                    <Text>tooooooooooooooodoooooooooooo</Text>

                    <Heading size="4">Summary</Heading>
                    <Text>
                        This project demonstrates my real TDD workflow, architectural thinking, and ability to design clean, typed APIs for algorithmic problems.
                    </Text>
                    <Text>
                        And here is full timelapse with speed x10 from this part of work:
                    </Text>
                    <Flex gap="4" align="center">
                        <Text>Part 1:</Text> <SidebarNavItem
                            to="https://youtu.be/FTf-m9J2W0g"
                            label={t('universal.youtube')}
                            icon={<ExternalLink size={18} />}
                            buttonVariant="outline"
                            isIconBehind={true}
                        />
                    </Flex>

                    <Flex gap="4" align="center"> <Text>Part 2:</Text> <SidebarNavItem
                        to="https://youtu.be/0e4PROt-AtE"
                        label={t('universal.youtube')}
                        icon={<ExternalLink size={18} />}
                        buttonVariant="outline"
                        isIconBehind={true}
                    />
                    </Flex>
                    <Text>On the beginning I was really stressed that I’m recorded and I did a few stupid things (but quickly corrected them), then I got accustomed to being recorded and work went smooth in further part of recording. It also shows that it’s not polished hightlights made for portfolio case but fragments of real long process you can see in full context.
                    </Text>
                </Flex>
            </Card>
        </>
    );
}