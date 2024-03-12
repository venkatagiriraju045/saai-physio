import React, { useState } from 'react';
import axios from 'axios';

const InPatientBill = () => {
    const [loading, setLoading] = useState(false);
    const [mobileNo, setMobileNo] = useState(false);
    const [appMessage, setAppMessage] = useState('');
    const [patientDetails, setPatientDetails] = useState({
        name: '',
        pid: '',
        gender:'',
        age:'',
    });
    const [patient, setPatient] = useState({
        mobileNumber: '',
        roomNumber: '',
        admissionDate: '',
        dischargeDate: '',
        totalDays: '',
        visitingBill: '',
        physioBill: '',
        nursingBill: '',
        otherExpenses: '',
        paymentMode: '',
    });
    console.log(patient);

    
    const validateMobileNumber = async () => {
        const digitCount = patient.mobileNumber.replace(/\D/g, '').length; // Count only digits

        // Check if the number of digits is between 6 and 11
        if (digitCount > 5 && digitCount < 12) {
            try {
                const response = await axios.get('https://saai-physio-api.vercel.app/api/get_patient_details', {
                    params: {
                        mobileNumber:patient.mobileNumber,// Filter by institute_name
                    }
                });
                const foundPatientRecord = response.data;
                console.log("fo",foundPatientRecord);
                setPatientDetails(foundPatientRecord);
                setMobileNo(true);
            } catch (error) {
                console.error('Error fetching patient details:', error);
                setMobileNo(false);
                setPatientDetails({ name: '', pid: '' }); // Clear patient details on error
                alert('Error fetching patient details. Please try again.');
            }
        } else {
            setMobileNo(false);
            setPatientDetails({ name: '', pid: '' }); // Clear patient details if mobile number is not valid
            alert("Please enter a valid mobile number and create a record.");
        }
    };
    
    console.log("pa",patientDetails);


    const createInPatientBill = async () => {
       await new Promise(resolve => setTimeout(() => {
            validateMobileNumber(patient.mobileNumber);
            resolve();
        }, 2000));
    
        if (mobileNo) {
            const dateAndTime = new Date().toLocaleString();
            console.log('Patient Object:', patient);
    
            try {
                const response = await axios.post('https://saai-physio-api.vercel.app/api/create_new_inpatient_bill', {
                    patient: {
                        ...patient,
                        dateAndTime,
                    },
                });
    
                const { message, inPatientBill } = response.data;
    
                setAppMessage(message);
    
                if (inPatientBill) {
                    console.log('In-Patient Bill Details:', inPatientBill);
                    // Additional actions or state updates can be performed based on the in-patient bill details
                }
    
                setTimeout(() => {
                    setAppMessage('');
                }, 5000);
    
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setAppMessage('Patient not found.Only Basic details are present  Do update the patient treamtment details in update record.');
                    alert('Patient not found.Only Basic details are present  Do update the patient treamtment details in update record.');
                } else {
                    console.error('Error creating in-patient bill:', error);
                    setAppMessage(`An error occurred while creating the in-patient bill: ${error.message}`);
                }
    
                setLoading(false);
            }
        }
    };
    
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let updatedPatient = { ...patient };

        // Helper function to calculate the sum of bills
        const getSumOfBills = () => {
            let sum = 0;

            for (const billName in updatedPatient) {
                if (billName.endsWith('Bill') || billName === 'otherExpenses') {
                    sum += parseFloat(updatedPatient[billName]) || 0;
                }
            }

            return sum;
        };


        switch (name) {
            case 'mobileNumber':
                if (/^\d{0,12}$/.test(value)) {
                    updatedPatient = {
                        ...updatedPatient,
                        [name]: value,
                    };
                } else {
                    alert("Please enter a valid mobile number with a maximum of 12 digits.");
                }
                break;

            case 'roomNumber':
                if (/^\d{0,5}$/.test(value)) {
                    updatedPatient = {
                        ...updatedPatient,
                        [name]: value,
                    };
                } else {
                    alert("Please enter a valid room number with a maximum of 5 digits.");
                }
                break;

            case 'admissionDate':
            case 'dischargeDate':
                updatedPatient = {
                    ...patient,
                    [name]: value,
                };

                const admissionDate = new Date(updatedPatient.admissionDate);
                const dischargeDate = new Date(updatedPatient.dischargeDate);

                if (!isNaN(admissionDate.getTime()) && !isNaN(dischargeDate.getTime())) {
                    const timeDifference = dischargeDate.getTime() - admissionDate.getTime();
                    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

                    updatedPatient = {
                        ...updatedPatient,
                        totalDays: daysDifference.toString(),
                    };
                }
                break;

            case 'totalDays':
                if (/^\d{0,5}$/.test(value)) {
                    updatedPatient = {
                        ...patient,
                        [name]: value,
                    };
                } else {
                    alert("Please enter a valid total days (maximum 5 digits).");
                }
                break;

            case 'visitingBill':
            case 'physioBill':
            case 'nursingBill':
            case 'otherExpenses':
                if (/^\d{0,10}$/.test(value)) {
                    updatedPatient = {
                        ...patient,
                        [name]: value,
                    };
                } else {
                    alert(`Please enter a valid amount`);
                }
                break;

            default:
                updatedPatient = {
                    ...patient,
                    [name]: value,
                };
                break;
        }

        const sumOfBills = getSumOfBills(updatedPatient);
        const totalDays = parseFloat(updatedPatient.totalDays) || 0;
        updatedPatient = {
            ...updatedPatient,
            billAmount: (sumOfBills * totalDays).toFixed(2),
        };

        setPatient(updatedPatient);
    };


    return (
        <div>
            <div className="in-patient-bill-container">
                <h2>In-Patient Billing</h2>
                {/* Patient Details */}

                {/* In-Patient Specific Information */}
                <div className="in-patient-info">
                    {/* Patient Details */}
                    <div className="patient-details">
                        <label>
                            Mobile Number:
                            <input type="text" name="mobileNumber" value={patient.mobileNumber} onChange={handleInputChange} />
                            {patientDetails.name && <p>Name: {patientDetails.name}</p>}
                            {patientDetails.pid && <p>Patient ID: {patientDetails.pid}</p>}
                            {patientDetails.gender && <p>Gender: {patientDetails.gender}</p>}
                            {patientDetails.age && <p>Age: {patientDetails.age}</p>}
                        </label>
                        <button onClick={validateMobileNumber} disabled={loading}>
                            {loading ? 'Searching Patient...' : 'Search Patient'}
                        </button>
                    </div>

                    <label>
                        Room Number:
                        <input type="text" name="roomNumber" value={patient.roomNumber} onChange={handleInputChange} />
                    </label>
                    <div className="billing-info">
                        <label>
                            Admission Date:
                            <input type="date" name="admissionDate" value={patient.admissionDate} onChange={handleInputChange} />
                        </label>
                        <label>
                            Discharge Date:
                            <input type="date" name="dischargeDate" value={patient.dischargeDate} onChange={handleInputChange} />
                        </label>
                    </div>
                    <label>
                        Total Days:
                        <input type="text" name="totalDays" value={patient.totalDays} onChange={handleInputChange} readOnly />
                    </label>
                    <label className="amount-per-day-label">
                        Amount Per Day:
                        <div className="bill-section">
                            <div>
                                <p>Visiting Bill</p>
                                <input type="text" name="visitingBill" value={patient.visitingBill} onChange={handleInputChange} />
                            </div>
                            <div>
                                <p>Physio Bill</p>
                                <input type="text" name="physioBill" value={patient.physioBill} onChange={handleInputChange} />
                            </div>
                            <div>
                                <p>Nursing Bill</p>
                                <input type="text" name="nursingBill" value={patient.nursingBill} onChange={handleInputChange} />
                            </div>
                            <div>
                                <p>Other Expenses</p>
                                <input type="text" name="otherExpenses" value={patient.otherExpenses} onChange={handleInputChange} />
                            </div>
                        </div>
                    </label>



                </div>
                {/* Billing Information */}
                <div >
                    <label className="billing-info">
                        <p>Payment Mode:</p>
                        <select name="paymentMode" value={patient.paymentMode} onChange={handleInputChange}>
                            <option value="">Select Payment Mode</option>
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Net Banking">Net Banking</option>

                            {/* Add more options as needed */}
                        </select>
                    </label>
                    <label>
                        Bill Amount:
                        <input type="text" name="billAmount" value={patient.billAmount} readOnly />
                    </label>
                </div>

                {/* Button to Trigger Billing */}
                <button onClick={createInPatientBill} disabled={loading}>
                    {loading ? 'Creating Bill...' : 'Create In-Patient Bill'}
                </button>

                {/* Display Application Messages */}
                {appMessage && <div className="app-message">{appMessage}</div>}
            </div>
        </div>
    );
};

export default InPatientBill;
