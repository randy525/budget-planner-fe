import {
    Button,
    CloseButton,
    Dialog,
    Field,
    Fieldset,
    IconButton,
    NumberInput,
    Portal,
    Text,
    VStack
} from "@chakra-ui/react";
import {useState} from "react";
import {toaster} from "./ui/toaster.jsx";
import {Icon as SVGIcon} from "@iconify/react";
import {updateCurrentGoalAmount} from "../api/index.js";
import {LuPlus} from "react-icons/lu";

function UpdateGoalDialog({updateGoal, goal}) {
    const [savedAmount, setSavedAmount] = useState(goal.currentAmount);
    const [open, setOpen] = useState(false);

    const handleUpdateGoal = async () => {
        try {
            const response = await updateCurrentGoalAmount(goal.id, savedAmount);
            setOpen(false);
            updateGoal(response)
            toaster.create({
                description: "Goal updated successfully",
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
        >
            <Dialog.Trigger asChild>
                <IconButton variant="ghost" size="xs" colorPalette="teal">
                    <LuPlus/>
                </IconButton>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content w="20rem">
                        <Dialog.Header>
                            <Dialog.Title display="flex" alignItems="center" justifyContent="center" w="full">
                                <Text>Update goal</Text>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <VStack justifyContent="center" m="4" gap={4}>
                                <Text fontSize="xl">{goal.name}</Text>
                                <SVGIcon width="4rem" icon={goal.icon} />
                            </VStack>
                            <Fieldset.Root>
                                <Fieldset.Content>
                                    <Field.Root alignItems="center" w="full">
                                        <Field.Label>Current saved amount</Field.Label>
                                        <NumberInput.Root value={savedAmount ? savedAmount : ""} min={0}
                                                          onValueChange={(e) => setSavedAmount(e.valueAsNumber)}
                                                          placeholder="Enter saved amount">
                                            <NumberInput.Control/>
                                            <NumberInput.Input/>
                                        </NumberInput.Root>
                                    </Field.Root>
                                </Fieldset.Content>
                            </Fieldset.Root>
                        </Dialog.Body>
                        <Dialog.Footer justifyContent="center" w="full">
                            <Button disabled={!savedAmount} colorPalette="teal"
                                    onClick={handleUpdateGoal}>Update</Button>
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

export default UpdateGoalDialog;