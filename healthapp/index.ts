import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  // Extract query parameters
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  // Validate that both parameters exist and are valid numbers
  if (isNaN(weight) || isNaN(height) || !req.query.weight || !req.query.height) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  // Calculate BMI using your module
  const bmi = calculateBmi(height, weight);

  // Return the properly formatted JSON response
  return res.json({
    weight,
    height,
    bmi,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
