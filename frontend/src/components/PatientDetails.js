import React, { useState, useEffect } from "react";
import html2pdf from 'html2pdf.js';

import axios from "axios";
import OverlayRecord from "./OverlayRecord";
import "./CSS/patientdetailsoverlay.css";
import errorimg from "./landing-page-imgs/error.png";

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
  const [showServerNetworkErrorToast, setShowServerNetworkErrorToast] =
    useState(false);
  const [showUnexpectedErrorToast, setShowUnexpectedErrorToast] =
    useState(false);
  const overlayClass = `loading-overlay${loading || isLoading ? " visible" : ""
    }`;
  const msgoverlay = `loading-overlay${!loading && appMessage ? " visible" : ""
    }`;

  useEffect(() => {
    const fetchAllRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get_all_records"
        );

        if (response.status === 200) {
          setPatientData(response.data);
          setFilteredData(response.data);
          setError(null);
        } else if (response.status === 500) {
          setPatientData([]);
          setFilteredData([]);
          setLoading(false);
          setShowServerNetworkErrorToast(true);
          setTimeout(() => {
            setShowServerNetworkErrorToast(false);
          }, 5300);
        }
      } catch (error) {
        //console.error("Error fetching records:", error.message);
        setPatientData([]);
        setFilteredData([]);
        setLoading(false);
        setShowUnexpectedErrorToast(true);
        setTimeout(() => {
          setShowUnexpectedErrorToast(false);
        }, 5300);
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


  const handleDownloadPDF = () => {
    // Create a new HTML element to contain the table
    const tableContainer = document.createElement('div');
    tableContainer.className = "all-patients-main-container";

    // Create the table element
    const table = document.createElement('table');

    // Create table header
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
      <tr>
        <th>Patient ID</th>
        <th>Mobile Number</th>
        <th>Name</th>
      </tr>
    `;

    // Create table body
    const tableBody = document.createElement('tbody');
    filteredData.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="color: black;">${record.pid}</td>
        <td style="color: black;">${record?.mobileNo}</td>
        <td style="color: black;">${record?.name}</td>
      `;
      tableBody.appendChild(row);
    });

    // Assemble the table
    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    tableContainer.appendChild(table);

    // Generate PDF
    html2pdf()
      .from(tableContainer)
      .set({
        margin: 55,
        filename: 'patient_details.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'pt', format: 'a4', compressPDF: true }
      })
      .toPdf()
      .get('pdf')
      .then(function (pdf) {
        const totalPages = pdf.internal.pages.length;
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.setTextColor(150);
          const pageWidth = pdf.internal.pageSize.width;
          const pageHeight = pdf.internal.pageSize.height - 20;
          pdf.text('Page ' + i + ' of ' + totalPages, 45, pageHeight - 10);

          // Add borders
          pdf.setLineWidth(2);
          pdf.setDrawColor(0);
          pdf.line(30, 30, 30, pageHeight); // Left border
          pdf.line(pageWidth - 30, 30, pageWidth - 30, pageHeight); // Right border
          pdf.line(30, 30, pageWidth - 30, 30); // Top border
          pdf.line(30, pageHeight, pageWidth - 30, pageHeight); // Bottom border
        }
      })
      .save();
  };





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
        {(showServerNetworkErrorToast || showUnexpectedErrorToast) && (
          <div className="toast toast-active">
            <div className="toast-content">
              <img src={errorimg} alt="Error" className="toast-error-check" />
              <div className="toast-message">
                {showServerNetworkErrorToast && (
                  <span className="toast-text toast-text-2">
                    Internal Server Error! Try after some time.
                  </span>
                )}
                {showUnexpectedErrorToast && (
                  <span className="toast-text toast-text-2">
                    Unexpected Error Occurred.
                  </span>
                )}
              </div>
            </div>
            <div className="toast-error-progress toast-active"></div>
          </div>
        )}
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
          <div class="download-button" >
            <div class="download-button-wrapper">
              <button className="download-text" onClick={handleDownloadPDF}>Download as PDF</button>
              <span class="download-icon">
                <img src="./uploads/download.png" />
              </span>
            </div>
          </div>
          {/* <button onClick={handleDownloadPDF}>Download as PDF</button> */}

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
                      <button class="view-pat-button" onClick={() => handleRowSelection(record)}>
                        <span class="view-pat-circle" aria-hidden="true">
                          <span class="view-pat-icon view-pat-arrow"></span>
                        </span>
                        <span class="view-pat-text"> View Patient Details</span>
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-rec-found"></p>
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
                <img src="./uploads/close.png" onClick={() => setViewPatientDetails(false)} />

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
