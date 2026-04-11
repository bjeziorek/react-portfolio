import { Grid, Container, Text, Heading, Flex, Box } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { CaseStudy } from "./CaseStudy";
import { Boxes, Brain, ChartNoAxesCombined, Code, LucideGamepad2 } from "lucide-react";


export function CaseStudies() {
    const { t } = useTranslation()

    return (
        <Container>
            <Heading>{t('menu.caseStudies')}</Heading>
            <Box mb="4">
            <Heading size="4">
                <Flex align="center" justify="center"  mb="-4">
                    <Code />
                    <Text ml="2">{t('caseStudy.reactCore')}</Text>
                </Flex>
            </Heading>
                <Text>{t("caseStudy.reactCoreDescription")}</Text>
            </Box>
            <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                <CaseStudy
                    title={"caseStudy.patCardTitle"}
                    description={"caseStudy.patCardDescription"}
                    skills={["caseStudy.refactor", "caseStudy.tests", "caseStudy.npmBundling", "caseStudy.typeGenerics"]}
                    techStack={["React 19", "tsup", "Vite", "Vitest", "RTL", "Radix"]}
                    links={[
                        {
                            isExternal: false,
                            name: "caseStudy.seeCaseStudy",
                            linkURL: "/pat",
                            buttonVariant: "solid"
                        },
                        {
                            isExternal: true,
                            name: "universal.blog",
                            linkURL: "",
                            buttonVariant: "outline",
                            isIconBehind: true
                        },
                        {
                            isExternal: true,
                            name: "universal.github",
                            linkURL: "",
                            buttonVariant: "outline",
                            isIconBehind: true
                        },
                        {
                            isExternal: true,
                            name: "universal.npm",
                            linkURL: "",
                            buttonVariant: "outline",
                            isIconBehind: true
                        }
                    ]}
                />
                <CaseStudy
                    title={"caseStudy.mlopsCardTitle"}
                    description={"caseStudy.mlopsCardDescription"}
                    skills={["caseStudy.backendAsync", "caseStudy.uiAnimations", "caseStudy.stateManaging", "caseStudy.backendIntegration"]}
                    techStack={["React 19", "Flask microservices", "Node.js API Gateway", "Radix", "Framer Motion", "Machine Learning", "Vitest", "RTL", "i18n"]}
                    links={[
                        {
                            isExternal: true,
                            name: "universal.blog",
                            linkURL: "",
                            buttonVariant: "outline",
                            isIconBehind: true
                        },
                        {
                            isExternal: true,
                            name: "universal.github",
                            linkURL: "",
                            buttonVariant: "outline",
                            isIconBehind: true
                        },
                        {
                            isExternal: true,
                            name: "universal.youtube",
                            linkURL: "",
                            buttonVariant: "outline",
                            isIconBehind: true
                        }
                    ]}
                />
            </Grid>
            <Box mb="4">
            <Heading size="4">
                <Flex align="center" justify="center"  mb="-4">
                    <Boxes />
                    <Text ml="2">{t('caseStudy.reactCommercial')}</Text>
                </Flex>
            </Heading>
                <Text>{t("caseStudy.reactCommercialDescription")}</Text>
            </Box>
            <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                <CaseStudy
                    title={"caseStudy.visixCardTitle"}
                    description={"caseStudy.visixCardDescription"}
                    skills={["caseStudy.optimalisation", "caseStudy.debug", "caseStudy.legacyReact", "caseStudy.tasks"]}
                    techStack={["React 16", "JavaScript", "REST API", "Redux", "React DevTools"]}
                    links={[]}
                />
                <CaseStudy
                    title={"caseStudy.comfortelCardTitle"}
                    description={"caseStudy.comfortelCardDescription"}
                    skills={["caseStudy.migration", "caseStudy.typeScript", "caseStudy.logicSeparation", "caseStudy.complexCode"]}
                    techStack={["React 17", "TypeScript", "JavaScript (legacy)", "Webpack", "Docker / Docker Compose"]}
                    links={[]}
                />
            </Grid>
            <Box mb="4">
            <Heading size="4">
                <Flex align="center" justify="center" mb="-4">
                    <Brain />
                    <Text ml="2">{t('caseStudy.problemSolving')}</Text>
                </Flex>
            </Heading>
                <Text>{t("caseStudy.problemSolvingDescription")}</Text>
            </Box>

            <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                <CaseStudy
                    title={"caseStudy.sudokuCardTitle"}
                    description={"caseStudy.sudokuCardDescription"}
                    skills={["caseStudy.JSDocs", "caseStudy.tdd", "caseStudy.jiraEstimations", "caseStudy.fromScratch"]}
                    techStack={["React 19", "Radix", "Vitest"]}
                    links={[
                        {
                            isExternal: false,
                            name: "caseStudy.seeCaseStudy",
                            linkURL: "",
                            buttonVariant: "solid"
                        },
                        {
                            isExternal: true,
                            name: "universal.github",
                            linkURL: "",
                            buttonVariant: "outline",
                            isIconBehind: true
                        }
                    ]}
                />
                <CaseStudy
                    title={"caseStudy.chaperoneCardTitle"}
                    description={"caseStudy.chaperoneCardDescription"}
                    skills={["caseStudy.systemThinking", "caseStudy.workWithLegacy", "caseStudy.dx", "caseStudy.documenting"]}
                    techStack={["Angular", "Groovy Angular SSR", "Docker / Docker Compose", "Jenkins", "PrimeNG", "Tailwind"]}
                    links={[
                        {
                            isExternal: true,
                            name: "universal.blog",
                            linkURL: "",
                            buttonVariant: "outline",
                            isIconBehind: true
                        }
                    ]}
                />
            </Grid>
            <Box mb="4">
            <Heading size="4">
                <Flex align="center" justify="center" mb="-4">
                    <ChartNoAxesCombined />
                    <Text ml="2">{t('caseStudy.end2endSolutions')}</Text>
                </Flex>
            </Heading>
                <Text>{t("caseStudy.end2endSolutionsDescription")}</Text>
            </Box>
            <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                <CaseStudy
                    title={"caseStudy.makoCardTitle"}
                    description={"caseStudy.makoCardDescription"}
                    skills={["caseStudy.rndFrameworks", "caseStudy.end2end", "caseStudy.grant", "caseStudy.highImpact"]}
                    techStack={["jQuery", "PHP", "fullstack hosting"]}
                    links={[
                        {
                            isExternal: true,
                            name: "universal.blog",
                            linkURL: "",
                            buttonVariant: "outline",
                            isIconBehind: true
                        }
                    ]}
                />
                <CaseStudy
                    title={"caseStudy.labirynthCardTitle"}
                    description={"caseStudy.labirynthCardDescription"}
                    skills={["caseStudy.deployment", "caseStudy.performanceOptimization", "caseStudy.multiskill", "caseStudy.publishingProcess"]}
                    techStack={["Unity3D", "C#", "Android Studio"]}
                    links={[
                        {
                            isExternal: true,
                            name: "universal.youtube",
                            linkURL: "",
                            buttonVariant: "outline",
                            isIconBehind: true
                        }
                    ]}
                />
            </Grid>
            <Box mb="4">
                <Heading size="4">
                    <Flex align="center" justify="center" mb="-4">
                        <LucideGamepad2 />
                        <Text ml="2">{t('caseStudy.gameDev')}</Text>
                    </Flex>
                </Heading>
                <Text>{t("caseStudy.gameDevDescription")}</Text>
            </Box>
            <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                <CaseStudy
                    title={"caseStudy.originCardTitle"}
                    description={"caseStudy.originCardDescription"}
                    skills={["caseStudy.underPressure", "caseStudy.quickLearning", "caseStudy.leadership", "caseStudy.ownership"]}
                    techStack={["LOVE", "Lua"]}
                    links={[
                        {
                            isExternal: true,
                            name: "universal.blog",
                            linkURL: "",
                            buttonVariant: "outline",
                            isIconBehind: true
                        }
                    ]}
                />
                <CaseStudy
                    title={"caseStudy.crowCardTitle"}
                    description={"caseStudy.crowCardDescription"}
                    skills={["caseStudy.rnd", "caseStudy.toolsRepurposing", "caseStudy.underConstrains", "caseStudy.designPatterns"]}
                    techStack={["MelonJS", "JavaScript"]}
                    links={[
                        {
                            isExternal: true,
                            name: "universal.blog",
                            linkURL: "",
                            buttonVariant: "outline",
                            isIconBehind: true
                        }
                    ]}
                />
            </Grid>
        </Container>
    )
}