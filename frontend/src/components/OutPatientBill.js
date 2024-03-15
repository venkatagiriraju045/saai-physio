import React, { useState } from 'react';
import axios from 'axios';
import './CSS/out-patient-billing.css'

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
                const response = await axios.get('https://saai-physio-api.vercel.app/api/get_patient_details', {
                    params: {
                        mobileNumber: patient.mobileNumber,// Filter by institute_name
                    }
                });
                const foundPatientRecord = response.data;
                console.log("fo", foundPatientRecord);
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
            <div class="out-patient-billing-container">
                <div class="out-patient-billing-form-container">
                    <div class="out-patient-billing-row">
                        <div class="out-patient-billing-col">
                            <h3 class="out-patient-billing-title">Out-Patient Billing</h3>
                            {patientDetails.name === '' && (<>

                            <div class="out-patient-billing-input-box mobile-number">
                                <span>Mobile Number</span>
                                <input type="text" name="mobileNumber" pattern="[0-9]{10}" value={patient.mobileNumber} onChange={handleInputChange} className="out-patient-billing-input mobile-input" />
                                <input type="button" value="Search" className="out-patient-billing-btn-search" onClick={validateMobileNumber} disabled={loading} />
                            </div>
                            </>)}
                            {patientDetails.name !== '' && (<>
                                <p className="in-patient-billing-patient-details"><span className="in-patient-billing-patient-name">{patientDetails.name}-{patientDetails.age}</span> <span className="in-patient-billing-patient-status">Out-Patient</span></p>

                            <div class="out-patient-billing-input-box">
                                <span>Appointment Date</span>
                                <input type="date" class="out-patient-billing-input" name="appointmentDate" value={patient.appointmentDate} onChange={handleInputChange}/>
                            </div>
                            <div class="out-patient-billing-flex">
                                <div class="out-patient-billing-input-box">
                                    <span>Service Name</span>
                                    <input
                                        type="text"
                                        placeholder="check-up"
                                        class="out-patient-billing-input"
                                        name="serviceName" 
                                        value={patient.serviceName} 
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="in-patient-billing-inputBox">
                                    <span>Payment Option</span>
                                    <div class="in-patient-billing-dropdown">
                                        <div class="in-patient-billing-input-box">

                                            <ul class="in-patient-billing-nav">
                                                <li class="in-patient-billing-button-dropdown">
                                                    <select class="in-patient-billing-dropdown-menu" name="paymentMode" value={patient.paymentMode} onChange={handleInputChange}>
                                                        <option class="in-patient-billing-dropdown-toggle" value="">Select Payment Mode</option>
                                                        <option class="dropdown-item" value="Cash">Cash</option>
                                                        <option class="dropdown-item" value="UPI">UPI</option>
                                                        <option class="dropdown-item" value="Credit Card">Credit Card</option>
                                                        <option class="dropdown-item" value="Debit Card">Debit Card</option>
                                                        <option class="dropdown-item" value="Net Banking">Net Banking</option>
                                                    </select>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="out-patient-billing-input-box">
                                    <span>Bill Amount</span>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        class="out-patient-billing-input"
                                        name="billAmount" 
                                        value={patient.billAmount} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>
                            </>)}
                        </div>
                    </div>
                    {patientDetails.name !== '' && (<>
                        <br/>             
                    <button onClick={createOutPatientBill} disabled={loading} class="out-patient-billing-submit-btn">
                    {loading ? 'Creating Bill...' : 'Create Out-Patient Bill'}
                </button>
                {/* Display Application Messages */}
                {appMessage && <div className="app-message">{appMessage}</div>}
                </>)}

                </div>
            </div>

        </div>
    );
};

export default OutPatientBill;
