import specialtyService from '../services/specialtyService'

let createSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.createSpecialty(req.body);

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


let getAllSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.getAllSpecialty();

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

let getDetailSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.getDetailSpecialty(req.query.specialtyId, req.query.provinceId, req.query.type);

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
    createSpecialty, getAllSpecialty, getDetailSpecialty
}