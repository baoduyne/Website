import handbookService from '../services/handbookService'
let createHandbook = async (req, res) => {
    try {
        let data = req.body;

        let response = await handbookService.createHandbook(data);
        if (response) {
            return res.status(200).json({
                errCode: response.errCode,
                errMessage: response.errMessage,
            })
        }
        else {
            return res.status(200).json({
                errCode: -1,
                errMessage: "err from sever!"
            })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "err from sever!"
        })

    }
}


let getDataHandbook = async (req, res) => {
    try {

        let type = req.query.type;
        let id = req.query.id;
        let response = await handbookService.getDataHandbook(type, id);
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
                errMessage: "err from sever!"
            })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "err from sever!"
        })

    }
}
module.exports = {
    createHandbook: createHandbook,
    getDataHandbook: getDataHandbook
}