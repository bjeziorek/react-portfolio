import { Button, Flex } from "@radix-ui/themes";
import { useTheme } from "../providers/ThemeContext";

import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";


export default function Topbar() {

  const { theme, toggleTheme } = useTheme()
   const { i18n } = useTranslation();
console.log(i18n.language.toUpperCase())



  const changeLanguage = (lng:'pl'|'en') => {
    i18n.changeLanguage(lng);
  };

  return (

    <header >
      <Flex justify='end' width='100%'>
        <Button 
        size='4'
        variant="ghost"
        onClick={toggleTheme}
        m='4'
        >
          {theme === "light" ? <Moon/> : <Sun/>}
        </Button>

 <Button 
        size='4'
        variant="ghost"
        onClick={()=>changeLanguage(i18n.language.toUpperCase()==="EN"?"pl":"en")}
        m='4'
        >
         {i18n.language.toUpperCase()}
        </Button>


     
      </Flex>
    </header>


  );
}
