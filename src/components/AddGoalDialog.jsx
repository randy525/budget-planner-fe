import {
    Button,
    Card,
    CloseButton, createListCollection,
    Dialog,
    Field,
    Fieldset,
    HStack,
    Icon, IconButton, Input,
    NumberInput,
    Portal,
    Select,
    Text, useSelectContext
} from "@chakra-ui/react";
import {useRef, useState} from "react";
import {toaster} from "./ui/toaster.jsx";
import {Icon as SVGIcon} from "@iconify/react";
import {financialGoalIcons} from "../util/util.js";
import {addGoal} from "../api/index.js";

function AddGoalDialog({addNewGoal}) {
    const [selectedIcon, setSelectedIcon] = useState("lucide:target");
    const [goalName, setGoalName] = useState("");
    const [goalAmount, setGoalAmount] = useState(0);
    const [open, setOpen] = useState(false);

    const icons = createListCollection({
        items: financialGoalIcons,
        itemToString: (item) => item.icon,
        itemToValue: (item) => item.icon,
    })

    const handleAddGoal = async () => {
        try {
            const response = await addGoal(goalName, selectedIcon, goalAmount);
            setOpen(false);
            addNewGoal(response);
            toaster.create({
                description: "Goal added successfully",
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

    const SelectTrigger = () => {
        const select = useSelectContext()
        const items = select.selectedItems
        return (
            <IconButton
                width="6rem"
                height="6rem"
                variant="outline"
                {...select.getTriggerProps()}
            >
                {select.hasSelectedItems
                    ? <SVGIcon icon={items[0].icon} style={{ width: "5rem", height: "5rem"}}/>
                    : <SVGIcon icon={"lucide:target"} style={{ width: "5rem", height: "5rem"}}/>}
            </IconButton>
        )
    }

    const contentRef = useRef(null);

    return (
        <Dialog.Root preventScroll={false}
                     open={open}
                     onOpenChange={(e) => setOpen(e.open)}
                     unmountOnExit={true}
                     closeOnInteractOutside={false}
                     onExitComplete={() => {
                         setSelectedIcon("lucide:target");
                         setGoalName("")
                         setGoalAmount(0);
                     }}
        >
            <Dialog.Trigger asChild>
                <Card.Root w="10rem"
                           h="10rem"
                           shadow="md"
                           rounded="lg"
                           borderWidth="1px"
                           _hover={{shadow: "2xl", borderColor: "border.emphasized"}}
                           transition="0.3s"
                           backgroundColor="bg.emphasized"
                           cursor="pointer"
                           flexShrink="0"
                >
                    <Card.Body justifyContent="center" alignItems="center">
                        <Icon color="fg.subtle">
                            <SVGIcon width="100%" icon="lucide:plus"/>
                        </Icon>
                    </Card.Body>
                </Card.Root>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content ref={contentRef}>
                        <Dialog.Header>
                            <Dialog.Title display="flex" alignItems="center" justifyContent="center" w="full">
                                <HStack>
                                    <Text>Add new goal</Text>
                                </HStack>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Fieldset.Root>
                                <Fieldset.Content>
                                    <Select.Root
                                        positioning={{ sameWidth: false }}
                                        collection={icons}
                                        onValueChange={(e) => setSelectedIcon(e.value[0])}
                                        alignItems="center"
                                        defaultValue={["lucide:target"]}
                                    >
                                        <Select.HiddenSelect />
                                        <Select.Label fontSize="1.3rem" mb="2">Select icon</Select.Label>
                                        <Select.Control>
                                            <SelectTrigger />
                                        </Select.Control>
                                        <Portal container={contentRef}>
                                            <Select.Positioner>
                                                <Select.Content>
                                                    {icons.items.map((i) => (
                                                        <Select.Item cursor="pointer" item={i} key={i.icon}>
                                                            <SVGIcon icon={i.icon} style={{ width: "5rem", height: "5rem"}}/>
                                                        </Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select.Positioner>
                                        </Portal>
                                    </Select.Root>
                                    <Field.Root>
                                        <Field.Label>Goal name</Field.Label>
                                        <Input value={goalName}
                                               placeholder="Enter goal name"
                                               onChange={e => setGoalName(e.target.value)}
                                        />
                                    </Field.Root>
                                    <Field.Root>
                                        <Field.Label>Goal amount</Field.Label>
                                        <NumberInput.Root value={goalAmount ? goalAmount : ""} width="full" min={0}
                                                          onValueChange={(e) => setGoalAmount(e.valueAsNumber)}
                                                          placeholder="Enter goal amount">
                                            <NumberInput.Control/>
                                            <NumberInput.Input/>
                                        </NumberInput.Root>
                                    </Field.Root>
                                </Fieldset.Content>
                            </Fieldset.Root>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button disabled={!(selectedIcon && goalName && goalAmount)} colorPalette="teal"
                                    onClick={handleAddGoal}>Add</Button>
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

export default AddGoalDialog;