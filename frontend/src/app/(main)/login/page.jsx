'use client';

import {
  TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import { useForm } from '@mantine/form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useAppContext from '@/context/AppContext';

function Login() {

  const router = useRouter();
  const {setCurrentUser, setLoggedIn} = useAppContext();

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

  const loginSubmit = async (values) => {
    console.log(values);

      const res = await fetch('http://localhost:5000/user/authenticate', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }

      });
      console.log(res.status)
      
      if (res.status === 200) {
        toast.success("Login successfull")
        
        res.json()
        .then((data) => {
          console.log(data);
          setLoggedIn(true);
          setCurrentUser(data);
          sessionStorage.setItem('user', JSON.stringify(data));
          router.push('/user/manage-project');
        })
      }
      else if (res.status === 400) {
        toast.error("Invalid credentials")
      }
  }

  return (
      <div 
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/3d-rendering-abstract-black-white-waves_23-2150853529.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        
      }}
      >



    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
        <a href="../signup">Register</a>
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={loginForm.onSubmit(loginSubmit)}>
          <TextInput label="Email" placeholder="Enter email over here" {...loginForm.getInputProps('email')} required />
          <PasswordInput label="Password" placeholder="Password over here" {...loginForm.getInputProps('password')} required mt="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
            <a href="../resetPassword">ForgotPassword</a>
            </Anchor>
          </Group>
          <Button type='submit' fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
      </div>
  );
}

export default Login