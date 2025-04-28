import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateSpinnerProps {
  value: Date;
  onChangeDate: (formattedDate: string) => void;
  onClose: () => void;
}

export default function DateSpinner({ value, onChangeDate, onClose }: DateSpinnerProps) {
  const [date, setDate] = useState(value);

  const handleDone = () => {
    const formattedDate = date.toLocaleDateString('en-US');
    onChangeDate(formattedDate);
    onClose();
  };

  return (
    <View style={styles.datePickerWrapper}>
      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
      <DateTimePicker
        value={date}
        mode="date"
        display="spinner"
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            setDate(selectedDate);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  datePickerWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  doneButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    padding: 10,
  },
  doneButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
