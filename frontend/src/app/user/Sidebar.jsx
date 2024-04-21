'use client';
import { useState } from 'react';
import { Group, Code, Button, Divider, Modal, Title } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import classes from './sidebar.module.css';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

const data = [
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '', label: 'Reset Password', icon: IconFingerprint },
  { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '', label: 'Databases', icon: IconDatabaseImport },
  { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Profile', icon: IconSettings },
];

export default function Sidebar() {
  const [active, setActive] = useState('Billing');
  const [opened, toggleModel] = useDisclosure(false);

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <Modal opened={opened} onClose={toggleModel.close} withCloseButton={false}>
        Modal without header, press escape or click on overlay to close
        <Title>Project Description</Title>
        <Button className='btn-close' color='none' onClick={toggleModel.open}></Button>
      </Modal>
      <div className={classes.navbarMain}>
        <Button size='md' w='100%' onClick={toggleModel.open}>New Project</Button>
        <Divider my='lg' />
        {links}
      </div>


      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}