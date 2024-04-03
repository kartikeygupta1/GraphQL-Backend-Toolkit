'use client';

import React from 'react';
import { Image, Container, Title, Button, Group, Text, ThemeIcon, rem, Box, Divider } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
// import { GithubIcon } from '@mantinex/dev-icons';
import classes from './page.module.css';
import { Icon3dRotate } from '@tabler/icons-react';

// Feature Section Imports
import { SimpleGrid, Grid } from '@mantine/core';
import { IconReceiptOff, IconFlame, IconCircleDotted, IconFileCode } from '@tabler/icons-react';

<<<<<<< HEAD
//Testimonials Imports
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, useMantineTheme } from '@mantine/core';
import Navbar from './(main)/navbar';

=======
//footer Imports

import Footer from './Footer';
>>>>>>> 35c5b96dcddd9c91c002a55f51936f27bdcfe1b5

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
      <Container size="md" py="lg" mb={30}>
        <Grid align='center'>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <div className={classes.content}>
              <Title className={classes.title}>
                Graph <span className={classes.highlight}>QL</span> Querry Language <br /> Backend Toolkit
              </Title>
              <Text c="dimmed" mt="md">
                GRAPHQL Backend Toolkit aims to simplify the development process that allows developers
                to write backend code in GRAPHQL easily and in less time
              </Text>




            </div>

          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Image src={'https://cdni.iconscout.com/illustration/premium/thumb/back-end-developer-4316118-3611968.png'} className={classes.image} />
          </Grid.Col>
        </Grid>
        <Group
          mt={30}
          spacing="sm"
          size="sm"
          icon={
            <ThemeIcon size={20} radius="xl">
              <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </ThemeIcon>
          }
        >
          <Box>
            <b>Reduces Compelxity</b> – Learning GRAPHQL can be challenging for developers due to its unique syntax and concepts.
          </Box>
          <Box>
            <b>Free to use</b> – It is a free software that can be used by developers to create backend Querry.
          </Box>
          <Box>
            <b>Removes Problem of Under and Over Fetching</b> – When we use rest APIs it over fetch or under fetch data, but when we use GraphQl this problem gets solved.
          </Box>
        </Group>
        <Group mt={30}>
          <Button radius="xl" size="md" className={classes.control}>
            Start Generating Querry
          </Button>
          <Button variant="default" radius="xl" size="md" className={classes.control}>
            Help
          </Button>
        </Group>
      </Container>
      <Divider />
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

              <Button
                variant="gradient"
                gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
                size="lg"
                radius="md"
                mt="xl"
              >
                Start Generating Querry
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
                {items}
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        </div>
      </Container>
      <Container size={'md'}>
      </Container>

<<<<<<< HEAD
      {/* //footer return */}
      {/* <div className={classes.footer}>
        <Container className={classes.inner}>
          <MantineLogo size={28} />
          <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Container>
      </div> */}
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
=======
      {/* footer return */}
      <Footer />
    </>
  );
}
>>>>>>> 35c5b96dcddd9c91c002a55f51936f27bdcfe1b5
