import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import doctorController from '../controller/doctorController';
import patientController from '../controller/patientController';
import specialtyController from '../controller/specialtyController.js';
import clinicController from '../controller/clinicController.js';
import handbookController from '../controller/handbookController.js'
let router = express.Router();

let initwebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);

    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);

    //doctor api
    router.get('/api/get-top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-select-doctor', doctorController.saveSelectDoctor);
    router.get('/api/get-doctor-markdown', doctorController.getDoctorMarkdown);
    router.post('/api/save-doctor-schedules', doctorController.saveDoctorSchedules);
    router.get('/api/get-doctor-schedules', doctorController.getDoctorSchedules);
    router.get('/api/get-doctor-infors', doctorController.getDoctorInfors);
    router.get('/api/get-booking-infor-for-doctor', doctorController.getBookingInforForDoctor)

    //patient api
    router.post('/api/create-booking', patientController.createBooking);

    //patient token
    router.post('/api/verify', patientController.verifyAppoinment);

    //specialty api
    router.post('/api/create-specialty', specialtyController.createSpecialty);
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty', specialtyController.getDetailSpecialty);

    //clinic api

    router.post('/api/create-clinic', clinicController.createClinic);
    router.get('/api/get-all-clinic', clinicController.getAllClinic);
    router.get('/api/get-detail-clinic', clinicController.getDetailClinic);
    //history
    router.post('/api/send-bill-to-patient', doctorController.sendBillToPatient);

    //handbook
    router.post('/api/create-handbook', handbookController.createHandbook);
    router.get('/api/get-data-handbook', handbookController.getDataHandbook)
    return app.use("/", router);
}


module.exports = initwebRoutes;