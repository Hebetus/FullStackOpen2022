type ratingDescription = 'you could do better' | 'keep going at this level!' | 'great work this week!';

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: ratingDescription;
    target: number;
    average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
    const periodLength = hours.length;

    let trainingDays = 0;

    let average = 0;

    for(const i of hours) {
        if(Number(i)) {
            trainingDays++;
        }

        average = average + Number(i);
    }

    average = average / periodLength;

    let success = false;

    if(trainingDays >= target) {
        success = true;
    }

    let rating = 1;
    let ratingDescription: ratingDescription = 'you could do better';

    if(trainingDays >= 2) {
        rating = 2;
        ratingDescription = 'keep going at this level!';
    }

    if(trainingDays >= 4) {
        rating = 3;
        ratingDescription = 'great work this week!';
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

const hours: number[] = [3, 0, 2, 4.5, 0, 3, 1];

const target = Number(process.argv[2]);
const trainingHours: number[] = [];

for(let i = 3; i < process.argv.length; i++) {
    trainingHours.push(Number(process.argv[i]));
}

if(target && trainingHours) {
    console.log(calculateExercises(trainingHours, target));
}

console.log(calculateExercises(hours, 4));

export default calculateExercises;