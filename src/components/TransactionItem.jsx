import {HStack, Icon, IconButton, Text} from "@chakra-ui/react";
import {LuClock, LuTrash2} from "react-icons/lu";
import {Icon as SVGIcon} from '@iconify/react';
import {formatTime} from "../util/util.js";
import {deleteTransaction} from "../api/index.js";
import {toaster} from "./ui/toaster.jsx";

function TransactionItem({transactionInfo, deleteTransaction: deleteTransactionFromList, userInfo, updateBalance}) {
    const timeStr = formatTime(transactionInfo.time);

    const handleDeleteTransaction = async () => {
        try {
            await deleteTransaction(transactionInfo.id);
            updateBalance(userInfo.balance - transactionInfo.value);
            deleteTransactionFromList(transactionInfo);
            toaster.create({
                description: "Transaction was deleted successfully",
                type: "info",
            })
        } catch (error) {
            console.log(error);
            toaster.create({
                description: "Something went wrong",
                type: "error",
            })
        }
    }

    return (
        <HStack w="full"
                h="16"
                p="4"
                shadow="sm"
                rounded="lg"
                borderWidth="2px"
                borderColor="bg"
                _hover={{shadow: "md", borderColor: "border.emphasized", cursor: "pointer"}}
                transition="0.3s"
        >
            <HStack w="40">
                <Icon size="xl">
                    <SVGIcon icon={transactionInfo.categoryIcon}/>
                </Icon>
                <Text>{transactionInfo.categoryName}</Text>
            </HStack>
            <Text m="auto"
                  w="30"
                  textStyle="lg"
                  text-align="center"
                  color={transactionInfo.income ? "teal.fg" : "red.fg"}>
                {(transactionInfo.income ? "+" : "") + transactionInfo.value + " $"}
            </Text>
            <HStack w="40" gap="4" justifyContent="end">
                <Icon size="md">
                    <LuClock/>
                </Icon>
                <Text>{timeStr}</Text>
                {/*<IconButton variant="outline" size="md" colorPalette="yellow">*/}
                {/*    <LuPencil />*/}
                {/*</IconButton>*/}
                <IconButton variant="ghost" size="md" colorPalette="red" onClick={handleDeleteTransaction}>
                    <LuTrash2 />
                </IconButton>
            </HStack>

        </HStack>
    )
}

export default TransactionItem