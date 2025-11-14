import express from 'express'
import { addDoctor,loginAdmin,appointmentsAdmin, allDoctors,appointmentCancel,adminDashboard } from '../controllers/adminController.js'

import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';


const adminRouter = express.Router();

adminRouter.post('/addDoctor',authAdmin,addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.get('/allDoctors',authAdmin,allDoctors)
adminRouter.post('/changeAvailability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancelAppointment',authAdmin,appointmentCancel);
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter;