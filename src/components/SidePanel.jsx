import {Heading, SkeletonText, Text, VStack} from "@chakra-ui/react";
import AddTransactionDialog from "./AddTransactionDialog.jsx";

function SidePanel({userInfo, isUserInfoLoading, ...props}) {
    return (
        <VStack position="fixed"
                bg="bg.panel"
                w="60"
                h="full"
                top="0"
                right="0"
                shadow="md"
                p="6"
                paddingTop="20"
        >
            {isUserInfoLoading
                ? <>
                    <SkeletonText/>
                </>
                : <>
                    <Heading>Hi, {userInfo.name}!</Heading>
                    <Text>{Math.round(userInfo.balance * 100) / 100} $</Text>
                    <AddTransactionDialog categories={props.categories}
                                          isCategoriesLoading={props.isCategoriesLoading}
                                          addNewTransaction={props.addNewTransaction}
                                          updateBalance={props.updateBalance}
                    />
                </>
            }
        </VStack>
    )
}

export default SidePanel