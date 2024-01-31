import React, { useState } from 'react';
import axios from 'axios';
import './CSS/InPatientBill.css';

const OutPatientBill = () => {
    const [loading, setLoading] = useState(false);
    const [appMessage, setAppMessage] = useState('');
    const [patient, setPatient] = useState({
        mobileNumber: '',
        appointmentDate: '',
        serviceName: '',
        paymentMode: '',
        billAmount: '',
    });

    const createOutPatientBill = async () => {
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
        } catch (error) {
            console.error('Error creating out-patient bill:', error);
            setAppMessage('An error occurred while creating the out-patient bill');
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

            return updatedPatient;
        });
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
                    </label>
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
