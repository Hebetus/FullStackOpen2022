import patientData from '../data/patients';
import toNewPatient from '../utils';

import { Patient } from '../types';

const patients: Patient[] = patientData.map(obj => {
    const object = toNewPatient(obj) as Patient;
    object.id = obj.id;
    return object;
});

const getIndividualPatient = (id: string) => {
    return patientData.find(patient => patient.id === id);
};

const getNonSensitivePatientRecords = (): Pick<Patient, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatients = () => {
    return patients;
};

const addPatient = (patient: Patient) => {
    patients.push(patient);
}

export default {
    getIndividualPatient,
    getNonSensitivePatientRecords,
    getPatients,
    addPatient
};