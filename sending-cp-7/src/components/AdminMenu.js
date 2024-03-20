import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { useNavigate, useLocation } from "react-router-dom";
import UpdateRecord from "./UpdateRecord";
import BasicRecord from "./BasicRecord";
import ExistingRecordForm from "./ExistingRecordForm";
import InPatientBill from "./InPatientBill";
import OutPatientBill from "./OutPatientBill";
import powerButton from "./power-button.png";
import PatientDetails from "./PatientDetails";
import Treatment from "./Treatment";
//import './CSS/landpage.css';
import "./CSS/landingpage.css";
import "./CSS/home.css"

import addfile from "./content icons/add-file.png";
import update from "./content icons/update.png";
import inbill from "./content icons/transaction.png";
import outbill from "./content icons/medical.png";
import search from "./content icons/search.png";
import sports from "./content icons/sports 1.png";
import Geriatric from "./content icons/Geriatric 1.png";
import Paediatric from "./content icons/Paediatric 1.png";
import counseling from "./content icons/counseling.png";

import createrecord from "./landing-page-imgs/createrecord.jpg";
import updaterecord from "./landing-page-imgs/updaterecord.jpg";
import inpatientbill from "./landing-page-imgs/inpatientbill.jpg";
import outpatientbill from "./landing-page-imgs/outpatientbill.jpg";
import record from "./landing-page-imgs/record.jpg";

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
  const overlayClass = `loading-overlay${
    loading || isLoading ? " visible" : ""
  }`;
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

  // Refs for DOM elements
  const slidesRef = useRef([]);
  const navButtonsRef = useRef([]);
  const contentsRef = useRef([]);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // Populate refs with DOM element references
    slidesRef.current = document.querySelectorAll(".img-slide");
    navButtonsRef.current = document.querySelectorAll(".nav-btn");
    contentsRef.current = document.querySelectorAll(".content");
  }, []);

  function nextSlide() {
    // Check if slidesRef and slidesRef.current are defined
    if (!slidesRef || !slidesRef.current) {
      console.error("Error: slidesRef or slidesRef.current is not defined.");
      return;
    }

    const currentSlideIndex = Array.from(slidesRef.current).findIndex((slide) =>
      slide.classList.contains("active")
    );

    // Check if currentSlideIndex is valid
    if (currentSlideIndex === -1) {
      console.error("Error: Could not find current slide.");
      return;
    }

    const nextSlideIndex = (currentSlideIndex + 1) % slidesRef.current.length;

    // Remove 'active' class from all slides and content
    slidesRef.current.forEach((slide) => slide.classList.remove("active"));
    contentsRef.current.forEach((content) =>
      content.classList.remove("active")
    );

    // Add 'active' class to next slide and content
    if (
      slidesRef.current[nextSlideIndex] &&
      contentsRef.current[nextSlideIndex]
    ) {
      slidesRef.current[nextSlideIndex].classList.add("active");
      contentsRef.current[nextSlideIndex].classList.add("active");
    } else {
      console.error("Error: Next slide or content not found.");
      return;
    }
  }

  useEffect(() => {
    const dropdowns = document.querySelectorAll(".dropdown");

    if (dropdowns) {
      dropdowns.forEach((dropdown) => {
        const navLink = dropdown.querySelector(".nav-link");
        const dropdownContent = dropdown.querySelector(".dropdown-content");

        if (navLink && dropdownContent) {
          navLink.addEventListener("click", () => {
            hideAllDropdowns();

            dropdownContent.classList.toggle("active");
          });
        }
      });
    }

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".dropdown")) {
        hideAllDropdowns();
      }
    });

    function hideAllDropdowns() {
      const activeDropdowns = document.querySelectorAll(
        ".dropdown-content.active"
      );
      activeDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }

    return () => {
      document.removeEventListener("click", hideAllDropdowns);
    };
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    setShowConfirmationPrompt(false);
    navigate("/");
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
    document.querySelectorAll(".body").forEach((element) => {
      element.style.display = "block";
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
    }, 3000);
  };

  /**
  
  Toggles the visibility state of the navigation bar.
  This function toggles the visibility state of the navigation bar by flipping the value of prevShowNavBar.
  @returns {void}
  */
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
    }, 3000);
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
    setIsHomeButtonClicked(false);
    setShowNavBar(false);
    setShowInPatientBill(false);
    setShowOutPatientBill(false);
    setShowPatientDetails(false);

    // Set loading state
    setIsLoading(true);

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
    }, 3000);
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
    }, 3000);
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
    }, 3000);
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
    }, 3000);
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
    }, 3000);
  };
  if (deviceType === "mobile") {
    return (
      <div className="mobile-warning-overlay-message">
        <p>
          You are logged in on a mobile device. Please logout from the mobile
          device to access this page on a computer or laptop.
        </p>
      </div>
    );
  }

  const handleGoBack = () => {
    if (
      showBasicRecord ||
      showUpdateRecord ||
      showInPatientBill ||
      showOutPatientBill ||
      showPatientDetails
    ) {
      setShowBasicRecord(false);
      setShowInPatientBill(false);
      setShowOutPatientBill(false);
      setShowUpdateRecord(false);
      setIsHomeButtonClicked(true);
      setShowPatientDetails(false);
    } else {
      navigate("/");
    }
  };
  return (
    <div>
      {showConfirmationPrompt && (
        <div className="logout-overlay">
          <div className="confirmation-container">
            <p>Are you sure you want to logout?</p>
            <button className="confirm-button" onClick={handleLogout}>
              Yes
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowConfirmationPrompt(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
      <header>
        <button class="main-back-button" onClick={handleGoBack}>
          <div class="main-back">
            <img src="./uploads/back.png" alt="Back" />
          </div>
          <div class="main-back-text">Back</div>
        </button>
        <div class="menu-btn">
          <div class="navigation">
            <div class="navigation-items">
              <div class="dropdown">
                <a href="#" class="nav-link">
                  Action
                </a>
                <div class="dropdown-content">
                  <a href="#" onClick={handleBasicRecordClick}>
                    Create Record
                  </a>
                  <a href="#" onClick={handleUpdateRecordClick}>
                    Update Record
                  </a>
                </div>
              </div>
              <div class="dropdown">
                <a href="#" class="nav-link">
                  Billing
                </a>
                <div class="dropdown-content">
                  <a href="#" onClick={handleInPatientBillClick}>
                    In Patient Billing
                  </a>
                  <a href="#" onClick={handleOutPatientBillClick}>
                    Out Patient Billing
                  </a>
                </div>
              </div>
              <div class="dropdown">
                <a href="#" class="nav-link" onClick={handlePatientDetails}>
                  Records
                </a>
              </div>
              <div class="dropdown">
                <label
                  className="power-button"
                  onClick={() => setShowConfirmationPrompt(true)}
                >
                  <input
                    type="checkbox"
                    checked={showConfirmationPrompt}
                    readOnly
                  />
                  <div className="checkmark-pwr-btn">
                    <img src={powerButton} alt="Power Button" />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
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
        {showUpdateRecord ? (
          <UpdateRecord />
        ) : showBasicRecord ? (
          <BasicRecord />
        ) : showInPatientBill ? (
          <InPatientBill />
        ) : showOutPatientBill ? (
          <OutPatientBill />
        ) : showPatientDetails ? (
          <PatientDetails />
        ) : (
          isHomeButtonClicked && (
            <div class="adminmenu-contents-root">
              {/* <section class="home">
                <span class="curve"></span>
                <img
                  decoding="async"
                  className="img-slide slide0 active"
                  src={createrecord}
                />
                <img
                  decoding="async"
                  className="img-slide slide1 "
                  src={updaterecord}
                />
                <img
                  decoding="async"
                  className="img-slide slide2"
                  src={inpatientbill}
                />
                <img
                  decoding="async"
                  className="img-slide slide3"
                  src={outpatientbill}
                />
                <img
                  decoding="async"
                  className="img-slide slide4"
                  src={record}
                />
                <div class="content active">
                  <h1>
                    <span>Create Record</span>
                  </h1>
                  <p>
                    <span>
                      Creating patients record using their basic details...
                    </span>
                  </p>
                  <span class="Read-more">
                    <a href="#" onClick={handleBasicRecordClick}>
                      Click here
                    </a>
                  </span>
                </div>
                <div class="content">
                  <h1>
                    <span>Update Record</span>
                  </h1>
                  <p>
                    <span>
                      Updating the existing Record with their additional
                      complaints...
                    </span>{" "}
                  </p>
                  <span class="Read-more">
                    <a href="#" onClick={handleUpdateRecordClick}>
                      Click here
                    </a>
                  </span>
                </div>
                <div class="content">
                  <h1>
                    <span>In Patient Billing</span>
                  </h1>
                  <p>
                    <span>Creating the bill for In-Patients...</span>
                  </p>
                  <span class="Read-more">
                    <a href="#" onClick={handleInPatientBillClick}>
                      Click here
                    </a>
                  </span>
                </div>
                <div class="content">
                  <h1>
                    <span>Out Patient Billing</span>
                  </h1>
                  <p>
                    <span>Creating the bill for Out-Patients...</span>
                  </p>
                  <span class="Read-more">
                    <a href="#" onClick={handleOutPatientBillClick}>
                      Click here
                    </a>
                  </span>
                </div>
                <div class="content">
                  <h1>
                    <span>Patient Info</span>
                  </h1>
                  <p>
                    <span>Searching for all the patients records...</span>
                  </p>
                  <span class="Read-more">
                    <a href="#" onClick={handlePatientDetails}>
                      Click here
                    </a>
                  </span>
                </div>

                <div className="slider-navigation" style={{ display: "none" }}>
                  <div class="nav-btn active"></div>
                  <div class="nav-btn"></div>
                  <div class="nav-btn"></div>
                  <div class="nav-btn"></div>
                  <div class="nav-btn"></div>
                </div>
              </section> */
              
              <div className="home-patient-cards">
              <div className="our-specialities-heading">
                <span style={{ "--i": 1 }}>F</span>
                <span style={{ "--i": 2 }}>e</span>
                <span style={{ "--i": 3 }}>a</span>
                <span style={{ "--i": 4 }}>t</span>
                <span style={{ "--i": 5 }}>u</span>
                <span style={{ "--i": 6 }}>r</span>
                <span style={{ "--i": 7 }}>e</span>
                <span style={{ "--i": 8 }}>s</span>
                {/* <span style={{ "--i": 9 }}>i</span>
                <span style={{ "--i": 10 }}>a</span>
                <span style={{ "--i": 11 }}>l</span>
                <span style={{ "--i": 12 }}>i</span>
                <span style={{ "--i": 13 }}>t</span>
                <span style={{ "--i": 14 }}>i</span>
                <span style={{ "--i": 15 }}>e</span>
                <span style={{ "--i": 16 }}>s</span> */}
              </div>
  
              <div className="home-patient-card1">
                <div className="home-patient-slide home-patient-slide1">
                  <div className="home-patient-content">
                    <div className="home-patient-icon">
                      <div className="home-patient-card pain">
                        <div className="home-patient-overlay"></div>
                        <div className="circle1">
                          {/* <img src="./content icons/stomachache.png" />*/}
                          <img src={addfile} alt="Image" />
                        </div>
                        <p>Create Patient Record</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="home-patient-slide home-patient-slide2">
                  <div className="home-patient-content">
                    <p>Click below to create the new patient record</p>
                    <button id="button1" onClick={handleBasicRecordClick}>
                      <span>Continue</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="home-patient-card1">
                <div className="home-patient-slide home-patient-slide1">
                  <div className="home-patient-content">
                    <div className="home-patient-icon">
                      <div className="home-patient-card orthopedic">
                        <div className="home-patient-overlay"></div>
                        <div className="circle2">
                          {/*} <img src="./home-patient-content icons/Orthopedic 2.png" />*/}
                          <img src={update} alt="Image" onClick={handleUpdateRecordClick}/>
                        </div>
                        <p>Update Patient Record</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="home-patient-slide home-patient-slide2">
                  <div className="home-patient-content">
                    <p>Click below to update the patient record with the existing patient details</p>
                    <button id="button2">
                      <span>Continue</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="home-patient-card1">
                <div className="home-patient-slide home-patient-slide1">
                  <div className="home-patient-content">
                    <div className="home-patient-icon">
                      <div className="home-patient-card neurological">
                        <div className="home-patient-overlay"></div>
                        <div className="circle3">
                          {/*<img src="./home-patient-content home-patient-icons/neuron.png" />*/}
                          <img src={inbill} alt="Image" onClick={handleInPatientBillClick}/>
                        </div>
                        <p>In Patient Billing</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="home-patient-slide home-patient-slide2">
                  <div className="home-patient-content">
                    <p>Click below to create the bill for an In Patients</p>
                    <button id="button3">
                      <span>Continue</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="home-patient-card1">
                <div className="home-patient-slide home-patient-slide1">
                  <div className="home-patient-content">
                    <div className="home-patient-icon">
                      <div className="home-patient-card cardio">
                        <div className="home-patient-overlay"></div>
                        <div className="circle4">
                          {/*<img src="./home-patient-content home-patient-icons/Cardio.png" />*/}
                          <img src={outbill} alt="Image" onClick={handleOutPatientBillClick}/>
                        </div>
                        <p>Out Patient Billing</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="home-patient-slide home-patient-slide2">
                  <div className="home-patient-content">
                    <p>Click below to create the bill for an Out Patients</p>
                    <button id="button4">
                      <span>Continue</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="home-patient-card1">
                <div className="home-patient-slide home-patient-slide1">
                  <div className="home-patient-content">
                    <div className="home-patient-icon">
                      <div className="home-patient-card respiratory">
                        <div className="home-patient-overlay"></div>
                        <div className="circle1">
                          {/*<img src="./home-patient-content home-patient-icons/Respiratory.png" />*/}
                          <img src={search} alt="Image" onClick={handlePatientDetails}/>
                        </div>
                        <p>All Patients Record</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="home-patient-slide home-patient-slide2">
                  <div className="home-patient-content">
                    <p>Click below to find all the patients record</p>
                    <button id="button5">
                      <span>Continue</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>}
            </div>
          )
        )}
      </main>
    </div>
  );
};
export default AdminMenu;
