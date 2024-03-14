import React, { useState } from 'react';
import axios from 'axios';
import './CSS/in-patient-billing.css'
const InPatientBill = () => {
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
        roomNumber: '',
        admissionDate: '',
        dischargeDate: '',
        totalDays: '',
        visitingBill: '',
        physioBill: '',
        nursingBill: '',
        otherExpenses: '',
        paymentMode: '',
        amountPerDay:'',
    });
    console.log(patient);


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

    console.log("pa", patientDetails);


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
        const amountPerDay = (sumOfBills).toFixed(2);

        updatedPatient = {
            ...updatedPatient,
            amountPerDay: amountPerDay, // Round to 2 decimal places

            billAmount: (sumOfBills * totalDays).toFixed(2),
        };

        setPatient(updatedPatient);
    };


    return (
        <div>
            <div className="in-patient-billing-container">
                <form action="" className="form-in-patient-billing-container">
                    <div className="in-patient-billing-row">
                        <div className="in-patient-billing-col">
                            <h3 className="in-patient-billing-title">Billing Details</h3>
                            <div className="in-patient-billing-inputBox mobile-number">
                                <span>Mobile Number</span>
                                <input type="text" name="mobileNumber" pattern="[0-9]{10}" value={patient.mobileNumber} onChange={handleInputChange} className="in-patient-billing-input mobile-input" />

                                <input type="button" value="Search" className="in-patient-billing-btn-search" onClick={validateMobileNumber} disabled={loading} />
                            </div>
                            {patientDetails.name !== '' && (<>
                                <p className="in-patient-billing-patient-details"><span className="in-patient-billing-patient-name">{patientDetails.name}</span> <span className="in-patient-billing-patient-status">In-Patient</span></p>
                                <div className="in-patient-billing-inputBox">
                                    <span>Room Number</span>
                                    <input type="text" placeholder="21" className="input" name="roomNumber" value={patient.roomNumber} onChange={handleInputChange} />
                                </div>
                                <div className="in-patient-billing-inputBox">
                                    <span>Admission Date</span>
                                    <input type="date" className="input" name="admissionDate" value={patient.admissionDate} onChange={handleInputChange} />
                                </div>
                                <div className="in-patient-billing-inputBox">
                                    <span>Discharge Date</span>
                                    <input type="date" className="input" name="dischargeDate" value={patient.dischargeDate} onChange={handleInputChange} />
                                </div>
                                <div className="flex">
                                    <div className="in-patient-billing-inputBox">
                                        <span>Total Days</span>
                                        <input type="text" placeholder="35" className="input" name="totalDays" value={patient.totalDays} onChange={handleInputChange} readOnly />
                                    </div>
                                </div>
                            </>
                            )}
                        </div>
                        {patientDetails.name !== '' && (<>

                            <div className="in-patient-billing-col">
                                <h3 className="in-patient-billing-title">Amount Details</h3>
                                <div className="in-patient-billing-inputBox">
                                    <span>Payment Option</span>
                                    <div className="in-patient-billing-dropdown">
                                        <div className="in-patient-billing-input-box">

                                            <ul className="in-patient-billing-nav">
                                                <li className="in-patient-billing-button-dropdown">
                                                    <select className="in-patient-billing-dropdown-menu" name="paymentMode" value={patient.paymentMode} onChange={handleInputChange}>
                                                        <option className="in-patient-billing-dropdown-toggle" value="">Select Payment Mode</option>
                                                        <option className="dropdown-item" value="Cash">Cash</option>
                                                        <option className="dropdown-item" value="UPI">UPI</option>
                                                        <option className="dropdown-item" value="Credit Card">Credit Card</option>
                                                        <option className="dropdown-item" value="Debit Card">Debit Card</option>
                                                        <option className="dropdown-item" value="Net Banking">Net Banking</option>
                                                    </select>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="in-patient-billing-flex-in-billing">
                                    <div className="in-patient-billing-inputBox">
                                        <span>Visiting Bill</span>
                                        <input type="text" placeholder="250" className="input" name="visitingBill" value={patient.visitingBill} onChange={handleInputChange} />
                                    </div>
                                    <div className="in-patient-billing-inputBox">
                                        <span>Physio Bill</span>
                                        <input type="text" placeholder="25" className="input" name="physioBill" value={patient.physioBill} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="in-patient-billing-flex-in-billing">
                                    <div className="in-patient-billing-inputBox">
                                        <span>Nursing Bill</span>
                                        <input type="text" placeholder="250" className="input" name="nursingBill" value={patient.nursingBill} onChange={handleInputChange}/>
                                    </div>
                                    <div className="in-patient-billing-inputBox">
                                        <span>Other Expenses</span>
                                        <input type="text" placeholder="20" className="input"  name="otherExpenses" value={patient.otherExpenses} onChange={handleInputChange}/>
                                    </div>
                                </div>
                                <div className="in-patient-billing-inputBox">
                                    <span>Amount Per Day</span>
                                    <input type="text" placeholder="1234" className="input" name="amountPerDay" value={patient.amountPerDay} readOnly />
                                </div>
                                <div className="in-patient-billing-total-amount-check">
                                    <h2>Total Amount</h2>
                                        <div className="in-patient-billing-total-amount-display" name="billAmount" value={patient.billAmount} readOnly ><h4>{patient.billAmount}&#8377;</h4></div>
                                </div>
                            </div>
                        </>)}
                    </div>
                    {patientDetails.name !== '' && (<>

                        <button className="in-patient-billing-submit-btn" onClick={createInPatientBill} disabled={loading}>
                    {loading ? 'Creating Bill...' : 'confirm'}
                </button>

                {/* Display Application Messages */}
                {appMessage && <div className="app-message">{appMessage}</div>}
                    </>)}
                </form>
            </div>
        </div >
    );
};

export default InPatientBill;
