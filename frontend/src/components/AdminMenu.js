import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { useNavigate, useLocation } from 'react-router-dom';
import './CSS/AdminHome.css';
import './CSS/DepartmentMenu.css';
import './CSS/Profile_model.css';
import UpdateRecord from './UpdateRecord';
import BasicRecord from './BasicRecord';
import ExistingRecordForm from './ExistingRecordForm';
import InPatientBill from './InPatientBill';
import OutPatientBill from './OutPatientBill';
import PatientDetails from './PatientDetails';
import Treatment from './Treatment';

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



  /* useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('https://eduleaves-api.vercel.app/api/students_data', {
          params: {
            role: 'student', // Filter by role
            department: departmentName, // Filter by department
            instituteName: instituteName, // Filter by institute_name
          }
        });
        setInstitute(instituteName);
        setDepartment(departmentName);
        const studentData = response.data;
        setStudents(studentData); // Set the students state variable
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError(error);
        setLoading(false);
      }
    };
 
    fetchStudentData();
  }, []);
  */

  const navigate = useNavigate();
  const handleLogout = () => {
    setShowConfirmationPrompt(false);
    navigate('/');
  };

  if (error) {
    return <p>Error fetching student data: {error.message}</p>;
  }

  /**
 * Handles the click event for the home button.
 * 
 * This function resets various states and displays elements with the class 'body'.
 * It sets isLoading state to true initially, then after a delay, sets isLoading state to false and resets other states.
 * 
 * @returns {void}
 */
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



/**

Toggles the visibility state of the navigation bar.
This function toggles the visibility state of the navigation bar by flipping the value of prevShowNavBar.
@returns {void}
*/
const handleShowNav = () => {
  setShowNavBar((prevShowNavBar) => !prevShowNavBar);
  };

  
