
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Brain, FlaskConical, Home, Puzzle, HeartPlus, BookSearch, LibraryBig, Book } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { SidebarNavItem } from "./SidebarNavItem";

export default function Sidebar() {

    const { t } = useTranslation();

    return (
        <Box
            className="hidden md:flex"
            width="280px"
            p="4"
            m="4"
            style={{
                borderRight: "1px solid var(--gray-6)",
                borderRadius: "var(--radius-3)",
                background: "var(--color-panel-solid)",
            }}
        >
            <Flex direction="column" gap="3" width="100%">
                <Heading
                    color="crimson" size="4" mb="2" weight="medium" trim="both">
                    {t("menu.navigation")}
                </Heading>

                <SidebarNavItem
                    to="/"
                    label={t("menu.main")}
                    icon={<Home size={18} />}
                />

                <SidebarNavItem
                    to="/caseStudies"
                    label={t("menu.caseStudies")}
                    icon={<Brain size={18} />}
                />

                <SidebarNavItem
                    to="/faq"
                    label={t("menu.faq")}
                    icon={<Book size={18} />}
                />
            </Flex>
        </Box>
    );
}
