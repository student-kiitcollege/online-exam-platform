const Question = require('../models/Question');
const Submission = require('../models/Submission');



exports.getQuestions = async (req, res) => {
  const userEmail = req.query.email;  

  try {
    let questions;
    if (userEmail) {
      questions = await Question.find({ assignedToEmails: userEmail });
    } else {
      questions = await Question.find(); 
    }
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.createMultipleQuestions = async (req, res) => {
  try {
    const questions = req.body.questions; 
    if (!questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'Invalid questions data' });
    }
    await Question.insertMany(questions);
    res.status(201).json({ message: 'Questions created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create questions' });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuestion) return res.status(404).json({ error: 'Question not found' });
    res.json({ message: 'Question updated', updatedQuestion });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update question' });
  }
};


exports.updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.submitAnswers = async (req, res) => {
  try {
    const { studentEmail, answers } = req.body;

    if (!studentEmail || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const submission = new Submission({
      studentEmail,
      answers,
      submittedAt: new Date()
    });

    await submission.save();

    res.status(201).json({ message: 'Submission saved successfully' });
  } catch (error) {
    console.error('Submit error:', error);
    res.status(500).json({ error: 'Failed to save submission' });
  }
};
