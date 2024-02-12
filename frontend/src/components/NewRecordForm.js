import React, { useState } from 'react';
import axios from 'axios';
import './CSS/NewRecord.css';

const NewRecordForm = () => {
    const [mobileNo, setMobileNo] = useState(false);

    const [loading, setLoading] = useState(true);
    const [appMessage, setAppMessage] = useState('');
    const [patient, setPatient] = useState({
        name: '',
        gender: '',
        age: '',
        dateOfBirth: '',
        mobileNo: '',
        occupation: '',
        address: '',
        complaint: '',
        uhid: '',
        painRegion: {
            Neck: false,
            Wrist: false,
            LowerBack: false,
            Ankle: false,
            Shoulder: false,
            Fingers: false,
            Hip: false,
            Toes: false,
            Elbow: false,
            UpperBack: false,
            Knee: false,
        },
        postMedicalHistory: {
            dm: false,
            htn: false,
            cad: false,
            cvd: false,
            asthma: false,
            smoking: false,
            alcohol: false,
            surgicalHistory: false,
        },
        painAssessment: {
            beforeTreatment: {
                level: 0, // Initialize with a default value
            },
        },
        aggFactor: '',  // Add other properties as needed
        relFactor: '',
        duration: '',
        onset: '',
        vitalSign: {
            BP: '',
            RR: '',
            HR: '',
            SPO2: '',
            TEMP: '',
        },
        observation: {
            onObservation: {
                SkinColor: false,
                Deformity: false,
                Redness: false,
                ShinySkin: false,
                OpenWounds: false,
            },
            onPalpation: {
                Tenderness: false,
                Warmth: false,
                Swelling: false,
                Odema: false,
            },
        },
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
        coordination: {
            fingerToNose: { normal: false, abnormal: false, remarks: '' },
            fingerOpposition: { normal: false, abnormal: false, remarks: '' },
            grip: { normal: false, abnormal: false, remarks: '' },
            pronationSupination: { normal: false, abnormal: false, remarks: '' },
            reboundTest: { normal: false, abnormal: false, remarks: '' },
            tappingHand: { normal: false, abnormal: false, remarks: '' },
            tappingFoot: { normal: false, abnormal: false, remarks: '' },
            heelToKnee: { normal: false, abnormal: false, remarks: '' },
            drawingCircleHand: { normal: false, abnormal: false, remarks: '' },
            drawingCircleFoot: { normal: false, abnormal: false, remarks: '' },
            // Add other properties as needed
        },
        standingWalking: {
            normalPosture: { normal: false, abnormal: false, remarks: '' },
            tandonWalking: { normal: false, abnormal: false, remarks: '' },
            // Add other properties as needed
        },
        balance: {
            sitting: { normal: false, abnormal: false, remarks: '' },
            standing: { normal: false, abnormal: false, remarks: '' },
            posture: { normal: false, abnormal: false, remarks: '' },
            gait: { normal: false, abnormal: false, remarks: '' },
            // Add other properties as needed
        },
        handFunction: {
            grip: { normal: false, abnormal: false, remarks: '' },
            grasp: { normal: false, abnormal: false, remarks: '' },
            release: { normal: false, abnormal: false, remarks: '' },
            // Add other properties as needed
        },
        prehension: {
            tipToTip: { normal: false, abnormal: false, remarks: '' },
            padToPad: { normal: false, abnormal: false, remarks: '' },
            tipToPad: { normal: false, abnormal: false, remarks: '' },
            // Add other properties as needed
        },
        subjectiveAssessment: {
            breathlessness: { duration: '', severity: '', pattern: '', associatedFactors: '' },
            cough: { duration: '', severity: '', pattern: '', associatedFactors: '' },
            sputumHemoptysis: { duration: '', severity: '', pattern: '', associatedFactors: '', hemoptysisType: '' },
            wheeze: { duration: '', severity: '', pattern: '', associatedFactors: '' },
            chestPain: { duration: '', severity: '', pattern: '', associatedFactors: '' },
            // Add other properties as needed
        },
        rpe: {
            point6: false,
            point7: false,
            point8: false,
            point9: false,
            point10: false,
            point11: false,
            point12: false,
            point13: false,
            point14: false,
            point15: false,
            point16: false,
            point17: false,
        },
        brpe: {
            rating6: false,
            rating7: false,
            rating8: false,
            rating9: false,
            rating10: false,
            rating11: false,
            rating12: false,
            rating13: false,
            rating14: false,
            rating15: false,
            rating16: false,
            rating17: false,
            rating18: false,
            rating19: false,
            rating20: false,
        },
        generalObservation: {
            bodyBuilt: { normal: false, abnormal: false, remarks: '' },
            handsAndFingertips: { normal: false, abnormal: false, remarks: '' },
            eyes: { normal: false, abnormal: false, remarks: '' },
            cyanosis: { normal: false, abnormal: false, remarks: '' },
            jugularVenousPressure: { normal: false, abnormal: false, remarks: '' },
            // ... other properties
        },
        chestObservation: {
            breathingPattern: { normal: false, abnormal: false, remarks: '' },
            chestMovement: { normal: false, abnormal: false, remarks: '' },
            palpationOfChest: { normal: false, abnormal: false, remarks: '' },
            chestExpansion: { normal: false, abnormal: false, remarks: '' },
            // ... other properties
        },
        barthelIndex: {
            feeding: { score: 0, activity: 'Feeding', maxScore: 10 },
            bathing: { score: 0, activity: 'Bathing', maxScore: 5 },
            grooming: { score: 0, activity: 'Grooming', maxScore: 5 },
            dressing: { score: 0, activity: 'Dressing', maxScore: 10 },
            bowels: { score: 0, activity: 'Bowels', maxScore: 10 },
            bladder: { score: 0, activity: 'Bladder', maxScore: 10 },
            toiletUse: { score: 0, activity: 'Toilet Use', maxScore: 10 },
            transfer: { score: 0, activity: 'Transfer (Bed to Chair and Back)', maxScore: 15 },
            mobility: { score: 0, activity: 'Mobility (On level surfaces)', maxScore: 15 },
            stairs: { score: 0, activity: 'Stairs', maxScore: 10 },

        },
        chestShapeObservation: {
            chestShape: {
                normal: false,
                barrelChest: false,
                kyphosis: false,
                pectusExcavatum: false,
                pectusCarinatum: false,
            },
        },
        chestMotionObservation: {
            middleLobeLingulaMotion: null,
            upperLobeMotion: null,
            lowerLobeMotion: null,
        },
        planOfTreatment: '',
    });
    const createPatientRecord = async () => {
        setTimeout(() => {
            validateMobileNumber(patient.mobileNo);
        }, 1000);
        if (mobileNo) {
            const dateAndTime = new Date().toLocaleString();
            console.log('Patient Object:', patient);

            try {
                await axios.post('https://saai-physio-api.vercel.app/api/create_record', {
                    patient: {
                        ...patient,
                        dateAndTime,
                        painAssessment: {
                            beforeTreatment: {
                                level: patient.painAssessment.beforeTreatment.level,
                            },
                        },
                    },
                });
                alert("Record created successfully!");
                setAppMessage('Record updated successfully!');
                setTimeout(() => {
                    setAppMessage('');
                }, 5000);
                setLoading(false);
            } catch (error) {
                console.error('Error creating patient record:', error);
                setAppMessage('An error occurred while creating the patient record');
                setLoading(false);
            }
        }
    };
    const rangeOfMotionJoints = ['cervical', 'shoulder', 'elbow', 'wrist', 'hip', 'knee', 'ankle'];
    const severityOptions = ['Critical', 'High', 'Medium', 'Low'];
    const hemoptysisOptions = ['Red: Blood', 'Rust: Pneumonia', 'Purple: Neoplasm', 'Yellow: Infected', 'Green: Pus', 'Pink: Pulmonary Oedema'];
    const rangeOfMotionItems = [
        { label: "FLEXION", name: "flexion" },
        { label: "EXTENSION", name: "extension" },
        { label: "ABDUCTION", name: "abduction" },
        { label: "ADDUCTION", name: "adduction" },
        { label: "EVERSION", name: "eversion" },
        { label: "INVERSION", name: "inversion" },
        { label: "EXTERNAL ROTATION", name: "externalRotation" },
        { label: "INTERNAL ROTATION", name: "internalRotation" },
        { label: "DORSI FLEXION", name: "dorsiFlexion" },
        { label: "PLANTAR FLEXION", name: "plantarFlexion" },
    ];
    const musclePowerItems = [
        { label: "C1-C2 – CERVICAL FLEXION", name: "cervicalC1C2Flexion" },
        { label: "C3 – CERVICAL SIDE FLEXION", name: "cervicalC3SideFlexion" },
        { label: "C4-SCAPULA ELEVATION", name: "scapulaC4Elevation" },
        { label: "C5-SHOULDER ABDUCTION", name: "shoulderC5Abduction" },
        { label: "C6-ELBOW FLEXION AND WRIST EXTENSION", name: "elbowC6FlexionWristExtension" },
        { label: "C7-ELBOW EXTENSION AND WRIST FLEXION", name: "elbowC7ExtensionWristFlexion" },
        { label: "C8-THUMB EXTENSION", name: "thumbC8Extension" },
        { label: "L1- L2 –HIP FLEXION", name: "hipL1L2Flexion" },
        { label: "L3 –KNEE EXTENSION", name: "kneeL3Extension" },
        { label: "L4 –ANKLE DORSIFLEXION", name: "ankleL4Dorsiflexion" },
        { label: "L5 –BIG TOE EXTENSION", name: "bigToeL5Extension" },
        { label: "S1 –ANKLE PLANTAR FLEXION", name: "ankleS1PlantarFlexion" },
        { label: "S2 –KNEE FLEXION", name: "kneeS2Flexion" },
        // Add more items as needed
    ];
    const coordinationItems = [
        { label: 'FINGER TO NOSE', name: 'fingerToNose' },
        { label: 'FINGER OPPOSITION', name: 'fingerOpposition' },
        { label: 'GRIP', name: 'grip' },
        { label: 'PRONATION/SUPINATION', name: 'pronationSupination' },
        { label: 'REBOUND TEST', name: 'reboundTest' },
        { label: 'TAPPING(HAND)', name: 'tappingHand' },
        { label: 'TAPPING(FOOT)', name: 'tappingFoot' },
        { label: 'HEEL TO KNEE', name: 'heelToKnee' },
        { label: 'DRAWING A CIRCLE (HAND)', name: 'drawingCircleHand' },
        { label: 'DRAWING A CIRCLE (FOOT)', name: 'drawingCircleFoot' },
        // Add more items as needed
    ];
    const standingWalkingItems = [
        { label: 'STANDING: NORMAL POSTURE', name: 'normalPosture' },
        { label: 'TANDON WALKING', name: 'tandonWalking' },
        // Add more items as needed
    ];
    const balanceItems = [
        { label: 'SITTING', name: 'sitting' },
        { label: 'STANDING', name: 'standing' },
        { label: 'POSTURE', name: 'posture' },
        { label: 'GAIT', name: 'gait' },
        // Add more items as needed
    ];
    const handFunctionItems = [
        { label: 'GRIP', name: 'grip' },
        { label: 'GRASP', name: 'grasp' },
        { label: 'RELEASE', name: 'release' },
        // Add more items as needed
    ];
    const prehensionItems = [
        { label: 'TIP TO TIP', name: 'tipToTip' },
        { label: 'PAD TO PAD', name: 'padToPad' },
        { label: 'TIP TO PAD', name: 'tipToPad' },
        // Add more items as needed
    ];
    const rpeData = [
        { point: 6, effort: 'No Exertion', description: 'Little to no movement, very relaxed', maxHRPercentage: '20%' },
        { point: 7, effort: 'Extremely Light', description: 'Able to maintain pace', maxHRPercentage: '30%' },
        { point: 8, effort: '', description: '', maxHRPercentage: '40%' },
        { point: 9, effort: 'Very Light', description: 'Comfortable and breathing harder', maxHRPercentage: '50%' },
        { point: 10, effort: '', description: '', maxHRPercentage: '55%' },
        { point: 11, effort: 'Light', description: 'Minimal sweating, can talk easily', maxHRPercentage: '60%' },
        { point: 12, effort: '', description: '', maxHRPercentage: '65%' },
        { point: 13, effort: 'Somewhat Hard', description: 'Slight breathlessness, can talk', maxHRPercentage: '70%' },
        { point: 14, effort: '', description: 'Increased sweating, still able to hold conversation but with difficulty', maxHRPercentage: '75%' },
        { point: 15, effort: 'Hard', description: 'Sweating, able to push and still maintain proper form', maxHRPercentage: '80%' },
        { point: 16, effort: '', description: '', maxHRPercentage: '85%' },
        { point: 17, effort: 'Very Hard', description: 'Can keep a fast pace for a short', maxHRPercentage: '90%' },
    ];
    const brpeData = [
        { rating: 6, description: 'Very, Very Light (REST)', effortPercentage: '20%' },
        { rating: 7, description: '', effortPercentage: '30%' },
        { rating: 8, description: '', effortPercentage: '40%' },
        { rating: 9, description: 'Very Light, Gentle Walk', effortPercentage: '50%' },
        { rating: 10, description: '', effortPercentage: '55%' },
        { rating: 11, description: 'Fairly Light', effortPercentage: '60%' },
        { rating: 12, description: '', effortPercentage: '65%' },
        { rating: 13, description: 'Moderately Hard, Steady Pace', effortPercentage: '70%' },
        { rating: 14, description: '', effortPercentage: '75%' },
        { rating: 15, description: 'Hard', effortPercentage: '80%' },
        { rating: 16, description: '', effortPercentage: '85%' },
        { rating: 17, description: 'Very Hard', effortPercentage: '90%' },
        { rating: 18, description: '', effortPercentage: '95%' },
        { rating: 19, description: 'Very, Very Hard', effortPercentage: '100%' },
        { rating: 20, description: 'EXHAUSTION', effortPercentage: '' },
    ];
    const generalObservationItems = [
        { label: 'Body built', name: 'bodyBuilt' },
        { label: 'Hands and fingertips', name: 'handsAndFingertips' },
        { label: 'Eyes', name: 'eyes' },
        { label: 'Cyanosis', name: 'cyanosis' },
        { label: 'Jugular venous pressure', name: 'jugularVenousPressure' },
        // ... other items
    ];
    const chestObservationItems = [
        { label: 'Breathing pattern', name: 'breathingPattern' },
        { label: 'Chest movement', name: 'chestMovement' },
        { label: 'Palpation of chest', name: 'palpationOfChest' },
        { label: 'Chest expansion', name: 'chestExpansion' },
        // ... other items
    ];
    const barthelIndexItems = [
        { label: 'Feeding', name: 'feeding', range: '0 = unable, 5 = needs help, 10 = independent' },
        { label: 'Bathing', name: 'bathing', range: '0 = dependent, 5 = independent (or in shower)' },
        { label: 'Grooming', name: 'grooming', range: '0 = needs help, 5 = independent with face/hair/teeth/shaving' },
        { label: 'Dressing', name: 'dressing', range: '0 = dependent, 5 = needs help, 10 = independent (including buttons, zips, laces, etc.)' },
        { label: 'Bowels', name: 'bowels', range: '0 = incontinent, 5 = occasional accident, 10 = continent' },
        { label: 'Bladder', name: 'bladder', range: '0 = incontinent or catheterized, 5 = occasional accident, 10 = continent' },
        { label: 'Toilet Use', name: 'toiletUse', range: '0 = dependent, 5 = needs some help, 10 = independent (on and off, dressing, wiping)' },
        { label: 'Transfer', name: 'transfer', range: '0 = unable, 5 = major help, 10 = minor help, 15 = independent' },
        { label: 'Mobility', name: 'mobility', range: '0 = immobile, 5 = wheelchair independent, 10 = walks with help, 15 = independent' },
        { label: 'Stairs', name: 'stairs', range: '0 = unable, 5 = needs help, 10 = independent' },
    ];
    const chestShapeObservationItems = [
        { label: 'Normal', name: 'normal' },
        { label: 'Barrel Chest', name: 'barrelChest' },
        { label: 'Kyphosis', name: 'kyphosis' },
        { label: 'Pectus Excavatum', name: 'pectusExcavatum' },
        { label: 'Pectus Carinatum', name: 'pectusCarinatum' },
    ];
    const chestMotionItems = [
        { label: 'A', name: 'a' },
        { label: 'B', name: 'b' },
    ];
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
                } else {
                    alert("Please enter only alphabets for the name field.");
                }
                break;

            case "occupation":
                if (/^[a-zA-Z]*$/.test(value)) {
                    setPatient((prevPatient) => ({
                        ...prevPatient,
                        [name]: value,
                    }));
                } else {
                    alert("Please enter only alphabets for the occupation field.");
                }
                break;
            case "uhid":
            case "complaint":
            case "address":
                if (/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value)) {
                    setPatient((prevPatient) => ({
                        ...prevPatient,
                        [name]: value,
                    }));
                } else {
                    alert("Please enter only alphanumeric characters and special characters for the field.");
                }
                break;

            case "age":
                // Allow only numeric values within a specific range or empty string
                if (value.trim() === "" || !isNaN(value)) {
                    const age = value.trim() === "" ? "" : parseInt(value, 10);
                    if (age === "" || (age >= 0 && age <= 150)) {
                        setPatient((prevPatient) => ({
                            ...prevPatient,
                            [name]: age,
                        }));
                    } else {
                        alert("Please enter a valid age between 0 and 150.");
                    }
                } else {
                    alert("Please enter a valid numeric age.");
                }
                break;

            case "mobileNo":
                // Allow only numeric values with a maximum length of 13
                if (/^\d{0,12}$/.test(value)) {
                    setPatient((prevPatient) => ({
                        ...prevPatient,
                        [name]: value,
                    }));
                } else {
                    alert("Please enter a valid mobile number with maximum 13 digits.");
                }
                break;
            // Add more cases for additional fields with specific validation requirements

        }
    };
    const validateMobileNumber = (number) => {
        const digitCount = number.replace(/\D/g, '').length; // Count only digits

        // Check if the number of digits is between 6 and 11
        if (digitCount > 5 && digitCount < 12) {
            setMobileNo(true);
        } else {
            setMobileNo(false);
            alert("Please enter the valid mobile number and create record.");

        }
    };
    const handleObservationCheckboxChange = (observationType, value) => {
        setPatient((prevPatient) => {
            const updatedPatient = { ...prevPatient };
            updatedPatient.observation[observationType] = {
                ...prevPatient.observation[observationType],
                [value]: !prevPatient.observation[observationType][value],
            };
            return updatedPatient;
        });
    };
    const handlePainLevelChange = (event) => {
        const level = parseInt(event.target.value, 10);

        setPatient((prevPatient) => ({
            ...prevPatient,
            painAssessment: {
                ...prevPatient.painAssessment,
                beforeTreatment: {
                    ...prevPatient.painAssessment.beforeTreatment,
                    level: level,
                },
            },
        }));

        // Additional logic if needed
        // For example, you can update the state or perform other actions based on the pain level.
    };
    const handleCheckboxChange = (area) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            painRegion: {
                ...prevPatient.painRegion,
                [area]: !prevPatient.painRegion[area],
            },
        }));
    };
    const handlePostMedicalHistoryCheckboxChange = (area) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            postMedicalHistory: {
                ...prevPatient.postMedicalHistory,
                [area]: !prevPatient.postMedicalHistory[area],
            },
        }));
    };
    const handleRangeOfMotionChange = (joint, motion, side, value) => {
        setPatient((prevPatient) => {
            const updatedRangeOfMotion = { ...prevPatient.rangeOfMotion };
            // Find the index of the motion
            const motionIndex = rangeOfMotionItems.findIndex((item) => item.name === motion);

            // If the motion is found and value is between 0 and 1000, update the corresponding side
            if (motionIndex !== -1 && value >= 0 && value <= 1000) {
                updatedRangeOfMotion[joint] = updatedRangeOfMotion[joint].map((motionItem, index) => {
                    if (index === motionIndex) {
                        return {
                            ...motionItem,
                            [motion]: {
                                ...motionItem[motion],
                                [side]: value,
                            },
                        };
                    }
                    return motionItem;
                });
            }

            return {
                ...prevPatient,
                rangeOfMotion: updatedRangeOfMotion,
            };
        });
    };
    const handleMusclePowerChange = (muscleType, side, category, value) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            musclePower: {
                ...prevPatient.musclePower,
                [muscleType]: {
                    ...prevPatient.musclePower[muscleType],
                    [side]: {
                        ...prevPatient.musclePower[muscleType][side],
                        [category]: value, // Update the value
                    },
                },
            },
        }));
    };
    const handleCoordinationCheckboxChange = (coordinationType, column) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            coordination: {
                ...prevPatient.coordination,
                [coordinationType]: {
                    ...prevPatient.coordination[coordinationType],
                    [column]: !prevPatient.coordination[coordinationType][column],
                },
            },
        }));
    };
    const handleRemarksChange = (coordinationType, event) => {
        const remarksValue = event.target.value;
    
        // Regular expression to allow only alphabets and numbers
        const isValidInput = /^[a-zA-Z0-9\s]*$/.test(remarksValue);
    
        // If the input is valid, update the state
        if (isValidInput) {
            setPatient((prevPatient) => ({
                ...prevPatient,
                coordination: {
                    ...prevPatient.coordination,
                    [coordinationType]: {
                        ...prevPatient.coordination[coordinationType],
                        remarks: remarksValue,
                    },
                },
            }));
        } else {
            // If the input is invalid, you can display an error message or handle it as needed
            alert("Please enter only alphabets and numbers for the remarks.");
        }
    };
    
    const handleVitalInputChange = (event) => {
        const { name, value } = event.target;
        setPatient((prevPatient) => ({
            ...prevPatient,
            vitalSign: {
                ...prevPatient.vitalSign,
                [name]: value,
            },
        }));
    };
    const handleStandingWalkingCheckboxChange = (standingWalkingType, column) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            standingWalking: {
                ...prevPatient.standingWalking,
                [standingWalkingType]: {
                    ...prevPatient.standingWalking[standingWalkingType],
                    [column]: !prevPatient.standingWalking[standingWalkingType][column],
                },
            },
        }));
    };
    const handleEquilibriumRemarksChange = (standingWalkingType, event) => {
        const remarksValue = event.target.value;
        setPatient((prevPatient) => ({
            ...prevPatient,
            standingWalking: {
                ...prevPatient.standingWalking,
                [standingWalkingType]: {
                    ...prevPatient.standingWalking[standingWalkingType],
                    remarks: remarksValue,
                },
            },
        }));
    };
    const handleBalanceCheckboxChange = (balanceType, column) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            balance: {
                ...prevPatient.balance,
                [balanceType]: {
                    ...prevPatient.balance[balanceType],
                    [column]: !prevPatient.balance[balanceType][column],
                },
            },
        }));
    };
    const handleBalanceRemarksChange = (balanceType, event) => {
        const remarksValue = event.target.value;
        setPatient((prevPatient) => ({
            ...prevPatient,
            balance: {
                ...prevPatient.balance,
                [balanceType]: {
                    ...prevPatient.balance[balanceType],
                    remarks: remarksValue,
                },
            },
        }));
    };
    const handleHandFunctionCheckboxChange = (functionType, column) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            handFunction: {
                ...prevPatient.handFunction,
                [functionType]: {
                    ...prevPatient.handFunction[functionType],
                    [column]: !prevPatient.handFunction[functionType][column],
                },
            },
        }));
    };
    const handleHandFunctionRemarksChange = (functionType, event) => {
        const remarksValue = event.target.value;
        setPatient((prevPatient) => ({
            ...prevPatient,
            handFunction: {
                ...prevPatient.handFunction,
                [functionType]: {
                    ...prevPatient.handFunction[functionType],
                    remarks: remarksValue,
                },
            },
        }));
    };
    const handlePrehensionCheckboxChange = (prehensionType, column) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            prehension: {
                ...prevPatient.prehension,
                [prehensionType]: {
                    ...prevPatient.prehension[prehensionType],
                    [column]: !prevPatient.prehension[prehensionType][column],
                },
            },
        }));
    };
    const handlePrehensionRemarksChange = (prehensionType, event) => {
        const remarksValue = event.target.value;
        setPatient((prevPatient) => ({
            ...prevPatient,
            prehension: {
                ...prevPatient.prehension,
                [prehensionType]: {
                    ...prevPatient.prehension[prehensionType],
                    remarks: remarksValue,
                },
            },
        }));
    };
    const handleTextChange = (symptom, field, event) => {
        const value = event.target.value;
        setPatient((prevPatient) => ({
            ...prevPatient,
            subjectiveAssessment: {
                ...prevPatient.subjectiveAssessment,
                [symptom]: {
                    ...prevPatient.subjectiveAssessment[symptom],
                    [field]: value,
                },
            },
        }));
    };
    const handleSeverityChange = (symptom, event) => {
        const value = event.target.value;
        setPatient((prevPatient) => ({
            ...prevPatient,
            subjectiveAssessment: {
                ...prevPatient.subjectiveAssessment,
                [symptom]: {
                    ...prevPatient.subjectiveAssessment[symptom],
                    severity: value,
                },
            },
        }));
    };
    const handleHemoptysisTypeChange = (symptom, event) => {
        const value = event.target.value;
        setPatient((prevPatient) => ({
            ...prevPatient,
            subjectiveAssessment: {
                ...prevPatient.subjectiveAssessment,
                [symptom]: {
                    ...prevPatient.subjectiveAssessment[symptom],
                    hemoptysisType: value,
                },
            },
        }));
    };
    const handlePointCheckboxChange = (point) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            rpe: {
                ...Object.fromEntries(Object.entries(prevPatient.rpe).map(([key, value]) => [key, key === point])),
            },
        }));
    };
    const handleBordRatingCheckboxChange = (rating) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            brpe: {
                ...Object.fromEntries(Object.entries(prevPatient.brpe).map(([key, value]) => [key, key === rating])),
            },
        }));
    };
    const handleGeneralObservationCheckboxChange = (observation, category) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            generalObservation: {
                ...prevPatient.generalObservation,
                [observation]: {
                    ...prevPatient.generalObservation[observation],
                    [category]: !prevPatient.generalObservation[observation][category],
                },
            },
        }));
    };
    const handleChestObservationCheckboxChange = (observation, category) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            chestObservation: {
                ...prevPatient.chestObservation,
                [observation]: {
                    ...prevPatient.chestObservation[observation],
                    [category]: !prevPatient.chestObservation[observation][category],
                },
            },
        }));
    };
    const handleScoreChange = (activity, score) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            barthelIndex: {
                ...prevPatient.barthelIndex,
                [activity]: {
                    ...prevPatient.barthelIndex[activity],
                    score: score,
                },
            },
        }));
    };
    const handleChestShapeObservationCheckboxChange = (observation) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            chestShapeObservation: {
                ...prevPatient.chestShapeObservation,
                chestShape: {
                    ...prevPatient.chestShapeObservation.chestShape,
                    [observation]: !prevPatient.chestShapeObservation.chestShape[observation],
                },
            },
        }));
    };
    const handleChestMotionCheckboxChange = (field, motion) => {
        setPatient((prevPatient) => ({
            ...prevPatient,
            chestMotionObservation: {
                ...prevPatient.chestMotionObservation,
                [field]: motion,
            },
        }));
    };

    return (
        <div className='new-record-main-container'>
            <div className="container">
                <div className="registration-container">
                    <div className="title">User Registration Details</div>
                    <br />
                    <br />
                    <form action="#">
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={patient.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Gender</span>
                                <select
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
                            <div className="input-box">
                                <span className="details">Age</span>
                                <input
                                    type="text"
                                    name="age"
                                    placeholder="Enter your age"
                                    value={patient.age}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <span className="details">Mobile No</span>
                                <input
                                    type="text"
                                    name="mobileNo"
                                    placeholder="Enter your mobile no"
                                    value={patient.mobileNo}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Occupation</span>
                                <input
                                    type="text"
                                    name="occupation"
                                    placeholder="Enter your occupation"
                                    value={patient.occupation}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">IP/UHID</span>
                                <input
                                    type="text"
                                    name="uhid"
                                    placeholder="Enter your IP / UHID"
                                    value={patient.uhid}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Complaint</span>
                                <input
                                    type="text"
                                    name="complaint"
                                    placeholder="Enter your complaint"
                                    value={patient.complaint}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="address">
                                <span className="details">Address</span>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter your address"
                                    value={patient.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="post-medical-history">
                <div className="title">Post Medical History</div>
                <br /><br />
                <div className="checkbox-grid">
                    {Object.keys(patient.postMedicalHistory).map((area) => (
                        <label key={area} className="checkbox">
                            <input
                                type="checkbox"
                                name="area"
                                value={area}
                                checked={patient.postMedicalHistory[area]}
                                onChange={() => handlePostMedicalHistoryCheckboxChange(area)}
                            />
                            <p className="box">{area}</p>
                        </label>
                    ))}
                </div>
            </div>
            <div className="assessment">
                <div className="title">Pain Assessment Scale</div>
                <form>
                    <legend>Choose the level of pain:</legend>
                    <div className="range-value-container">
                        <input
                            type="range"
                            name="painLevel"
                            min="0"
                            max="10"
                            value={patient.painAssessment.beforeTreatment.level}
                            step="1"
                            onChange={handlePainLevelChange}
                        />                        <div className="scale">
                            <div className="scale-value" style={{ "--value": 0 }}>
                                <p>0</p>
                                <img src="./uploads/pain-level-0.png" />
                                <p>no pain</p>
                            </div>

                            <div className="scale-value" style={{ "--value": 1 }}>1</div>
                            <div className="scale-value" style={{ "--value": 2 }}>
                                <p>2</p>
                                <img src="./uploads/pain-level-2.png" />
                                <p>mild</p>

                            </div>
                            <div className="scale-value" style={{ "--value": 3 }}>3</div>
                            <div className="scale-value" style={{ "--value": 4 }}>
                                <p>4</p>
                                <img src="./uploads/pain-level-4.png" />
                                <p>moderate</p>

                            </div>
                            <div className="scale-value" style={{ "--value": 5 }}>5</div>
                            <div className="scale-value" style={{ "--value": 6 }}>
                                <p>6</p>
                                <img src="./uploads/pain-level-6.png" />
                                <p>severe</p>

                            </div>
                            <div className="scale-value" style={{ "--value": 7 }}>7</div>
                            <div className="scale-value" style={{ "--value": 8 }}>
                                <p>8</p>
                                <img src="./uploads/pain-level-8.png" />
                                <p>very severe</p>

                            </div>
                            <div className="scale-value" style={{ "--value": 9 }}>9</div>
                            <div className="scale-value" style={{ "--value": 10 }}>
                                <p>10</p>
                                <img src="./uploads/pain-level-10.png" />
                                <p>worst pain</p>

                            </div>
                        </div>
                    </div>
                    <div id="result"></div>
                </form>
            </div>
            <div className="painregion">
                <div className="title">Pain Region</div>
                <br />
                <br />

                <div className="checkbox-grid">
                    {Object.keys(patient.painRegion).map((area) => (
                        <label key={area} className="checkbox">
                            <input
                                type="checkbox"
                                name="area"
                                value={area}
                                checked={patient.painRegion[area]}
                                onChange={() => handleCheckboxChange(area)}
                            />
                            <p className="box">{area}</p>
                        </label>
                    ))}
                </div>
                <br />
                <br />

                <div className="container-history">
                    <form action="#">
                        <div className="form-details">
                            <div className="form-box">
                                <span className="requirements">Aggrivating Factor</span>
                                <input
                                    type="text"
                                    name="aggFactor"
                                    placeholder="Enter your Aggrivating Factor"
                                    value={patient.aggFactor}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-box">
                                <span className="requirements">Relieving Factor</span>
                                <input
                                    type="text"
                                    name="relFactor"
                                    placeholder="Enter your Relieving Factor"
                                    value={patient.relFactor}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-box">
                                <span className="requirements">Duration</span>
                                <input
                                    type="text"
                                    name="duration"
                                    placeholder="Enter your duration of pain"
                                    value={patient.duration}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-box">
                                <span className="requirements">Onset</span>
                                <select
                                    id="onset"
                                    name="onset"
                                    value={patient.onset}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="choose">Choose</option>
                                    <option value="sudden">Sudden</option>
                                    <option value="gradual">Gradual</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container-vitalsign">
                <div className="title">Vital Sign</div>
                <form action="#">
                    <div className="user-data">
                        <div className="input-value">
                            <span className="data">BP</span>
                            <input
                                type="text"
                                name="BP"
                                placeholder="Enter your bp"
                                value={patient.vitalSign.BP}
                                onChange={handleVitalInputChange}
                                required
                            />
                        </div>
                        <div className="input-value">
                            <span className="data">RR</span>
                            <input
                                type="text"
                                name="RR"
                                placeholder="Enter your rr"
                                value={patient.vitalSign.RR}
                                onChange={handleVitalInputChange}
                                required
                            />
                        </div>
                        <div className="input-value">
                            <span className="data">HR</span>
                            <input
                                type="text"
                                name="HR"
                                placeholder="Enter your hr"
                                value={patient.vitalSign.HR}
                                onChange={handleVitalInputChange}
                                required
                            />
                        </div>
                        <div className="input-value">
                            <span className="data">SPO2</span>
                            <input
                                type="text"
                                name="SPO2"
                                placeholder="Enter your spo2"
                                value={patient.vitalSign.SPO2}
                                onChange={handleVitalInputChange}
                                required
                            />
                        </div>
                        <div className="input-value">
                            <span className="data">TEMP</span>
                            <input
                                type="text"
                                name="TEMP"
                                placeholder="Enter your temp"
                                value={patient.vitalSign.TEMP}
                                onChange={handleVitalInputChange}
                                required
                            />
                        </div>
                    </div>
                </form>
            </div>
            <div className="observation-palpation-container">
                <div className="title">On Observation</div>
                <br />
                <br />

                <div className="column-one">
                    {["SkinColor", "Deformity", "Redness", "ShinySkin", "OpenWounds"].map((observationItem) => (
                        <label key={observationItem} className="checkBox">
                            <input
                                type="checkbox"
                                name={observationItem.toLowerCase()}
                                value={observationItem}
                                checked={patient.observation.onObservation[observationItem]}
                                onChange={(e) => handleObservationCheckboxChange("onObservation", e.target.value)}
                            />
                            <p className="box-value">{observationItem}</p>
                        </label>
                    ))}
                </div>
                <br />
                <br />
                <br />

                <div className="title">On Palpation</div>
                <br />
                <br />

                <div className="column-two">
                    {["Tenderness", "Warmth", "Swelling", "Odema"].map((palpationItem) => (
                        <label key={palpationItem} className="checkBox">
                            <input
                                type="checkbox"
                                name={palpationItem.toLowerCase()}
                                value={palpationItem}
                                checked={patient.observation.onPalpation[palpationItem]}
                                onChange={(e) => handleObservationCheckboxChange("onPalpation", e.target.value)}
                            />
                            <p className="box-value">{palpationItem}</p>
                        </label>
                    ))}
                </div>
            </div>
            <div className="on-examination-container">
                <div className="title">On Examination:</div>
                <div className="physical-exam-container">
                    <table className="range-of-motion-table">
                        <caption>RANGE OF MOTION</caption>
                        <thead>
                            <tr>
                                <th></th>
                                {rangeOfMotionJoints.map((joint) => (
                                    <React.Fragment key={joint}>
                                        <th colSpan="2">{joint.toUpperCase()}</th>
                                    </React.Fragment>
                                ))}
                            </tr>
                            <tr>
                                <th></th>
                                {rangeOfMotionJoints.map((joint) => (
                                    <React.Fragment key={joint}>
                                        <th>RT</th>
                                        <th>LT</th>
                                    </React.Fragment>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {['flexion', 'extension', 'abduction', 'adduction', 'eversion', 'inversion', 'externalRotation', 'internalRotation', 'dorsiFlexion', 'plantarFlexion'].map((motion, index) => (
                                <tr key={motion}>
                                    <td>{motion.toUpperCase()}</td>
                                    {rangeOfMotionJoints.map((joint) => (
                                        <React.Fragment key={joint}>
                                            {['rt', 'lt'].map((side) => (
                                                <React.Fragment key={side}>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name={joint + '-' + motion + '-' + side}
                                                            onChange={(e) => handleRangeOfMotionChange(joint, motion, side, parseInt(e.target.value))}
                                                            placeholder="0"
                                                        />
                                                    </td>
                                                </React.Fragment>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className="muscle-power-table">
                        <caption>MUSCLE POWER</caption>
                        <thead>
                            <tr>
                                <th></th>
                                <th colSpan="2">MOTOR</th>
                                <th colSpan="2">SENSORY</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>RT</th>
                                <th>LT</th>
                                <th>RT</th>
                                <th>LT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {musclePowerItems.map((item) => (
                                <tr key={item.label}>
                                    <td>{item.label}</td>
                                    {["motor", "sensory"].map((category) => (
                                        ["rt", "lt"].map((side) => (
                                            <React.Fragment key={category + side}>
                                                <td>
                                                    <input
                                                        type="number"
                                                        name={item.name + "-" + side + "-" + category}
                                                        onChange={(e) => handleMusclePowerChange(item.name, side, category, parseInt(e.target.value))}
                                                        placeholder="0"
                                                    />
                                                </td>
                                            </React.Fragment>
                                        ))
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="coordination-container">
                <table className="coordination-table">

                    <caption>COORDINATION</caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Normal</th>
                            <th>Abnormal</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coordinationItems.map((item) => (
                            <tr key={item.label}>
                                <td>{item.label}</td>
                                {['normal', 'abnormal'].map((column) => (
                                    <React.Fragment key={column}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                name={item.name + '-' + column}
                                                checked={patient.coordination[item.name][column]}
                                                onChange={() => handleCoordinationCheckboxChange(item.name, column)}
                                            />
                                        </td>
                                    </React.Fragment>
                                ))}
                                <td>
                                    <input
                                        type="text"
                                        value={patient.coordination[item.name].remarks}
                                        onChange={(event) => handleRemarksChange(item.name, event)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <br></br>
                <br></br>

                <table className="standing-walking-table">
                    <caption>STANDING AND WALKING</caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Normal</th>
                            <th>Abnormal</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standingWalkingItems.map((item) => (
                            <tr key={item.label}>
                                <td>{item.label}</td>
                                {['normal', 'abnormal'].map((column) => (
                                    <React.Fragment key={column}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                name={item.name + '-' + column}
                                                checked={patient.standingWalking[item.name][column]}
                                                onChange={() => handleStandingWalkingCheckboxChange(item.name, column)}
                                            />
                                        </td>
                                    </React.Fragment>
                                ))}
                                <td>
                                    <input
                                        type="text"
                                        value={patient.standingWalking[item.name].remarks}
                                        onChange={(event) => handleEquilibriumRemarksChange(item.name, event)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="balance-container">
                <div className="title">ON CHECKING</div>

                <table className="balance-table">
                    <caption>BALANCE</caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Normal</th>
                            <th>Abnormal</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {balanceItems.map((item) => (
                            <tr key={item.label}>
                                <td>{item.label}</td>
                                {['normal', 'abnormal'].map((column) => (
                                    <React.Fragment key={column}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                name={item.name + '-' + column}
                                                checked={patient.balance[item.name][column]}
                                                onChange={() => handleBalanceCheckboxChange(item.name, column)}
                                            />
                                        </td>
                                    </React.Fragment>
                                ))}
                                <td>
                                    <input
                                        type="text"
                                        value={patient.balance[item.name].remarks}
                                        onChange={(event) => handleBalanceRemarksChange(item.name, event)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='hand-function-container'>
                    <table className="hand-function-table">
                        <caption>HAND FUNCTION</caption>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Normal</th>
                                <th>Abnormal</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {handFunctionItems.map((item) => (
                                <tr key={item.label}>
                                    <td>{item.label}</td>
                                    {['normal', 'abnormal'].map((column) => (
                                        <React.Fragment key={column}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    name={item.name + '-' + column}
                                                    checked={patient.handFunction[item.name][column]}
                                                    onChange={() => handleHandFunctionCheckboxChange(item.name, column)}
                                                />
                                            </td>
                                        </React.Fragment>
                                    ))}
                                    <td>
                                        <input
                                            type="text"
                                            value={patient.handFunction[item.name].remarks}
                                            onChange={(event) => handleHandFunctionRemarksChange(item.name, event)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className="prehension-table">
                        <caption>PREHENSION</caption>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Normal</th>
                                <th>Abnormal</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prehensionItems.map((item) => (
                                <tr key={item.label}>
                                    <td>{item.label}</td>
                                    {['normal', 'abnormal'].map((column) => (
                                        <React.Fragment key={column}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    name={item.name + '-' + column}
                                                    checked={patient.prehension[item.name][column]}
                                                    onChange={() => handlePrehensionCheckboxChange(item.name, column)}
                                                />
                                            </td>
                                        </React.Fragment>
                                    ))}
                                    <td>
                                        <input
                                            type="text"
                                            value={patient.prehension[item.name].remarks}
                                            onChange={(event) => handlePrehensionRemarksChange(item.name, event)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="subjective-assessment-container">
                <div className="title">SUBJECTIVE ASSESSMENT</div>
                <table className="subjective-assessment-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Duration</th>
                            <th>Severity</th>
                            <th>Pattern</th>
                            <th>Associated factors</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(patient.subjectiveAssessment).map((symptom) => (
                            <tr key={symptom}>
                                <td>{symptom}</td>
                                {['duration', 'severity', 'pattern', 'associatedFactors'].map((field) => (
                                    <td key={field}>
                                        {field === 'severity' ? (
                                            <select
                                                value={patient.subjectiveAssessment[symptom][field]}
                                                onChange={(event) => handleSeverityChange(symptom, event)}
                                            >
                                                <option value="">   Severity</option>
                                                {severityOptions.map((option) => (
                                                    <option key={option} value={option.toLowerCase()}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : field === 'severity' ? (
                                            <input
                                                type="text"
                                                value={patient.subjectiveAssessment[symptom][field]}
                                                onChange={(event) => handleTextChange(symptom, field, event)}
                                            />
                                        ) : field === 'associatedFactors' && symptom === 'sputumHemoptysis' ? (
                                            <select
                                                value={patient.subjectiveAssessment.sputumHemoptysis.hemoptysisType}
                                                onChange={(e) => handleHemoptysisTypeChange("sputumHemoptysis", e)}
                                            >
                                                <option value="">Type</option>
                                                {hemoptysisOptions.map((option) => (
                                                    <option key={option} value={option.toLowerCase()}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                value={patient.subjectiveAssessment[symptom][field]}
                                                onChange={(event) => handleTextChange(symptom, field, event)}
                                            />
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="rpe-table-container">
                <div className="title">RATE OF PERCEIVED EXERTION</div>
                <table className="rpe-table">
                    <thead>
                        <tr>
                            <th>Point</th>
                            <th>Effort</th>
                            <th>Description</th>
                            <th>% of Max HR</th>
                            <th>Point Got</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rpeData.map((data) => (
                            <tr key={data.point}>
                                <td>{data.point}</td>
                                <td>{data.effort}</td>
                                <td>{data.description}</td>
                                <td>{data.maxHRPercentage}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={`point${data.point}`}
                                        checked={patient.rpe[`point${data.point}`]}
                                        onChange={() => handlePointCheckboxChange(`point${data.point}`)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <br />
                <br />
                <br />
                <br />

                <div className="title">BORD RATE OF PERCEIVED EXERTION (BRPE SCALE)</div>

                <table className="brpe-table">
                    <thead>
                        <tr>
                            <th>Rating</th>
                            <th>Description</th>
                            <th>Effort%</th>
                            <th>Rating Got</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brpeData.map((data) => (
                            <tr key={data.rating}>
                                <td>{data.rating}</td>
                                <td>{data.description}</td>
                                <td>{data.effortPercentage}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={`rating${data.rating}`}
                                        checked={patient.brpe[`rating${data.rating}`]}
                                        onChange={() => handleBordRatingCheckboxChange(`rating${data.rating}`)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="objective-assessment-container">
                <div className="title">OBJECTIVE ASSESSMENT</div>
                <table className="general-observation-table">
                    <caption>General Observation</caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Normal</th>
                            <th>Abnormal</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generalObservationItems.map((item) => (
                            <tr key={item.label}>
                                <td>{item.label}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={item.name + '-normal'}
                                        checked={patient.generalObservation[item.name].normal}
                                        onChange={() => handleGeneralObservationCheckboxChange(item.name, 'normal')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={item.name + '-abnormal'}
                                        checked={patient.generalObservation[item.name].abnormal}
                                        onChange={() => handleGeneralObservationCheckboxChange(item.name, 'abnormal')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name={item.name + '-remarks'}
                                        value={patient.generalObservation[item.name].remarks}
                                        onChange={(e) => setPatient((prevPatient) => ({
                                            ...prevPatient,
                                            generalObservation: {
                                                ...prevPatient.generalObservation,
                                                [item.name]: {
                                                    ...prevPatient.generalObservation[item.name],
                                                    remarks: e.target.value,
                                                },
                                            },
                                        }))}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="chest-observation-table">
                    <caption>Observation of Chest</caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Normal</th>
                            <th>Abnormal</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chestObservationItems.map((item) => (
                            <tr key={item.label}>
                                <td>{item.label}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={item.name + '-normal'}
                                        checked={patient.chestObservation[item.name].normal}
                                        onChange={() => handleChestObservationCheckboxChange(item.name, 'normal')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={item.name + '-abnormal'}
                                        checked={patient.chestObservation[item.name].abnormal}
                                        onChange={() => handleChestObservationCheckboxChange(item.name, 'abnormal')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name={item.name + '-remarks'}
                                        value={patient.chestObservation[item.name].remarks}
                                        onChange={(e) => setPatient((prevPatient) => ({
                                            ...prevPatient,
                                            chestObservation: {
                                                ...prevPatient.chestObservation,
                                                [item.name]: {
                                                    ...prevPatient.chestObservation[item.name],
                                                    remarks: e.target.value,
                                                },
                                            },
                                        }))}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <img className='chest-shapes-img' src="./uploads/chest-shapes.PNG" />
                <table className="chest-observation-table">
                    <thead>
                        <tr>
                            <th></th>
                            {chestShapeObservationItems.map((item) => (
                                <th key={item.name}>{item.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Chest Shape</td>
                            {chestShapeObservationItems.map((item) => (
                                <td key={item.name}>
                                    <input
                                        type="checkbox"
                                        name={`chestShape-${item.name}`}
                                        checked={patient.chestShapeObservation.chestShape[item.name]}
                                        onChange={() => handleChestShapeObservationCheckboxChange(item.name)}
                                    />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <br />
                <table className="chest-motion-observation-table">
                    <caption>Observation of Chest Motion</caption>
                    <thead>
                        <tr>
                            <th>MOTION TYPE</th>
                            {chestMotionItems.map((item) => (
                                <th key={item.name}>{item.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Middle Lobe & Lingula Motion</td>
                            {chestMotionItems.map((item) => (
                                <td key={item.name}>
                                    <input
                                        type="radio"
                                        name="middleLobeLingulaMotion"
                                        value={item.name}
                                        checked={patient.chestMotionObservation.middleLobeLingulaMotion === item.name}
                                        onChange={() => handleChestMotionCheckboxChange('middleLobeLingulaMotion', item.name)}
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td>Upper Lobe Motion</td>
                            {chestMotionItems.map((item) => (
                                <td key={item.name}>
                                    <input
                                        type="radio"
                                        name="upperLobeMotion"
                                        value={item.name}
                                        checked={patient.chestMotionObservation.upperLobeMotion === item.name}
                                        onChange={() => handleChestMotionCheckboxChange('upperLobeMotion', item.name)}
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td>Lower Lobe Motion</td>
                            {chestMotionItems.map((item) => (
                                <td key={item.name}>
                                    <input
                                        type="radio"
                                        name="lowerLobeMotion"
                                        value={item.name}
                                        checked={patient.chestMotionObservation.lowerLobeMotion === item.name}
                                        onChange={() => handleChestMotionCheckboxChange('lowerLobeMotion', item.name)}
                                    />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <img className='lobe-img' src="./uploads/lobe.PNG" />
            </div>
            <div className="barthel-index-container">
                <div className="title">The Barthel Index</div>
                <table className="barthel-index-table">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Range</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {barthelIndexItems.map((item) => (
                            <tr key={item.label}>
                                <td>{item.label}</td>

                                <td>{item.range}</td>
                                <td>
                                    <select
                                        value={patient.barthelIndex[item.name].score}
                                        onChange={(e) => handleScoreChange(item.name, parseInt(e.target.value))}
                                    >
                                        {Array.from({ length: patient.barthelIndex[item.name].maxScore + 1 }, (_, index) => index).map(
                                            (score) => (
                                                <option key={score} value={score}>
                                                    {score}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td>Total Scores</td>
                            <td>
                                {Object.values(patient.barthelIndex).reduce((total, activity) => total + activity.score, 0)}
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="plan-of-treatment-container">
                <div className="title">Plan of Treatment :</div>
                <br />
                <br />
                <div className="input-container">

                    <input
                        type="text"
                        name="planOfTreatment"
                        placeholder="Enter the treatment plan"
                        value={patient.planOfTreatment}
                        onChange={handleInputChange}
                    />
                    <button onClick={createPatientRecord}>Create record</button>
                </div>

            </div>
            <p>{appMessage}</p>
        </div>
    );

};

export default NewRecordForm;
