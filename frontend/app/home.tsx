import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Animated, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LogoutButton from '@/components/LogoutButton';
import CreateTaskModal from '@/components/CreateTaskModal';
import TaskCard from '@/components/TaskCard';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router'; 
import { Task, TaskResult } from '../utils/types';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Fetch tasks from the backend
    const fetchTasks = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync('accessToken');

        const response = await fetch(
          'http://localhost:8000/api/tasks/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          const results = data.results as TaskResult[];
          console.log('Fetched tasks:', results);
          const tasks = results.map((result) => ({
            id: result.id,
            title: result.title,
            description: result.description,
            startDate: new Date(result.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            endDate: new Date(result.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            isCompleted: result.completed,
          }));
          setTasks(tasks);
        } else if (response.status === 401) {
          console.error('Unauthorized. Please log in again.');
          // Handle unauthorized access (e.g., redirect to login)
          setTasks([]);
          router.replace('/');
        } else {
          console.error(`Error fetching tasks: ${JSON.stringify(data)}`);
          setTasks([]);
        }
      } catch (error) {
        console.error(`Error fetching tasks: ${error}`);
      }
    };

    fetchTasks();
  }, []);

  const toggleTaskCompletion = async (taskId: number) => {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      const isTaskCompleted = !tasks.find((task) => task.id === taskId)?.isCompleted;

      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ completed: isTaskCompleted }),
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
          )
        );
      } else if (response.status === 401) {
        console.error('Unauthorized. Please log in again.');
        // Handle unauthorized access (e.g., redirect to login)
        setTasks([]);
        router.replace('/');
      } else {
        console.error(`Failed to update task: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error updating task: ${error}`);
    }
  };

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

        <View style={styles.listContainer}>
          {tasks.length > 0 ? (
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TaskCard
                  title={item.title.length > 38 ? `${item.title.slice(0, 38)}...` : item.title}
                  description={item.description.length > 38 ? `${item.description.slice(0, 38)}...` : item.description}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  completed={item.isCompleted}
                  onToggleComplete={() => toggleTaskCompletion(item.id)}
                />
              )}
              contentContainerStyle={styles.list}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="list-outline" size={128} color="#C7CACD" />
              <Text style={styles.emptyText}>
              Just Press <Text style={styles.boldText}>“Create a Task”</Text> and start collaborating.
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.createTaskButton} onPress={openModal}>
          <Text style={styles.createTaskText}>Create a Task</Text>
        </TouchableOpacity>

        <CreateTaskModal slideAnim={slideAnim} isModalVisible={isModalVisible} setTasks={setTasks} onClose={closeModal} />
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
  listContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingVertical: 15,
  },
  list: {
    paddingBottom: 15,
  },
});
