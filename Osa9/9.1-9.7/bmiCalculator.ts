type Result = 'underweight' | 'Normal (healhty weight)' | 'overweight' | 'obese';

export const calculateBmi = (height: number, weight: number) : Result => {
    const bmi = weight / Math.pow(height / 100, 2);

    if(bmi < 18.5) {
        return 'underweight';
    }
    else if(18.5 < bmi && bmi < 25) {
        return 'Normal (healhty weight)';
    }
    else if(25 < bmi && bmi < 30) {
        return 'overweight';
    }
    else if(bmi >= 30) {
        return 'obese';
    }
    else {
        throw new Error('Invalid input!');
    }
}

/**
const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);

console.log(calculateBmi(a, b));
*/