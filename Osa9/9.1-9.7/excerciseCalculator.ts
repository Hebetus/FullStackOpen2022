interface trainingResult {
    (days: number[], originalTarget: number):
    returnValue;
}

type returnValue = {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

let calculateExercises: trainingResult;

calculateExercises = (days: number[], originalTarget: number): returnValue => {
    const countTrainingDays = () => {
        let total = 0;
        days.forEach((element: number) => {
            if(element > 0) {
                total++
            }
        });
        return total;
    }

    const successFailure = countTrainingDays() >= originalTarget

    const totalTrainingTime = () => {
        let total = 0;
        days.forEach((element: number) => {
            total = total + element;
        })
        return total;
    }

    const rating = () => {
        if(totalTrainingTime() < 10) {
            return 1;
        }
        else if(10 < totalTrainingTime() && totalTrainingTime() < 15) {
            return 2;
        }
        else if(totalTrainingTime() > 15) {
            return 3;
        }
        else {
            throw new Error('Invalid input!');
        }
    }

    const totalRating = () => {
        if(totalTrainingTime() < 10) {
            return 'you could do better next week!';
        }
        else if(10 < totalTrainingTime() && totalTrainingTime() < 15) {
            return 'not too bad but could be better';
        }
        else if(totalTrainingTime() > 15) {
            return 'very good, keep going like this!';
        }
        else {
            throw new Error('Invalid input!');
        }
    }

    const average = () => {
        return totalTrainingTime() / countTrainingDays();
    }

    return {
        periodLength: 7,
        trainingDays: countTrainingDays(),
        success: successFailure,
        rating: rating(),
        ratingDescription: totalRating(),
        target: originalTarget,
        average: average()
    };
}

const parseArguments = (): Array<number> => {
    const args: Array<String> = process.argv
    let newArgs: Array<number> = []

    if (args.length < 3) throw new Error('Note enoguh arguments!');

    args.shift();
    args.shift();

    for(var index in args) {
        newArgs.push(Number(index))
    }

    return newArgs
}

console.log(calculateExercises(parseArguments(), Number(process.argv[2])))