import React from 'react';
import { Image, Container, Title, Button, Group, Text, ThemeIcon, rem, Box } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
// import { GithubIcon } from '@mantinex/dev-icons';
import classes from './page.module.css';
import { Icon3dRotate } from '@tabler/icons-react';

export default function Home() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>modern</span> React <br /> components library
          </Title>
          <Text c="dimmed" mt="md">
            Build fully functional accessible web applications faster than ever – Mantine includes
            more than 120 customizable components and hooks to cover you in any situation
          </Text>

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
              <b>TypeScript based</b> – build type safe applications, all components and hooks
              export types
            </Box>
            <Box>
              <b>Free and open source</b> – all packages have MIT license, you can use Mantine in
              any project
            </Box>
            <Box>
              <b>No annoying focus ring</b> – focus ring will appear only when user navigates with
              keyboard
            </Box>
          </Group>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
            <Button variant="default" radius="xl" size="md" className={classes.control}>
              Source code
            </Button>
          </Group>
        </div>
        <Image src={'/hero_img.svg'} className={classes.image} />
      </div>
    </Container>
  );
}