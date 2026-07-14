import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

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

  const bmi = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = body;

  // Check for missing parameters
  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  // Check if daily_exercises is an array and target is a number
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  // Check if every item in the daily_exercises array is a valid number
  let hasInvalidHours = false;
  const parsedExercises = daily_exercises.map((hour: string | number) => {
    if (isNaN(Number(hour))) {
      hasInvalidHours = true;
    }
    return Number(hour);
  });

  if (hasInvalidHours) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(parsedExercises, Number(target));
  //console.log(result);

  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
