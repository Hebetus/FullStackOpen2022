const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / ((height / 100) * (height / 100));

    if(bmi < 18.5) {
        return "Underweight";
    }

    else if(18.5 < bmi && bmi < 25) {
        return "Normal (healthy weight)";
    }

    else if(25 <= bmi && bmi < 30) {
        return "Overweight";
    }

    else {
        return "Obese";
    }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

if(height && weight) {
    console.log(calculateBmi(height, weight));
}

//console.log(calculateBmi(180, 74));

export default calculateBmi;