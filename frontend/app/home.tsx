import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Juan's Tasks</Text>
          <Text style={styles.date}>Wednesday, 09 May</Text>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={16} color="#000" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
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

        {/* Create Task Button */}
        <TouchableOpacity style={styles.createTaskButton}>
          <Text style={styles.createTaskText}>Create a Task</Text>
        </TouchableOpacity>
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    position: 'absolute',
    right: 0,
    top: 0,
    borderColor: '#C7CACD',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFF',
  },
  logoutText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
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
    // marginTop: 0,
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