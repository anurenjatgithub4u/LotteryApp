import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileLandingScreen = () => {
    const navigation = useNavigation();
  

    const fetchAndConsoleStoredCredits = async () => {
      try {
        // Retrieve userCredits from AsyncStorage
        const storedUserCredits = await AsyncStorage.getItem('userCredits');
    
        // Log the stored user credits
        console.log('Stored User credits again:', storedUserCredits);
    
        // If needed, you can parse it back to a number
        const userCredits = storedUserCredits ? parseInt(storedUserCredits) : 0;
        console.log('Parsed User credits (as number):', userCredits);
      } catch (error) {
        console.error('Error fetching stored user credits:', error.message);
      }
    };

    const navigateToALS = async () => {
      navigation.navigate('ALScreen')
      fetchAndConsoleStoredCredits();
    };
  
    const handleViewPrevious = () => {
      // Navigate to the "Previous" screen or any other screen you want
      navigation.navigate('Previous');
    };
  
    return (
      <View style={styles.container}>
        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome, John Doe!</Text>
  
        {/* No Games Text */}
        <Text style={styles.noGamesText}>
          You have not played any games with us yet. Get started!
        </Text>
  
        
        <Button mode="contained" onPress={navigateToALS} style={{ width: '100%', marginVertical: 10 }}>
        Start Playing
      </Button>
  
        {/* View Previous Button */}
        
     
        <Button mode="contained" onPress={navigateToALS} style={{ width: '100%', marginVertical: 10 }}>
        View Previous
      </Button>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noGamesText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  startPlayingButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  viewPreviousButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileLandingScreen;
