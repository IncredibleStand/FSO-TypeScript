interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

// Hard-coded parameters from the exercise instructions
console.log(calculateExercises([7, 0, 2, 4.5, 0, 3, 1], 2));
