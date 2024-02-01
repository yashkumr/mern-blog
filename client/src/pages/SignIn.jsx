import React, { useState } from 'react'
import { Button, Label,TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/Auth.jsx';
import Oauth from '../components/Oauth.jsx';

const SignIn = () => {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit =async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("/api/v1/auth/signin",{
        email,
        password,
      });
      if(res && res.data.success){
        toast.success(res && res.data.message);

        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");

      }else{
        toast.error(res.data.message);
      }

    }catch(error){
             console.log(error);
             toast.error("Something went wrong in login ");
    }
  }

  return (
    <>
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Vimlesh's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and
            password or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
           
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="Username"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Username"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit">
              Sign in

            </Button>
            <Oauth/>
           
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account ?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default SignIn