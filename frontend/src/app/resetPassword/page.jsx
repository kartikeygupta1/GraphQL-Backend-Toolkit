'use client';
import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import classes from './ForgotPassword.module.css';

export default function ForgotPassword() {
  return (
      <div
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/2387532/pexels-photo-2387532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',

      }}
      >
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Your email" placeholder="abc123@gmail.com" required />
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor c="dimmed" size="sm" className={classes.control}>
            <Center inline>
              
              <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
             <a href="../login"> <Box ml={5}>Back to the login page</Box></a>
            </Center>
          </Anchor>
          <Button className={classes.control}>Reset password</Button>
        </Group>
      </Paper>
    </Container>
    </div>
  );
}