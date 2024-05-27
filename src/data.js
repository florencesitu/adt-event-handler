class Patient {
    constructor(id, firstName, lastName, dateOfBirth, gender, admissionDate, dischargeDate, currentBed) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.admissionDate = admissionDate;
        this.dischargeDate = dischargeDate;
        this.currentBed = currentBed;
      }
}

const patients = [];

export { Patient as default, patients };