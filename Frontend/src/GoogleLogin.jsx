import { useGoogleLogin } from '@react-oauth/google'
import React, { useContext } from 'react'
import { googleAuth } from './api'
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { ContextAPI } from './Context';
const GoogleLogin = () => {
    const navigate = useNavigate();
  const {setIsNgoAuthenticated,setLoading}  = useContext(ContextAPI)
    const responseGoogle = async (authResult) => {
      setLoading(true);
        try {
            if (authResult.code) {
              console.log("here inside the authResult code")
                const result = await googleAuth(authResult.code);
                console.log("User from backend:", result.data.user);
                const token = result.data.token;
              console.log(token);
                const { email, name, image } = result.data.user;
                  const obj = {email,name,image,token};
                  localStorage.setItem("user-info",JSON.stringify(obj));
                  localStorage.removeItem("ngo-info");
                  setIsNgoAuthenticated(false);
                  setLoading(false);
                  navigate("/volunteer")
                // You can save in state or context
            } else {
                console.log("Auth result missing code:", authResult);
            }
        } catch (error) {
            console.log('Error is:', error);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
    });

    return (
        <div className="flex justify-center items-center mb-6">
              <button
                type="button"
                onClick={googleLogin}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-white text-black font-medium hover:shadow-md transition"
              >
                <FcGoogle size={22} />
                <span>
                  Sign in with Google
                </span>
              </button>
            </div>
    );
};

export default GoogleLogin;
