import {FC} from "react";
import {Box, Flex, IconButton, Stack, Text} from "@chakra-ui/react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import {DragHandleIcon} from "@chakra-ui/icons";
import {Teacher} from "entities/teacher";

interface WorkloadDnDProps {
    teachers: Teacher[];
    setTeachers: (teachers: Teacher[]) => void;
}

const WorkloadDnD: FC<WorkloadDnDProps> = ({teachers, setTeachers}) => {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const newTeachers = Array.from(teachers);
        const [removed] = newTeachers.splice(result.source.index, 1);
        newTeachers.splice(result.destination.index, 0, removed);
        setTeachers(newTeachers);
    };

    return (
        <Box>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <Stack ref={provided.innerRef} {...provided.droppableProps}>
                            {teachers.map((teacher, index) => (
                                <Draggable key={teacher.id} draggableId={teacher.id} index={index}>
                                    {(provided) => (
                                        <Flex
                                            p={4} bg="white"
                                            w="50%"
                                            gap={2}
                                            borderWidth="1px"
                                            borderStyle="solid"
                                            borderRadius="lg"
                                            userSelect="none"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        >
                                            <IconButton
                                                aria-label="drag"
                                                icon={<DragHandleIcon/>}
                                                p={0} bg="none"
                                                h="fit-content" w="fit-content"
                                                _hover={{bg: "none"}} _active={{bg: "none"}}
                                                {...provided.dragHandleProps}
                                            />
                                            <Text>{teacher.last_name} {teacher.first_name} {teacher.middle_name}</Text>
                                        </Flex>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
};

export default WorkloadDnD;
