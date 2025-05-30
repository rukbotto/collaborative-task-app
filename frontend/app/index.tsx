import EmailInput from '@/components/EmailInput';
import PasswordInput from '@/components/PasswordInput';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router'; 
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  const validateFields = () => {
    let isValid = true;
    if (errors.email || errors.password) {
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.access && data.refresh) {
          // Store tokens securely
          await SecureStore.setItemAsync('accessToken', data.access);
          await SecureStore.setItemAsync('refreshToken', data.refresh);
          
          console.log('Login successful');
          router.push('/home');
        }
      } else if (data.error) {
        setServerError(data.error);
      } else {
        setServerError('An unexpected error occurred. Please try again');
      }
    } catch (error) {
      setServerError('Failed to connect to the server. Please try again later');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/icon.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>
        Your tasks collaboration starts with <Text style={styles.highlight}>Collaby</Text>.
      </Text>

      {serverError ? <Text style={styles.serverErrorMsg}>{serverError}</Text> : null}

      <EmailInput
        email={email}
        setEmail={setEmail}
        onError={(error) => setErrors((prevErrors) => ({ ...prevErrors, email: error }))}
      />

      <PasswordInput
        password={password}
        setPassword={setPassword}
        onError={(error) => setErrors((prevErrors) => ({ ...prevErrors, password: error }))}
      />
      
      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Create an account? <Text style={styles.signUp}>Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000000',
    lineHeight: 32,
  },
  highlight: {
    fontStyle: 'italic',
    fontWeight: 'normal',
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 15,
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000000',
  },
  signUp: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  serverErrorMsg: {
    color: '#F97272',
    fontSize: 14,
    marginBottom: 30,
    textAlign: 'center',
  },
});
