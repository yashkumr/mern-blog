import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { app } from '../firebase';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Oauth = () => {
    const navigate = useNavigate();

    
    const handleGoogleClick = async()=>{
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt:'select_account'})
        try{
            const resultFromGoogle = await signInWithPopup(auth, provider)
            // console.log(resultFromGoogle);
            const res = await axios.post("/api/v1/auth/google",{

                name:resultFromGoogle.user.displayName,
                email:resultFromGoogle.user.email,
                googlePhotoURL:resultFromGoogle.user.photoURL

            })
            console.log(res);
            if(res && res.data.success){
                toast.success(res && res.data.message);
                
                navigate("/");

            }

        }catch(error){
            console.log(error)
        }

    }

  return (
    <>
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick} >
        <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
        Continue with Google

    </Button>
    </>
  )
}

export default Oauth