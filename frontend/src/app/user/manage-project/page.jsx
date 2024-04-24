'use client';

import { Image, Text, Container, ThemeIcon, Title, SimpleGrid, Button, Modal } from '@mantine/core';

// import IMAGES from './images';
import classes from './FeaturesImages.module.css';
import { useState, useRef, useEffect } from 'react'

import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import useGraphContext from '@/context/GraphContext';
import useAppContext from '@/context/AppContext';
import Link from 'next/link';


const ManageProjects = () => {

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
      <Container size={700} className={classes.wrapper}>
        <div>
          <div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-9">
                  {
                    !isProjectLoading() && (
                      <div className='mt-3'>
                        <h1>{projectName}</h1>
                        {/* <p>{selProject.tagline}</p> */}

                        <h3>Queries : {queryList.length}</h3>
                        <ul className='list-group'>
                          {
                            queryList.map(query => (
                              <li className='list-group-item'>
                                {query.name}
                              </li>
                            ))
                          }
                        </ul>
                        <h3>Mutation : {mutationList.length}</h3>
                        <ul className='list-group'>
                          {
                            mutationList.map(mutation => (
                              <li className='list-group-item'>
                                {mutation.name}
                              </li>
                            ))
                          }
                        </ul>
                        <h3>Entity : {entityList.length}</h3>
                        <ul className='list-group'>
                          {
                            entityList.map(entity => (
                              <li className='list-group-item'>
                                {entity.name}
                              </li>
                            ))
                          }
                        </ul>
                        <div className="d-flex gap-5 justify-content-center">
                          <Button component={Link} href={'/user/query_generator/' + projectId}>Edit Project</Button>
                        </div>
                        {/* {projectId} */}
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>


      </Container>
    </>
  );
}

export default ManageProjects



