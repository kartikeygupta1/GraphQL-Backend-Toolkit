'use client';

import {
  TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import { useForm } from '@mantine/form';

function Login() {

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const loginSubmit = (values) => {
    console.log(values);
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={loginForm.onSubmit(loginSubmit)}>
          <TextInput label="Email" placeholder="enter email over here" {...loginForm.getInputProps('email')} required />
          <PasswordInput label="Password" placeholder="Your password" {...loginForm.getInputProps('password')} required mt="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type='submit' fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login