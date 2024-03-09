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

}, { versionKey: false });

const userSchema = new mongoose.Schema({

    mobileNo: { type: String },

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
    aggFactor: { type: String },  // Add other properties as needed
    relFactor: { type: String },
    duration: { type: String },
    onset: { type: String },
    vitalSign: {
        BP: { type: String },
        RR: { type: String },
        HR: { type: String },
        SPO2: { type: String },
        TEMP: { type: String },
    },
    observation: {
        onObservation: {
            SkinColor: { type: Boolean },
            Deformity: { type: Boolean },
            Redness: { type: Boolean },
            ShinySkin: { type: Boolean },
            OpenWounds: { type: Boolean },
        },
        onPalpation: {
            Tenderness: { type: Boolean },
            Warmth: { type: Boolean },
            Swelling: { type: Boolean },
            Odema: { type: Boolean },
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
        fingerToNose: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        fingerOpposition: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        grip: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        pronationSupination: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        reboundTest: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        tappingHand: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        tappingFoot: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        heelToKnee: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        drawingCircleHand: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        drawingCircleFoot: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        // ... other properties
    },
    standingWalking: {
        normalPosture: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        tandonWalking: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        // ... other properties
    },
    balance: {
        sitting: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        standing: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        posture: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        gait: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        // ... other properties
    },
    handFunction: {
        grip: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        grasp: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        release: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        // ... other properties
    },
    prehension: {
        tipToTip: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        padToPad: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        tipToPad: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        // ... other properties
    },
    subjectiveAssessment: {
        breathlessness: {
            duration: { type: String },
            severity: { type: String },
            pattern: { type: String },
            associatedFactors: { type: String },
        },
        cough: {
            duration: { type: String },
            severity: { type: String },
            pattern: { type: String },
            associatedFactors: { type: String },
        },
        sputumHemoptysis: {
            duration: { type: String },
            severity: { type: String },
            pattern: { type: String },
            associatedFactors: { type: String },
            hemoptysisType: { type: String },
        },
        wheeze: {
            duration: { type: String },
            severity: { type: String },
            pattern: { type: String },
            associatedFactors: { type: String },
        },
        chestPain: {
            duration: { type: String },
            severity: { type: String },
            pattern: { type: String },
            associatedFactors: { type: String },
        },
        // ... other properties
    },
    rpe: {
        point6: { type: Boolean },
        point7: { type: Boolean },
        point8: { type: Boolean },
        point9: { type: Boolean },
        point10: { type: Boolean },
        point11: { type: Boolean },
        point12: { type: Boolean },
        point13: { type: Boolean },
        point14: { type: Boolean },
        point15: { type: Boolean },
        point16: { type: Boolean },
        point17: { type: Boolean },
    },
    brpe: {
        rating6: { type: Boolean },
        rating7: { type: Boolean },
        rating8: { type: Boolean },
        rating9: { type: Boolean },
        rating10: { type: Boolean },
        rating11: { type: Boolean },
        rating12: { type: Boolean },
        rating13: { type: Boolean },
        rating14: { type: Boolean },
        rating15: { type: Boolean },
        rating16: { type: Boolean },
        rating17: { type: Boolean },
        rating18: { type: Boolean },
        rating19: { type: Boolean },
        rating20: { type: Boolean },
    },
    generalObservation: {
        bodyBuilt: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        handsAndFingertips: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        eyes: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        cyanosis: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        jugularVenousPressure: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        // ... other properties
    },
    chestObservation: {
        breathingPattern: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        chestMovement: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        palpationOfChest: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
        chestExpansion: { normal: { type: Boolean }, abnormal: { type: Boolean }, remarks: { type: String } },
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
        middleLobeLingulaMotion: { type: String }, // Assuming you want to store a string value
        upperLobeMotion: { type: String },
        lowerLobeMotion: { type: String },
        middleLobeLingulaValues: { type: String },
        middleLobeLingulaRemarks: { type: String },
        upperLobeValues: { type: String },
        upperLobeRemarks: { type: String },
        lowerLobeValues: { type: String },
        lowerLobeRemarks: { type: String },
    },
    inPatientBill: [
        {
            mobileNumber: { type: String },
            roomNumber: { type: String },
            admissionDate: { type: Date },
            dischargeDate: { type: Date },
            totalDays: { type: Number },
            visitingBill: { type: Number },
            physioBill: { type: Number },
            nursingBill: { type: Number },
            otherExpenses: { type: Number },
            paymentMode: { type: String },
            billAmount: { type: Number },
        },
    ],
    outPatientBill: [
        {
            mobileNumber: {type: String},
            appointmentDate: { type: String },
            serviceName: { type: String },
            paymentMode: { type: String },
            billAmount: { type: Number },
        },
    ],
    planOfTreatment: { type: String },

    planTreatment: [
        {
            patientType: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            days: { type: String },
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
            date: { type: String },
            xray: { type: String },
            mri: { type: String },
            others: { type: String },
            provisionalDiagnosis: { type: String },
        },
    ],

}, { versionKey: false });


const User = mongoose.model('patients', userSchema);
const BasicDetails = mongoose.model('basicDetails', basicDetails);


app.post('/api/admin-login', async (req, res) => {
    const { login_id, password } = req.body;
    try {
        const admin = await User.findOne({ login_id, password });
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
        const student = await User.findOne({ email });
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
        const student = await User.findOne({ email, password });
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
//         let foundPatient = await User.findOne({ mobileNo: patient.mobileNo });

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
//             const newPatient = new User({
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
        let foundPatient = await User.findOne({ mobileNo: patient.mobileNo });

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
            const newPatient = new User({
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
        // Find the latest user record to determine the next pid
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
//         // Find the latest user record to determine the next pid
//         const lastRecord = await User.findOne().sort({ _id: -1 }).limit(1);

//         let nextPid = 'spc1'; // Default pid if no records are found

//         if (lastRecord && lastRecord.pid) {
//             // Ensure that lastRecord.pid is defined before accessing slice
//             const lastPidNumber = parseInt(lastRecord.pid.slice(3), 10);
//             nextPid = 'spc' + (lastPidNumber + 1);
//         }

//         // Create a new patient record
//         const newPatient = new User({
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
      const updatedPatient = await User.findOneAndUpdate(
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
        const foundPatient = await User.findOne({ mobileNo: mobileNo });

        if (foundPatient) {
            res.json(foundPatient);
        } else {
            res.json("kulukulu");
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
        const foundPatient = await User.findOne({ mobileNo: mobileNumber });

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
      const allRecords = await User.find();
      res.json(allRecords);
    } catch (error) {
      console.error('Error fetching all records:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.post('/api/edit_invest_record', async (req, res) => {
    const { mobileNo, updatedData } = req.body;

    try {
        const foundPatient = await User.findOne({ mobileNo: mobileNo });

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
        const foundPatient = await User.findOne({ mobileNo: mobileNumber });

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
      const foundPatient = await User.findOne({ mobileNo: mobileNo });
  
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
        // Find the user based on the mobile number
        const foundPatient = await User.findOne({ mobileNo: patient.mobileNo});

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
        // Find the user based on the mobile number
        const foundPatient = await User.findOne({ mobileNo: patient.mobileNo });

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
