import {Card, Heading, HStack, Icon, IconButton, Progress, Text, VStack} from "@chakra-ui/react";
import {LuCircleCheckBig, LuX} from "react-icons/lu";
import {Icon as SVGIcon} from "@iconify/react";
import UpdateGoalDialog from "./UpdateGoalDialog.jsx";
import {deleteGoalById} from "../api/index.js";
import {toaster} from "./ui/toaster.jsx";

function GoalItem({goal, updateGoal, deleteGoal}) {

    const handleDeleteGoal = async () => {
        try {
            await deleteGoalById(goal.id);
            deleteGoal(goal.id)
            toaster.create({
                description: "Goal deleted successfully",
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
        <Card.Root w="15rem"
                   shadow="md"
                   rounded="lg"
                   borderWidth="1px"
                   _hover={{shadow: "2xl", borderColor: "border.emphasized"}}
                   transition="0.3s"
                   flexShrink="0"
        >
            <IconButton position="absolute" right="0" w="fit-content" variant="ghost" size="md"
                        colorPalette="gray" onClick={handleDeleteGoal}>
                <LuX/>
            </IconButton>
            <Card.Header justifyContent="center" alignItems="center">
                <Heading size="2xl">{goal.name}</Heading>
            </Card.Header>
            <Card.Body justifyContent="center" alignItems="center">
                <VStack w="full">
                    <Icon color="teal.fg">
                        <SVGIcon width="80%" icon={goal.icon}/>
                    </Icon>
                    <HStack w="full" alignItems="center" justifyContent="center">
                        {goal.done
                            ? (<>
                                <Text textAlign="center"
                                      fontSize="lg"
                                      color="green"
                                >
                                    Achieved
                                </Text>
                                <LuCircleCheckBig color="green" />
                            </>)
                            : (<>
                                <Text textAlign="center"
                                      fontSize="lg"
                                      color="gray"
                                >
                                    {goal.currentAmount}$ / {goal.goalAmount}$
                                </Text>
                                <UpdateGoalDialog goal={goal} updateGoal={updateGoal} />
                            </>)}

                    </HStack>
                    <Progress.Root value={goal.percentAchieved} size="xl" w="100%" colorPalette="teal">
                        <Progress.Track>
                            <Progress.Range/>
                        </Progress.Track>
                    </Progress.Root>
                </VStack>
            </Card.Body>
        </Card.Root>
    );
}

export default GoalItem;