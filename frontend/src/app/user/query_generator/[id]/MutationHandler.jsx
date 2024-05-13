import { FIELD_TYPES } from '@/constants';
import useGraphContext from '@/context/GraphContext';
import { Accordion, ActionIcon, Button, Divider, Flex, Group, NativeSelect, Stack, Text, TextInput, Title, rem } from '@mantine/core';
import { IconBackspace, IconCirclePlus, IconTrash } from '@tabler/icons-react';
import { MDBCard, MDBCardBody, MDBRadio } from 'mdb-react-ui-kit';
import React, { forwardRef, useRef } from 'react'

const mutationOptions = ['add', 'update', 'delete'];
const queryOptions = ['readAll', 'readByField', 'readById'];

const CustomSelect = forwardRef(({ data }, ref) => {
    return <NativeSelect
        ref={ref}
        data={data}
        rightSectionWidth={28}
        styles={{
            input: {
                fontWeight: 500,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                width: rem(92),
                marginRight: rem(-2),
            },
        }}
    />
})



const MutationHandler = () => {

    const { mutationList,
        addNewMutation,
        updateMutationName,
        removeMutation,
        removeMutationParameter,
        addMutationParameter
    } = useGraphContext();

    const fieldNameRef = useRef(null);
    const fieldTypeRef = useRef(null);
    const mutationNameRef = useRef(null);


    return (
        <>
        
            <Divider mt={30} mb={60} />
            <Title order={2} mt={30}>Mutation Handler</Title>

            <Accordion defaultActiveKey="0">
                {
                    mutationList.map((mutation, index) => {
                        return <Accordion.Item key={index} value={mutation.name + index}>
                            <Accordion.Control>
                                <Title order={3}>{mutation.name}</Title>
                                {/* <input type="text" className='form-control' value={mutation.name} onChange={
                                    e => updateMutationName(index, e.target.value)
                                } />
                                <button className='btn btn-danger' onClick={e => removeMutation(index)}>Remove</button> */}
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Flex my={10} align={'flex-end'} w={'100%'}>

                                    <TextInput ref={mutationNameRef}
                                        defaultValue={mutation.name}
                                        rightSection={
                                            <ActionIcon color='red' onClick={e => removeMutation(index)}>
                                                <IconTrash size={15} />
                                            </ActionIcon>
                                        } label="Update Mutation Name" />
                                    <Button onClick={e => updateMutationName(index, mutationNameRef.current.value)} ml={10}>Rename</Button>
                                </Flex>
                                <Stack>
                                    {
                                        mutation.parameters.map((paramater, paramIndex) => {
                                            return <Group justify='space-between'>
                                                <Text>{paramater.name} : {paramater.type}</Text>
                                                <Button variant='light' color='red' onClick={e => removeMutationParameter(index, paramIndex)}>
                                                    <IconBackspace size={15} />
                                                </Button>
                                            </Group>
                                        })
                                    }
                                </Stack>
                                <TextInput my={10} rightSection={
                                    <CustomSelect data={
                                        FIELD_TYPES.map((type) => ({ value: type, label: type }))
                                    } ref={fieldTypeRef} />
                                } ref={fieldNameRef}
                                    leftSection={
                                        <ActionIcon color='green'
                                            onClick={e => addMutationParameter(index, fieldNameRef.current.value, fieldTypeRef.current.value)}>
                                            <IconCirclePlus size={15} />
                                        </ActionIcon>

                                    } rightSectionWidth={92} />
                                {/* <div className="row">
                                    <div className="col-md-4">
                                        {
                                            mutationOptions.map((option) => (

                                                <MDBRadio label={option} name={mutation.name} checked={mutation.type === option}
                                                    onChange={
                                                        e => {
                                                            const newMutationList = [...mutationList];
                                                            newMutationList[index].type = option;
                                                            setMutationList(newMutationList);
                                                        }
                                                    }
                                                />
                                            ))
                                        }

                                    </div>
                                    <div className="col-md-4"></div>
                                </div> */}
                            </Accordion.Panel>
                        </Accordion.Item>
                    })
                }
            </Accordion>
            <Button mt={20} onClick={addNewMutation}
                leftSection={
                    <ActionIcon>
                        <IconCirclePlus size={20} />
                    </ActionIcon>
                }
            >Add Mutation</Button>

        

        </>
    )
}

export default MutationHandler;