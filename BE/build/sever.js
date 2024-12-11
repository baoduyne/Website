"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _web = _interopRequireDefault(require("./route/web"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
var _cors = _interopRequireDefault(require("./config/cors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import cors from 'cors';

require('dotenv').config();
var app = (0, _express["default"])();
// config cors

(0, _cors["default"])(app);

//config app
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}));

//View
(0, _viewEngine["default"])(app);

//Web routes
(0, _web["default"])(app);
(0, _connectDB["default"])();
var port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, function () {
  //callback
  console.log("Backend Nodejs is runing on the port : " + port);
});