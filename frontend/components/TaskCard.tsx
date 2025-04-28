import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TaskCardProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  onToggleComplete: () => void;
}

export default function TaskCard({ title, description, startDate, endDate, completed, onToggleComplete }: TaskCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.dates}>
          {startDate} — {endDate}
        </Text>
      </View>
      <TouchableOpacity onPress={onToggleComplete} style={styles.checkbox}>
        {completed ? (
          <Ionicons name="checkmark-circle" size={24} color="#007BFF" />
        ) : (
          <Ionicons name="ellipse-outline" size={24} color="#C7CACD" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#C7CACD',
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#C7CBCE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#4A4F52',
    marginBottom: 15,
  },
  dates: {
    fontSize: 12,
    padding: 10,
    color: '#4A4F52',
    backgroundColor: '#F1F1F1',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  checkbox: {
    padding: 5,
  },
});
