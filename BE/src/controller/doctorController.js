import doctorService from '../services/doctorService'

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;

    try {
        let response = await doctorService.getTopDoctorHome(limit);
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            data: response.users
        })
    }
    catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from sever..."
        })
    }


}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();

        res.status(200).json({
            errCode: 0,
            errMessage: 'Done!',
            data: doctors.doctors
        })
    }

    catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: 'err from sever...',
        })
    }
}

let saveSelectDoctor = async (req, res) => {
    try {
        let inforDoctor = req.body;

        if (!inforDoctor) {
            res.status(200).json({
                errCode: 1,
                errMessage: 'Missing parameter'
            })
        }
        else {
            let response = await doctorService.saveSelectDoctor(inforDoctor);

            res.status(200).json({
                errCode: response.errCode,
                errMessage: response.errMessage
            })
        }

    }
    catch (e) {
        console.log(e);
        res.status(200).json({
            errCode: -1,
            errMessage: 'err from sever...'
        })
    }
}

let getDoctorMarkdown = async (req, res) => {
    try {
        let id = req.query.id;

        let data = await doctorService.getDoctorMarkdown(id);
        if (data) {
            return res.status(200).json({
                errCode: 0,
                errMessage: 'get doctor markdown completed!',
                data: data
            })
        }

    }
    catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from sever'
        })
    }
}

let saveDoctorSchedules = async (req, res) => {
    try {
        let data = req.body;
        let response = await doctorService.saveDoctorSchedules(data);
        res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage
        })
    }
    catch (e) {
        res.status(200).json({
            errCode: -1,
            errMessage: 'err from sever...'
        })
    }

}

let getDoctorSchedules = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;
        let date = req.query.date;
        let response = await doctorService.getDoctorSchedules(doctorId, date);

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            data: response.data
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from sever...'
        })
    }
}


let getDoctorInfors = async (req, res) => {
    try {
        let id = req.query.id;

        let response = await doctorService.getDoctorInfors(id);

        if (response) {

            res.status(200).json({
                errCode: response.errCode,
                errMessage: response.errMessage,
                data: response.data
            })
        }

    }

    catch (e) {
        res.status(200).json({
            errCode: -1,
            errMessage: 'Err from sever...'
        })
    }
}

let getBookingInforForDoctor = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;
        let time = req.query.time;
        let response = await doctorService.getBookingInforForDoctor(doctorId, time);

        if (response) {
            res.status(200).json({
                errCode: response.errCode,
                errMessage: response.errMessage,
                data: response.data
            })
        }

    }

    catch (e) {
        res.status(200).json({
            errCode: -1,
            errMessage: 'Err from sever...'
        })
    }
}
let sendBillToPatient = async (req, res) => {
    try {
        let email = req.body.email;
        let pillPrice = req.body.pillPrice;
        let note = req.body.note;
        let bookingData = req.body.bookingData;
        let language = req.body.language
        let response = await doctorService.sendBillToPatient(email, pillPrice, note, bookingData, language);

        if (response) {
            res.status(200).json({
                errCode: response.errCode,
                errMessage: response.errMessage,
                data: response.data
            })
        }

    }

    catch (e) {
        res.status(200).json({
            errCode: -1,
            errMessage: 'Err from sever...'
        })
    }
}



module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveSelectDoctor: saveSelectDoctor,
    getDoctorMarkdown: getDoctorMarkdown,
    saveDoctorSchedules: saveDoctorSchedules,
    getDoctorSchedules: getDoctorSchedules,
    getDoctorInfors: getDoctorInfors,
    getBookingInforForDoctor: getBookingInforForDoctor,
    sendBillToPatient: sendBillToPatient
}