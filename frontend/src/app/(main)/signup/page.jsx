'use client';
import {
  TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';

function Login() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Create Account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}

export default Login