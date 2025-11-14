import { createContext, useDebugValue, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
// import { useFetcher } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [userData,setUserData] = useState(false);
    const [doctors,setDoctorsData] = useState([]);
    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWZjODQ0ZmQ1NmFlNWUwYzhiZDFmZSIsImlhdCI6MTczMTE0NzU3Mn0.odpzoGq3oQccHrHj3F_11e202pAC6Jwbnuvg94sJmxY'
    // const token = ''
    
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/getProfile', { headers: { Authorization:"bearer "+ token } });
            if (data.success) {
                setUserData(data.userData)
                console.log(data);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };

    const getDoctorsData = async() => {
        try{
            const {data} = await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
                console.log(data);
                setDoctorsData(data.doctors);
            }
            else{
                toast.error(data.message)
            }
        }
        catch(err){
            toast.error(err.message);
            console.log(err); 
        }
    }

    const value = {
        backendUrl,
        token,setToken,
        userData,setUserData,loadUserProfileData,
        doctors,setDoctorsData,getDoctorsData
    }

    useEffect(() => {
        if(token){
            loadUserProfileData();
            // console.log(userData);
        }
        else{
            setUserData(false);
        }
    },[token])

    useEffect(() => {
        getDoctorsData()
    },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;