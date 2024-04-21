'use client';

import { Image, Text, Container, ThemeIcon, Title, SimpleGrid, Button, Modal } from '@mantine/core';

// import IMAGES from './images';
import classes from './FeaturesImages.module.css';
import { useState, useRef, useEffect } from 'react'

import React from 'react';
import { useDisclosure } from '@mantine/hooks';


const ManageProjects = () => {



  const [centredModal, setCentredModal] = useState(false);

  const [currentUser, setcurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const [projectList, setProjectList] = useState([]);

  const toggleOpen = () => setCentredModal(!centredModal);

  const [selProject, setSelProject] = useState(null);

  const nameRef = useRef();

  const addNewProject = () => {



    fetch('http://localhost:5000/project/add', {
      method: 'POST',
      body: JSON.stringify({
        user: currentUser._id,
        name: nameRef.current.value,
        config: {
          queryList: [{
            name: 'getEntity',
            type: 'readAll',
            parameters: [
              {
                name: 'id',
                type: 'ObjectId',
                required: true,
              }
            ],
            returnType: 'Entity',

          }],
          mutationList: [{
            name: 'updateProduct',
            type: 'add',
            parameters: [
              {
                name: 'id',
                type: 'ID',
                required: true
              },
              {
                name: 'field1',
                type: 'String',
                required: true
              },
            ],
            returnType: 'Entity'
          }],
          entityList: [{
            name: 'entityName',
            fields: [
              {
                name: 'field1',
                type: 'ObjectId'
              },
              {
                name: 'field2',
                type: 'Number'
              }
            ]
          }],
          mongoDbUrl: ''
        },
        createdAt: new Date()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        toast.success('Project Created');
        toggleOpen();
        fetchProjectsData();
        nameRef.current.value = '';
      } else {
        toast.error('Error Creating Project');
      }
    }).catch((err) => {
      console.log(err);
    });
  }

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

  const fetchProjectsData = () => {
    fetch(`http://localhost:5000/project/getbyuser/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjectList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // fetchProjectsData();
  }, [])




  return (
    <>
      <Container size={700} className={classes.wrapper}>
        <div>
          <div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3 square border border-dark py-5">
                  <ul className='list-group'>

                    {
                      projectList.map((project) => {
                        return (
                          <li key={project._id} className='list-group-item'>
                            <p>{project.name}</p>
                            <button className='btn btn-primary btn-sm'
                              onClick={() => setSelProject(project)}
                            >View</button>
                            <button className='btn btn-danger btn-sm float-end' onClick={() => deleteProject(project._id)}>Delete</button>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
                <div className="col-md-9">
                  {
                    selProject !== null && (
                      <div className='mt-3'>
                        <h1>{selProject.name}</h1>
                        <p>{selProject.tagline}</p>

                        <h3>Queries : {selProject.config.queryList.length}</h3>
                        <ul className='list-group'>
                          {
                            selProject.config.queryList.map(query => (
                              <li className='list-group-item'>
                                {query.name}
                              </li>
                            ))
                          }
                        </ul>
                        <h3>Mutation : {selProject.config.mutationList.length}</h3>
                        <ul className='list-group'>
                          {
                            selProject.config.mutationList.map(mutation => (
                              <li className='list-group-item'>
                                {mutation.name}
                              </li>
                            ))
                          }
                        </ul>
                        <h3>Entity : {selProject.config.entityList.length}</h3>
                        <ul className='list-group'>
                          {
                            selProject.config.entityList.map(entity => (
                              <li className='list-group-item'>
                                {entity.name}
                              </li>
                            ))
                          }
                        </ul>
                        <div className="d-flex gap-5 justify-content-center">
                          <Link className='btn btn-primary' href={'/query_generator/' + selProject._id}>Edit Project</Link>
                        </div>
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



