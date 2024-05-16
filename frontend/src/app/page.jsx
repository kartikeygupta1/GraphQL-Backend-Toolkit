'use client';

import React from 'react';
import { Image, Container, Title, Button, Group, Text, ThemeIcon, rem, Box, Divider, Overlay } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
// import { GithubIcon } from '@mantinex/dev-icons';
import classes from './page.module.css';
import { Icon3dRotate } from '@tabler/icons-react';

// Feature Section Imports
import { SimpleGrid, Grid } from '@mantine/core';
import { IconReceiptOff, IconFlame, IconCircleDotted, IconFileCode } from '@tabler/icons-react';

//Testimonials Imports
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, useMantineTheme } from '@mantine/core';
import Navbar from './(main)/navbar';
import Link from 'next/link';


//footer Imports



const features = [
  {
    icon: IconReceiptOff,
    title: 'Free to use',
    description: 'It is a free software that can be used by developers to create backend Querry.',
  },
  {
    icon: IconFileCode,
    title: 'Takes less Bandwidth',
    description: 'It takes only required bandwidth as compared to Rest APIs.',
  },
  {
    icon: IconCircleDotted,
    title: 'Reduces Manual Effort',
    description:
      'It automatically generates Querry as the developer has asked for it.',
  },
  {
    icon: IconFlame,
    title: 'Flexible',
    description:
      'Provide developers with a flexible and intuitive way to define data requirements and fetch only the necessary data, eliminating the need for multiple endpoints.      ',
  },
];

export default function Home() {



  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
      >
        <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <>
      <Navbar />
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />


        <Container className={classes.container} size="md">
          <Title className={classes.title}>Graph QL 
            Backend Toolkit </Title>
          <Text className={classes.description} size="xl" mt="xl">
            GRAPHQL Backend Toolkit aims to simplify the development process that allows developers to write backend code in GRAPHQL easily and in less time
          </Text>

          <Link href="../user/manage-project">
            <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
              Get started
            </Button>
          </Link>


        </Container>
      </div>

      <Divider />
      <div style={{ 
            backgroundImage: `url('https://img.freepik.com/free-photo/3d-rendering-abstract-black-white-waves_23-2150853529.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'

       }}>
      <Container size="md" py="xl">
        <div className={classes.wrapper}>
          <Grid gutter={80}>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Title order={2}>
                A fully automated Query Generator
              </Title>
              <Text c="dimmed">
                It will generate Querry as the developer want to use it in there website.
              </Text>
              <Link href="../user/manage-project">
                <Button
                  variant="gradient"
                  gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
                  size="lg"
                  radius="md"
                  mt="xl"
                >
                  Start Generating Querry
                </Button>

              </Link>

            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
                {items}
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        </div>
      </Container>
      </div>
      <Container size={'md'}>
      </Container>

    </>
  );
}

function CarouselCard({ image, title, category }) {
  return (

    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}

// import { MantineLogo } from '@mantinex/mantine-logo';
// import classes from './FooterSocial.module.css';

// export function FooterSocial() 
