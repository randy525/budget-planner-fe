import {Card, Heading, HStack, Icon, Loader, VStack} from "@chakra-ui/react";
import {Icon as SVGIcon} from '@iconify/react';
import GoalItem from "./GoalItem.jsx";
import {useEffect, useState} from "react";
import {getGoals} from "../api/index.js";
import AddGoalDialog from "./AddGoalDialog.jsx";

function GoalList() {
    const [goals, setGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const goalsResponse = await getGoals();
                setGoals(goalsResponse);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchGoals();
    }, [])

    const addNewGoal = (goal) => {
        setGoals([...goals, goal]);
    }

    const updateGoal = (goal) => {
        const updatedGoals = goals.filter(g => !(g.id === goal.id));
        updatedGoals.push(goal)
        updatedGoals.sort((a, b) => a.id - b.id)
        setGoals(updatedGoals);
    }

    const deleteGoal = (id) => {
        const goalsWithoutSelected = goals.filter(g => !(g.id === id));

        setGoals(goalsWithoutSelected);
    }


    return (
        <VStack maxW="70%" m="0 auto" gap="5" mt="10">
            <Heading size="4xl">Goals</Heading>
            <HStack w="100%" gap="5" overflowX="scroll" p="2rem 0" scrollBehavior="smooth" scrollSnapType="x">
                {isLoading
                    ? <Loader/>
                    : goals.map((goal) => (
                        <GoalItem key={goal.id} goal={goal} updateGoal={updateGoal} deleteGoal={deleteGoal}/>
                    ))
                }
                <AddGoalDialog addNewGoal={addNewGoal} updateGoal={updateGoal} />
            </HStack>
        </VStack>
    );
}

export default GoalList;