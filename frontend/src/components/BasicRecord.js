

import React, { useState } from 'react';
import axios from 'axios';
import './CSS/NewRecord.css';

const BasicRecord = () => {
    const [mobileNo, setMobileNo] = useState(false);

    const [loading, setLoading] = useState(true);
    const [appMessage, setAppMessage] = useState('');
    const [selectedPatientType, setSelectedPatientType] = useState('');
    const [createoverlayVisible, setCreateOverlayVisible] = useState(false);
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
        doc:'',

    });

    const createPatientRecord = async () => {
            const dateAndTime = new Date().toLocaleString();
            patient.doc = dateAndTime;
    
            try {
                const response = await axios.post('http://localhost:3000/api/create_basic_record', {
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
                setAppMessage('An error occurred while creating the patient record');
                setLoading(false);
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
                    alert("Please enter a valid mobile number with maximum 12 digits.");
                }
                break;
            // Add more cases for additional fields with specific validation requirements

            case "gender":
            case "onset":
                setPatient((prevPatient) => ({
                    ...prevPatient,
                    [name]: value,
                }));

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

                break;

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
            <div>
                <button onClick={createPatientRecord}>Create record</button>
            </div>


            <p>{appMessage}</p>
        </div>
    );

};

export default BasicRecord;
