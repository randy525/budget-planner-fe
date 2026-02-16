import {
    Combobox,
    Field,
    Fieldset,
    HStack,
    Icon,
    InputGroup,
    NumberInput,
    useFilter,
    useListCollection
} from "@chakra-ui/react";
import {Icon as SVGIcon} from "@iconify/react";

function AddTransactionForm({categories, selectedCategory, setSelectedCategory, value, setValue}) {
    const {contains} = useFilter({sensitivity: "base"})

    const {collection, filter, reset} = useListCollection({
        initialItems: categories,
        filter: contains,
        itemToString: (category) => category.name,
        itemToValue: (category) => category,
    })

    return (
        <Fieldset.Root>
            <Fieldset.Content>
                <Field.Root>
                    <Field.Label>Category</Field.Label>
                    <Combobox.Root
                        collection={collection}
                        onInputValueChange={(e) => e.inputValue ? filter(e.inputValue) : reset()}
                        onValueChange={(e) => setSelectedCategory(e.items[0])}
                        unmountOnExit={true}
                        openOnClick
                    >
                        <Combobox.Control>
                            <InputGroup startElement={
                                <Icon size="md" color="fg">
                                    {selectedCategory ?
                                        <SVGIcon icon={selectedCategory.icon}/> :
                                        <SVGIcon icon="lucide:circle-help"/>}
                                </Icon>
                            }>
                                <Combobox.Input defaultValue={selectedCategory ? selectedCategory.name : ''} placeholder="Type to search"/>
                            </InputGroup>
                            <Combobox.IndicatorGroup>
                                <Combobox.ClearTrigger/>
                                <Combobox.Trigger/>
                            </Combobox.IndicatorGroup>
                        </Combobox.Control>
                        <Combobox.Positioner>
                            <Combobox.Content>
                                <Combobox.Empty>No items found</Combobox.Empty>
                                {collection.items.map((item) => (
                                    <Combobox.Item item={item} key={item.id}>
                                        <HStack>
                                            <Icon>
                                                <SVGIcon icon={item.icon}/>
                                            </Icon>
                                            {item.name}
                                        </HStack>
                                        <Combobox.ItemIndicator/>
                                    </Combobox.Item>
                                ))}
                            </Combobox.Content>
                        </Combobox.Positioner>
                    </Combobox.Root>
                </Field.Root>
                <Field.Root>
                    <Field.Label>Value</Field.Label>
                    <NumberInput.Root value={value} width="full" min={0} onValueChange={(e) => setValue(e.valueAsNumber)} >
                        <NumberInput.Control/>
                        <NumberInput.Input/>
                    </NumberInput.Root>
                </Field.Root>
            </Fieldset.Content>
        </Fieldset.Root>
    );
}

export default AddTransactionForm;