import {Heading, VStack, Text, HStack, Box} from "@chakra-ui/react";
import TransactionItem from "./TransactionItem.jsx";
import {dateToString} from "../util/util.js";

function TransactionList({transactions, deleteTransaction, userInfo, updateBalance}) {
    return (
        <VStack maxW="70%" m="0 auto" gap="5" mt="10" mb="10">
            <Heading size="4xl">Transactions</Heading>
            {Object.entries(transactions)
                .sort(([date1], [date2]) => date2.localeCompare(date1))
                .map(([date, transactionList]) => {
                return (
                    <VStack w="full" gap="5" key={date}>
                        <HStack w="full" justifyContent="space-between">
                            <Heading minW="20"
                                     as="h3"
                                     display="flex"
                                     justifyContent="center"
                                     color="teal.fg"
                            >
                                {dateToString(date)}
                            </Heading>
                        </HStack>
                        <VStack w="full" key={date} alignItems="start">
                            {transactionList.map((transaction) =>
                                <TransactionItem key={transaction.id}
                                                 transactionInfo={transaction}
                                                 deleteTransaction={deleteTransaction}
                                                 userInfo={userInfo}
                                                 updateBalance={updateBalance}
                                ></TransactionItem>
                            )}
                        </VStack>
                    </VStack>
                )
            })}
        </VStack>
    )
}

export default TransactionList