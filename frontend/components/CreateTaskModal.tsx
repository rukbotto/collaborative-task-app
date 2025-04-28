import React, { useState } from 'react';
import { Modal, Animated } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LabeledTextInput from '@/components/LabeledTextInput';
import LabeledDatePickerInput from '@/components/LabeledDatePickerInput';
import DateSpinner from '@/components/DateSpinner';
import { parse } from 'date-fns';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router'; 
import { Task } from '@/utils/types';

interface CreateTaskModalProps {
  slideAnim: Animated.Value;
  isModalVisible: boolean;
  setTasks: (tasks: Task[] | ((prevTasks: Task[]) => Task[])) => void;
  onClose: () => void;
}

export default function CreateTaskModal({ slideAnim, isModalVisible, setTasks, onClose }: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState({ title: '', description: '', startDate: '', endDate: '' });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState<'start' | 'end' | null>(null);

  const router = useRouter();

  const validateFields = () => {
    let isValid = true;
    if (errors.title || errors.description || errors.startDate || errors.endDate) {
      isValid = false;
    }
    return isValid;
  };

  const resetState = () => {
    setTitle('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setErrors({ title: '', description: '', startDate: '', endDate: '' });
    setShowDatePicker(false);
    setSelectedDateField(null);
  }

  const handleCreateTask = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      
      const requestData = {
        title,
        description,
        start_date: startDate,
        end_date: endDate,
      };
  
      const response = await fetch('http://localhost:8000/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Task created successfully
        const task: Task = {
          id: data.id,
          title: data.title,
          description: data.description,
          startDate: new Date(data.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          endDate: new Date(data.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          isCompleted: false,
        }
        setTasks((prevTasks) => [task, ...prevTasks]);
        onClose();
      } else if (response.status === 401) {
        console.error('Unauthorized. Please log in again.');
        // Handle unauthorized access (e.g., redirect to login)
        resetState();
        router.replace('/');
      } else {
        console.error(`Error creating task: ${JSON.stringify(data)}`);
        alert('Failed to create task. Please try again.');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    } finally {
      resetState();
    }
  };

  return (
    <Modal transparent visible={isModalVisible} animationType="none">
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add new Task</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <LabeledTextInput
            label='Title'
            placeholder='Title for your task'
            value={title}
            required
            setValue={setTitle}
            onError={(error) => setErrors((prevErrors) => ({ ...prevErrors, title: error }))}
          />
          <LabeledTextInput
            label='Description'
            placeholder='Enter a description for your task'
            value={description}
            multiline
            setValue={setDescription}
            onError={(error) => setErrors((prevErrors) => ({ ...prevErrors, description: error }))}
          />
          <LabeledDatePickerInput
            label="Start date"
            placeholder="Start date (MM/DD/YYYY)"
            value={startDate}
            required
            onPress={() => {
              setSelectedDateField('start');
              setShowDatePicker(true);
            }}
            onError={(error) => setErrors((prevErrors) => ({ ...prevErrors, startDate: error }))}
          />
          <LabeledDatePickerInput
            label="End date"
            placeholder="End date (MM/DD/YYYY)"
            value={endDate}
            onPress={() => {
              setSelectedDateField('end');
              setShowDatePicker(true);
            }}
            onError={(error) => setErrors((prevErrors) => ({ ...prevErrors, endDate: error }))}
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleCreateTask}>
            <Text style={styles.modalButtonText}>Create Task</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateSpinner
              value={
                selectedDateField === 'start' && startDate
                  ? parse(startDate, 'MM/dd/yyyy', new Date())
                  : selectedDateField === 'end' && endDate
                    ? parse(endDate, 'MM/dd/yyyy', new Date())
                    : new Date()
              }
              onChangeDate={(formattedDate) => {
                if (selectedDateField === 'start') {
                  setStartDate(formattedDate);
                } else if (selectedDateField === 'end') {
                  setEndDate(formattedDate);
                }
              }}
              onClose={() => setShowDatePicker(false)}
            />
          )}
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#C7CACD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 9,
    backgroundColor: '#FFF',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
