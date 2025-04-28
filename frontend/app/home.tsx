import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LogoutButton from '@/components/LogoutButton';
import CreateTaskModal from '@/components/CreateTaskModal';

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  // Initial position off-screen
  const slideAnim = useRef(new Animated.Value(500)).current;

  const openModal = () => {
    setModalVisible(true);

    // Slide to the top
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    // Slide back down
    Animated.timing(slideAnim, {
      toValue: 500,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Juan's Tasks</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', day: '2-digit', month: 'long' })}
          </Text>
          <LogoutButton />
        </View>

        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search by Title or Name" />
          <View style={styles.dateFilters}>
            <TextInput style={styles.dateInput} placeholder="Start date" />
            <TextInput style={styles.dateInput} placeholder="End date" />
          </View>
        </View>

        <View style={styles.tabs}>
          <Text style={[styles.tab, styles.activeTab]}>All tasks</Text>
          <Text style={styles.tabSeparator}>|</Text>
          <Text style={styles.tab}>Completed tasks</Text>
        </View>

        <View style={styles.emptyState}>
          <Ionicons name="list-outline" size={128} color="#C7CACD" />
          <Text style={styles.emptyText}>
            Just Press <Text style={styles.boldText}>“Create a Task”</Text> and start collaborating.
          </Text>
        </View>

        <TouchableOpacity style={styles.createTaskButton} onPress={openModal}>
          <Text style={styles.createTaskText}>Create a Task</Text>
        </TouchableOpacity>

        <CreateTaskModal slideAnim={slideAnim} isModalVisible={isModalVisible} onClose={closeModal} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  date: {
    fontSize: 14,
    color: '#ACACAC',
    marginVertical: 5,
  },
  searchContainer: {
    marginBottom: 30,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#C7CACD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 8,
    backgroundColor: '#FFF',
  },
  dateFilters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    backgroundColor: '#FFF',
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#C7CACD',
    borderRadius: 8,
    padding: 15,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    marginHorizontal: 30,
  },
  tab: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C7CACD',
  },
  activeTab: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  tabSeparator: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C7CACD',
    alignSelf: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#C7CACD',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#C7CACD',
  },
  createTaskButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  createTaskText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
