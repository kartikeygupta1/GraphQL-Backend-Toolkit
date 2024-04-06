'use client';
import {
  TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import { useForm } from '@mantine/form';
 
 

function SignUp() {

 
  const form = useForm({
    initialValues: { name: '', email: '',password: '', confirmPassword: ''  },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null, 
    },
  });
  
  onsubmit: (values) => {
console.log(values);
    fetch('http://localhost:5000/user/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
        .then((response) => {
            console.log(response.status);
            toast.success('Post created successfully');
        }).catch((err) => {
            console.log(err);
            toast.error('Something went wrong')
        });

    console.log(values);
}
   

  return (
    <Container size={500} mb={40}>
      <Title ta="center" className={classes.title}>
        Create Account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <a href="../login"><Anchor size="sm" component="button">
          Login
        </Anchor></a>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(onsubmit)}  >
        <TextInput label="Name" placeholder=" Full Name" {...form.getInputProps('name')}  required />
        <TextInput label="Email" placeholder="abc123@gmail.com" {...form.getInputProps('email')} required />
        <PasswordInput label="Password" placeholder="Your password" {...form.getInputProps('password')} required mt="md" />
        <PasswordInput label="ConfirmPassword" placeholder="Re enter password" {...form.getInputProps('confirmPassword')} required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
        </Group>
        <Button   type='submit' fullWidth mt="xl">
          SignUp
        </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default SignUp;

