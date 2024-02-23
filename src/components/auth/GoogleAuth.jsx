import { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';

const GoogleAuth = ({ authMode }) => {
  useEffect(() => {
    const loadGoogleSignInScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => initializeGoogleSignIn();
      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      window.onSignInSuccess = (response) => {
        const idToken = response.getAuthResponse().id_token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
      };

      window.onSignInFailure = (error) =>
        console.error('Error signing in:', error);

      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: {
          on_success: window.onSignInSuccess,
          on_failure: window.onSignInFailure,
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        { theme: 'outline', size: 'large' }
      );
    };

    loadGoogleSignInScript();
  }, []);

  const handleGoogleLoginSuccess = (response) => {
    const token = response.tokenId;
    axios
      .post('http://localhost:5200/client/google-login', { token })
      .then((response) => response.data)
      .then((data) => console.log('Backend response:', data))
      .catch((error) => console.error('Error:', error));
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failure:', error);
  };

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId:
          '156987578910-u2mg62hrg7dk6d2deunerts475sr59mb.apps.googleusercontent.com',
        scope: 'email',
      });
    });
  }, []);
  return (
    <>
      <div className="text-center mt-2">
        <GoogleLogin
          clientId="156987578910-u2mg62hrg7dk6d2deunerts475sr59mb.apps.googleusercontent.com"
          buttonText={
            authMode === 'signin' ? 'Login with Google' : 'Sign Up with Google'
          }
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </>
  );
};

export default GoogleAuth;
