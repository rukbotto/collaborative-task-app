import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface PasswordInputProps {
  password: string;
  setPassword: (text: string) => void;
  onError: (error: string) => void;
}

export default function PasswordInput({ password, setPassword, onError }: PasswordInputProps) {
  const [error, setError] = useState('');
  const [hasMinChars, setHasMinChars] = useState(false);

  const validatePassword = (text: string) => {
    let error = '';
    if (!text) {
      error = 'Password is required';
    } else if (text.length < 8) {
      error = 'Password must be at least 8 characters long';
    }
    setError(error);
    onError(error);
  };

  useEffect(() => {
    // Validate on initial render or when password changes
    validatePassword(password);
  }, [password]);

  return (
    <View style={styles.input}>
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[styles.inputField, hasMinChars && error ? styles.inputError : null]}
        placeholder="Your password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setHasMinChars(text.length >= 1);
          validatePassword(text);
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
    borderColor: '#C7CACD',
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
  