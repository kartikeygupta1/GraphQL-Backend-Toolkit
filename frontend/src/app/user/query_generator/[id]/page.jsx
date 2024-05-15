'use client';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import EntityHandler from './EntityHandler';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { Accordion } from 'react-bootstrap';
import useGraphContext from '@/context/GraphContext';

import AppHandler from './AppHandler';
import { CodeBlock, CopyBlock, dracula } from 'react-code-blocks/dist';
import QueryHandler from './QueryHandler';
import MutationHandler from './MutationHandler';
import { crudOperations } from '../CrudGenerator';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { Box, Button, Divider, Grid, Group, Stack, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

// import videoBg from '../assets/Untitled_design.mp4';

const QueryGenerator = () => {

  const fieldNameRef = useRef(null);
  const fieldTypeRef = useRef(null);

  const {
    queryList,
    mutationList,
    entityList,
    mongoDbUrl,
    setMongoDbUrl,
    loadProject,
    addNewQuery,
    addEntityField,
    updateEntityName,
    updateEntityField,
    removeEntityField,
    updateProjectData,
    deleteProject,
    isProjectLoading,

    addNewMutation,
    addNewEntity,
    updateQueryName,
    updateQueryParameter,
    updateQueryReturnType,
    removeQueryParameter,
    updateMutationName,
    updateMutationParameter,
    updateMutationReturnType,
    removeMutationParameter
  } = useGraphContext();

  const { id } = useParams();


  const fetchProjectData = async () => {
    await fetch(`http://localhost:5000/project/getbyid/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loadProject(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const generateEntityCode = () => {
    return entityList.map((entity) => {
      return `type ${titleCase(entity.name)}{
        ${entity.fields.map((field) => {
        return `${field.name}: ${field.type}`
      })}
      }`
    })
  }

  const generateMutationCode = () => {
    return mutationList.map((mutation) => {
      return `
        type Mutation{
            ${mutation.name}(${mutation.parameters.map((parameter) => {
        return `${parameter.name}: ${parameter.type}${parameter.required ? '!' : ''}`
      })}): ${mutation.returnType}
        }`
    })
  }

  const generateQueryCode = () => {
    return `type Query{
      ${queryList.map((query) => {
      return `
      ${query.name}${query.parameters.length ? `(${query.parameters.map((parameter) => {
        return `${parameter.name}: ${parameter.type}${parameter.required ? '!' : ''}`
      }).join(', ')})` : ''}: ${query.returnType}`
    }).join('')}
    }`
  }

  const generateGraphQLSchema = () => {
    return `
    const { gql } = require('apollo-server-express');
    ${entityList.map((entity) => (
      `const ${titleCase(entity.name)}Model = require("./models/${entity.name.toLowerCase()}Schema");`
    ))
      }
    const mongoose = require('mongoose');
    
    exports.typeDefs = gql \`
    ${generateEntityCode()}
    ${generateQueryCode()}
    ${generateMutationCode()}
    \`
    const db_url = "${mongoDbUrl}";
    const connect = async () => {
        await mongoose.connect(db_url, { useNewUrlParser: true });
    }
    
    exports.resolvers = {
        Query: {
          ${queryList.map((query) => (
        `${query.name}: async (parent, args) => {
            await connect();
            const result = ${crudOperations[query.type](query.name)}
            return result;
          }`
      ))}
    },

        ${entityList.map((entity) => (
        `Mutation: {
    ${mutationList.map((mutation) => (
          `\n\n\t\t\t\t${mutation.name}: async (parent, args) => {
                           await connect();
                           const result = ${crudOperations[mutation.type](entity.name)}
                           return result;
                        }`))}      
                }`))}   
        }`
  }

  useEffect(() => {
    fetchProjectData();
  }, []);


  //App.js Code


  //Schema.js Code


  //Copy to Clipboard
  const handleCopyClickAppCode = async () => {
    try {
      await navigator.clipboard.writeText(generateAppCode());
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error(
        "Unable to copy to clipboard.",
        err
      );
      toast.error("Copy to clipboard failed.");
    }
  };

  //Copy to Clipboard
  const handleCopyClickSchemaCode = async () => {
    try {
      await navigator.clipboard.writeText(generateMongoDBSchema());
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error(
        "Unable to copy to clipboard.",
        err
      );
      toast.error("Copy to clipboard failed.");
    }
  };

   

  const titleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    )
  }

  return <div className='bg-dark py-5'>
    {
      isProjectLoading() ? (
        <h3 className='text-muted display-3 my-4 text-center'>Loading ... </h3>
      ) : (
        <div>
          <Group gap={10} mb={10}>
            <Button component={Link} href='/user/manage-project' onClick={updateProjectData} leftSection={<IconArrowLeft />}>Back</Button>
            <Button onClick={updateProjectData}>Update Changes</Button>
            <Button onClick={deleteProject} color='red' variant='light' >Delete Project</Button>
          </Group>
          <Divider />

          <AppHandler />

          <EntityHandler />

          <Box p={4}>
            <Divider mt={30} mb={60} />
            <Grid>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <QueryHandler />
                <MutationHandler />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 9 }}>

                <Title >GraphQLSchema.js Code</Title>
                <CopyBlock
                  theme={dracula}
                  text={generateGraphQLSchema()}
                  language={'JavaScript'}
                  showLineNumbers={true}
                  wrapLines
                />
              </Grid.Col>
            </Grid>
          </Box>
        </div>
      )
    }
  </div>
}

export default QueryGenerator;