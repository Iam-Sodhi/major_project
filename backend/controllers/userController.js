import userModel from "../models/userModel.js";
import doctorModel from '../models/doctorModel.js'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary' 
import appointmentModel from "../models/appointmentModel.js";
import FormData from 'form-data';
import axios from "axios";

import razorpay from 'razorpay'

//api to register user
const registerUser = async(req,res) => {
    try{
        const {name,email,password} = req.body;

        if(!email || !password || !name){
            return res.json({success:false,message:'missing data'});
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Invalid email'});
        }

        if(password.length < 8){
            return res.json({success:false,message:'enter a strong password'});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        
        const userData = {
            name,
            email,
            password:hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.json({success:true,token});
    }
    catch(err){
        console.log(err);   
        res.json({success:false,message:err}); 
    }
}

const loginUser = async(req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.json({success:false,message:'missing data'});
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:'user does not exist'});
        }
        
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:'enter correct password'});
        }
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.json({success:true,token});
    }
    catch(err){
        console.log(err);   
        res.json({success:false,message:err});
    }
}

const getProfile = async(req,res) => {
    try{
        console.log(req.body);
        const {userId} = req.body

        const userData = await userModel.findById(userId).select('-password');
        console.log(userData);
        
        res.json({success:true,userData});
    }
    catch(err){
        console.log(err);   
        res.json({success:false,message:err});
    }
}

const updateProfileData = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender ,image } = req.body;
        console.log(req.body);
        if (!name || !phone || !address || !dob || !gender) {
            
            
            return res.json({ success: false, message: 'missing data' });
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address,
            dob,
            gender,
            image
        });
        // await userModel.findByIdAndUpdate(userId, {
        //     name,
        //     phone,
        //     address: JSON.parse(address),
        //     dob,
        //     gender,
        //     image
        // });

        res.json({ success: true, message: "Profile data updated" });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
};



const bookAppointment = async(req,res) => {
    try{
        const {userId,docId,slotDate,slotTime} = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        if(!slotTime){
            return res.json({success:false,message:"select time"})
        }

        if(!slotDate){
            return res.json({success:false,message:"select date"})
        }
        
        if(!docData.available){
            return res.json({success:false,message:"Doctor not available"})
        }

        let slots_booked = docData.slots_booked
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes[slotTime]){
                return res.json({success:false,message:"slot not available"});
            }
            else{
                slots_booked[slotDate].push(slotTime);
            }
        }
        else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked;

        const appointment = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        }

        const newAppointment = new appointmentModel(appointment);
        newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:"appointment is booked"})
    }
    catch(err){
        console.log(err);   
        res.json({success:false,message:err});
    }
}

const listAppointments = async(req,res) => {
    try{
        const {userId} = req.body

        const appointments = await appointmentModel.find({userId})

        res.json({success:true,appointments});
    }
    catch(err){
        console.log(err);   
        res.json({success:false,message:err});
    }
}

const cancelAppointment = async(req,res) => {
    try{
        const {userId,appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        console.log(appointmentData);
        
        if(appointmentData.userId !== userId){
            return res.json({success:false,message:"unauthorized action"});
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});

        const {docId,slotDate,slotTime} = appointmentData;
        
        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.json({success:true,message:"Appointment cancelled"})
    }
    catch(err){
        console.log(err);   
        res.json({success:false,message:err});
    }
}

// const razorpayInstance = new razorpay({
//     key_id : '',
//     key_secret: ''
// })

const paymentRazorpay = async(req,res) => {
    try{

    }
    catch(err){
        console.log(err);   
        res.json({success:false,message:err});
    }
}

export {registerUser,loginUser,getProfile,updateProfileData,bookAppointment,listAppointments,cancelAppointment}