import clinicService from '../services/clinicService'

let createClinic = async (req, res) => {
    try {
        let response = await clinicService.createClinic(req.body);

        if (response) {
            return res.status(200).json({
                errCode: response.errCode,
                errMessage: response.errMessage
            })
        }

        else {
            return res.status(200).json({
                errCode: -1,
                errMessage: 'err from sever...'
            })
        }

    }
    catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from sever...'
        })
    }
}


let getAllClinic = async (req, res) => {
    try {
        let response = await clinicService.getAllClinic();

        if (response) {
            return res.status(200).json({
                errCode: response.errCode,
                errMessage: response.errMessage,
                data: response.data
            })
        }

        else {
            return res.status(200).json({
                errCode: -1,
                errMessage: 'err from sever...'
            })
        }

    }
    catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from sever...'
        })
    }
}

let getDetailClinic = async (req, res) => {
    try {
        let response = await clinicService.getDetailClinic(req.query.clinicId);

        if (response) {
            return res.status(200).json({
                errCode: response.errCode,
                errMessage: response.errMessage,
                data: response.data
            })
        }

        else {
            return res.status(200).json({
                errCode: -1,
                errMessage: 'err from sever...'
            })
        }

    }
    catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from sever...'
        })
    }
}


module.exports = {
    createClinic, getAllClinic, getDetailClinic
}