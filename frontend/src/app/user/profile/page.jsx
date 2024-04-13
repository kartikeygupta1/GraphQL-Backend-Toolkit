'use client';
import React from 'react'



import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';

const PRIMARY_COL_HEIGHT = rem(300);

const child = <Skeleton height={140} radius="md" animate={false} />;




const UserProfile = () => {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <>

      <Container my="md">
        
      </Container>



    </>
  )
}

export default UserProfile;
