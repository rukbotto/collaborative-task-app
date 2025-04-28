import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';

interface DatePickerInputProps {
  label: string;
  placeholder: string;
  value: string;
  required?: boolean;
  onPress: () => void;
  onError: (error: string) => void;
}

export default function LabeledDatePickerInput({ label, placeholder, value, required, onPress, onError }: DatePickerInputProps) {
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
    <View style={styles.datePicker}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={onPress}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder={placeholder}
          value={value}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      {error ? <Text style={styles.inputErrorMsg}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C7CACD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 9,
    backgroundColor: '#FFF',
  },
  inputError: {
    borderColor: '#F97272',
  },
  inputErrorMsg: {
    color: '#F97272',
    fontSize: 14,
  },
});
