import React, { useState, useEffect } from "react";
import axios from "axios";
import OverlayRecord from "./OverlayRecord";
import "./CSS/patientdetailsoverlay.css";

const PatientDetails = () => {
  const [patientData, setPatientData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [appMessage, setAppMessage] = useState("");
  const [viewPatientDetails, setViewPatientDetails] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filterMobileNumber, setFilterMobileNumber] = useState("");
  const overlayClass = `loading-overlay${
    loading || isLoading ? " visible" : ""
  }`;
  const msgoverlay = `loading-overlay${
    !loading && appMessage ? " visible" : ""
  }`;

  useEffect(() => {
    const fetchAllRecords = async () => {
      try {
        const response = await axios.get(
          "https://saai-physio-api.vercel.app/api/get_all_records"
        );

        if (response.status === 200) {
          setPatientData(response.data);
          setFilteredData(response.data);
          setError(null);
        } else {
          setError("Error fetching records");
          setPatientData([]);
          setFilteredData([]);
        }
      } catch (error) {
        console.error("Error fetching records:", error.message);
        setError("Internal server error");
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
      setIsLoading(true);
      const response = await axios.get(
        "https://saai-physio-api.vercel.app/api/find_record",
        {
          params: {
            mobileNo, // Filter by institute_name
          },
        }
      );
      if (response.status === 200) {
        setSelectedPatientDetails(response.data);
        setViewPatientDetails(true);
      } else {
        setIsLoading(false);
        //console.error('Error fetching patient details:', response.data.error);
        setAppMessage(
          `Error fetching patient details: ${response.data.message}`
        );
        setTimeout(() => {
          setAppMessage("");
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      //console.error('Error fetching patient details:', error.message);
      setAppMessage(`Error fetching patient details: ${error.message}`);
      setTimeout(() => {
        setAppMessage("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };
  // ...

  console.log("sp", selectedPatientDetails);

  useEffect(() => {
    // Filter data based on the entered mobile number dynamically
    const filteredResults = patientData.filter((record) =>
      record?.mobileNo?.includes(filterMobileNumber)
    );

    setFilteredData(filteredResults);
  }, [filterMobileNumber, patientData]);

  // ...

  return (
    <div className="patient-details-main-container">
      <div className="patient-details-sub-main-container">
        <div>
          {(loading || isLoading) && (
            <div className={overlayClass}>
              <div class="adminmenu-wrapper">
                <div class="adminmenu-box-wrap">
                  <div class="adminmenu-box one"></div>
                  <div class="adminmenu-box two"></div>
                  <div class="adminmenu-box three"></div>
                  <div class="adminmenu-box four"></div>
                  <div class="adminmenu-box five"></div>
                  <div class="adminmenu-box six"></div>
                </div>
              </div>
              <div class="adminmenu-load-wrapp">
                <div class="adminmenu-load-6">
                  <div class="adminmenu-letter-holder">
                    <div class="l-1 letter">L</div>
                    <div class="l-2 letter">O</div>
                    <div class="l-3 letter">A</div>
                    <div class="l-4 letter">D</div>
                    <div class="l-5 letter">I</div>
                    <div class="l-6 letter">N</div>
                    <div class="l-7 letter">G</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {!loading && appMessage && (
            <div className={msgoverlay}>
              <div>{appMessage}</div>
            </div>
          )}
        </div>
        {/* <h1>Patient Details</h1> */}

        <div class="header-container">
          <div class="filter">
            <label>Filter by Mobile Number:</label>
            <input
              className="filter-by-mob"
              type="text"
              value={filterMobileNumber}
              onChange={(e) => setFilterMobileNumber(e.target.value)}
            />
          </div>

        </div>

        {filteredData.length > 0 ? (
          <div className="all-patients-main-container">
            <table className="all-patients-record-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Mobile Number</th>
                  <th>Name</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.pid}</td>
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
          <p className="no-rec-found">No records found.</p>
        )}

        {viewPatientDetails && (
          <div className="overlay">
            <div className="overlay-content">
              {selectedPatientDetails && (
                <div>
                  {console.log(
                    "selected mobile",
                    selectedPatientDetails.mobileNo
                  )}
                  <OverlayRecord
                    mobileNumber={selectedPatientDetails.mobileNo}
                  />
                </div>
              )}
              <div className="pd-overlay-close-button">
                <img src="./uploads/close.png" onClick={() => setViewPatientDetails(false)}/>
                
              </div>
            </div>
          </div>
        )}

        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
};

export default PatientDetails;
