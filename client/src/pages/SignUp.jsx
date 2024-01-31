import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";



import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/signup", {
        name,
        email,
        password,
      });
      // console.log(res.data);
      if (res && res.data.success) {
        toast.success(res && res.data.message);
        navigate("/sign-in");
      }
    } catch (error) {
      toast.error(res.data.message)
    }
  };

  return (
    <>
      <div className="min-h-screen mt-17">
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
                <Label value="Your Name" />
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                Sign Up

              </Button>
             
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account ?</span>
              <Link to="/sign-in" className="text-blue-500">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
