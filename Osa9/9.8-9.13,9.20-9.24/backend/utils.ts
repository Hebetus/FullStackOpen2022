import { Patient, Gender,  } from "./types";
import { v1 as uuid } from 'uuid';

const toNewPatient = (object: unknown): Patient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data!');
    };

    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object && 'entries' in object) {
        const newPatient: Patient = {
            id: uuid(),
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn),
            entries: []
        };

        return newPatient;
    };

    throw new Error('Incorrect data: some fields are missing');
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name!');
    };

    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth');
    };

    return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
    if (!isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    };

    return gender;
}

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    };

    return occupation;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing ssn')
    };

    return ssn;
};

const isGender = (param: unknown): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(String(param));
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export default toNewPatient;