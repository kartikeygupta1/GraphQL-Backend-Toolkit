'use client';
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button, Card, Grid, Title } from '@mantine/core';
import { getDisplayName } from 'next/dist/shared/lib/utils';
import { Center, Box } from '@mantine/core';

const DEFAULT_VARIABLE = `{
    "name": "smartphone",
    "category": "phone",
    "price": 1000,
    "quantity": 1,
    "description": "smartphone description",
    "colors" : ["red", "blue"]
}`

const FETCH_SINGLE_QUERY = () => `query GetProduct($getProductId: ID!) {
    getProduct(id: $getEntityId) {
      _id  
      productName
      category
        price
    }
  }
`

const FETCH_ALL_QUERY = () => `query GetProduct {
  getProductsList {
    _id
        productName
        category
        price
    }
    }
`

const UPDATE_MUTATION = () => `mutation updateEntity($name: String, $category: Int, $price: Int, $colors: [String]!) {
    updateEntity(name: $name, category: $category, price: $price, colors: $colors) {
        name
        category
        price
        colors
    }
}`

const ADD_MUTATION = () => `mutation addProduct($name: String!, $category: String, $price: Int, $colors: [String!]) {
    addProduct(productName: $name, category: $category, price: $price, colors: $colors) {
      productName
      category
      price
      colors
    }
}`

const DELETE_MUTATION = () => `mutation deleteEntity($productId: ID) {
    deleteEntity(id: $productId) {
      _id  
      productName
      age
    }
}`


const GraphQLClient = () => {

  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [variables, setVariables] = useState(DEFAULT_VARIABLE);

  const updateVariable = (key, value) => {
    const newVariables = [...variables];
    const index = newVariables.findIndex(v => v.name === key);
    if (index !== -1) {
      newVariables[index].value = value;
      setVariables(newVariables);
    }
  }

  const generateFetchAllQuery = () => {
    setQuery(FETCH_ALL_QUERY());
  }

  const generateFetchSingleQuery = () => {
    setQuery(FETCH_SINGLE_QUERY());
  }

  const generateUpdateMutation = () => {
    setQuery(UPDATE_MUTATION());
  }

  const generateNewMutation = () => {
    setQuery(ADD_MUTATION());
  }

  const generateDeleteMutation = () => {
    setQuery(DELETE_MUTATION());
  }

  const makeQuery = async () => {
    // const query = document.getElementById('query').value;
    // console.log(JSON.stringify(variables));
    const response = await fetch('http://localhost:9000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const res = await response.json();
    setResponse(JSON.stringify(res, null, 2));
  }

  return (
    <div className='vh-100 bg-dark '>
      <div className='text-center'>
        {/* <input className='bg-dark border border-3 rounded-5 text-white m-2' id="url" type="text" defaultValue={'  http://localhost:3000'} /> */}

        <h1 className='text-white fst-italic pt-5'>GraphQL Client</h1>
        {/* <button className='m-3' id="logoutButton" type='submit'>Logout</button> */}
      </div>
      {/* <Nav className='bg-primary-subtle' justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav> */}


      <Grid>

        <Grid.Col span={{ base: 12, md: 6 }}>


          <Title mt={10} mb={5}>Queries</Title>
          <Card withBorder shadow="xs" padding="md" radius="md">

            <ul className='list-group'>
              <li className='list-group-item'>
                <div className='d-flex justify-content-between'>
                  <p>Fetch Single Entity Query</p>
                  <Button className='btn btn-primary' onClick={generateFetchSingleQuery}>Generate Query</Button>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='d-flex justify-content-between'>
                  <p>Fetch All Entity Query</p>
                  <Button className='btn btn-primary' onClick={generateFetchAllQuery}>Generate Query</Button>
                </div>
              </li>
            </ul>
          </Card>

        </Grid.Col>


        <Grid.Col span={{ base: 12, md: 6 }}>


          <Title mt={10} mb={5}>Mutations</Title>
          <Card withBorder shadow="xs" padding="md" radius="md">
            <ul className='list-group'>
              <li className='list-group-item'>
                <div className='d-flex justify-content-between'>
                  <p>Add Single Entity Mutation</p>
                  <Button className='btn btn-primary' onClick={generateNewMutation}>Generate Mutation</Button>
                </div>
              </li>

              <li className='list-group-item'>
                <div className='d-flex justify-content-between'>
                  <p>GenerateUpdateMutation</p>
                  <Button className='btn btn-primary' onClick={generateUpdateMutation}>Generate Mutation</Button>
                </div>
              </li>

              <li className='list-group-item'>
                <div className='d-flex justify-content-between'>
                  <p>Delete Mutation</p>
                  <Button className='btn btn-primary' onClick={generateDeleteMutation}>Generate Mutation</Button>
                </div>
              </li>

            </ul>
          </Card>

        </Grid.Col>

      </Grid>
      <div>

        <Grid>
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <label htmlFor="variables">Operation</label>
            <div style={{ fontSize: '160px' }}  >
              <Editor theme='vs-dark' id="query" height="40vh" defaultLanguage="javascript" value={query} onChange={setQuery} />
            </div>

          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 6 }}>
            <label htmlFor="query">Variable</label>
            <div style={{ fontSize: '16px' }}  >
              <Editor theme='vs-dark' id="variables" height="40vh" defaultLanguage="json" value={variables} onChange={setVariables} />
            </div>
          </Grid.Col>

        </Grid>

      </div>
      <div className="col-md-6">
        <div className="form-group text-white">
          <div className="text-center">
            <Button onClick={makeQuery} className="btn btn-primary mt-3 mb-5  ">Make Query</Button>
          </div>
          <label htmlFor="response">Response</label>
          {/* <textarea onChange={e => setResponse(e.target.value)} value={response} className="form-control" id="response" rows="15"></textarea> */}
          <div style={{ fontSize: '16px' }} >
            <Editor theme='vs-dark' id="response" height="73vh" defaultLanguage="json" value={response} onChange={setResponse}

            />
          </div>
        </div>
      </div>

    </div>

  )
}

export default GraphQLClient;