'use client';

import { Image, Text, Container, ThemeIcon, Title, SimpleGrid, Button, Modal, Grid, useMantineTheme, Group, Badge, Card, Center } from '@mantine/core';

// import IMAGES from './images';
import classes from './FeaturesImages.module.css';
import { useState, useRef, useEffect } from 'react'

import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import useGraphContext from '@/context/GraphContext';
import useAppContext from '@/context/AppContext';
import Link from 'next/link';





const ManageProjects = () => {

  const theme = useMantineTheme();

  const [selProject, setSelProject] = useState(null);


  const { currentUser } = useAppContext();
  const {
    fetchProjectsData,
    projectList,
    projectName,
    projectId,
    queryList,
    mutationList,
    entityList,
    isProjectLoading
  } = useGraphContext();

  const deleteProject = (id) => {
    fetch(`http://localhost:5000/project/delete/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        toast.success('Project Deleted');
        fetchProjectsData();
      } else {
        toast.error('Error Deleting Project');
      }
    }).catch((err) => {
      console.log(err);
    });
  }



  return (
    <>
      <Card withBorder padding="xl" radius="md" className={classes.card}>


        {
          !isProjectLoading() ? (
            <div>
              <Text fw={700} className={classes.title} mt="xl">
                <h1 >{projectName}</h1>
              </Text>


              <Grid>
                <Grid.Col span={4}>
                  <h3>Queries: {queryList.length}</h3>

                  {
                    queryList.map(query => (
                      <p>
                        {query.name}
                      </p>
                    ))
                  }

                </Grid.Col>
                <Grid.Col span={4}>
                  <h3>Mutation : {mutationList.length}</h3>

                  {
                    mutationList.map(mutation => (
                      <p className='list-group-item'>
                        {mutation.name}
                      </p>
                    ))
                  }


                </Grid.Col>
                <Grid.Col span={4}>
                  <h3>Entity : {entityList.length}</h3>

                  {
                    entityList.map(entity => (
                      <p className='list-group-item'>
                        {entity.name}
                      </p>
                    ))
                  }

                </Grid.Col>
              </Grid>


              <div className="d-flex gap-5 justify-content-center ">

                <center  >

                  <Button component={Link} href={'/user/query_generator/' + projectId}>Edit Project</Button>
                </center>

              </div>

            </div>
          ) : (
            <div>
              <Text fw={700} className={classes.title} mt="xl">
                <h1 >Select Any Project to Continue</h1>
              </Text>
            </div>
          )
        }


      </Card>
















    </>
  );
}

export default ManageProjects



