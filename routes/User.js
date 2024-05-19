const express = require("express")
const auth=require("./../controllers/authControler")
// const user=require("./../controllers/userControler")
const route = express.Router();
// const multer=require("multer")
// const upload =multer({dest:"public/img/users"})
route.route('/signup').post(auth.signUp);
route.route('/login').post(auth.logIn)
route.route('/logout').get(auth.logOut)
route.route('/forgetpassword').post(auth.forgetPassword)
route.route('/resetpassword/:token').patch(auth.resetPassword)
route.route('/changepassword').patch(auth.changePassword)
route.use(auth.checkLog)

module.exports = route
