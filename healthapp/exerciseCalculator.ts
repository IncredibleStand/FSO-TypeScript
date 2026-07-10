interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  dailyHours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4)
    throw new Error('Not enough arguments. Please provide a target and at least one day of exercise hours.');

  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error('Provided target value was not a number!');
  }

  const dailyHours: number[] = [];
  for (let i = 3; i < args.length; i++) {
    const hours = Number(args[i]);
    if (isNaN(hours)) {
      throw new Error(`Provided daily hour at position ${i - 2} was not a number!`);
    }
    dailyHours.push(hours);
  }

  return {
    target,
    dailyHours,
  };
};

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;

  // Filter out the days with 0 hours to find the training days
  const trainingDays = dailyHours.filter((day) => day > 0).length;

  // Sum up all the hours to calculate the average
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = periodLength === 0 ? 0 : totalHours / periodLength;

  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  // Rating metric based on how close the average is to the target
  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent, target reached!';
  } // 90% is not bad
  else if (average >= target * 0.9) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad, you need to work harder';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, dailyHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
