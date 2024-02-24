import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import tssurl from "../../port";

const GoogleSignIn = ({ authMode }) => {
  const handleGoogleLoginSuccess = async (userData) => {
    try {
      const response = await axios.post(`${tssurl}/auth/Login`, userData);
      console.log("User data sent to backend successfully:", response.data);
      toast.success("Login Successful");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleLoginCallback = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const userData = {
        name: decoded.name,
        email: decoded.email,
      };
      console.log(userData);

      await handleGoogleLoginSuccess(userData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="text-center mt-2">
        <div style={{ display: "inline-block" }}>
          <GoogleOAuthProvider clientId="806387431963-2hgpkpm22ckq3hm8b4458m3eii06khdq.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLoginCallback}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </>
  );
};

export default GoogleSignIn;
