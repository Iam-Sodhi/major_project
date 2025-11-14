import express from 'express'
import { addDoctor,loginAdmin,appointmentsAdmin, allDoctors,appointmentCancel,adminDashboard } from '../controllers/adminController.js'

import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';
import multer from 'multer';

const adminRouter = express.Router();
// Configure multer
const storage = multer.diskStorage({});
const upload = multer({ storage });


adminRouter.post('/addDoctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.get('/allDoctors',authAdmin,allDoctors)
adminRouter.post('/changeAvailability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancelAppointment',authAdmin,appointmentCancel);
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter;