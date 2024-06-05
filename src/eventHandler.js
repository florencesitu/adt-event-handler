let patients = JSON.parse(localStorage.getItem("patients")) || [];

const validateDates = (dateOfBirth, admissionDate, dischargeDate) => {
  const today = new Date();

  if (new Date(dateOfBirth) > today) {
    throw new Error("Patient's date of birth cannot be later than today's date.");
  }
  if (admissionDate && new Date(admissionDate) < new Date(dateOfBirth)) {
    throw new Error("Patient's admission date cannot be earlier than date of birth.");
  }
  if (admissionDate && new Date(admissionDate) > today) {
    throw new Error("Patient's admission date cannot be later than today's date.");
  }
  if (dischargeDate && new Date(dischargeDate) > today) {
    throw new Error("Patient's discharge date cannot be later than today's date.");
  }

  console.log("Discharge Date before if condition", dischargeDate);
  console.log("Admission date before if statement", admissionDate);
  console.log("Milli second of discharge date", (new Date(dischargeDate)).getMilliseconds);
  console.log("Milli second of admission date", (new Date(admissionDate)));

  if (dischargeDate && new Date(dischargeDate) < new Date(admissionDate)) {
    console.log(new Date(dischargeDate) < new Date(admissionDate));
    throw new Error("Discharge date cannot be earlier than admission date.");
  }
};

const validateBedAvailability = (currentBed, patientId = null) => {
  const isBedTaken = patients.some(
    (p) => p.currentBed === currentBed && p.id !== patientId && p.dischargeDate === null
  );
  if (isBedTaken) {
    throw new Error("The bed is already taken.");
  }
};

export const admission = (patient) => {
  validateDates(patient.dateOfBirth, patient.admissionDate);
  validateBedAvailability(patient.currentBed);

  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));
};

export const discharge = (patientId, dischargeDate) => {

  const patient = patients.find((p) => p.id === patientId);
  if (!patient) throw new Error("Patient not found.");
  if (patient.dischargeDate !== null) throw new Error("Patient is already discharged.");
  validateDates(null, patient.admissionDate, dischargeDate);

  patient.dischargeDate = dischargeDate;
  localStorage.setItem("patients", JSON.stringify(patients));
};

export const transfer = (patientId, newBed) => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) throw new Error("Patient not found.");
  if (patient.dischargeDate !== null) throw new Error("Cannot transfer a discharged patient.");

  validateBedAvailability(newBed, patientId);

  patient.currentBed = newBed;
  localStorage.setItem("patients", JSON.stringify(patients));
};
