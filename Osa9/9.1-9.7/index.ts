import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator'



app.get('/hello', (req: any, res: any) => {
    console.log(req)
    res.send('hello world!')
});

app.get('/bmi', (req: any, res: any) => {
    const weight: number = req.query.weight;
    const height: number = req.query.height;
    console.log(height, weight)
    const bmi: String =  calculateBmi(height, weight)

    res.render({
        weight: weight,
        height: height,
        bmi: bmi
    })
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})