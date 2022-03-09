import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import SignUpForm from './Signup';
import LogInForm from './Login';

export default function Auth(props) {
  const { setToastData, setShowToast } = props;

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw error;
      } else {
        setShowToast(true);
        setToastData({
          title: 'Success  ',
          description: 'You have successfully signed up!',
          status: 'success',
          duration: 3000,
          type: 'success',
          isClosable: true,
        });
      }
    } catch (error) {
      setShowToast(true);
      setToastData({
        title: 'Error',
        description: error.error_description || error.message,
        status: 'error',
        duration: 3000,
        type: 'error',
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

      if (error) {
        setShowToast(true);
        setToastData({
          title: 'Error',
          description: error.error_description || error.message,
          status: 'error',
          duration: 3000,
          type: 'error',

          isClosable: true,
        });
      } else {
        setShowToast(true);
        setToastData({
          title: 'Welcom Back',
          description: 'You have successfully logged in!',
          status: 'success',
          duration: 3000,
          type: 'success',

          isClosable: true,
        });
      }
    } catch (error) {
      alert(error.error_description || error.message);
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
        />
      )}
    </>
  );
}
