
import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from './auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PlayScreen = () => {

  const navigation = useNavigation();
  const { accessToken, setAccessToken } = useAuth();
  const [userId, setUserId] = useState('');
  const [gameLevel, setGameLevel] = useState('');
  const [credits, setCredits] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState('');
  const [selectedNumberIndex, setSelectedNumberIndex] = useState(null);
  const refreshToken = accessToken;



  const handleCreateGame = async () => {
    try {
      // Retrieve userDetails from AsyncStorage
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedUserCredits = await AsyncStorage.getItem('userCredits');
      // Parse the stored JSON string to get the user details object
      const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
      const level = 2;
      // Check if userDetails exists and has _id property
      if (userDetails && userDetails._id) {
        const response = await axios.post(
          'https://lottery-backend-tau.vercel.app/api/v1/user/game/new-game',
          {
            userId: userDetails._id, // Use userId from userDetails
            gameLevel : level,
            credits : storedUserCredits,
            selectedNumbers,
          },
          {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`, // Use stored access token
              'Content-Type': 'application/json',
            },
          }
        );

        // Handle success
       console.log('Success',userDetails._id,level,storedUserCredits,selectedNumbers);
      } else {
        console.log('User details not found or missing _id property');
      }
    } catch (error) {
      // Handle error
      console.log('Error', 'Failed to create game. Please try again.');
      console.error('Error creating game:', error.message);
    }
  };

  const fetchAndConsoleUserId = async () => {
    try {
      // Retrieve userDetails from AsyncStorage
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedUserCredits = await AsyncStorage.getItem('userCredits');
      // Parse the stored JSON string to get the user details object
      const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
  
      // Check if userDetails exists and has _id property
      if (userDetails && userDetails._id) {
        // Log the _id from the user details
        console.log('User ID:', userDetails._id);
        console.log('Stored Access Token:', storedAccessToken);
        console.log('Stored User credits again:', storedUserCredits);

      } else {
        console.log('User details not found or missing _id property');
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };
  
  // Call fetchAndConsoleUserId to retrieve and console the user ID
  fetchAndConsoleUserId();


  
  
  
  
  const handleNumberSelect =  (number) => {
    // Convert the number into an array
    const numbersArray = Array.isArray(number) ? number : [number];
  
    // Parse the stored JSON string to get the user details object
   
    // Check if the number is already selected
    const isSelected = selectedNumbers.includes(number);
  
    // If the number is selected, update the selected number index to the current number
    if (isSelected) {
      setSelectedNumberIndex(number);
      console.log("Selected Number:", number);
    } else if (selectedNumbers.length < 6) {
      // If the number is not selected and there are less than 6 selected numbers, add all numbers to the array
      setSelectedNumbers((prevSelectedNumbers) => prevSelectedNumbers.concat(numbersArray));
      setSelectedNumberIndex(number); // Set selected number index for border color change
      console.log("Selected Numbers:", selectedNumbers.concat(numbersArray));
    } else {
      // If there are already 6 selected numbers, replace the first selected number with the new one
      const indexOfSelectedNumber = selectedNumbers.indexOf(selectedNumberIndex);
      const newSelectedNumbers = [...selectedNumbers];
      newSelectedNumbers[indexOfSelectedNumber] = number;
      setSelectedNumbers(newSelectedNumbers);
      setSelectedNumberIndex(number); // Set selected number index for border color change
      console.log("Selected Numbers:", newSelectedNumbers);
    }
  };


  const renderNumberButtons = () => {
    const numberButtons = [];
    for (let i = 1; i <= 60; i++) {
      const isSelected = selectedNumbers.includes(i);
      const isCurrentSelected = selectedNumberIndex !== null && selectedNumberIndex === i;

      numberButtons.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.numberButton,
            isSelected && styles.selectedNumberBoxSelected,
            isCurrentSelected && styles.selectedNumberBoxSelected,
          ]}
          onPress={() => handleNumberSelect(i)}
        >
          <Text>{i}</Text>
        </TouchableOpacity>
      );
    }
    return numberButtons;
  };


 

  const renderSelectedNumbers = () => {
    const selectedNumberViews = [];
    for (let i = 1; i <= 6; i++) {
      const selectedNumber = selectedNumbers[i - 1];

      selectedNumberViews.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.selectedNumberBox,
            selectedNumberIndex === selectedNumber && styles.selectedNumberBoxSelected,
          ]}
          onPress={() => handleNumberSelect(selectedNumber)}
        >
          {/* Display selected number or an empty box */}
          <Text style={styles.selectedNumber}>{selectedNumber}</Text>
        </TouchableOpacity>
      );
    }
    return selectedNumberViews;
  };
  
  
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Here You Go!</Text>
        <Text style={styles.subtitle}>Select 6 lucky numbers:</Text>
  
        <View style={styles.selectedNumbersContainer}>
          {renderSelectedNumbers()}
        </View>
  
        <View style={styles.numberButtonsContainer}>{renderNumberButtons()}</View>
  
        <TouchableOpacity  onPress={handleCreateGame} style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  selectedNumbersContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectedNumber: {
    marginRight: 10,
    fontSize: 18,
  },

  
  numberButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  numberButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    marginBottom:5,
    marginTop:3
  },
  
  doneButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedNumbersContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectedNumberBox: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedNumber: {
    fontSize: 18,
  },

  selectedNumberBoxSelected: {
    borderColor: 'blue', // You can customize the color of the border
    borderWidth: 2,      // You can customize the width of the border
  },
  

  
});
export default PlayScreen