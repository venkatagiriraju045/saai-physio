import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/NewRecord.css';
import OverlayRecord from './OverlayRecord';

const PatientDetails = () => {
    const [patientData, setPatientData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);
    const [viewPatientDetails, setViewPatientDetails] = useState(false);
    const [selectedRow, setSelectedRow] = useState("");
    const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filterMobileNumber, setFilterMobileNumber] = useState("");

    useEffect(() => {
        const fetchAllRecords = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/get_all_records');

                if (response.status === 200) {
                    setPatientData(response.data);
                    setFilteredData(response.data);
                    setError(null);
                } else {
                    setError('Error fetching records');
                    setPatientData([]);
                    setFilteredData([]);
                }
            } catch (error) {
                console.error('Error fetching records:', error.message);
                setError('Internal server error');
                setPatientData([]);
                setFilteredData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllRecords();
    }, []);

    const handleRowSelection = (selectedRecord) => {
        setSelectedRow(selectedRecord.mobileNo);
        handleViewDetails(selectedRecord.mobileNo);
    };

    const handleViewDetails = async (mobileNo) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/find_record?mobileNumber=${mobileNo}`);

            if (response.status === 200) {
                setSelectedPatientDetails(response.data);
                setViewPatientDetails(true);
            } else {
                console.error('Error fetching patient details:', response.data.error);
            }
        } catch (error) {
            console.error('Error fetching patient details:', error.message);
        }
    };
    // ...

    useEffect(() => {
        // Filter data based on the entered mobile number dynamically
        const filteredResults = patientData.filter(record =>
            record?.mobileNo?.includes(filterMobileNumber)
        );

        setFilteredData(filteredResults);
    }, [filterMobileNumber, patientData]);

    // ...


    return (
        <div>
            {loading && <p>Loading...</p>}
            <h1>Patient Details</h1>

            <div>
                <label>Filter by Mobile Number:</label>
                <input
                    type="text"
                    value={filterMobileNumber}
                    onChange={(e) => setFilterMobileNumber(e.target.value)}
                />
            </div>

            {filteredData.length > 0 ? (
                <div>
                    <h2>All Patient Records</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Serial Number</th>
                                <th>Mobile Number</th>
                                <th>Name</th>
                                <th>View Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((record, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{record?.mobileNo}</td>
                                    <td>{record?.name}</td>
                                    <td>
                                        <button onClick={() => handleRowSelection(record)}>
                                            View Patient Details
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No records found.</p>
            )}

            {viewPatientDetails && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Patient Details</h2>
                        {selectedPatientDetails &&
                            <div>
                                <OverlayRecord mobileNumber={selectedPatientDetails.mobileNo} />
                            </div>
                        }
                        <div className="overlay-close-button">
                            <button onClick={() => setViewPatientDetails(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default PatientDetails;
