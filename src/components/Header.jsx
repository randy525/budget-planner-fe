import {Flex, Heading, HStack, IconButton, Text, VStack} from "@chakra-ui/react";
import {ColorModeButton} from "./ui/color-mode.jsx";
import {LuLogOut} from "react-icons/lu";
import {Icon as SVGIcon} from "@iconify/react";

function Header() {
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return (
        <Flex position="fixed"
              bg="bg.panel"
              w="full"
              h="16"
              top="0"
              left="0"
              shadow="md"
              justify="space-between"
              align="center"
              p="6"
              zIndex="docked"
        >
            <HStack color="teal.fg">
                <SVGIcon width="2rem" icon="lucide:wallet"/>
                <Heading size="3xl">Cledget</Heading>
            </HStack>

            <HStack gap="5">
                <IconButton size="sm"
                            variant="solid"
                            colorPalette="teal"
                            onClick={handleLogout}
                >
                    <LuLogOut  />
                </IconButton>
                <ColorModeButton variant="solid" colorPalette="teal"/>
            </HStack>
        </Flex>
    )
}

export default Header