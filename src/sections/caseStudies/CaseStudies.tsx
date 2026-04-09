import { Grid, Container, Heading } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { CaseStudy } from "./CaseStudy";


export function CaseStudies() {
    const { t } = useTranslation()

    return (
        <Container>
            <Heading>{t('menu.caseStudies')}</Heading>
            <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                <CaseStudy
                    title={"caseStudy.patCardTitle"}
                    description={"caseStudy.patCardDescription"}
                    skills={["caseStudy.refactor", "caseStudy.tests", "caseStudy.npmBundling", "caseStudy.typeGenerics"]}
                    links={[
                        {
                            isExternal: false,
                            name: "caseStudy.seeCaseStudy",
                            linkURL: "/pat",
                            buttonVariant:"solid"
                        },
                        {
                            isExternal: true,
                            name: "universal.blog",
                            linkURL: "",
                            buttonVariant:"outline"
                        },
                        {
                            isExternal: true,
                            name: "universal.github",
                            linkURL: "",
                            buttonVariant:"outline"
                        },
                        {
                            isExternal: true,
                            name: "universal.npm",
                            linkURL: "",
                            buttonVariant:"outline"
                        }
                    ]}
                />
                 <CaseStudy
                    title={"caseStudy.mlopsCardTitle"}
                    description={"caseStudy.mlopsCardDescription"}
                    skills={["caseStudy.backendAsync", "caseStudy.uiAnimations", "caseStudy.stateManaging", "caseStudy.backendIntegration"]}
                    links={[
                        {
                            isExternal: false,
                            name: "caseStudy.seeCaseStudy",
                            linkURL: "",
                            buttonVariant:"solid"
                        },
                        {
                            isExternal: true,
                            name: "universal.blog",
                            linkURL: "",
                            buttonVariant:"outline"
                        },
                        {
                            isExternal: true,
                            name: "universal.github",
                            linkURL: "",
                            buttonVariant:"outline"
                        }
                    ]}
                />
                 <CaseStudy
                    title={"caseStudy.sudokuCardTitle"}
                    description={"caseStudy.sudokuCardDescription"}
                    skills={["caseStudy.algorithms", "caseStudy.tdd", "caseStudy.jiraEstimations", "caseStudy.fromScratch"]}
                    links={[
                        {
                            isExternal: false,
                            name: "caseStudy.seeCaseStudy",
                            linkURL: "",
                            buttonVariant:"solid"
                        },
                        {
                            isExternal: true,
                            name: "universal.blog",
                            linkURL: "",
                            buttonVariant:"outline"
                        },
                        {
                            isExternal: true,
                            name: "universal.github",
                            linkURL: "",
                            buttonVariant:"outline"
                        }
                    ]}
                />
                 <CaseStudy
                    title={"caseStudy.chaperoneCardTitle"}
                    description={"caseStudy.chaperoneCardDescription"}
                    skills={["caseStudy.systemThinking", "caseStudy.workWithLegacy", "caseStudy.dx", "caseStudy.documenting"]}
                    links={[
                        {
                            isExternal: false,
                            name: "caseStudy.seeCaseStudy",
                            linkURL: "",
                            buttonVariant:"solid"
                        },
                        {
                            isExternal: true,
                            name: "universal.blog",
                            linkURL: "",
                            buttonVariant:"outline"
                        }
                    ]}
                />
            </Grid>
        </Container>
    )
}