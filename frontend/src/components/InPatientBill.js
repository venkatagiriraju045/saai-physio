import React, { useState } from 'react';
import axios from 'axios';
import './CSS/InPatientBill.css';

const InPatientBill = () => {
    const [loading, setLoading] = useState(false);
    const [appMessage, setAppMessage] = useState('');
    const [patient, setPatient] = useState({
        mobileNumber: '',
        roomNumber: '',
        admissionDate: '',
        dischargeDate: '',
        totalDays: '',
        amountPerDay: '',
        paymentMode: '',
        billAmount: '',
    });
    const createInPatientBill = async () => {
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
    
            // If the in-patient bill was created successfully, you can access details from inPatientBill
            if (inPatientBill) {
                console.log('In-Patient Bill Details:', inPatientBill);
                // Additional actions or state updates can be performed based on the in-patient bill details
            }
    
            setTimeout(() => {
                setAppMessage('');
            }, 5000);
            setLoading(false);
        } catch (error) {
            console.error('Error creating in-patient bill:', error);
            setAppMessage('An error occurred while creating the in-patient bill');
            setLoading(false);
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the patient state dynamically based on the input field
        setPatient((prevPatient) => {
            let updatedPatient = {
                ...prevPatient,
                [name]: value,
            };

            // Dynamically update billAmount if totalDays or amountPerDay changes
            if (name === 'totalDays' || name === 'amountPerDay') {
                const totalDays = parseInt(updatedPatient.totalDays) || 0;
                const amountPerDay = parseFloat(updatedPatient.amountPerDay) || 0;
                updatedPatient = {
                    ...updatedPatient,
                    billAmount: (totalDays * amountPerDay).toFixed(2),
                };
            }
            // Dynamically calculate totalDays if admissionDate and dischargeDate are available
            if (name === 'admissionDate' || name === 'dischargeDate') {
                const admissionDate = new Date(updatedPatient.admissionDate);
                const dischargeDate = new Date(updatedPatient.dischargeDate);

                if (!isNaN(admissionDate.getTime()) && !isNaN(dischargeDate.getTime())) {
                    // Calculate the difference in days
                    const timeDifference = dischargeDate.getTime() - admissionDate.getTime();
                    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

                    updatedPatient = {
                        ...updatedPatient,
                        totalDays: daysDifference.toString(),
                    };
                }
            }

            // Dynamically update billAmount if totalDays or amountPerDay changes
            if (name === 'totalDays' || name === 'amountPerDay') {
                const totalDays = parseInt(updatedPatient.totalDays) || 0;
                const amountPerDay = parseFloat(updatedPatient.amountPerDay) || 0;
                updatedPatient = {
                    ...updatedPatient,
                    billAmount: (totalDays * amountPerDay).toFixed(2),
                };
            }
            return updatedPatient;
        });
    };

    return (
        <div>
            <div className="in-patient-bill-container">
                <h2>In-Patient Billing</h2>
                {/* Patient Details */}

                {/* In-Patient Specific Information */}
                <div className="in-patient-info">
                <div className="patient-details">
                    <label>
                        Mobile Number:
                        <input type="text" name="mobileNumber" value={patient.mobileNumber} onChange={handleInputChange} />
                    </label>
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
                    <label>
                        Amount Per Day:
                        <input type="text" name="amountPerDay" value={patient.amountPerDay} onChange={handleInputChange} />
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
