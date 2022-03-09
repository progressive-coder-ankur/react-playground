import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import SignUpForm from './Signup';
import LogInForm from './Login';

export default function Auth(props) {
  const { setData } = props;

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    signedIn && getUser();
  }, [signedIn]);

  const getUser = async () => {
    try {
      setLoading(false);

      const { user, error } = await supabase.auth.api.getUser(
        'ACCESS_TOKEN_JWT'
      );

      if (error) {
        throw error;
      }

      if (data) {
        console.log(data);
        setUserData(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const ListenSignInEvent = () => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN') setSignedIn(true);
    });
  };

  const handleSignup = async (email, password) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setData({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {
      setData({
        title: 'Account creation Error.',
        description: `Something went wrong. Please try again. ${
          error.error_description || error.message
        }`,
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });

      if (error) throw error;
      setData({
        title: 'Successfully logged in.',
        description: `Welcome Back  ${userData}!`,
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {
      setData({
        title: 'Error loging in.',
        description: `Oops. Please try again. ${
          error.error_description || error.message
        }`,
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithMaginLink = async email => {
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.signIn({
        email: email,
      });

      if (error) throw error;
      setData({
        title: 'Successfully logged in.',
        description: 'Please check you email address for your login link.',
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {
      setData({
        title: 'Error loging in.',
        description: `Oops. Please try again. ${
          error.error_description || error.message
        }`,
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuthGithub = async () => {
    const { user, session, error } = await supabase.auth.signUp({
      provider: 'github',
    });
  };

  return (
    <>
      {showSignUp ? (
        <SignUpForm
          email={email}
          setEmail={setEmail}
          setPassword={setPassword}
          password={password}
          handleSignup={handleSignup}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          setShowSignUp={setShowSignUp}
          loading={loading}
        />
      ) : (
        <LogInForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
          setShowSignUp={setShowSignUp}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loading={loading}
          handleLoginWithMaginLink={handleLoginWithMaginLink}
        />
      )}
    </>
  );
}
