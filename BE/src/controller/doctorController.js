import doctorService from '../services/doctorService'

let getTopDoctorHome = async  (req,res) =>{
    let limit = req.query.limit;
    if(!limit) limit = 10;

    try{
        let response = await doctorService.getTopDoctorHome(limit);
        return res.status(200).json({
           errCode : response.errCode,
           errMessage : response.errMessage,
           data : response.users
        })
    }
    catch(e){
        console.log(e);
        res.status(200).json({
            errCode : -1,
            errMessage : "Error from sever..."
        })
    }


}

let getAllDoctors = async (req,res) =>{
    try{
        let doctors = await doctorService.getAllDoctors();
  
        res.status(200).json({
            errCode : 0,
            errMessage : 'Done!',
            data : doctors.doctors
        })
    }

    catch(e){
        console.log(e);
        res.status(200).json({
            errCode : -1,
            errMessage: 'err from sever...',
        })
    }
}

module.exports = {
    getTopDoctorHome:getTopDoctorHome,
    getAllDoctors:getAllDoctors
}