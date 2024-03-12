import React, { useState } from 'react';
import axios from 'axios';
import './CSS/InPatientBill.css';

const OutPatientBill = () => {
    const [loading, setLoading] = useState(false);
    const [mobileNo, setMobileNo] = useState(false);
    const [appMessage, setAppMessage] = useState('');
    const [patientDetails, setPatientDetails] = useState({
        name: '',
        pid: '',
        gender: '',
        age: '',
    });
    const [patient, setPatient] = useState({
        mobileNumber: '',
        appointmentDate: '',
        serviceName: '',
        paymentMode: '',
        billAmount: '',
    });

    const createOutPatientBill = async () => {
        await new Promise(resolve => setTimeout(() => {
            validateMobileNumber(patient.mobileNumber);
            resolve();
        }, 2000));

        if (mobileNo) {
            const dateAndTime = new Date().toLocaleString();
            console.log('Patient Object:', patient);

            try {
                const response = await axios.post('https://saai-physio-api.vercel.app/api/create_new_outpatient_bill', {
                    patient: {
                        ...patient,
                        dateAndTime,
                    },
                });

                const { message, outPatientBill } = response.data;

                setAppMessage(message);

                // If the out-patient bill was created successfully, you can access details from outPatientBill
                if (outPatientBill) {
                    console.log('Out-Patient Bill Details:', outPatientBill);
                    // Additional actions or state updates can be performed based on the out-patient bill details
                }

                setTimeout(() => {
                    setAppMessage('');
                }, 5000);
                setLoading(false);
            }  catch (error) {
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
    /*
        const handleInputChange = (e) => {
            const { name, value } = e.target;
    
            // Update the patient state dynamically based on the input field
            setPatient((prevPatient) => {
                let updatedPatient = {
                    ...prevPatient,
                    [name]: value,
                };
                if (name === 'mobileNumber') {
                    if (/^\d{0,12}$/.test(value)) {
                        setPatient((prevPatient) => ({
                            ...prevPatient,
                            [name]: value,
                        }));
                    } else {
                        alert("Please enter a valid mobile number with maximum 13 digits.");
                    }
                }
                if (name === 'billAmount') {
                    if (/^\d{0,12}$/.test(value)) {
                        setPatient((prevPatient) => ({
                            ...prevPatient,
                            [name]: value,
                        }));
                    } else {
                        alert("Please enter a valid mobile number with maximum 13 digits.");
                    }
                }
                if (name === 'serviceName') {
                if (/^[a-zA-Z ]*$/.test(value)) {
                    setPatient((prevPatient) => ({
                        ...prevPatient,
                        [name]: value,
                    }));
                } else {
                    alert("Please enter only alphabets for the name field.");
                }
            }
                return updatedPatient;
            });
        };*/

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the patient state dynamically based on the input field
        let updatedPatient;

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

            case 'billAmount':
                if (/^\d{0,8}$/.test(value)) {
                    updatedPatient = {
                        ...updatedPatient,
                        [name]: value,
                    };
                } else {
                    alert("Please enter a valid amount with a maximum of 8 digits.");
                }
                break;

            case 'serviceName':
                if (/^[a-zA-Z ]*$/.test(value)) {
                    updatedPatient = {
                        ...updatedPatient,
                        [name]: value,
                    };
                } else {
                    alert("Please enter only alphabets for the name field.");
                }
                break;

            default:
                updatedPatient = {
                    ...updatedPatient,
                    [name]: value,
                };
                break;
        }

        setPatient((prevPatient) => ({
            ...prevPatient,
            ...updatedPatient,
        }));
    };


    const validateMobileNumber = async () => {
        const digitCount = patient.mobileNumber.replace(/\D/g, '').length; // Count only digits

        // Check if the number of digits is between 6 and 11
        if (digitCount > 5 && digitCount < 12) {
            try {
                const response = await axios.get(`https://saai-physio-api.vercel.app/api/get_patient_details?mobileNumber=${patient.mobileNumber}`);
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

    return (
        <div>
            <div className="in-patient-bill-container">
                <h2>Out-Patient Billing</h2>

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

                {/* Out-Patient Specific Information */}
                <div className="out-patient-info">
                    <label>
                        Appointment Date:
                        <input type="date" name="appointmentDate" value={patient.appointmentDate} onChange={handleInputChange} />
                    </label>
                    <label>
                        Service Name:
                        <input type="text" name="serviceName" value={patient.serviceName} onChange={handleInputChange} />
                    </label>
                </div>

                {/* Billing Information */}
                <div className="billing-info">
                    <label>
                        Payment Mode:
                        <select name="paymentMode" value={patient.paymentMode} onChange={handleInputChange}>
                            <option value="">Select Payment Mode</option>
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Net Banking">Net Banking</option>
                        </select>
                    </label>
                    <label>
                        Bill Amount:
                        <input type="text" name="billAmount" value={patient.billAmount} onChange={handleInputChange} />
                    </label>
                </div>

                {/* Button to Trigger Billing */}
                <button onClick={createOutPatientBill} disabled={loading}>
                    {loading ? 'Creating Bill...' : 'Create Out-Patient Bill'}
                </button>

                {/* Display Application Messages */}
                {appMessage && <div className="app-message">{appMessage}</div>}
            </div>
        </div>
    );
};

export default OutPatientBill;
