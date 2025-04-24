import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMessage = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/hello/');
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Failed to fetch message');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator /> : <Text>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
});