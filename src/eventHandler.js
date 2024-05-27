let patients = JSON.parse(localStorage.getItem("patients")) || [];

export const admission = (patient) => {
  console.log("Initial patients (admission):", patients);

  const dateOfBirth = new Date(patient.dateOfBirth);
  const admissionDate = new Date(patient.admissionDate);
  const today = new Date();

  if (dateOfBirth > today) {
    throw new Error(
      "Patient's date of birth cannot be later than today's date."
    );
  }
  if (admissionDate < dateOfBirth) {
    throw new Error(
      "Patient's admission date cannot be earlier than date of birth."
    );
  }
  if (admissionDate > today) {
    throw new Error(
      "Patient's admission date cannot be later than today's date."
    );
  }
  const isBedTaken = patients.some(
    (p) => p.currentBed === patient.currentBed && p.dischargeDate === null
  );
  if (isBedTaken) {
    throw new Error("The bed is already taken.");
  }

  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));
  console.log("Updated patients (admission):", patients);
};

export const discharge = (patientId, dischargeDate) => {
  patients = JSON.parse(localStorage.getItem("patients")) || [];
  console.log("Initial patients (discharge):", patients);

  const patient = patients.find((p) => p.id === patientId);
  const parsedDischargeDate = new Date(dischargeDate);
  const today = new Date();

  if (patient) {
    if (patient.dischargeDate !== null) {
      throw new Error("Patient is already discharged.");
    }
    if (parsedDischargeDate > today) {
      throw new Error(
        "Patient's discharge date cannot be later than today's date."
      );
    }
    patient.dischargeDate = dischargeDate;
    localStorage.setItem("patients", JSON.stringify(patients));
    console.log("Discharge:", JSON.parse(localStorage.getItem("patients")));
    console.log("Updated patients (discharge):", patients);
  } else {
    throw new Error("Patient is not found.");
  }
};

export const transfer = (patientId, transferBed) => {
  patients = JSON.parse(localStorage.getItem("patients")) || [];
  console.log("Initial patients (transfer):", patients);

  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error("Patient is not found.");
  }
  if (patient.dischargeDate !== null) {
    throw new Error("Patient is already discharged, cannot transfer.");
  }

  const isBedTaken = patients.some(
    (p) => p.currentBed === transferBed && p.id !== patientId && p.dischargeDate === null
  );
  console.log("Is bed taken:", isBedTaken);

  if (isBedTaken) {
    throw new Error("The bed is already taken.");
  }

  patient.currentBed = transferBed;
  localStorage.setItem("patients", JSON.stringify(patients));
  console.log("Updated patients (transfer):", patients);
};
