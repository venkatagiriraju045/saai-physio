import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { useNavigate, useLocation } from 'react-router-dom';
import UpdateRecord from './UpdateRecord';
import BasicRecord from './BasicRecord';
import ExistingRecordForm from './ExistingRecordForm';
import InPatientBill from './InPatientBill';
import OutPatientBill from './OutPatientBill';
import powerButton from './power-button.png';
import PatientDetails from './PatientDetails';
import Treatment from './Treatment';
import './CSS/landing-page.css';

const AdminMenu = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isHomeButtonClicked, setIsHomeButtonClicked] = useState(true);
  const [showExistingRecordForm, setShowExistingRecordForm] = useState(false);
  const [showUpdateRecord, setShowUpdateRecord] = useState(false);
  const [showBasicRecord, setShowBasicRecord] = useState(false);
  const [showInPatientBill, setShowInPatientBill] = useState(false);
  const [showOutPatientBill, setShowOutPatientBill] = useState(false);
  const [showPatientDetails, setShowPatientDetails] = useState(false);

  const [showNavBar, setShowNavBar] = useState(false);
  const [showConfirmationPrompt, setShowConfirmationPrompt] = useState(false);


  const [deviceType, setDeviceType] = useState(null);
  const overlayClass = `loading-overlay${loading || isLoading ? ' visible' : ''}`;
  const [mobile, setMobile] = useState(false);


  const navigate = useNavigate();
  const handleLogout = () => {
    setShowConfirmationPrompt(false);
    navigate('/');
  };

  if (error) {
    return <p>Error fetching student data: {error.message}</p>;
  }

  const handleHomeButtonClick = () => {
    // Hide record forms and bills
    setShowExistingRecordForm(false);
    setShowUpdateRecord(false);
    setShowInPatientBill(false);
    setShowOutPatientBill(false);
    setShowPatientDetails(false);
    setShowBasicRecord(false);

    // Set home button state
    setIsHomeButtonClicked(true);

    // Hide navigation bar
    setShowNavBar(false);

    // Set loading state
    setIsLoading(true);

    // Display elements with class 'body'
    document.querySelectorAll('.body').forEach((element) => {
      element.style.display = 'block';
    });

    // After 1000 milliseconds, reset states and loading state
    setTimeout(() => {
      setIsLoading(false);
      setShowBasicRecord(false);
      setShowExistingRecordForm(false);
      setShowUpdateRecord(false);
      setIsHomeButtonClicked(true);
      setShowInPatientBill(false);
      setShowNavBar(false);
      setShowOutPatientBill(false);
      setShowPatientDetails(false);
    }, 1000);
  };

  const handleShowNav = () => {
    setShowNavBar((prevShowNavBar) => !prevShowNavBar);
  };

  const handleUpdateRecordClick = () => {
    // Show new record form and hide other elements
    setShowBasicRecord(false);
    setShowUpdateRecord(true);
    setShowExistingRecordForm(false);
    setShowNavBar(false);
    setShowInPatientBill(false);
    setShowOutPatientBill(false);
    setShowPatientDetails(false);

    // Set loading state
    setIsLoading(true);

    // Hide elements with class 'admin-chart-container'


    // Create a message element


    // After 1000 milliseconds, reset states and loading state
    setTimeout(() => {
      setIsLoading(false);
      setShowBasicRecord(false);
      setShowUpdateRecord(true);
      setShowExistingRecordForm(false);
      setShowNavBar(false);
      setIsHomeButtonClicked(false);
      setShowInPatientBill(false);
      setShowOutPatientBill(false);
      setShowPatientDetails(false);
    }, 1000);
  };
  /**
  
  Handles the click event to create a new record.
  
  This function initializes the creation of a new record by setting various states and displaying elements.
  
  It sets isLoading state to true initially, then after a delay, sets isLoading state to false and resets other states.
  
  @returns {void}
  */


  const handleBasicRecordClick = () => {
    // Show new record form and hide other elements
    setShowBasicRecord(true);
    setShowUpdateRecord(false);
    setShowExistingRecordForm(false);
    setShowNavBar(false);
    setShowInPatientBill(false);
    setShowOutPatientBill(false);
    setShowPatientDetails(false);

    // Set loading state
    setIsLoading(true);

    // Hide elements with class 'admin-chart-container'


    // Create a message element


    // After 1000 milliseconds, reset states and loading state
    setTimeout(() => {
      setIsLoading(false);
      setShowBasicRecord(true);
      setShowUpdateRecord(false);
      setShowExistingRecordForm(false);
      setShowNavBar(false);
      setIsHomeButtonClicked(false);
      setShowInPatientBill(false);
      setShowOutPatientBill(false);
      setShowPatientDetails(false);
    }, 1000);
  };
  const handleExistingRecordClick = () => {
    setShowBasicRecord(false);
    setShowUpdateRecord(false);
    setShowExistingRecordForm(true);
    setShowInPatientBill(false);
    setShowNavBar(false);
    setShowOutPatientBill(false);
    setShowPatientDetails(false);
    setIsLoading(true);


    setTimeout(() => {
      setIsLoading(false);
      setShowBasicRecord(false);
      setShowUpdateRecord(false);
      setShowExistingRecordForm(true);
      setShowNavBar(false);
      setIsHomeButtonClicked(false);
      setShowInPatientBill(false);
      setShowOutPatientBill(false);
      setShowPatientDetails(false);
    }, 1000);
  };
  const handleInPatientBillClick = () => {
    setShowBasicRecord(false);
    setShowInPatientBill(true);
    setShowOutPatientBill(false);
    setShowNavBar(false);
    setShowUpdateRecord(false);
    setShowExistingRecordForm(false);
    setShowPatientDetails(false);
    setIsLoading(true);


    setTimeout(() => {
      setIsLoading(false);
      setShowBasicRecord(false);
      setShowUpdateRecord(false);
      setShowExistingRecordForm(false);
      setShowNavBar(false);
      setShowInPatientBill(true);
      setShowOutPatientBill(false);
      setIsHomeButtonClicked(false);
      setShowPatientDetails(false);
    }, 1000);
  };
  const handleOutPatientBillClick = () => {
    setShowBasicRecord(false);
    setShowInPatientBill(false);
    setShowOutPatientBill(true);
    setShowUpdateRecord(false);
    setShowNavBar(false);
    setShowExistingRecordForm(false);
    setShowPatientDetails(false);
    setIsLoading(true);


    setTimeout(() => {
      setIsLoading(false);
      setShowBasicRecord(false);
      setShowUpdateRecord(false);
      setShowExistingRecordForm(false);
      setShowInPatientBill(false);
      setShowNavBar(false);
      setShowOutPatientBill(true);
      setIsHomeButtonClicked(false);
      setShowPatientDetails(false);
    }, 1000);
  };
  const handlePatientDetails = () => {
    setShowBasicRecord(false);
    setShowInPatientBill(false);
    setShowOutPatientBill(false);
    setShowUpdateRecord(false);
    setShowNavBar(false);
    setShowExistingRecordForm(false);
    setShowPatientDetails(true);
    setIsLoading(true);


    setTimeout(() => {
      setIsLoading(false);
      setShowBasicRecord(false);
      setShowUpdateRecord(false);
      setShowExistingRecordForm(false);
      setShowInPatientBill(false);
      setShowNavBar(false);
      setShowOutPatientBill(false);
      setIsHomeButtonClicked(false);
      setShowPatientDetails(true);
    }, 1000);
  };
  if (deviceType === 'mobile') {
    return (
      <div className="mobile-warning-overlay-message">
        <p>You are logged in on a mobile device. Please logout from the mobile device to access this page on a computer or laptop.</p>
      </div>
    );
  }
  return (
    <div className="dep-admin-page-container">
      <div>
        {(loading || isLoading) && <div className={overlayClass}>
          <div className="spinner">
            <img src="./uploads/loading-brand-logo.png" alt="loading-brand-logo" id="loading-brand-logo" />
          </div>
          <img src="./uploads/loading-brand-title.png" alt="loading-brand-title" id="loading-brand-title" />
        </div>}
      </div>
      <div class="nav-back">
        <button class="back-button">
          <div class="back">
            <img src="./uploads/back.png" alt="Back" />
          </div>
          <div class="text">Back</div>
        </button>
        <nav class="navbar">
          <ul class="nav-links">
            <input type="checkbox" id="checkbox_toggle" />
            <label for="checkbox_toggle" class="hamburger">&#9776;</label>
            <div class="nav-bar-menu">
              <li class="nav-bar-services"><a>ACTIONS</a>
                <ul class="dropdown">
                  <li><a onClick={handleBasicRecordClick}>CREATE RECORD </a></li>
                  <li><a onClick={handleUpdateRecordClick}>UPDATE RECORD</a></li>
                </ul>
              </li>
              <li class="nav-bar-services"><a>BILLINGS</a>
                <ul class="dropdown">
                  <li><a onClick={handleInPatientBillClick}>IN-PATIENT BILLINGS</a></li>
                  <li><a onClick={handleOutPatientBillClick}>OUT-PATIENT BILLINGS</a></li>
                </ul>
              </li>

              <li><a onClick={handlePatientDetails}>RECORDS</a></li>

              <label  className="power-button" onClick={() => setShowConfirmationPrompt(true)}>
                <input type="checkbox" checked={showConfirmationPrompt} readOnly />
                <div className="checkmark-pwr-btn">
                  <img src={powerButton} alt="Power Button" />
                </div>
              </label>
            </div>
          </ul>
          {showConfirmationPrompt && (
            <div className="logout-overlay">
              <div className="confirmation-container">
                <p>Are you sure you want to logout?</p>
                <button className="confirm-button" onClick={handleLogout}>Yes</button>
                <button className="cancel-button" onClick={() => setShowConfirmationPrompt(false)}>No</button>
              </div>
            </div>
          )}
        </nav>
      </div>


      <main>
        <div>
          {(loading || isLoading) && <div className={overlayClass}>
            <div className="spinner">
              <img src="./uploads/loading-brand-logo.png" alt="loading-brand-logo" id="loading-brand-logo" />
            </div>
            <img src="./uploads/loading-brand-title.png" alt="loading-brand-title" id="loading-brand-title" />
          </div>}
        </div>
        {showExistingRecordForm ? (
          <ExistingRecordForm />
        ) : showUpdateRecord ? (
          <UpdateRecord />
        ) : showBasicRecord ? (
          <BasicRecord />
        ) : showInPatientBill ? (
          <InPatientBill />
        ) : showOutPatientBill ? (
          <OutPatientBill />
        ) : showPatientDetails ? (
          <PatientDetails />
        ) : isHomeButtonClicked && (
          <div className='home-contents'>
          </div>)}
      </main>
    </div>

  );
};
export default AdminMenu;
