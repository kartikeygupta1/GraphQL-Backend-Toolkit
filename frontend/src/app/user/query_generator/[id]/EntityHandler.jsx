'use client';
import { Editor } from '@monaco-editor/react';
import { MDBCard, MDBCardBody, MDBCheckbox, MDBRadio } from 'mdb-react-ui-kit';
import React, { use, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { crudOperations } from '../CrudGenerator';
import { CopyBlock, dracula } from 'react-code-blocks';
import useGraphContext from '@/context/GraphContext';
import { FIELD_TYPES } from '@/constants';
import { Accordion, ActionIcon, Box, Button, Grid, Group, NativeSelect, Stack, Text, TextInput, Title, rem } from '@mantine/core';
import { IconBackspace, IconCirclePlus, IconTrash } from '@tabler/icons-react';

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
                width: rem(92),
                marginRight: rem(-2),
            },
        }}
    />
}

const EntityHandler = () => {

    const fieldNameRef = useRef(null);
    const fieldTypeRef = useRef(null);

    const {
        entityList,
        addNewEntity,
        addEntityField,
        updateEntityName,
        updateEntityField,
        removeEntityField,
        removeEntity,
    } = useGraphContext();


    //Generate Entity Fields
    const generateSchemaCode = () => {
        return entityList.map((entity) => {
            return `
        const ${entity.name} = new mongoose.Schema({
            ${entity.fields.map((field) => {
                return `${field.name}: ${field.type}\n\t\t`
            })}
        })
        module.exports = mongoose.model('${entity.name.toLowerCase()}',${entity.name});`
        })
    }


    const generateMongoDBSchema = () => {
        return `
        const mongoose = require('mongoose');
        ${generateSchemaCode()}
        `
    }

    return (
        <>
            <Grid p={4}>
                <Grid.Col span={{ base: 12, md: 3 }}>

                    <h4>Operations</h4>
                    <Accordion defaultValue="0">
                        {
                            entityList.map((entity, index) => {
                                return <Accordion.Item key={index} value={entity.name + index}>
                                    <Accordion.Control>
                                        <Title order={3}>{entity.name}</Title>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <TextInput my={10} rightSection={
                                            <ActionIcon color='red' onClick={e => removeEntity(index)}>
                                                <IconTrash size={15} />
                                            </ActionIcon>
                                        } label="Update Entity Name" value={entity.name} onChange={e => updateEntityName(index, e.target.value)} />
                                        <Stack>
                                            {
                                                entity.fields.map((field) => {
                                                    return <Group justify='space-between'>
                                                        <Text>{field.name} : {field.type}</Text>
                                                        <Button variant='light' color='red' onClick={e => removeEntityField(index, entity.fields.indexOf(field))}>
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
                                                    onClick={e => addEntityField(index, fieldNameRef.current.value, fieldTypeRef.current.value)}>
                                                    <IconCirclePlus size={15} />
                                                </ActionIcon>

                                            } rightSectionWidth={92} />
                                    </Accordion.Panel>
                                </Accordion.Item>
                            })
                        }
                    </Accordion>
                    <Button onClick={addNewEntity}>Add Entity</Button>

                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 9 }}>
                    <Title >GraphQLSchema.js Code</Title>
                    <CopyBlock
                        theme={dracula}
                        text={generateMongoDBSchema()}
                        language={'JavaScript'}
                        showLineNumbers={true}
                        wrapLines
                    />

                </Grid.Col>
            </Grid>


        </>
    )
}

export default EntityHandler



