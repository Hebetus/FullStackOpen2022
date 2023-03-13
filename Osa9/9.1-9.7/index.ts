import express from 'express';
import bodyparser from 'body-parser';
const app = express();

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.use(bodyparser.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    console.log(req.query);

    if(!req.query.weight || !req.query.height) {
        res.send({
            error: 'malformatted parameters'
        });
    }

    res.send({
        weight: req.query.weight,
        height: req.query.height,
        bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    });
});

app.post('/exercises', (req, res) => {
    if(!req.body || !req.body.daily_exercises || !req.body.target) {
        res.send({
            error: "parameters missing"
        });
    }

    const body = req.body;
    const result = calculateExercises(body.daily_exercises, body.target);

    res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});