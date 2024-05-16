 

const express = require('express');
const Feedback = require('../models/feedbackModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

// Add new feedback
router.post('/add', async (req, res) => {
  try {
    const feedback  = new Feedback(req.body);
    await feedback.save();
    res.status(200).send('Feedback Added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

// Get all feedback
router.get('/getall', async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