/**

Handles the click event to create a new record.

This function initializes the creation of a new record by setting various states and displaying elements.

It sets isLoading state to true initially, then after a delay, sets isLoading state to false and resets other states.

@returns {void}
*/
const handleUpdateRecordClick = () => {
  // Show new record form and hide other elements
  setShowUpdateRecord(true);
  setShowBasicRecord(false);
  setShowExistingRecordForm(false);
  setShowNavBar(false);
  setShowInPatientBill(false);
  setShowOutPatientBill(false);
  setShowPatientDetails(false);
  
  // Set loading state
  setIsLoading(true);
  
  // Hide elements with class 'admin-chart-container'
  document.querySelectorAll('.admin-chart-container').forEach((element) => {
  element.style.display = 'none';
  });
  
  // Create a message element
  const messageElement = document.createElement('div');
  messageElement.style.color = 'black';
  document.querySelector('.profile-right-content-container').appendChild(messageElement);
  
  // After 1000 milliseconds, reset states and loading state
  setTimeout(() => {
  setIsLoading(false);
  messageElement.remove();
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
    document.querySelectorAll('.admin-chart-container').forEach((element) => {
    element.style.display = 'none';
    });
    
    // Create a message element
    const messageElement = document.createElement('div');
    messageElement.style.color = 'black';
    document.querySelector('.profile-right-content-container').appendChild(messageElement);
    
    // After 1000 milliseconds, reset states and loading state
    setTimeout(() => {
    setIsLoading(false);
    messageElement.remove();
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
    document.querySelectorAll('.admin-chart-container').forEach((element) => {
      element.style.display = 'none';
    });
    const messageElement = document.createElement('div');
    messageElement.style.color = 'black';
    document.querySelector('.profile-right-content-container').appendChild(messageElement);
    setTimeout(() => {
      setIsLoading(false);  
      messageElement.remove();
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
    document.querySelectorAll('.admin-chart-container').forEach((element) => {
      element.style.display = 'none';
    });
    const messageElement = document.createElement('div');
    messageElement.style.color = 'black';
    document.querySelector('.profile-right-content-container').appendChild(messageElement);
    setTimeout(() => {
      setIsLoading(false);
      messageElement.remove();
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
    document.querySelectorAll('.admin-chart-container').forEach((element) => {
      element.style.display = 'none';
    });
    const messageElement = document.createElement('div');
    messageElement.style.color = 'black';
    document.querySelector('.profile-right-content-container').appendChild(messageElement);
    setTimeout(() => {
      setIsLoading(false);
      messageElement.remove();
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
    document.querySelectorAll('.admin-chart-container').forEach((element) => {
      element.style.display = 'none';
    });
    const messageElement = document.createElement('div');
    messageElement.style.color = 'black';
    document.querySelector('.profile-right-content-container').appendChild(messageElement);
    setTimeout(() => {
      setIsLoading(false);
      messageElement.remove();
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
      {showNavBar &&
        <nav className="navigation1">
          <ul>
            <li>
              <div className="student-details-card">
                <img src="./uploads/logo-icon.png" className='main-icon' />
                SPC
                <br />

              </div>
            </li>
            <br />
            <br />
            <li>
              <a href="#" onClick={handleHomeButtonClick} className="test-score-button" title="Go to Home">
                Menu
              </a>
            </li>
            <br />
            <br />
            <li>
              <a href="#" className="test-score-button" onClick={handleBasicRecordClick} title="View Attendance">
                Create Basic Record
              </a>
            </li>
            <br />
            <br />
            <li>
              <a href="#" className="test-score-button" onClick={handleUpdateRecordClick} title="View Attendance">
                Update Record
              </a>
            </li>
            <br />
            <br />
            <li>
              <a href="#" className="test-score-button" onClick={handleExistingRecordClick} title="Send Messages">
                Find a Record
              </a>
            </li>
            <br />
            <br />
            <li>
              <a href="#" className="test-score-button" onClick={handleInPatientBillClick} title="Send Messages">
                In-Patient Bill
              </a>
            </li>
            <br />
            <br />
            <li>
              <a href="#" className="test-score-button" onClick={handleOutPatientBillClick} title="Send Messages">
                Out-Patient Bill
              </a>
            </li>
            <br />
            <br />
            <li>
              <a href="#" className="test-score-button" onClick={handlePatientDetails} title="Send Messages">
                Patient Details
              </a>
            </li>
            <br />
            <br />
          </ul>
          <footer className="profile-footer">
            &copy; Students Gate Tech Solutions.
          </footer>
        </nav>
      }

      <div
        className={`profile-right-content-container ${showNavBar ? "with-nav-bar" : "without-nav-bar"
          }`}>
        <header
          className="admin-header">
          <div className='nav-bar-hider'>
            <img src="./uploads/nav-menu.png" href="#" onClick={handleShowNav} id='nav-menu-button' alt="Dashboard-icon Icon"
              className={`nav-button-menu ${showNavBar ? "with-nav-bar" : "without-nav-bar"
                }`} />
          </div>
          <div className='header-dialogue'>
            <p>SAAI PHYSIOTHERAPY AND FITNESS CLINIC </p>
          </div>
          <div >
            <button className='logout-button' onClick={() => setShowConfirmationPrompt(true)}>
              Logout
            </button>
          </div>
          {showConfirmationPrompt && (
            <div className="logout-overlay">
              <div className="confirmation-container">
                <p>Are you sure you want to logout?</p>
                <button className="confirm-button" onClick={handleLogout}>Yes</button>
                <button className="cancel-button" onClick={() => setShowConfirmationPrompt(false)}>No</button>
              </div>
            </div>
          )}
        </header>
        <main
          className={`profile-content-container ${showNavBar ? "with-nav-bar" : "without-nav-bar"
            }`}>
          <div>
            {/*(loading || isLoading) && <div className={overlayClass}>
                      <div className="spinner">
                          <img src="./uploads/loading-brand-logo.png" alt="loading-brand-logo" id="loading-brand-logo" />
                      </div>
                      <img src="./uploads/loading-brand-title.png" alt="loading-brand-title" id="loading-brand-title" />
            </div>*/}
          </div>
          {showExistingRecordForm ? (
            <ExistingRecordForm />
          ) : showUpdateRecord ? (
            <UpdateRecord />
          ): showBasicRecord ? (
            <BasicRecord />
          ): showInPatientBill ? (
            <InPatientBill />
          ) : showOutPatientBill ? (
            <OutPatientBill />
          ): showPatientDetails ? (
            <PatientDetails />
          ) : isHomeButtonClicked && (
            <div className='home-contents'>
              <div className='menu-options'>
                <div className='menu-option'>
                  <a className="form-selection-a" onClick={handleBasicRecordClick}><img src="./uploads/create-icon.png" className='crete-icon' /></a>
                  <p>Create Basic record</p>
                </div>
                <div className='menu-option'>
                  <a className="form-selection-a" onClick={handleUpdateRecordClick}><img src="./uploads/create-icon.png" className='crete-icon' /></a>
                  <p>Create Update record</p>
                </div>
                <div className='menu-option'>
                  <a className="form-selection-a" onClick={handleExistingRecordClick}><img src="./uploads/find-icon.png" className='crete-icon' /></a>
                  <p>Find record</p>
                </div>
                <div className='menu-option'>
                  <a className="form-selection-a" onClick={handleInPatientBillClick}><img src="./uploads/in-icon.png" className='crete-icon' /></a>
                  <p>In-Patient bill</p>
                </div>
                <div className='menu-option'>

                  <a className="form-selection-a" onClick={handleOutPatientBillClick}><img src="./uploads/out-icon.png" className='crete-icon' /></a>
                  <p>Out-Patient bill</p>
                </div>
                <div className='menu-option'>

                  <a className="form-selection-a" onClick={handlePatientDetails}><img src="./uploads/out-icon.png" className='crete-icon' /></a>
                  <p>Patient Details</p>
                </div>
              </div>
            </div>)}
        </main>
      </div>
    </div>
  );
};
export default AdminMenu;
