import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/create-record.css";

import checklist from "./landing-page-imgs/checklist.png";
import errorimg from "./landing-page-imgs/error.png";

const BasicRecord = () => {
  const [showToast, setShowToast] = useState(false);
  const [ShowMobExistErrorToast, setShowMobExistErrorToast] = useState(false);
  const [showFillDetailsErrorToast, setShowFillDetailsErrorToast] =
    useState(false);
  const [mobileNo, setMobileNo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appMessage, setAppMessage] = useState("");
  const [showNetworkErrorToast, setShowNetworkErrorToast] =
    useState(false);
  const [showServerNetworkErrorToast, setShowServerNetworkErrorToast] =
    useState(false);
  const [selectedPatientType, setSelectedPatientType] = useState("");
  const [createoverlayVisible, setCreateOverlayVisible] = useState(false);
  const overlayClass = `loading-overlay${loading || isLoading ? " visible" : ""
    }`;
  const msgoverlay = `loading-overlay${!loading && appMessage ? " visible" : ""
    }`;

  const [inputValidation, setInputValidation] = useState({
    name: true,
    gender: true,
    age: true,
    mobileNo: true,
    occupation: true,
    address: true,
    complaint: true,
    uhid: true,
    // ... add other fields here
  });
  const [patient, setPatient] = useState({
    name: "",
    gender: "",
    age: "",
    mobileNo: "",
    occupation: "",
    address: "",
    complaint: "",
    uhid: "",
    doc: "",
    planTreatment: [
      {
        patientType: "choose type",
        startDate: "",
        endDate: "",
        days: "",
        ust: false,
        ift: false,
        swd: false,
        tr: false,
        wax: false,
        est: false,
        sht: false,
        laser: false,
        exs: false,
        rehab: false,
      },
    ],
    investigation: [
      {
        date: "",
        xray: "",
        mri: "",
        others: "",
        provisionalDiagnosis: "",
      },
    ],
    rangeOfMotion: {
      cervical: [
        { flexion: { rt: 0, lt: 0 } },
        { extension: { rt: 0, lt: 0 } },
        { abduction: { rt: 0, lt: 0 } },
        { adduction: { rt: 0, lt: 0 } },
        { eversion: { rt: 0, lt: 0 } },
        { inversion: { rt: 0, lt: 0 } },
        { externalRotation: { rt: 0, lt: 0 } },
        { internalRotation: { rt: 0, lt: 0 } },
        { dorsiFlexion: { rt: 0, lt: 0 } },
        { plantarFlexion: { rt: 0, lt: 0 } },
        { supination: { rt: 0, lt: 0 } },
        { pronation: { rt: 0, lt: 0 } },
        { lateralRotation: { rt: 0, lt: 0 } },
      ],
      shoulder: [
        { flexion: { rt: 0, lt: 0 } },
        { extension: { rt: 0, lt: 0 } },
        { abduction: { rt: 0, lt: 0 } },
        { adduction: { rt: 0, lt: 0 } },
        { eversion: { rt: 0, lt: 0 } },
        { inversion: { rt: 0, lt: 0 } },
        { externalRotation: { rt: 0, lt: 0 } },
        { internalRotation: { rt: 0, lt: 0 } },
        { dorsiFlexion: { rt: 0, lt: 0 } },
        { plantarFlexion: { rt: 0, lt: 0 } },
        { supination: { rt: 0, lt: 0 } },
        { pronation: { rt: 0, lt: 0 } },
        { lateralRotation: { rt: 0, lt: 0 } },
      ],
      elbow: [
        { flexion: { rt: 0, lt: 0 } },
        { extension: { rt: 0, lt: 0 } },
        { abduction: { rt: 0, lt: 0 } },
        { adduction: { rt: 0, lt: 0 } },
        { eversion: { rt: 0, lt: 0 } },
        { inversion: { rt: 0, lt: 0 } },
        { externalRotation: { rt: 0, lt: 0 } },
        { internalRotation: { rt: 0, lt: 0 } },
        { dorsiFlexion: { rt: 0, lt: 0 } },
        { plantarFlexion: { rt: 0, lt: 0 } },
        { supination: { rt: 0, lt: 0 } },
        { pronation: { rt: 0, lt: 0 } },
        { lateralRotation: { rt: 0, lt: 0 } },
      ],
      wrist: [
        { flexion: { rt: 0, lt: 0 } },
        { extension: { rt: 0, lt: 0 } },
        { abduction: { rt: 0, lt: 0 } },
        { adduction: { rt: 0, lt: 0 } },
        { eversion: { rt: 0, lt: 0 } },
        { inversion: { rt: 0, lt: 0 } },
        { externalRotation: { rt: 0, lt: 0 } },
        { internalRotation: { rt: 0, lt: 0 } },
        { dorsiFlexion: { rt: 0, lt: 0 } },
        { plantarFlexion: { rt: 0, lt: 0 } },
        { supination: { rt: 0, lt: 0 } },
        { pronation: { rt: 0, lt: 0 } },
        { lateralRotation: { rt: 0, lt: 0 } },
      ],
      hip: [
        { flexion: { rt: 0, lt: 0 } },
        { extension: { rt: 0, lt: 0 } },
        { abduction: { rt: 0, lt: 0 } },
        { adduction: { rt: 0, lt: 0 } },
        { eversion: { rt: 0, lt: 0 } },
        { inversion: { rt: 0, lt: 0 } },
        { externalRotation: { rt: 0, lt: 0 } },
        { internalRotation: { rt: 0, lt: 0 } },
        { dorsiFlexion: { rt: 0, lt: 0 } },
        { plantarFlexion: { rt: 0, lt: 0 } },
        { supination: { rt: 0, lt: 0 } },
        { pronation: { rt: 0, lt: 0 } },
        { lateralRotation: { rt: 0, lt: 0 } },
      ],
      knee: [
        { flexion: { rt: 0, lt: 0 } },
        { extension: { rt: 0, lt: 0 } },
        { abduction: { rt: 0, lt: 0 } },
        { adduction: { rt: 0, lt: 0 } },
        { eversion: { rt: 0, lt: 0 } },
        { inversion: { rt: 0, lt: 0 } },
        { externalRotation: { rt: 0, lt: 0 } },
        { internalRotation: { rt: 0, lt: 0 } },
        { dorsiFlexion: { rt: 0, lt: 0 } },
        { plantarFlexion: { rt: 0, lt: 0 } },
        { supination: { rt: 0, lt: 0 } },
        { pronation: { rt: 0, lt: 0 } },
        { lateralRotation: { rt: 0, lt: 0 } },
      ],
      ankle: [
        { flexion: { rt: 0, lt: 0 } },
        { extension: { rt: 0, lt: 0 } },
        { abduction: { rt: 0, lt: 0 } },
        { adduction: { rt: 0, lt: 0 } },
        { eversion: { rt: 0, lt: 0 } },
        { inversion: { rt: 0, lt: 0 } },
        { externalRotation: { rt: 0, lt: 0 } },
        { internalRotation: { rt: 0, lt: 0 } },
        { dorsiFlexion: { rt: 0, lt: 0 } },
        { plantarFlexion: { rt: 0, lt: 0 } },
        { supination: { rt: 0, lt: 0 } },
        { pronation: { rt: 0, lt: 0 } },
        { lateralRotation: { rt: 0, lt: 0 } },
      ],
    },
    musclePower: {
      cervicalC1C2Flexion: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      cervicalC3SideFlexion: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      scapulaC4Elevation: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      shoulderC5Abduction: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      elbowC6FlexionWristExtension: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      elbowC7ExtensionWristFlexion: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      thumbC8Extension: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      hipL1L2Flexion: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      kneeL3Extension: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      ankleL4Dorsiflexion: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      bigToeL5Extension: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      ankleS1PlantarFlexion: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      kneeS2Flexion: {
        rt: { motor: 0, sensory: 0 },
        lt: { motor: 0, sensory: 0 },
      },
      // Add other properties as needed
    },

    outPatientBill: [
      {
        appointmentDate: "",
        serviceName: "",
        paymentMode: "",
        billAmount: "",
      },
    ],

    inPatientBill: [
      {
        roomNumber: "",
        admissionDate: "",
        dischargeDate: "",
        totalDays: "",
        visitingBill: "",
        physioBill: "",
        nursingBill: "",
        otherExpenses: "",
        paymentMode: "",
        billAmount: "",
      },
    ],
  });

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

  const setInputClasses = (fieldName, isValid) => {
    setInputValidation((prevValidation) => ({
      ...prevValidation,
      [fieldName]: isValid,
    }));
  };
  /*
    const createPatientRecord = async () => {
  
      if (!navigator.onLine) {
        setShowNetworkErrorToast(true);
        setTimeout(() => {
          setShowNetworkErrorToast(false);
        }, 5300);
        return;
      }
  
      const dateAndTime = new Date().toLocaleString();
      patient.doc = dateAndTime;
  
      // Check all fields and update input classes
      setInputClasses("name", !!patient.name.trim());
      setInputClasses("gender", !!patient.gender.trim());
      setInputClasses("age", !!patient.age.trim());
      setInputClasses("mobileNo", !!patient.mobileNo.trim());
      setInputClasses("occupation", !!patient.occupation.trim());
      setInputClasses("address", !!patient.address.trim());
      setInputClasses("complaint", !!patient.complaint.trim());
      setInputClasses("uhid", !!patient.uhid.trim());
  
      // Add similar checks for other fields
  
      // // Check if any field is empty and show an alert
      // if (!Object.values(patient).every(value => !!value.trim())) {
      //     alert('Please fill all the fields');
      //     return;
      // }
  
      if (
        ![
          "name",
          "gender",
          "age",
          "mobileNo",
          "occupation",
          "address",
          "complaint",
          "uhid",
        ].every((key) => !!patient[key].trim())
      ) {
        setShowFillDetailsErrorToast(true);
        setTimeout(() => {
          setShowFillDetailsErrorToast(false);
        }, 5300);
        return;
      }
  
      // Validate the mobile number
      if (!validateMobileNumber(patient.mobileNo)) {
        return;
      }
  
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/api/create_basic_record",
          {
            patient: { ...patient },
          }
        );
  
        console.log("Server returned status code:", response.status);
  
        if (response.status === 201) {
          console.log("nnnnnnnnnn ffffffffff")
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 5300);
          // setAppMessage('Record updated successfully!');
          setTimeout(() => {
            setAppMessage("");
          }, 5000);
          setLoading(false);
        } 
        else if(response.status === 400){
          console.log("ppppppppppppppppppppp ffffffffff in 400")
          setShowMobExistErrorToast(true);
          setTimeout(() => {
            setShowMobExistErrorToast(false);
          }, 5300);
          setLoading(false);
        }
        else if (response.status === 500) {
          console.log("ppppppppppppppppppppp ffffffffff in 500")
          setShowServerNetworkErrorToast(true);
          setTimeout(() => {
            setShowServerNetworkErrorToast(false);
          }, 5300);
          setLoading(false);
        }
        else {
          throw new Error("Failed to create record");
        }
      } catch (error) {
        console.error("Error creating patient record:", error);
          setLoading(false);
        
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
*/  

  const createPatientRecord = async () => {
    if (!navigator.onLine) {
      setShowNetworkErrorToast(true);
      setTimeout(() => {
        setShowNetworkErrorToast(false);
      }, 5300);
      return;
    }

    const dateAndTime = new Date().toLocaleString();
    patient.doc = dateAndTime;

    // Check all fields and update input classes
    setInputClasses("name", !!patient.name.trim());
    setInputClasses("gender", !!patient.gender.trim());
    setInputClasses("age", !!patient.age.trim());
    setInputClasses("mobileNo", !!patient.mobileNo.trim());
    setInputClasses("occupation", !!patient.occupation.trim());
    setInputClasses("address", !!patient.address.trim());
    setInputClasses("complaint", !!patient.complaint.trim());
    setInputClasses("uhid", !!patient.uhid.trim());

    if (
      ![
        "name",
        "gender",
        "age",
        "mobileNo",
        "occupation",
        "address",
        "complaint",
        "uhid",
      ].every((key) => !!patient[key].trim())
    ) {
      setShowFillDetailsErrorToast(true);
      setTimeout(() => {
        setShowFillDetailsErrorToast(false);
      }, 5300);
      return;
    }

    // Validate the mobile number
    if (!validateMobileNumber(patient.mobileNo)) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://saai-physio-api.vercel.app/api/create_basic_record",
        {
          patient: { ...patient },
        }
      );

      console.log("Server returned status code:", response.status);

      if (response.status === 201) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5300);
        setTimeout(() => {
          setAppMessage("");
        }, 5000);
      } else {
        throw new Error("Failed to create record");
      }
    } catch (error) {
      console.error("Error creating patient record:", error);
      if (error.response && error.response.status === 400) {
        console.log("in 400")
        setLoading(false);
        setShowMobExistErrorToast(true);
        setTimeout(() => {
          setShowMobExistErrorToast(false);
        }, 5300);
      } else {
        setLoading(false);
        setShowServerNetworkErrorToast(true);
        setTimeout(() => {
          setShowServerNetworkErrorToast(false);
        }, 5300);
      }
    } finally {
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

          setInputClasses(name, /^[a-zA-Z ]*$/.test(value.trim()));
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
          setInputClasses(name, /^[a-zA-Z ]*$/.test(value.trim()));
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
          setInputClasses(
            name,
            /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/.test(
              value.trim()
            )
          );
        } else {
          alert(
            "Please enter only alphanumeric characters and special characters for the field."
          );
        }
        break;

      case "age":
        // Validate and set the state
        if (value.trim() === "" || !isNaN(value.trim())) {
          const age = value.trim() === "" ? "" : parseInt(value, 10);
          if (age === "" || (age >= 0 && age <= 150)) {
            setPatient((prevPatient) => ({
              ...prevPatient,
              [name]: value.trim(),
            }));
            setInputClasses(name, true);
          } else {
            alert("Please enter a valid age between 0 and 150.");
            setInputClasses(name, false);
          }
        } else {
          alert("Please enter a valid numeric age.");
          setInputClasses(name, false);
        }
        break;

      case "mobileNo":
        // Allow only numeric values with a maximum length of 13
        if (/^\d{0,12}$/.test(value)) {
          setPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
          }));
          setInputClasses(name, /^\d{0,12}$/.test(value.trim()));
        } else {
          alert("Please enter a valid mobile number with maximum 10 digits.");
        }
        break;
      // Add more cases for additional fields with specific validation requirements

      case "gender":
      case "onset":
        setPatient((prevPatient) => ({
          ...prevPatient,
          [name]: value,
        }));
        setInputClasses(name, !!value.trim());

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
        setInputClasses(name, /^[a-zA-Z0-9\s]*$/.test(value.trim()));

        break;
    }
  };

  const validateMobileNumber = (number) => {
    const digitCount = number.replace(/\D/g, "").length; // Count only digits

    // Check if the number of digits is between 6 and 11
    if (digitCount > 5 && digitCount < 11) {
      setMobileNo(true);
      return true;
    } else {
      setMobileNo(false);
      alert("Please enter the valid mobile number and create record.");
      return false;
    }
  };

  return (
    <div class="create-record-container">
      {showToast && (
        <div className="toast toast-active">
          <div className="toast-content">
            <img src={checklist} alt="Success" className="toast-check" />
            <div className="toast-message">
              <span className="toast-text toast-text-1">Success</span>
              <span className="toast-text toast-text-2">
                Patient Record Created successfully!
              </span>
            </div>
          </div>
          <div className="toast-progress toast-active"></div>
        </div>
      )}

      {(ShowMobExistErrorToast || showFillDetailsErrorToast || showNetworkErrorToast || showServerNetworkErrorToast)&& (
          <div className="toast toast-active">
            {console.log("in shoe mob er")}
            <div className="toast-content">
              <img src={errorimg} alt="Error" className="toast-error-check" />
              <div className="toast-message">
                {showFillDetailsErrorToast && (
                  <span className="toast-text toast-text-1">
                    Please fill all the details!
                  </span>
                )}
                {ShowMobExistErrorToast && (
                  <span className="toast-text toast-text-2">
                    The mobile number is already exists. Please enter a new
                    mobile Number!
                  </span>
                )}
                {showNetworkErrorToast && (
                <span className="toast-text toast-text-2">
                  Network disconnected. Please check your network!
                </span>
              )}
              {showServerNetworkErrorToast && (
                <span className="toast-text toast-text-2">
                  Internal Server Error! Try after some time.
                </span>
              )}
              </div>
            </div>
            <div className="toast-error-progress toast-active"></div>
          </div>
        )}
      
      {
        <div>
          {(loading || isLoading) && (
            <div className={overlayClass}>
              <div class="in-patient-wrapper">
                <div class="in-patient-box-wrap">
                  <div class="in-patient-box one"></div>
                  <div class="in-patient-box two"></div>
                  <div class="in-patient-box three"></div>
                  <div class="in-patient-box four"></div>
                  <div class="in-patient-box five"></div>
                  <div class="in-patient-box six"></div>
                </div>
              </div>
              <div class="in-patient-load-wrapp">
                <div class="in-patient-load-6">
                  <div class="in-patient-letter-holder">
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
      }
      <div class="create-record-form-container">
        <h1 class="create-record-title">Create Record</h1>
        <div class="create-record-row">
          <div class="create-record-col">
            <div
              class={`create-record-form-group-name${!inputValidation.name ? "-abnormal" : ""
                }`}
            >
              <span>Name&nbsp;&nbsp;&nbsp;</span>
              <input
                className={`create-record-form-field-name${!inputValidation.name ? "-abnormal" : ""
                  }`}
                type="text"
                name="name"
                placeholder="Patient's name"
                value={patient.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div class="create-record-col">
            <div
              class={`create-record-form-group-gender${!inputValidation.gender ? "-abnormal" : ""
                }`}
            >
              <span>Gender</span>
              <select
                className={`create-record-form-field-gender${!inputValidation.gender ? "-abnormal" : ""
                  }`}
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
          </div>
        </div>
        <div class="create-record-row">
          <div class="create-record-col">
            <div
              class={`create-record-form-group-age${!inputValidation.age ? "-abnormal" : ""
                }`}
            >
              <span>Age</span>
              <input
                className={`create-record-form-field-age${!inputValidation.age ? "-abnormal" : ""
                  }`}
                type="text"
                name="age"
                placeholder="Patient's age"
                value={patient.age}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div class="create-record-col">
            <div
              class={`create-record-form-group-mobileNo${!inputValidation.mobileNo ? "-abnormal" : ""
                }`}
            >
              <span>Mobile No</span>
              <input
                className={`create-record-form-field-mobileNo${!inputValidation.mobileNo ? "-abnormal" : ""
                  }`}
                type="text"
                name="mobileNo"
                placeholder="Patient's mobile no"
                value={patient.mobileNo}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div class="create-record-row">
          <div class="create-record-col">
            <div
              class={`create-record-form-group-occupation${!inputValidation.occupation ? "-abnormal" : ""
                }`}
            >
              <span>Occupation</span>
              <input
                className={`create-record-form-field-occupation${!inputValidation.occupation ? "-abnormal" : ""
                  }`}
                type="text"
                name="occupation"
                placeholder="Patient's occupation"
                value={patient.occupation}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div class="create-record-col">
            <div
              class={`create-record-form-group-uhid${!inputValidation.uhid ? "-abnormal" : ""
                }`}
            >
              <span>IP/UHID</span>
              <input
                className={`create-record-form-field-uhid${!inputValidation.uhid ? "-abnormal" : ""
                  }`}
                type="text"
                name="uhid"
                placeholder="Patient's IP / UHID"
                value={patient.uhid}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div class="create-record-row">
          <div class="create-record-col">
            <div
              class={`create-record-form-group-complaint${!inputValidation.complaint ? "-abnormal" : ""
                }`}
            >
              <span>Complaint</span>
              <input
                className={`create-record-form-field-complaint${!inputValidation.complaint ? "-abnormal" : ""
                  }`}
                type="text"
                name="complaint"
                placeholder="Patient's complaint"
                value={patient.complaint}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div class="create-record-col">
            <div
              class={`create-record-form-group-address${!inputValidation.address ? "-abnormal" : ""
                }`}
            >
              <span>Address</span>
              <input
                className={`create-record-form-field-address${!inputValidation.address ? "-abnormal" : ""
                  }`}
                type="text"
                name="address"
                placeholder="Enter your address"
                value={patient.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <input
          onClick={createPatientRecord}
          value="Proceed to Create Record"
          class="create-record-submit-btn"
          readOnly
        />
        {appMessage}
      </div>
    </div>
  );
};

export default BasicRecord;
