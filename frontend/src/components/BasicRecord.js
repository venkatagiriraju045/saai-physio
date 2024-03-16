

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/create-record.css';
const BasicRecord = () => {
    const [mobileNo, setMobileNo] = useState(false);

    const [loading, setLoading] = useState(true);
    const [appMessage, setAppMessage] = useState('');
    const [selectedPatientType, setSelectedPatientType] = useState('');
    const [createoverlayVisible, setCreateOverlayVisible] = useState(false);
    const [inputValidation, setInputValidation] = useState({
        name: true,
        gender: true,
        age: true,
        mobileNo: true,
        occupation: true,
        address: true,
        complaint: true,
        uhid: true,
        // ... add other fields here
    });
    const [patient, setPatient] = useState({
        name: '',
        gender: '',
        age: '',
        mobileNo: '',
        occupation: '',
        address: '',
        complaint: '',
        uhid: '',
        doc: '',
        planTreatment: [
            {
                patientType: 'choose type',
                startDate: '',
                endDate: '',
                days: '',
                ust: false,
                ift: false,
                swd: false,
                tr: false,
                wax: false,
                est: false,
                sht: false,
                laser: false,
                exs: false,
                rehab: false,
            },
        ],
        investigation: [
            {
                date: '',
                xray: '',
                mri: '',
                others: '',
                provisionalDiagnosis: '',
            },
        ],
        rangeOfMotion: {
            cervical: [
                { flexion: { rt: 0, lt: 0 } },
                { extension: { rt: 0, lt: 0 } },
                { abduction: { rt: 0, lt: 0 } },
                { adduction: { rt: 0, lt: 0 } },
                { eversion: { rt: 0, lt: 0 } },
                { inversion: { rt: 0, lt: 0 } },
                { externalRotation: { rt: 0, lt: 0 } },
                { internalRotation: { rt: 0, lt: 0 } },
                { dorsiFlexion: { rt: 0, lt: 0 } },
                { plantarFlexion: { rt: 0, lt: 0 } },
                { supination: { rt: 0, lt: 0 } },
                { pronation: { rt: 0, lt: 0 } },
                { lateralRotation: { rt: 0, lt: 0 } },
            ],
            shoulder: [
                { flexion: { rt: 0, lt: 0 } },
                { extension: { rt: 0, lt: 0 } },
                { abduction: { rt: 0, lt: 0 } },
                { adduction: { rt: 0, lt: 0 } },
                { eversion: { rt: 0, lt: 0 } },
                { inversion: { rt: 0, lt: 0 } },
                { externalRotation: { rt: 0, lt: 0 } },
                { internalRotation: { rt: 0, lt: 0 } },
                { dorsiFlexion: { rt: 0, lt: 0 } },
                { plantarFlexion: { rt: 0, lt: 0 } },
                { supination: { rt: 0, lt: 0 } },
                { pronation: { rt: 0, lt: 0 } },
                { lateralRotation: { rt: 0, lt: 0 } },
            ],
            elbow: [
                { flexion: { rt: 0, lt: 0 } },
                { extension: { rt: 0, lt: 0 } },
                { abduction: { rt: 0, lt: 0 } },
                { adduction: { rt: 0, lt: 0 } },
                { eversion: { rt: 0, lt: 0 } },
                { inversion: { rt: 0, lt: 0 } },
                { externalRotation: { rt: 0, lt: 0 } },
                { internalRotation: { rt: 0, lt: 0 } },
                { dorsiFlexion: { rt: 0, lt: 0 } },
                { plantarFlexion: { rt: 0, lt: 0 } },
                { supination: { rt: 0, lt: 0 } },
                { pronation: { rt: 0, lt: 0 } },
                { lateralRotation: { rt: 0, lt: 0 } },
            ],
            wrist: [
                { flexion: { rt: 0, lt: 0 } },
                { extension: { rt: 0, lt: 0 } },
                { abduction: { rt: 0, lt: 0 } },
                { adduction: { rt: 0, lt: 0 } },
                { eversion: { rt: 0, lt: 0 } },
                { inversion: { rt: 0, lt: 0 } },
                { externalRotation: { rt: 0, lt: 0 } },
                { internalRotation: { rt: 0, lt: 0 } },
                { dorsiFlexion: { rt: 0, lt: 0 } },
                { plantarFlexion: { rt: 0, lt: 0 } },
                { supination: { rt: 0, lt: 0 } },
                { pronation: { rt: 0, lt: 0 } },
                { lateralRotation: { rt: 0, lt: 0 } },
            ],
            hip: [
                { flexion: { rt: 0, lt: 0 } },
                { extension: { rt: 0, lt: 0 } },
                { abduction: { rt: 0, lt: 0 } },
                { adduction: { rt: 0, lt: 0 } },
                { eversion: { rt: 0, lt: 0 } },
                { inversion: { rt: 0, lt: 0 } },
                { externalRotation: { rt: 0, lt: 0 } },
                { internalRotation: { rt: 0, lt: 0 } },
                { dorsiFlexion: { rt: 0, lt: 0 } },
                { plantarFlexion: { rt: 0, lt: 0 } },
                { supination: { rt: 0, lt: 0 } },
                { pronation: { rt: 0, lt: 0 } },
                { lateralRotation: { rt: 0, lt: 0 } },
            ],
            knee: [
                { flexion: { rt: 0, lt: 0 } },
                { extension: { rt: 0, lt: 0 } },
                { abduction: { rt: 0, lt: 0 } },
                { adduction: { rt: 0, lt: 0 } },
                { eversion: { rt: 0, lt: 0 } },
                { inversion: { rt: 0, lt: 0 } },
                { externalRotation: { rt: 0, lt: 0 } },
                { internalRotation: { rt: 0, lt: 0 } },
                { dorsiFlexion: { rt: 0, lt: 0 } },
                { plantarFlexion: { rt: 0, lt: 0 } },
                { supination: { rt: 0, lt: 0 } },
                { pronation: { rt: 0, lt: 0 } },
                { lateralRotation: { rt: 0, lt: 0 } },
            ],
            ankle: [
                { flexion: { rt: 0, lt: 0 } },
                { extension: { rt: 0, lt: 0 } },
                { abduction: { rt: 0, lt: 0 } },
                { adduction: { rt: 0, lt: 0 } },
                { eversion: { rt: 0, lt: 0 } },
                { inversion: { rt: 0, lt: 0 } },
                { externalRotation: { rt: 0, lt: 0 } },
                { internalRotation: { rt: 0, lt: 0 } },
                { dorsiFlexion: { rt: 0, lt: 0 } },
                { plantarFlexion: { rt: 0, lt: 0 } },
                { supination: { rt: 0, lt: 0 } },
                { pronation: { rt: 0, lt: 0 } },
                { lateralRotation: { rt: 0, lt: 0 } },
            ],
        },
        musclePower: {
            cervicalC1C2Flexion: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            cervicalC3SideFlexion: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            scapulaC4Elevation: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            shoulderC5Abduction: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            elbowC6FlexionWristExtension: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            elbowC7ExtensionWristFlexion: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            thumbC8Extension: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            hipL1L2Flexion: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            kneeL3Extension: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            ankleL4Dorsiflexion: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            bigToeL5Extension: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            ankleS1PlantarFlexion: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            kneeS2Flexion: { rt: { motor: 0, sensory: 0 }, lt: { motor: 0, sensory: 0 } },
            // Add other properties as needed
        },

        outPatientBill: [
            {
                appointmentDate: '',
                serviceName: '',
                paymentMode: '',
                billAmount: '',
            },
        ],

        inPatientBill: [
            {
                roomNumber: '',
                admissionDate: '',
                dischargeDate: '',
                totalDays: '',
                visitingBill: '',
                physioBill: '',
                nursingBill: '',
                otherExpenses: '',
                paymentMode: '',
                billAmount: '',
            },
        ],
    });

    const setInputClasses = (fieldName, isValid) => {
        setInputValidation((prevValidation) => ({
            ...prevValidation,
            [fieldName]: isValid,
        }));
    };

    const createPatientRecord = async () => {
        const dateAndTime = new Date().toLocaleString();
        patient.doc = dateAndTime;

        // Check all fields and update input classes
        setInputClasses('name', !!patient.name.trim());
        setInputClasses('gender', !!patient.gender.trim());
        setInputClasses('age', !!patient.age.trim());
        setInputClasses('mobileNo', !!patient.mobileNo.trim());
        setInputClasses('occupation', !!patient.occupation.trim());
        setInputClasses('address', !!patient.address.trim());
        setInputClasses('complaint', !!patient.complaint.trim());
        setInputClasses('uhid', !!patient.uhid.trim());

        // Add similar checks for other fields

        // // Check if any field is empty and show an alert
        // if (!Object.values(patient).every(value => !!value.trim())) {
        //     alert('Please fill all the fields');
        //     return;
        // }

        // Validate the mobile number
        if (!validateMobileNumber(patient.mobileNo)) {
            return;
        }

        try {
            const response = await axios.post('https://saai-physio-api.vercel.app/api/create_basic_record', {
                patient: { ...patient },
            });

            if (response.status === 201) {
                alert("Record created successfully!");
                setAppMessage('Record updated successfully!');
                setTimeout(() => {
                    setAppMessage('');
                }, 5000);
                setLoading(false);
            } else {
                throw new Error('Failed to create record');
            }
        } catch (error) {
            console.error('Error creating patient record:', error);

            if (error.response && error.response.status === 400) {
                // Display alert for duplicate mobile number
                alert("Patient with the provided mobile number already exists");
            } else {
                // Display a general error message
                setAppMessage('An error occurred while creating the patient record');
                setLoading(false);
            }
        }

    };

    console.log(patient);
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Specific validation based on the field name
        switch (name) {
            case "name":
                if (/^[a-zA-Z ]*$/.test(value)) {
                    setPatient((prevPatient) => ({
                        ...prevPatient,
                        [name]: value,
                    }));

                    setInputClasses(name, /^[a-zA-Z ]*$/.test(value.trim()));
                } else {
                    alert("Please enter only alphabets for the field.");
                }
                break;

            case "occupation":
                if (/^[a-zA-Z]*$/.test(value)) {
                    setPatient((prevPatient) => ({
                        ...prevPatient,
                        [name]: value,
                    }));
                    setInputClasses(name, /^[a-zA-Z ]*$/.test(value.trim()));
                } else {
                    alert("Please enter only alphabets for the occupation field.");
                }
                break;
            case "uhid":
            case "complaint":
            case "address":
                if (/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/.test(value)) {
                    setPatient((prevPatient) => ({
                        ...prevPatient,
                        [name]: value,
                    }));
                    setInputClasses(name, /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/.test(value.trim()));
                } else {
                    alert("Please enter only alphanumeric characters and special characters for the field.");
                }
                break;

            case "age":
                // Validate and set the state
                if (value.trim() === "" || !isNaN(value.trim())) {
                    const age = value.trim() === "" ? "" : parseInt(value, 10);
                    if (age === "" || (age >= 0 && age <= 150)) {
                        setPatient((prevPatient) => ({
                            ...prevPatient,
                            [name]: value.trim(),
                        }));
                        setInputClasses(name, true);
                    } else {
                        alert("Please enter a valid age between 0 and 150.");
                        setInputClasses(name, false);
                    }
                } else {
                    alert("Please enter a valid numeric age.");
                    setInputClasses(name, false);
                }
                break;

            case "mobileNo":
                // Allow only numeric values with a maximum length of 13
                if (/^\d{0,12}$/.test(value)) {
                    setPatient((prevPatient) => ({
                        ...prevPatient,
                        [name]: value,
                    }));
                    setInputClasses(name, /^\d{0,12}$/.test(value.trim()));
                } else {
                    alert("Please enter a valid mobile number with maximum 10 digits.");
                }
                break;
            // Add more cases for additional fields with specific validation requirements

            case "gender":
            case "onset":
                setPatient((prevPatient) => ({
                    ...prevPatient,
                    [name]: value,
                }));
                setInputClasses(name, !!value.trim());

                break;

            case "duration":
            case "planOfTreatment":
                if (/^[a-zA-Z0-9\s]*$/.test(value)) {
                    setPatient((prevPatient) => ({
                        ...prevPatient,
                        [name]: value,
                    }));
                } else {
                    // Handle invalid input (e.g., show an error message)
                    alert("Please enter only numeric and alphabetic characters.");
                }
                setInputClasses(name, /^[a-zA-Z0-9\s]*$/.test(value.trim()));

                break;

        }
    };

    const validateMobileNumber = (number) => {
        const digitCount = number.replace(/\D/g, '').length; // Count only digits

        // Check if the number of digits is between 6 and 11
        if (digitCount > 5 && digitCount < 11) {
            setMobileNo(true);
            return true;
        } else {
            setMobileNo(false);
            alert("Please enter the valid mobile number and create record.");
            return false;
        }
    };

    return (
        <div class="create-record-container">
            <div class="create-record-form-container">
                <h1 class="create-record-title">Create Record</h1>
                <div class="create-record-row">
                    <div class="create-record-col">
                        <div class="create-record-form-group">
                            <span>Name&nbsp;&nbsp;&nbsp;</span>
                            <input class="create-record-form-field" type="text"
                                name="name"
                                placeholder="Patient's name"
                                value={patient.name}
                                onChange={handleInputChange}
                                required />
                        </div>
                    </div>
                    <div class="create-record-col">
                        <div class="create-record-form-group">
                            <span>Gender</span>
                            <select
                            className='create-record-form-field'
                                id="gender"
                                name="gender"
                                value={patient.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="choose">Choose</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="create-record-row">
                    <div class="create-record-col">
                        <div class="create-record-form-group">
                            <span>Age</span>
                            <input class="create-record-form-field"
                                type="text"
                                name="age"
                                placeholder="Patient's age"
                                value={patient.age}
                                onChange={handleInputChange}
                                required/>
                        </div>
                    </div>
                    <div class="create-record-col">
                        <div class="create-record-form-group">
                            <span>Mobile No</span>
                            <input class="create-record-form-field"
                                type="text"
                                name="mobileNo"
                                placeholder="Patient's mobile no"
                                value={patient.mobileNo}
                                onChange={handleInputChange}
                                required/>
                        </div>
                    </div>
                </div>
                <div class="create-record-row">
                    <div class="create-record-col">
                        <div class="create-record-form-group">
                            <span>Occupation</span>
                            <input class="create-record-form-field"
                                type="text"
                                name="occupation"
                                placeholder="Patient's occupation"
                                value={patient.occupation}
                                onChange={handleInputChange}
                                required/>
                        </div>
                    </div>
                    <div class="create-record-col">
                        <div class="create-record-form-group">
                            <span>IP/UHID</span>
                            <input class="create-record-form-field"
                                type="text"
                                name="uhid"
                                placeholder="Patient's IP / UHID"
                                value={patient.uhid}
                                onChange={handleInputChange}
                                required/>
                        </div>
                    </div>
                </div>
                <div class="create-record-row">
                    <div class="create-record-col">
                        <div class="create-record-form-group">
                            <span>Complaint</span>
                            <input class="create-record-form-field"
                                type="text"
                                name="complaint"
                                placeholder="Patient's complaint"
                                value={patient.complaint}
                                onChange={handleInputChange}
                                required/>
                        </div>
                    </div>
                    <div class="create-record-col">
                        <div class="create-record-form-group">
                            <span>Address</span>
                            <input class="create-record-form-field"
                                type="text"
                                name="address"
                                placeholder="Enter your address"
                                value={patient.address}
                                onChange={handleInputChange}
                                required/>
                        </div>
                    </div>
                </div>

                <input onClick={createPatientRecord} value="Proceed to Create Record" class="create-record-submit-btn" readOnly/>
{appMessage}
            </div>

        </div>

    );

};

export default BasicRecord;
