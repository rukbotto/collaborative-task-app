import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface LabeledTextInputProps {
  label: string;
  placeholder: string;
  value: string;
  required?: boolean;
  multiline?: boolean;
  setValue: (value: string) => void;
  onError: (error: string) => void;
}

export default function LabeledTextInput({ label, placeholder, value, required, multiline, setValue, onError }: LabeledTextInputProps) {
  const [error, setError] = useState('');

  const validateText = (text: string) => {
    let error = '';
    if (required && !text) {
      error = 'This field is required';
    }
    setError(error);
    onError(error);
  };

  useEffect(() => {
    // Validate on initial render or when text changes
    validateText(value);
  }, [value]);

  return (
    <View style={styles.input}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.inputField, error ? styles.inputError : null]}
        placeholder={placeholder}
        value={value}
        multiline={multiline}
        onChangeText={(text) => {
          setValue(text);
          validateText(text);
        }}
      />
      {error ? <Text style={styles.inputErrorMsg}>{error}</Text> : null}
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
