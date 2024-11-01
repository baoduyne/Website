"use strict";

var _express = _interopRequireDefault(require("express"));
var _homeController = _interopRequireDefault(require("../controller/homeController"));
var _userController = _interopRequireDefault(require("../controller/userController"));
var _doctorController = _interopRequireDefault(require("../controller/doctorController"));
var _patientController = _interopRequireDefault(require("../controller/patientController"));
var _specialtyController = _interopRequireDefault(require("../controller/specialtyController.js"));
var _clinicController = _interopRequireDefault(require("../controller/clinicController.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
var initwebRoutes = function initwebRoutes(app) {
  router.get("/", _homeController["default"].getHomePage);
  router.get("/about", _homeController["default"].getAboutPage);
  router.get('/crud', _homeController["default"].getCRUD);
  router.post('/post-crud', _homeController["default"].postCRUD);
  router.get('/get-crud', _homeController["default"].displayGetCRUD);
  router.get('/edit-crud', _homeController["default"].getEditCRUD);
  router.post('/put-crud', _homeController["default"].putCRUD);
  router.get('/delete-crud', _homeController["default"].deleteCRUD);
  router.post('/api/login', _userController["default"].handleLogin);
  router.get('/api/get-all-users', _userController["default"].handleGetAllUsers);
  router.post('/api/create-new-user', _userController["default"].handleCreateNewUser);
  router.put('/api/edit-user', _userController["default"].handleEditUser);
  router["delete"]('/api/delete-user', _userController["default"].handleDeleteUser);
  router.get('/api/allcode', _userController["default"].getAllCode);

  //doctor api
  router.get('/api/get-top-doctor-home', _doctorController["default"].getTopDoctorHome);
  router.get('/api/get-all-doctors', _doctorController["default"].getAllDoctors);
  router.post('/api/save-select-doctor', _doctorController["default"].saveSelectDoctor);
  router.get('/api/get-doctor-markdown', _doctorController["default"].getDoctorMarkdown);
  router.post('/api/save-doctor-schedules', _doctorController["default"].saveDoctorSchedules);
  router.get('/api/get-doctor-schedules', _doctorController["default"].getDoctorSchedules);
  router.get('/api/get-doctor-infors', _doctorController["default"].getDoctorInfors);
  router.get('/api/get-booking-infor-for-doctor', _doctorController["default"].getBookingInforForDoctor);

  //patient api
  router.post('/api/create-booking', _patientController["default"].createBooking);

  //patient token
  router.post('/api/verify', _patientController["default"].verifyAppoinment);

  //specialty api
  router.post('/api/create-specialty', _specialtyController["default"].createSpecialty);
  router.get('/api/get-all-specialty', _specialtyController["default"].getAllSpecialty);
  router.get('/api/get-detail-specialty', _specialtyController["default"].getDetailSpecialty);

  //clinic api

  router.post('/api/create-clinic', _clinicController["default"].createClinic);
  router.get('/api/get-all-clinic', _clinicController["default"].getAllClinic);
  router.get('/api/get-detail-clinic', _clinicController["default"].getDetailClinic);
  //history
  router.post('/api/send-bill-to-patient', _doctorController["default"].sendBillToPatient);
  return app.use("/", router);
};
module.exports = initwebRoutes;