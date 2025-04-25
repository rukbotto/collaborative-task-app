import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      const response = await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      
      if (response.ok) {
        console.log('Logout successful');
      } else {
        console.log('Logout failed');
      }

      // Remove tokens from Secure Store
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
    } catch (error) {
      console.error('An error occurred during logout:', error);
    } finally {
      router.replace('/');
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Ionicons name="log-out-outline" size={16} color="#000" />
      <Text style={styles.logoutText}>Log out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
