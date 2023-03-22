import axios from "axios";
import { useState, useEffect } from "react";
import { Diagnosis, Patient } from "../../types";

const PatientInformation = () => {
    const [patient, setPatient] = useState<Patient>();
    const href = window.location.href.substring(21);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

    useEffect(() => {
        axios.get<Patient>(`http://localhost:3001/api/patients/${href}`).then(response => {
            setPatient(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get<Diagnosis[]>('http://localhost:3001/api/diagnoses').then(response => {
            setDiagnoses(response.data);
        });
    }, []);

    const diagnoseName = (code: string): string => {
        let diagnoseName = '';
        if(diagnoses) {
            const diagnose = diagnoses.find(diagnose => diagnose.code === code);
            if(diagnose) {
                diagnoseName = diagnose?.name;
            }
        }
        return diagnoseName
    }

    return (
        <div className="App">
            <h1>{patient?.name} {patient?.gender}</h1>
            <p>ssh: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
            <h2>entries</h2>
            {patient?.entries?.map(entry => <div>
                {entry.date} {entry.description}
                <ul>
                    {entry.diagnosisCodes?.map(code => <li>{code} {diagnoseName(code)}</li>)}
                </ul>
            </div>)}
        </div>
    )
}

export default PatientInformation;