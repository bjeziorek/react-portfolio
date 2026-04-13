import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { useTheme } from "../providers/ThemeContext";

import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";


export default function Topbar() {

  const { theme, toggleTheme } = useTheme()
  const { i18n } = useTranslation();
  console.log(i18n.language.toUpperCase())



  const changeLanguage = (lng: 'pl' | 'en') => {
    i18n.changeLanguage(lng);
  };

  return (

    <header >
      <Flex justify='between' align="center" width='100%'>
        <Heading ml='4' size="6" color="crimson">Barbara Jeziorek - React Developer</Heading>

        <Box>
          <Button
            color="crimson"
            size='4'
            variant="ghost"
            onClick={toggleTheme}
            m='4'
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
          <Button
            color="crimson"
            size='4'
            variant="ghost"
            onClick={() => changeLanguage(i18n.language.toUpperCase() === "EN" ? "pl" : "en")}
            m='4'
          >
            {i18n.language.toUpperCase()}
          </Button>
        </Box>


      </Flex>
    </header>


  );
}
