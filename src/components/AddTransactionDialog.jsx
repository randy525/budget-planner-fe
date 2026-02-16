import {Button, CloseButton, Dialog, HStack, IconButton, Portal, Skeleton, Tabs, Text} from "@chakra-ui/react";
import {LuMinus, LuPlus} from "react-icons/lu";
import {useState} from "react";
import {addTransaction} from "../api/index.js";
import {toaster} from "./ui/toaster.jsx";
import AddTransactionForm from "./AddTransactionForm.jsx";

function AddTransactionDialog({categories, isCategoriesLoading, addNewTransaction, updateBalance}) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(false);

    const handleAddTransaction = async () => {
        try {
            const response = await addTransaction(selectedCategory.id, value);
            addNewTransaction(response.transaction);
            updateBalance(response.newBalance);
            setOpen(false);
            toaster.create({
                description: "Transaction added successfully",
                type: "success",
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
        <Dialog.Root preventScroll={false}
                     open={open}
                     onOpenChange={(e) => setOpen(e.open)}
                     unmountOnExit={true}
                     closeOnInteractOutside={false}
                     onExitComplete={() => {setSelectedCategory(null); setValue(null)}}
        >
            <Dialog.Trigger asChild>
                <IconButton disabled={isCategoriesLoading} colorPalette="teal" w="full" mt="10">
                    <LuPlus/>
                </IconButton>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title display="flex" alignItems="center" justifyContent="center" w="full">
                                <HStack>
                                    <Text>Add new transaction</Text>
                                </HStack>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {isCategoriesLoading ? (
                                <>
                                    <Skeleton height="5"/>
                                    <Skeleton height="5"/>
                                </>
                            ) : (
                                <Tabs.Root defaultValue="expense"
                                           variant="outline"
                                           onValueChange={() => {
                                               setValue(null);
                                               setSelectedCategory(null);
                                           }}
                                >
                                    <Tabs.List>
                                        <Tabs.Trigger value="expense">
                                            <LuMinus />
                                            Expense
                                        </Tabs.Trigger>
                                        <Tabs.Trigger value="income">
                                            <LuPlus />
                                            Income
                                        </Tabs.Trigger>
                                    </Tabs.List>
                                    <Tabs.Content value="expense">
                                        <AddTransactionForm categories={categories.filter(c => !c.isIncome)}
                                                            selectedCategory={selectedCategory}
                                                            setSelectedCategory={setSelectedCategory}
                                                            value={value}
                                                            setValue={setValue}
                                                            key={selectedCategory}
                                        />
                                    </Tabs.Content>
                                    <Tabs.Content value="income">
                                        <AddTransactionForm categories={categories.filter(c => c.isIncome)}
                                                            selectedCategory={selectedCategory}
                                                            setSelectedCategory={setSelectedCategory}
                                                            value={value}
                                                            setValue={setValue}
                                                            key={selectedCategory}
                                        />
                                    </Tabs.Content>
                                </Tabs.Root>
                            )}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button disabled={!(value && selectedCategory)} colorPalette="teal" onClick={handleAddTransaction}>Add</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm"/>
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default AddTransactionDialog;