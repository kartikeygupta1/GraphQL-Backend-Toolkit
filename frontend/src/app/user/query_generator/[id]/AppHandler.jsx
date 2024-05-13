
import React from 'react'
import useGraphContext from '@/context/GraphContext';
import { CopyBlock, dracula } from 'react-code-blocks';
import { Box, Grid, Text, TextInput, Title } from '@mantine/core';

const AppHandler = () => {

    const { mongoDbUrl, setMongoDbUrl } = useGraphContext();

    const generateAppCode = () => {
        return `const express  = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const schema = require('./graphQLSchema');
const url = "${mongoDbUrl}";
mongoose.connect(url)
.then((result) => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Error connecting to the database');
});

const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
});

server.listen({port: 9000}).then(({url}) => console.log("Server is running"));
mongoose.exports = mongoose;`
    }

    return (
        <Grid p={4} gutter={20}>
            <Grid.Col span={{ base: 12, md: 3 }}>
                <Text>To get started, provide the MongoDB URL for the database you want to connect to.</Text>
                <TextInput label="MongoDB URL" type="text" value={mongoDbUrl} onChange={(e) => {
                    setMongoDbUrl(e.target.value);
                }}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 9 }}>
                <CopyBlock
                    theme={dracula}
                    text={generateAppCode()}
                    language={'JavaScript'}
                    showLineNumbers={true}
                    wrapLines
                />
            </Grid.Col>
        </Grid>
    )
}

export default AppHandler;