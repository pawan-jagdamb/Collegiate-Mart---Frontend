import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from "@firebase/auth"
import {app} from "../GoogleFirebase"
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { setUser } from '../redux/user/profileSlice';
import { endpoints } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
export default function GoogleOAuth() {

    const dispatch= useDispatch();
    const navigate=useNavigate();

    const handleGoogleAuth=async()=>{
      
        try {
            const {GOOGLE_AUTH}=  endpoints;
            const provider= new GoogleAuthProvider();
            const auth = getAuth(app);

            const result= await signInWithPopup(auth,provider);
            const userData={
              name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            }
            
           
            
             const res= await apiConnector(
                "POST",
                GOOGLE_AUTH,
                userData,
                 {
                "Content-Type": "application/json"
                    }

             );
            //  console.log(res);
            
            const data= res.data;
            console.log("data-> ",data);
            dispatch(signInSuccess(data.user));
           
            // dispatch(response.data.token);
            dispatch(setUser(data));
            dispatch(setAuthUser(data))
            toast.success(data.message);

            console.log(result);
            navigate('/');
            

            
        } catch (error) {
            console.log("Error in Singing in with google")
            toast.error("Failed")
            console.log(Error);
            

            
        }
    }
  return (
    <button onClick={handleGoogleAuth} type='button' className="flex rounded-md items-center justify-center border border-richblack-700 font-medium text-richblack-100 px-[12px] py-[8px] gap-x-2 ">  <FcGoogle />
          <p>Continue with Google</p></button>
  )
}
