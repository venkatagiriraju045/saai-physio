const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

//const MONGODB_URI = 'mongodb+srv://Venkatagiriraju:King%40123@kiot.mmjm1ma.mongodb.net/test?retryWrites=true&w=majority';
const MONGODB_URI = 'mongodb+srv://venkatagirirajuearth:King%40123@cluster0.wfzzdgr.mongodb.net/test?retryWrites=true&w=majority';

app.get('/', (req, res) => {
    const message = "saai-clinic-database";
    res.send(`<html><body><h1>${message}</h1></body></html>`);
});

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


console.log('Mongoose connected to MongoDB');



const basicDetails = new mongoose.Schema({
    name: { type: String },
    pid: {type: String},
    gender: { type: String },
    age: { type: String }, // Assuming age is stored as a string
    mobileNo: { type: String },
    occupation: { type: String },
    address: { type: String },
    uhid: { type: String },
    complaint: { type: String },
    docr:{type: String},
    

    painRegion: {
        Neck: { type: Boolean, default: false },
        Wrist: { type: Boolean, default: false },
        LowerBack: { type: Boolean, default: false },
        Ankle: { type: Boolean, default: false },
        Shoulder: { type: Boolean, default: false },
        Fingers: { type: Boolean, default: false },
        Hip: { type: Boolean, default: false },
        Toes: { type: Boolean, default: false },
        Elbow: { type: Boolean, default: false },
        UpperBack: { type: Boolean, default: false },
        Knee: { type: Boolean, default: false },
    },
    postMedicalHistory: {
        dm: { type: Boolean, default: false },
        htn: { type: Boolean, default: false },
        cad: { type: Boolean, default: false },
        cvd: { type: Boolean, default: false },
        asthma: { type: Boolean, default: false },
        smoking: { type: Boolean, default: false },
        alcohol: { type: Boolean, default: false },
        surgicalHistory: { type: Boolean, default: false },
    },
    painAssessment: {
        beforeTreatment: {
            level: { type: Number, default: 0 },
        },
    },
    aggFactor: { type: String, default:''},  // Add other properties as needed
    relFactor: { type: String, default:'' },
    duration: { type: String, default:'' },
    onset: { type: String, default:'' },
    vitalSign: {
        BP: { type: String, default: '' },
        RR: { type: String, default: '' },
        HR: { type: String, default: '' },
        SPO2: { type: String, default: '' },
        TEMP: { type: String, default: '' },
    },
    observation: {
        onObservation: {
            SkinColor: { type: Boolean, default: false},
            Deformity: { type: Boolean, default: false },
            Redness: { type: Boolean, default: false },
            ShinySkin: { type: Boolean, default: false },
            OpenWounds: { type: Boolean, default: false },
        },
        onPalpation: {
            Tenderness: { type: Boolean, default: false },
            Warmth: { type: Boolean, default: false },
            Swelling: { type: Boolean, default: false },
            Odema: { type: Boolean, default: false },
        },
    },
    rangeOfMotion: {
        cervical: [
            {
                flexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                extension: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                abduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                adduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                eversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                inversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                externalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                internalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                dorsiFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                plantarFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                supination: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                pronation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                lateralRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },

            },
        ],
        shoulder: [
            {
                flexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                extension: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                abduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                adduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                eversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                inversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                externalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                internalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                dorsiFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                plantarFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                supination: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                pronation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                lateralRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
            },
            // ... other properties
        ],
        elbow: [
            {
                flexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                extension: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                abduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                adduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                eversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                inversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                externalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                internalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                dorsiFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                plantarFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                supination: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                pronation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                lateralRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
            },
            // ... other properties
        ],
        wrist: [
            {
                flexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                extension: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                abduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                adduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                eversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                inversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                externalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                internalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                dorsiFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                plantarFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                supination: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                pronation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                lateralRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
            },
        ],
        hip: [
            {
                flexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                extension: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                abduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                adduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                eversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                inversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                externalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                internalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                dorsiFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                plantarFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                supination: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                pronation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                lateralRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
            },
            // ... other properties
        ],
        knee: [
            {
                flexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                extension: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                abduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                adduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                eversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                inversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                externalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                internalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                dorsiFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                plantarFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                supination: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                pronation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                lateralRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
            },
            // ... other properties
        ],
        ankle: [
            {
                flexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                extension: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                abduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                adduction: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                eversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                inversion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                externalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                internalRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                dorsiFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                plantarFlexion: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                supination: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                pronation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
                lateralRotation: { rt: { type: Number, default: 0 }, lt: { type: Number, default: 0 } },
            },
        ],
    },
    musclePower: {
        cervicalC1C2Flexion: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        cervicalC3SideFlexion: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        scapulaC4Elevation: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        shoulderC5Abduction: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        elbowC6FlexionWristExtension: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        elbowC7ExtensionWristFlexion: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        thumbC8Extension: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        hipL1L2Flexion: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        kneeL3Extension: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        ankleL4Dorsiflexion: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        bigToeL5Extension: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        ankleS1PlantarFlexion: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        kneeS2Flexion: { rt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } }, lt: { motor: { type: Number, default: 0 }, sensory: { type: Number, default: 0 } } },
        // ... other properties
    },
    coordination: {
        fingerToNose: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        fingerOpposition: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        grip: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        pronationSupination: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        reboundTest: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        tappingHand: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        tappingFoot: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        heelToKnee: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        drawingCircleHand: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        drawingCircleFoot: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        // ... other properties
    },
    standingWalking: {
        normalPosture: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        tandonWalking: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        // ... other properties
    },
    balance: {
        sitting: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        standing: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        posture: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        gait: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        // ... other properties
    },
    handFunction: {
        grip: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        grasp: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        release: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        // ... other properties
    },
    prehension: {
        tipToTip: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        padToPad: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        tipToPad: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        // ... other properties
    },
    subjectiveAssessment: {
        breathlessness: {
            duration: { type: String, default: '' },
            severity: { type: String, default: '' },
            pattern: { type: String, default: '' },
            associatedFactors: { type: String, default: '' },
        },
        cough: {
            duration: { type: String, default: '' },
            severity: { type: String, default: '' },
            pattern: { type: String, default: '' },
            associatedFactors: { type: String, default: '' },
        },
        sputumHemoptysis: {
            duration: { type: String, default: '' },
            severity: { type: String, default: '' },
            pattern: { type: String, default: '' },
            associatedFactors: { type: String, default: '' },
            hemoptysisType: { type: String, default: '' },
        },
        wheeze: {
            duration: { type: String, default: '' },
            severity: { type: String, default: '' },
            pattern: { type: String, default: '' },
            associatedFactors: { type: String, default: '' },
        },
        chestPain: {
            duration: { type: String, default: '' },
            severity: { type: String, default: '' },
            pattern: { type: String, default: '' },
            associatedFactors: { type: String, default: '' },
        },
        // ... other properties
    },
    rpe: {
        point6: { type: Boolean, default: false },
        point7: { type: Boolean, default: false },
        point8: { type: Boolean, default: false },
        point9: { type: Boolean, default: false },
        point10: { type: Boolean, default: false },
        point11: { type: Boolean, default: false },
        point12: { type: Boolean, default: false },
        point13: { type: Boolean, default: false },
        point14: { type: Boolean, default: false },
        point15: { type: Boolean, default: false },
        point16: { type: Boolean, default: false },
        point17: { type: Boolean, default: false },
    },
    brpe: {
        rating6: { type: Boolean, default: false },
        rating7: { type: Boolean, default: false },
        rating8: { type: Boolean, default: false },
        rating9: { type: Boolean, default: false },
        rating10: { type: Boolean, default: false },
        rating11: { type: Boolean, default: false },
        rating12: { type: Boolean, default: false },
        rating13: { type: Boolean, default: false },
        rating14: { type: Boolean, default: false },
        rating15: { type: Boolean, default: false },
        rating16: { type: Boolean, default: false },
        rating17: { type: Boolean, default: false },
        rating18: { type: Boolean, default: false },
        rating19: { type: Boolean, default: false },
        rating20: { type: Boolean, default: false },
    },
    generalObservation: {
        bodyBuilt: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        handsAndFingertips: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        eyes: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        cyanosis: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        jugularVenousPressure: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        // ... other properties
    },
    chestObservation: {
        breathingPattern: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        chestMovement: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        palpationOfChest: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        chestExpansion: { normal: { type: Boolean, default: false }, abnormal: { type: Boolean, default: false }, remarks: { type: String, default: '' } },
        // ... other properties
    },
    barthelIndex: {
        feeding: { score: { type: Number, default: 0 }, activity: { type: String, default: 'Feeding' }, maxScore: { type: Number, default: 10 } },
        bathing: { score: { type: Number, default: 0 }, activity: { type: String, default: 'Bathing' }, maxScore: { type: Number, default: 5 } },
        grooming: { score: { type: Number, default: 0 }, activity: { type: String, default: 'Grooming' }, maxScore: { type: Number, default: 5 } },
        dressing: { score: { type: Number, default: 0 }, activity: { type: String, default: 'Dressing' }, maxScore: { type: Number, default: 10 } },
        bowels: { score: { type: Number, default: 0 }, activity: { type: String, default: 'Bowels' }, maxScore: { type: Number, default: 10 } },
        bladder: { score: { type: Number, default: 0 }, activity: { type: String, default: 'Bladder' }, maxScore: { type: Number, default: 10 } },
        toiletUse: { score: { type: Number, default: 0 }, activity: { type: String, default: 'Toilet Use' }, maxScore: { type: Number, default: 10 } },
        transfer: { score: { type: Number, default: 0 }, activity: { type: String, default: 'Transfer (Bed to Chair and Back)' }, maxScore: { type: Number, default: 15 } },
        mobility: { score: { type: Number, default: 0 }, activity: { type: String, default: 'Mobility (On level surfaces)' }, maxScore: { type: Number, default: 15 } },
        stairs: { score: { type: Number, default: 0 }, activity: { type: String, default: 'Stairs' }, maxScore: { type: Number, default: 10 } },
        // ... other properties
    },
    chestShapeObservation: {
        chestShape: {
            normal: { type: Boolean, default: false },
            barrelChest: { type: Boolean, default: false },
            kyphosis: { type: Boolean, default: false },
            pectusExcavatum: { type: Boolean, default: false },
            pectusCarinatum: { type: Boolean, default: false },
        },
    },
    chestMotionObservation: {
        middleLobeLingulaMotion: { type: String, default: '' }, // Assuming you want to store a string, default: '' value
        upperLobeMotion: { type: String, default: '' },
        lowerLobeMotion: { type: String, default: '' },
        middleLobeLingulaValues: { type: String, default: '' },
        middleLobeLingulaRemarks: { type: String, default: '' },
        upperLobeValues: { type: String, default: '' },
        upperLobeRemarks: { type: String, default: '' },
        lowerLobeValues: { type: String, default: '' },
        lowerLobeRemarks: { type: String, default: '' },
    },
    inPatientBill: [
        {
            mobileNumber: { type: String, default: '' },
            roomNumber: { type: String, default: '' },
            admissionDate: { type: Date, default: ''},
            dischargeDate: { type: Date, default: '' },
            totalDays: { type: Number, default: 0 },
            visitingBill: { type: Number, default: 0 },
            physioBill: { type: Number, default: 0 },
            nursingBill: { type: Number, default: 0 },
            otherExpenses: { type: Number, default: 0 },
            paymentMode: { type: String, default: '' },
            billAmount: { type: Number, default: 0 },
        },
    ],
    outPatientBill: [
        {
            mobileNumber: {type: String, default: ''},
            appointmentDate: { type: String, default: '' },
            serviceName: { type: String, default: '' },
            paymentMode: { type: String, default: '' },
            billAmount: { type: Number, default: 0 },
        },
    ],
    planOfTreatment: { type: String, default: '' },

    planTreatment: [
        {
            patientType: { type: String, default: '' },
            startDate: { type: String, default: '' },
            endDate: { type: String, default: '' },
            days: { type: String, default: '' },
            ust: { type: Boolean, default: false },
            ift: { type: Boolean, default: false },
            swd: { type: Boolean, default: false },
            tr: { type: Boolean, default: false },
            wax: { type: Boolean, default: false },
            est: { type: Boolean, default: false },
            sht: { type: Boolean, default: false },
            laser: { type: Boolean, default: false },
            exs: { type: Boolean, default: false },
            rehab: { type: Boolean, default: false },
        },
    ],

    investigation: [
        {
            date: { type: String, default: '' },
            xray: { type: String, default: '' },
            mri: { type: String, default: '' },
            others: { type: String, default: '' },
            provisionalDiagnosis: { type: String, default: '' },
        },
    ],

}, { versionKey: false });

