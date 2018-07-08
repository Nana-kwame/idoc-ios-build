import { Database } from './../data/database.interface';

export class HospitalService {
    private selectedHospital: Database[] = [];


    tapHospital(hospital: Database) {
        this.selectedHospital.push(hospital);
        console.log(this.selectedHospital);
    }

    getSelectedHospital() {
        return this.selectedHospital.slice();
    }

    filterItems(searchTerm) {
        return this.selectedHospital.filter((hospital) => {
            return hospital.hospitalName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        })
    }

   
}