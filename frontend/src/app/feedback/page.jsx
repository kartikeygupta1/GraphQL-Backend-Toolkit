'use client';
import { useFormik } from "formik";
import { TextInput, Textarea, Button, Container, Paper, Title, Text, Group, Center, Rating } from '@mantine/core';

import toast from "react-hot-toast";
import { useState } from "react";

const FeedBackForm = () => {
  const [rating, setRating] = useState(0);




  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      rating: "",
    },
    onSubmit: (values, { resetForm }) => {
      values.rating = rating;
      console.log(values);
      resetForm();

      fetch("http://localhost:5000/feedback/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            toast.success("Feedback Added successfully", {
              variant: "success",
            });
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    },
  });

  return (
    <Container size="sm" className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
      <Paper shadow="xl" p="md" className="relative py-3 sm:max-w-xl sm:mx-auto bg-gradient-to-r from-indigo-700 to-purple-500 transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        <Paper p="xl" shadow="lg" radius="md" className="relative bg-indigo-400">
          <Title align="center" mb="md">Give Us Your Feedback</Title>
          <Text align="center" mb="md">Fill up the form below to send us a message.</Text>

          <form onSubmit={formik.handleSubmit}>
            <TextInput
              label="Name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              name="name"
              required
              mb="sm"
            />
            <TextInput
              label="Email"
              placeholder="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              required
              mb="sm"
            />
            <Textarea
              label="Message"
              placeholder="Type your message here..."
              value={formik.values.message}
              onChange={formik.handleChange}
              name="message"
              required
              mb="sm"
            />
            <Group position="center" mb="sm">
              <Rating
                label="Rating"
                value={rating}
                onChange={(value) => setRating(value)}
                filledIcon="$"
                emptyIcon="$"
                colors={{ filled: 'blue', empty: 'gray' }}
                size={24}
                style={{ marginBottom: '20px' }}
              />
            </Group>
            <Center>
              <Button type="submit">Submit</Button>
            </Center>
            <Text> <a href="/">Click</a>  Here to go Home Page </Text> 
          </form>
        </Paper>
      </Paper>
    </Container>
  );
};

export default FeedBackForm;


