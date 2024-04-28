
import { FIELD_CONSTRAINTS, FIELD_TYPES } from '@/constants';
import useGraphContext from '@/context/GraphContext';

import { Accordion, ActionIcon, Button, Group, NativeSelect, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconBackspace, IconCirclePlus, IconTrash } from '@tabler/icons-react';
import React, { useRef } from 'react'
 

const CustomSelect = ({ data, ref }) => {
    return <NativeSelect
        ref={ref}
        data={data}
        rightSectionWidth={28}
        styles={{
            input: {
                fontWeight: 500,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                
            },
        }}
    />
}

const QueryHandler = () => {

    const {
        queryList,
        updateQueryName,
        addNewQuery,
        removeQuery,
        addParameter,
        removeQueryParameter,
        addQueryParameter,
    } = useGraphContext();
    const fieldNameRef = useRef();
    const fieldTypeRef = useRef();
    const fieldConstraintRef = useRef();

    return (
        <div>
            <Title order={2} mt={30}>Query Handler</Title>
            <Accordion defaultActiveKey="0">
                {
                    queryList.map((query, index) => {
                        return <Accordion.Item key={index} value={query.name + index}>
                            <Accordion.Control>
                                <Title order={3}>{query.name}</Title>
                                 
                            </Accordion.Control>
                            <Accordion.Panel>
                                <TextInput my={10} rightSection={
                                    <ActionIcon color='red' onClick={e => removeQuery(index)}>
                                        <IconTrash size={15} />
                                    </ActionIcon>
                                } label="Update Query name" value={query.name} onChange={e => updateQueryName(index, e.target.value)} />
                                <Stack>
                                    {
                                        query.parameters.map((paramater, paramIndex) => {
                                            return <Group justify='space-between'>
                                                <Text>{paramater.name} : {paramater.type}</Text>
                                                <Button variant='light' color='red' onClick={e => removeQueryParameter(index, paramIndex)}>
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
                                            onClick={e => addQueryParameter(index, fieldNameRef.current.value, fieldTypeRef.current.value)}>
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
             
             
            <Button mt={20} onClick={addNewQuery}
                leftSection={
                    <ActionIcon>
                        <IconCirclePlus size={20} />
                    </ActionIcon>
                }
            >Add Query</Button>

        </div>
    )
}

export default QueryHandler;