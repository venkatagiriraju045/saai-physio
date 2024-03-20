import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./CSS/out-patient-billing.css";
import checklist from "./landing-page-imgs/checklist.png";
import close from "./landing-page-imgs/close.png";
import errorimg from "./landing-page-imgs/error.png";

const OutPatientBill = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileNo, setMobileNo] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showBillFillErrorToast, setShowBillFillErrorToast] =
    useState(false);
  const [showMobNotFillErrorToast, setShowMobNotFillErrorToast] =
    useState(false);
  const [showInvalidMobErrorToast, setShowInvalidMobErrorToast] =
    useState(false);
  const [appMessage, setAppMessage] = useState("");
  const searchInputRef = useRef(null); // Ref for the search input field

  useEffect(() => {
    // Focus on the search input field when the component mounts
    searchInputRef.current.focus();
  }, []);

  useEffect(() => {
    const button = document.querySelector("button");
    const toast = document.querySelector(".toast");
    const closeIcon = document.querySelector(".toast-close");
    const progress = document.querySelector(".toast-progress");

    if (button && toast && closeIcon && progress) {
      let timer1, timer2;

      const handleButtonClick = () => {
        toast.classList.add("active");
        progress.classList.add("active");

        timer1 = setTimeout(() => {
          toast.classList.remove("active");
        }, 5000);

        timer2 = setTimeout(() => {
          progress.classList.remove("active");
        }, 5300);
      };

      const handleCloseClick = () => {
        toast.classList.remove("active");

        setTimeout(() => {
          progress.classList.remove("active");
        }, 300);

        clearTimeout(timer1);
        clearTimeout(timer2);
      };

      button.addEventListener("click", handleButtonClick);
      closeIcon.addEventListener("click", handleCloseClick);

      return () => {
        button.removeEventListener("click", handleButtonClick);
        closeIcon.removeEventListener("click", handleCloseClick);
      };
    }
  }, []);

  const overlayClass = `loading-overlay${loading || isLoading ? " visible" : ""
    }`;
  const msgoverlay = `loading-overlay${!loading && appMessage ? " visible" : ""
    }`;
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    pid: "",
    gender: "",
    age: "",
  });
  const [patient, setPatient] = useState({
    mobileNumber: "",
    appointmentDate: "",
    serviceName: "",
    paymentMode: "",
    billAmount: "",
  });

  const isBillDetailsOutPatientFilled = () => {
    return (
      patient.appointmentDate &&
      patient.serviceName &&
      patient.paymentMode &&
      patient.billAmount
    );
  };

  const continueToBill = () => {
    const billfill= isBillDetailsOutPatientFilled();
    console.log("billfill",billfill)

    if(billfill){
      console.log("jjjj")
      createOutPatientBill();
    } else {
      setShowBillFillErrorToast(true);

      setTimeout(() => {
        setShowBillFillErrorToast(false);
      }, 5300);
    }
}

  const createOutPatientBill = async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        validateMobileNumber(patient.mobileNumber);
        resolve();
      }, 1000)
    );

    if (mobileNo) {
      const dateAndTime = new Date().toLocaleString();
      console.log("Patient Object:", patient);

      try {
        setLoading(true);
        const response = await axios.post(
          "https://saai-physio-api.vercel.app/api/create_new_outpatient_bill",
          {
            patient: {
              ...patient,
              dateAndTime,
            },
          }
        );

        const { message, outPatientBill } = response.data;

        setAppMessage(message);

        // If the out-patient bill was created successfully, you can access details from outPatientBill
        if (outPatientBill) {
          console.log("Out-Patient Bill Details:", outPatientBill);
          // Additional actions or state updates can be performed based on the out-patient bill details
        }

        // setTimeout(() => {
        //   setAppMessage("");
        // }, 5000);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5300);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setAppMessage(
            "Patient not found.Only Basic details are present  Do update the patient treamtment details in update record."
          );
          setTimeout(() => {
            setAppMessage("");
          }, 5000);
          alert('Patient not found.Only Basic details are present  Do update the patient treamtment details in update record.');
        } else {
          console.error("Error creating in-patient bill:", error);
          alert("Error creating in-patient bill")
          setAppMessage(
            `An error occurred while creating the in-patient bill: ${error.message}`
          );
          setTimeout(() => {
            setAppMessage("");
          }, 5000);
        }


      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 5500);
      }
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the patient state dynamically based on the input field
    let updatedPatient;

    switch (name) {
      case "mobileNumber":
        if (/^\d{0,12}$/.test(value)) {
          updatedPatient = {
            ...updatedPatient,
            [name]: value,
          };
        } else {
          alert(
            "Please enter a valid mobile number with a maximum of 12 digits."
          );
        }
        break;

      case "billAmount":
        if (/^\d{0,8}$/.test(value)) {
          updatedPatient = {
            ...updatedPatient,
            [name]: value,
          };
        } else {
          alert("Please enter a valid amount with a maximum of 8 digits.");
        }
        break;

      case "serviceName":
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
    const digitCount = patient.mobileNumber.replace(/\D/g, "").length; // Count only digits

    // Check if the number of digits is between 6 and 11
    if (digitCount > 5 && digitCount < 12) {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://saai-physio-api.vercel.app/api/get_patient_details",
          {
            params: {
              mobileNumber: patient.mobileNumber, // Filter by institute_name
            },
          }
        );
        const foundPatientRecord = response.data;
        console.log("fo", foundPatientRecord);
        setPatientDetails(foundPatientRecord);
        setMobileNo(true);
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setMobileNo(false);
        setPatientDetails({ name: "", pid: "" }); // Clear patient details on error
        setShowInvalidMobErrorToast(true);
        setTimeout(() => {
          setShowInvalidMobErrorToast(false);
        }, 5300);
        // setAppMessage("Error fetching patient details. Please try again.");
        // setTimeout(() => {
        //   setAppMessage("");
        // }, 5000);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 5000);

      }
    } else {
      setMobileNo(false);
      setPatientDetails({ name: "", pid: "" }); // Clear patient details if mobile number is not valid
      setShowMobNotFillErrorToast(true);
      setTimeout(() => {
        setShowMobNotFillErrorToast(false);
      }, 5300);
      // setAppMessage("Please enter a valid mobile number and create a record.");
      // setTimeout(() => {
      //   setAppMessage("");
      // }, 5000);
    }
  };

  return (
    <div className="main-container-in-bill">
    <div className="sub-main-container-in-bill">
    <div>
      <div>
        {(loading || isLoading) && (
          <div className={overlayClass}>
            <div class="out-patient-wrapper">
              <div class="out-patient-box-wrap">
                <div class="out-patient-box one"></div>
                <div class="out-patient-box two"></div>
                <div class="out-patient-box three"></div>
                <div class="out-patient-box four"></div>
                <div class="out-patient-box five"></div>
                <div class="out-patient-box six"></div>
              </div>
            </div>
            <div class="out-patient-load-wrapp">
              <div class="out-patient-load-6">
                <div class="out-patient-letter-holder">
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
      {showToast && (
          <div className="toast toast-active">
            <div className="toast-content">
              <img src={checklist} alt="Success" className="toast-check" />
              <div className="toast-message">
                <span className="toast-text toast-text-1">
                Success
                </span>
                <span className="toast-text toast-text-2">
                Out patient bill created successfully!
                </span>
              </div>
            </div>
            <div className="toast-progress toast-active"></div>
          </div>
        )}

{(showMobNotFillErrorToast || showInvalidMobErrorToast || showBillFillErrorToast) && (
          <div className="toast toast-active">
            <div className="toast-content">
              <img src={errorimg} alt="Error" className="toast-error-check" />
              <div className="toast-message">
                {showMobNotFillErrorToast && (
                  <span className="toast-text toast-text-1">
                    Please enter a valid mobile number!
                  </span>
                )}
                {showInvalidMobErrorToast && (
                  <span className="toast-text toast-text-2">
                    Patient not found. Enter a valid mobile number!
                  </span>
                )}
                {showBillFillErrorToast && (
                  <span className="toast-text toast-text-2">
                    Please fill all the bill details
                  </span>
                )}
              </div>
            </div>
            <div className="toast-error-progress toast-active"></div>
          </div>
        )}
      {/* <div>
        {!loading && appMessage && (
          <div className={msgoverlay}>
            <div>{appMessage}</div>
          </div>
        )}
      </div> */}
      <div class="out-patient-billing-container">
        <div class="out-patient-billing-form-container">
          <div class="out-patient-billing-row">
            <div class="out-patient-billing-col">
              <h3 class="out-patient-billing-title">Out-Patient Billing</h3>
              {patientDetails.name === "" && (
                <>
                  <div class="out-patient-billing-input-box mobile-number">
                    <span>Mobile Number</span>
                    <input
                      ref={searchInputRef}
                      type="text"
                      name="mobileNumber"
                      pattern="[0-9]{10}"
                      value={patient.mobileNumber}
                      onChange={handleInputChange}
                      className="out-patient-billing-input mobile-input"
                    />
                    <input
                      type="button"
                      value="Search"
                      className="out-patient-billing-btn-search"
                      onClick={validateMobileNumber}
                      disabled={loading}
                    />
                  </div>
                </>
              )}
              {patientDetails.name !== "" && (
                <>
                  <p className="in-patient-billing-patient-details">
                    <span className="in-patient-billing-patient-name">
                      {patientDetails.name}-{patientDetails.age}
                    </span>{" "}
                    <span className="in-patient-billing-patient-status">
                      Out-Patient
                    </span>
                  </p>

                  <div class="out-patient-billing-input-box">
                    <span>Appointment Date</span>
                    <input
                      type="date"
                      class="out-patient-billing-input"
                      name="appointmentDate"
                      value={patient.appointmentDate}
                      onChange={handleInputChange}
                    />
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
                              <select
                                class="in-patient-billing-dropdown-menu"
                                name="paymentMode"
                                value={patient.paymentMode}
                                onChange={handleInputChange}
                              >
                                <option
                                  class="in-patient-billing-dropdown-toggle"
                                  value=""
                                >
                                  Select Payment Mode
                                </option>
                                <option class="dropdown-item" value="Cash">
                                  Cash
                                </option>
                                <option class="dropdown-item" value="UPI">
                                  UPI
                                </option>
                                <option
                                  class="dropdown-item"
                                  value="Credit Card"
                                >
                                  Credit Card
                                </option>
                                <option
                                  class="dropdown-item"
                                  value="Debit Card"
                                >
                                  Debit Card
                                </option>
                                <option
                                  class="dropdown-item"
                                  value="Net Banking"
                                >
                                  Net Banking
                                </option>
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
                </>
              )}
            </div>
          </div>
          {patientDetails.name !== "" && (
            <>
              <br />
              <button
                onClick={continueToBill}
                disabled={loading}
                class="out-patient-billing-submit-btn"
              >
                {loading ? "Creating Bill..." : "Create Out-Patient Bill"}
              </button>
              {/* Display Application Messages */}
              {/* {appMessage && <div className="app-message">{appMessage}</div>} */}
            </>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default OutPatientBill;
