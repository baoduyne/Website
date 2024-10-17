import patientService from '../services/patientService';

let createBooking = async (req, res) => {
    try {
        let data = req.body;
        let response = await patientService.createBooking(data);

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
        console.log(e);
    }
}

module.exports = {
    createBooking
}