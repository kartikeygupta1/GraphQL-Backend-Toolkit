'use client'
import React, { useState } from 'react';
import { Container, Card, TextInput, Textarea, Rating, Button, Divider } from '@mantine/core';


function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Handle form submission
    console.log({ name, email, rating, feedback });
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-photo/check-mark-checkbox-smiley-emoticon-face-wooden-balls-dark-background-customer-service-evaluation-rating-feedback-satisfaction-survey-concept_36367-2114.jpg ')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'grid',
        justifyContent: 'right',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Container size="sm">
        <Card shadow="xs" padding="lg" radius="lg" style={{ minWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Feedback Form</h2>
          <TextInput
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            style={{ marginBottom: '20px' }}
          />
          <TextInput
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            style={{ marginBottom: '20px' }}
          />
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
          <Textarea
            label="Feedback"
            placeholder="Enter your feedback"
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            required
            style={{ marginBottom: '20px' }}
          />
          <Button
            onClick={handleSubmit}
            style={{ width: '100%', marginBottom: '20px', backgroundColor: '#009688' }}
          >
            Submit
          </Button>
          <Divider />
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Thank you for your feedback!</p>
        </Card>
      </Container>
    </div>
  );
}

export default FeedbackPage;
