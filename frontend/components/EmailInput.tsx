import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface EmailInputProps {
  email: string;
  setEmail: (text: string) => void;
  onError: (error: string) => void;
}

export default function EmailInput({ email, setEmail, onError }: EmailInputProps) {
  const [error, setError] = useState('');
  const [hasMinChars, setHasMinChars] = useState(false);

  const validateEmail = (text: string) => {
    let error = '';
    if (!text) {
      error = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(text)) {
      error = 'Enter a valid email address';
    }
    setError(error);
    onError(error);
  };

  useEffect(() => {
    // Validate on initial render or when email changes
    validateEmail(email);
  }, [email]);

  return (
    <View style={styles.input}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.inputField, hasMinChars && error ? styles.inputError : null]}
        placeholder="Your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setHasMinChars(text.length >= 3);
          validateEmail(text);
        }}
      />
      {hasMinChars && error ? <Text style={styles.inputErrorMsg}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 15,
    marginBottom: 8,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#F97272',
  },
  inputErrorMsg: {
    color: '#F97272',
    fontSize: 14,
  },
});