const BasicDetails = mongoose.model('basicDetails', basicDetails);


app.post('/api/admin-login', async (req, res) => {
    const { login_id, password } = req.body;
    try {
        const admin = await BasicDetails.findOne({ login_id, password });
        if (!admin) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error authenticating admin:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/students', async (req, res) => {
    const { email } = req.query;

    try {
        const student = await BasicDetails.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await BasicDetails.findOne({ email, password });
        if (!student) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Error authenticating student:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// app.post('/api/create_record', async (req, res) => {
//     const { patient } = req.body;

//     try {
//         let foundPatient = await BasicDetails.findOne({ mobileNo: patient.mobileNo });

//         if (foundPatient) {
//             // Update the existing patient record
//             foundPatient = { ...foundPatient._doc, ...patient }; // Use _doc to get the plain object

//             // Remove the specific billing field if the condition is not true
//             // if (!foundPatient.inPatientBill[0].roomNumber) {
//             //     foundPatient.inPatientBill = undefined;
//             // }

//             // if (!foundPatient.outPatientBill[0].serviceName) {
//             //     foundPatient.outPatientBill = undefined;
//             // }
//         } else {
//             // Create a new patient record
//             const newPatient = new BasicDetails({
//                 ...patient,
//             });

//             // Remove the specific billing field if the condition is not true
//             // if (!patient.inPatientBill[0].roomNumber) {
//             //     newPatient.inPatientBill = undefined;
//             // }

//             // if (!patient.outPatientBill[0].serviceName) {
//             //     newPatient.outPatientBill = undefined;
//             // }

//             // Save the new patient record to the database
//             await newPatient.save();

//             res.status(201).json({ message: 'Patient record created successfully', patient: newPatient });
//             return; // Add return to avoid executing the code below in case of creating a new patient
//         }

//         // Update the existing patient record in the database
//         await foundPatient.save();

//         res.status(200).json({ message: 'Patient record updated successfully', patient: foundPatient });
//     } catch (error) {
//         console.error('Error creating/updating patient record:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });
app.post('/api/create_record', async (req, res) => {
    const { patient } = req.body;
    try {
        let foundPatient = await BasicDetails.findOne({ mobileNo: patient.mobileNo });

        if (foundPatient) {
            console.log(patient.planTreatment);
            // Update the existing patient record
            foundPatient.set(patient); // Use set method to update fields
            // if (!foundPatient.inPatientBill[0].roomNumber) {
            //     foundPatient.inPatientBill = undefined;
            // }

            // if (!foundPatient.outPatientBill[0].serviceName) {
            //     foundPatient.outPatientBill = undefined;
            // }
        } else {
            // Create a new patient record
            const newPatient = new BasicDetails({
                ...patient,
            });
            foundPatient = newPatient; // Assign foundPatient for consistent handling
            // Save the new patient record to the database
            await newPatient.save();
            res.status(201).json({ message: 'Patient record created successfully', patient: newPatient });
            return; // Add return to avoid executing the code below in case of creating a new patient
        }

        // Save the updated patient record in the database
        await foundPatient.save();

        res.status(200).json({ message: 'Patient record updated successfully', patient: foundPatient });
    } catch (error) {
        console.error('Error creating/updating patient record:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/api/create_basic_record', async (req, res) => {
    const { patient } = req.body;
    try {
        // Find the latest BasicDetails record to determine the next pid
        const lastRecord = await BasicDetails.findOne().sort({ _id: -1 }).limit(1);
        let nextPid = 'spc1'; // Default pid if no records are found
        if (lastRecord && lastRecord.pid) {
            // Ensure that lastRecord.pid is defined before accessing slice
            const lastPidNumber = parseInt(lastRecord.pid.slice(3), 10);
            nextPid = 'spc' + (lastPidNumber + 1);
        }
        // Create a new patient record
        const newPatient = new BasicDetails({
            ...patient,
            pid: nextPid,
        });
        // Save the new patient record to the database
        await newPatient.save();

        res.status(201).json({ message: 'Patient record created successfully', patient: newPatient });
    } catch (error) {
        console.error('Error creating patient record:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// app.post('/api/create_record', async (req, res) => {
//     const { patient } = req.body;

//     try {
//         // Find the latest BasicDetails record to determine the next pid
//         const lastRecord = await BasicDetails.findOne().sort({ _id: -1 }).limit(1);

//         let nextPid = 'spc1'; // Default pid if no records are found

//         if (lastRecord && lastRecord.pid) {
//             // Ensure that lastRecord.pid is defined before accessing slice
//             const lastPidNumber = parseInt(lastRecord.pid.slice(3), 10);
//             nextPid = 'spc' + (lastPidNumber + 1);
//         }

//         // Create a new patient record
//         const newPatient = new BasicDetails({
//             ...patient,
//             pid: nextPid,
//         });

//         // Remove the specific billing field if the condition is not true
//         if (patient.inPatientBill && patient.inPatientBill.length > 0 && !patient.inPatientBill[0].roomNumber) {
//             newPatient.inPatientBill = undefined;
//         }

//         if (patient.outPatientBill && patient.outPatientBill.length > 0 && !patient.outPatientBill[0].serviceName) {
//             newPatient.outPatientBill = undefined;
//         }

//         // Save the new patient record to the database
//         await newPatient.save();

//         res.status(201).json({ message: 'Patient record created successfully', patient: newPatient });
//     } catch (error) {
//         console.error('Error creating patient record:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

app.post('/api/update_record', async (req, res) => {
    try {
      const { patient } = req.body;
      console.log(patient);
  
      if (!patient || !patient.pid) {
        return res.status(400).json({ error: 'Invalid request. Patient data or ID missing.' });
      }
  
      // Update the patient record based on pid (assuming pid is the unique identifier)
      const updatedPatient = await BasicDetails.findOneAndUpdate(
        { pid: patient.pid },
        { $set: patient },
        { new: true } // Returns the modified document
      );
  
      if (updatedPatient) {
        res.status(200).json(updatedPatient.toObject());
      } else {
        res.status(404).json({ error: 'Patient not found' });
      }
    } catch (error) {
      console.error('Error updating patient record:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.get('/api/find_basic_record', async (req, res) => {
    const { mobileNo } = req.query;

    try {
        console.log(mobileNo);
        const foundPatient = await BasicDetails.findOne({ mobileNo: mobileNo });

        if (foundPatient) {
            res.json(foundPatient);
        } else {
            res.status(404).json({ error: 'Patient not found' });
        }
    } catch (error) {
        console.error('Error finding patient record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/api/find_record', async (req, res) => {
    const { mobileNo } = req.query;

    try {
        console.log(mobileNo)
        const foundPatient = await BasicDetails.findOne({ mobileNo: mobileNo });

        if (foundPatient) {
            res.json(foundPatient);
        } else {
            res.status(404).json({ error: 'Patient not found' });
        }
    } catch (error) {
        console.error('Error finding patient record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/get_patient_details', async (req, res) => {
    const { mobileNumber } = req.query;
    console.log('Mobile Number:', mobileNumber);
    try {
        const foundPatient = await BasicDetails.findOne({ mobileNo: mobileNumber });

        if (foundPatient) {
            const { name, pid,gender,age } = foundPatient;
            res.json({ name, pid,gender,age });
        } else {
            res.status(404).json({ error: 'Patient not found' });
        }
    } catch (error) {
        console.error('Error finding patient record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/api/get_all_records', async (req, res) => {
    try {
      const allRecords = await BasicDetails.find();
      res.json(allRecords);
    } catch (error) {
      console.error('Error fetching all records:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.post('/api/edit_invest_record', async (req, res) => {
    const { mobileNo, updatedData } = req.body;

    try {
        const foundPatient = await BasicDetails.findOne({ mobileNo: mobileNo });

        if (foundPatient) {
            // Iterate over each new row and push it to the planTreatment array
            updatedData.forEach((newRow) => {
                foundPatient.investigation.push(newRow);
            });

            await foundPatient.save();

            res.json({ message: 'Patient record updated successfully' });
        } else {
            res.status(404).json({ error: 'Patient not found' });
        }
    } catch (error) {
        console.error('Error updating patient record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/api/add_row', async (req, res) => {
    const { mobileNumber, newRows } = req.body;

    try {
        const foundPatient = await BasicDetails.findOne({ mobileNo: mobileNumber });

        if (foundPatient) {
            // Add new rows to the patient record
            newRows.forEach((newRow) => {
                foundPatient.planTreatment.push(newRow);
            });

            await foundPatient.save();

            res.json({ message: 'Rows added successfully' });
        } else {
            res.status(404).json({ error: 'Patient not found' });
        }
    } catch (error) {
        console.error('Error adding new rows:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/api/update_bill_plantreatment', async (req, res) => {
    const { mobileNo, updatedData, inBillDetails, outBillDetails } = req.body;
    console.log('Received update data:', updatedData, mobileNo, inBillDetails, outBillDetails);
  
    try {
      const foundPatient = await BasicDetails.findOne({ mobileNo: mobileNo });
  
      if (!foundPatient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Update planTreatment
      updatedData.forEach((newRow) => {
        foundPatient.planTreatment.push(newRow);
      });
  
      // Update in-patient bill details if provided
      if (inBillDetails) {
        const newInBillingRecord = {
          mobileNumber: inBillDetails.mobileNumber,
          roomNumber: inBillDetails.roomNumber,
          admissionDate: inBillDetails.admissionDate,
          dischargeDate: inBillDetails.dischargeDate,
          totalDays: inBillDetails.totalDays,
          visitingBill: inBillDetails.visitingBill,
          physioBill: inBillDetails.physioBill,
          nursingBill: inBillDetails.nursingBill,
          otherExpenses: inBillDetails.otherExpenses,
          paymentMode: inBillDetails.paymentMode,
          billAmount: inBillDetails.billAmount,
        };
        foundPatient.inPatientBill.push(newInBillingRecord);
      }
  
      // Update out-patient bill details if provided
      if (outBillDetails) {
        const newOutBillingRecord = {
          mobileNumber: outBillDetails.mobileNumber,
          appointmentDate: outBillDetails.appointmentDate,
          serviceName: outBillDetails.serviceName,
          paymentMode: outBillDetails.paymentMode,
          billAmount: outBillDetails.billAmount,
        };
  
        foundPatient.outPatientBill.push(newOutBillingRecord);
      }
  
      await foundPatient.save();
  
      res.json({ message: 'Patient record updated successfully' });
    } catch (error) {
      console.error('Error updating patient record:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.post('/api/create_new_inpatient_bill', async (req, res) => {
    const { patient } = req.body;

    console.log('Received patient data:', patient);

    try {
        // Find the BasicDetails based on the mobile number
        const foundPatient = await BasicDetails.findOne({ mobileNo: patient.mobileNo});

        if (!foundPatient) {
            console.log('Patient not found in the database');
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Add billing details to the billings array
        const newBillingRecord = {
            mobileNumber: patient.mobileNumber,
            roomNumber: patient.roomNumber,
            admissionDate: patient.admissionDate,
            dischargeDate: patient.dischargeDate,
            totalDays: patient.totalDays,
            visitingBill: patient.visitingBill,
            physioBill: patient.physioBill,
            nursingBill: patient.nursingBill,
            otherExpenses: patient.otherExpenses,
            paymentMode: patient.paymentMode,
            billAmount: patient.billAmount,
        };

        foundPatient.inPatientBill.push(newBillingRecord);

        // Save the updated patient record
        await foundPatient.save();

        res.status(201).json({ message: 'In-Patient Bill created successfully' });
    } catch (error) {
        console.error('Error creating in-patient bill:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/api/create_new_outpatient_bill', async (req, res) => {
    const { patient } = req.body;
    console.log("Received patient data:", patient);
    try {
        // Find the BasicDetails based on the mobile number
        const foundPatient = await BasicDetails.findOne({ mobileNo: patient.mobileNo });

        if (!foundPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Add billing details to the billings array
        const newBillingRecord = {
            mobileNumber: patient.mobileNumber,
            appointmentDate: patient.appointmentDate,
            serviceName: patient.serviceName,
            paymentMode: patient.paymentMode,
            billAmount: patient.billAmount,
        };

        foundPatient.outPatientBill.push(newBillingRecord);
        // Save the updated patient record
        await foundPatient.save();

        // Send back the details of the created bill
        res.status(201).json({ message: 'Out-Patient Bill created successfully', newBillingRecord });
    } catch (error) {
        console.error('Error creating out-patient bill:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
