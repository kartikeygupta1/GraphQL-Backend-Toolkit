'use client';
import React, { useEffect } from 'react'
import { AppShell, Burger, Group, Skeleton, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Sidebar from './Sidebar';
import useGraphContext from '@/context/GraphContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const { fetchProjectsData } = useGraphContext();

  const router = useRouter();

  useEffect(() => {
    fetchProjectsData();
  }, [])

  return (

    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <Title onClick={e => router.push('/')} order={3}>QueryQL</Title>
          <Title onClick={e => router.push('../user/graphql-client')} order={3}>GraphQlClient</Title>
          <Title onClick={e => router.push('../user/manage-project')} order={3}>ManageProject</Title>
           
           
           

        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>

  )
}

export default Layout