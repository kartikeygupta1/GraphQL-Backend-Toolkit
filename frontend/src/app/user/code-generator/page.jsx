'use client';
import { Accordion, Box, Button, Divider, Flex, Grid,  Text, Title, rem, } from '@mantine/core';
import React, { useState } from 'react'
 
import { CodeBlock, dracula } from "react-code-blocks";
import { Code } from '@mantine/core';
 

const CodeGenerator = () => {

  const [schemaList, setSchemaList] = useState([
    {
      name: 'User',
      fields: [
        {
          name: 'id',
          type: 'ID'
        },
        {
          name: 'name',
          type: 'String'
        },
        {
          name: 'email',
          type: 'String'
        },
        {
          name: 'contact',
          type: 'String'
        },
      ]
    }
  ]);

  const [queryList, setQueryList] = useState(
    [
      {
        name: 'unitledQuery',
        parameters: [
          {
            name: 'id',
            type: 'ID',
            required: true
          }
        ],
        return: 'User'
      }
    ]
  )


  
  

  const generateIndexCode = () => {
    return `var express = require("express")
      var { createHandler } = require("graphql-http/lib/use/express")
      var { buildSchema } = require("graphql")
       
      // Construct a schema, using GraphQL schema language
      var schema = buildSchema(\`
        
        ${schemaList.map((item, index) => {
      return `type ${item.name} {
            ${item.fields.map((field, index) => {
        return `${field.name}: ${field.type}`
      }).join('\n')
        }
          }`
    }).join('\n')
      }
       

        ${
      queryList.map((item, index) => {
        return `type Query {
            ${item.name}(${item.parameters.map((parameter, index) => {
          return `${parameter.name}: ${parameter.type}${parameter.required ? '!' : ''}`
        }).join(', ')}): ${item.return}
          }`
      }).join('\n')
        }
        
       
        type Mutation {
          createMessage(input: MessageInput): Message
          updateMessage(id: ID!, input: MessageInput): Message
        }
      \`)
       
      // If Message had any complex fields, we'd put them on this object.
      class Message {
        constructor(id, { content, author }) {
          this.id = id
          this.content = content
          this.author = author
        }
      }
       
      // Maps username to content
      var fakeDatabase = {}
       
      var root = {
        getMessage({ id }) {
          if (!fakeDatabase[id]) {
            throw new Error("no message exists with id " + id)
          }
          return new Message(id, fakeDatabase[id])
        },
        createMessage({ input }) {
          // Create a random id for our "database".
          var id = require("crypto").randomBytes(10).toString("hex")
       
          fakeDatabase[id] = input
          return new Message(id, input)
        },
        updateMessage({ id, input }) {
          if (!fakeDatabase[id]) {
            throw new Error("no message exists with id " + id)
          }
          // This replaces all old data, but some apps might want partial update.
          fakeDatabase[id] = input
          return new Message(id, input)
        },
      }
       
      var app = express()
      app.all(
        "/graphql", 
        createHandler({
          schema: schema,
          rootValue: root,
        })
      )
      app.listen(4000, () => {
        console.log("Running a GraphQL API server at localhost:4000/graphql")
      })`
  }

  const addNewEntity = () => {
    setSchemaList([...schemaList, {
      name: 'untitled entity',
      fields: [
        {
          name: 'fieldname',
          type: 'fieldtype'
        }
      ]
    }])
  }

  const addNewField = (entityIndex) => {
    let newSchemaList = [...schemaList];
    newSchemaList[entityIndex].fields.push({
      name: 'fieldname',
      type: 'fieldtype'
    })
    setSchemaList(newSchemaList)
  }

  const addNewQuery = () => {
    setQueryList([...queryList, 
      {
        name: 'untitled query',
        parameters: [
          {
            name: 'parametername',
            type: 'parametertype',
            required: true
          }
        ],
        return: 'returntype'
      }
    ])
  }



  return (
    <div>

      <Grid>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <Box my={10}>
            <Title order={4}>Schema Builder</Title>
            <Divider my={5} />
            <Accordion>
              {
                schemaList.map((entity, index) => (
                  <Accordion.Item key={entity.name} value={entity.name}>
                    <Accordion.Control >{entity.name}</Accordion.Control>
                    <Accordion.Panel>
                      {
                        entity.fields.map((field, index) => (
                          <Flex justify={'space-between'}>
                            <Title order={5}>
                              {field.name}
                            </Title>
                            <Text size='sm' c="dimmed">
                              {field.type}
                            </Text>
                          </Flex>
                        ))
                      } 

                      <Button onClick={() => addNewField(index)}>Add Field</Button>

                    </Accordion.Panel>
                  </Accordion.Item>
                ))
              }
            </Accordion>
            <Button onClick={addNewEntity} mt={10}>Add Entity</Button>
          </Box> <Box my={10}>
            <Title order={4}>Querry Builder</Title>
            <Divider my={5} />
            <Accordion>
              {
                queryList.map((query) => (
                  <Accordion.Item key={query.name} value={query.name}>
                    <Accordion.Control >{query.name}</Accordion.Control>
                    <Accordion.Panel>
                      {
                        query.parameters.map((parameter, index) => (
                          <Flex justify={'space-between'}>
                            <Title order={5}>
                              {parameter.name}
                            </Title>
                            <Text size='sm' c="dimmed">
                              {parameter.type}
                            </Text>
                          </Flex>
                        ))
                      }

                    </Accordion.Panel>
                  </Accordion.Item>
                ))
              }
            </Accordion>
            <Button onClick={addNewQuery} mt={10}>Add Query</Button>
          </Box>
        </Grid.Col>
        <Grid.Col  span={{ base: 12, xs: 6  }}>
         
          <CodeBlock
             
            text={generateIndexCode()}
            language='javascript'
            showLineNumbers={true}
            theme={dracula}
          />
           

        </Grid.Col>

      </Grid>

    </div>
  )
}

export default CodeGenerator;