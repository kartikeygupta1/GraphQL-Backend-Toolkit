import { FIELD_CONSTRAINTS, FIELD_TYPES } from '@/constants';
import useGraphContext from '@/context/GraphContext';
import { ActionIcon, Stack, TextInput, Title } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import React, { useRef } from 'react'
import { Accordion } from 'react-bootstrap'

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
                                {/* <input type="text" className='form-control' value={mutation.name} onChange={
                                    e => updateMutationName(index, e.target.value)
                                } />
                                <button className='btn btn-danger' onClick={e => removeMutation(index)}>Remove</button> */}
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
             
            <button className='btn btn-primary' onClick={addNewQuery}>Add Query</button>

        </div>
    )
}

export default QueryHandler