// userRouter.js
import express from 'express';
import multer from 'multer';
import {
    registerUser,
    loginUser,
    getProfile,
    updateProfileData,
   
    bookAppointment,
    listAppointments,
    cancelAppointment
} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const upload = multer({ storage: multer.memoryStorage() });

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/getProfile', authUser, getProfile);
userRouter.put('/updateProfileData', authUser, updateProfileData);

userRouter.post('/bookAppointment', authUser, bookAppointment);
userRouter.get('/listAppointments', authUser, listAppointments);
userRouter.post('/cancelAppointment', authUser, cancelAppointment);

export default userRouter;
