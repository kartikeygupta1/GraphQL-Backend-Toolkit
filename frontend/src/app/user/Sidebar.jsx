'use client';
import { useRef, useState } from 'react';
import { Group, Code, Button, Divider, Modal, Title, Text, Box, TextInput } from '@mantine/core';
import {
  IconDatabaseImport,
  IconLogout,
} from '@tabler/icons-react';
import classes from './sidebar.module.css';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import useAppContext from '@/context/AppContext';
import toast from 'react-hot-toast';
import useGraphContext from '@/context/GraphContext';

export default function Sidebar({  }) {
  const [active, setActive] = useState('Billing');
  const [opened, toggleModel] = useDisclosure(false);

  const { logout, currentUser } = useAppContext();
  const { fetchProjectsData, projectName, projectList, loadProject } = useGraphContext();

  const nameRef = useRef();

  const addNewProject = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/add`, {
      method: 'POST',
      body: JSON.stringify({
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
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': currentUser.token
      }
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        toast.success('Project Created');
        fetchProjectsData();
        nameRef.current.value = '';
        toggleModel.close();
      } else {
        toast.error('Error Creating Project');
      }
    }).catch((err) => {
      console.log(err);
      toast.error('Error Creating Project');
    });
  }

  const links = projectList.map((item) => (
    <Link
      className={classes.link}
      data-active={projectName === item.name || undefined}
      href="#"
      key={item._id}
      onClick={(event) => {
        event.preventDefault();
        loadProject(item);
      }}
    >
      <IconDatabaseImport className={classes.linkIcon} stroke={1.5} />
      <span>{item.name}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <Modal opened={opened} onClose={toggleModel.close} withCloseButton={false}>
        <Title order={3}>Create New Project</Title>
        <Box p={20}>
          <TextInput ref={nameRef} label='Enter Project Name'  placeholder='New GraphQL Project' />
          <Button mt={10} onClick={addNewProject}>Create</Button>
        </Box>
      </Modal>
      <div className={classes.navbarMain}>
        <Button size='md' w='100%' onClick={toggleModel.open}>New Project</Button>
        <Divider my='lg' />
        <Text size='sm' my={20} fw={'bold'}>Previous Projects</Text>
        {links}
      </div>


      <div className={classes.footer}>

        <Button onClick={logout} size='lg' color='red' variant='light' fullWidth>
          <IconLogout />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
}