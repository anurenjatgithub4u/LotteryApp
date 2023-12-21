



// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';



// import React, { useState ,useEffect} from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useAuth } from './auth/AuthContext';
// import { useNavigation } from '@react-navigation/native';
// const PlayScreen = async () => {


  // const navigation = useNavigation();
  // const { accessToken, setAccessToken } = useAuth();
  // const [selectedNumbers, setSelectedNumbers] = useState([]);
  
  // const [selectedNumberIndex, setSelectedNumberIndex] = useState(null);
  // const refreshToken = accessToken;


  
 





//   // const handleNumberSelect = (number) => {
//   //   // Check if the number is already selected
//   //   const isSelected = selectedNumbers.includes(number);
  
//   //   // If the number is selected, update the selected number index to the current number
//   //   if (isSelected) {
//   //     setSelectedNumberIndex(number);
//   //     console.log("Selected Number:", number);
//   //   } else if (selectedNumbers.length < 6) {
//   //     // If the number is not selected and there are less than 6 selected numbers, add it to the array
//   //     setSelectedNumbers([...selectedNumbers, number]);
//   //     setSelectedNumberIndex(number); // Set selected number index for border color change
//   //     console.log("Selected Number:", number);
//   //   } else {
//   //     // If there are already 6 selected numbers, replace the first selected number with the new one
//   //     const indexOfSelectedNumber = selectedNumbers.indexOf(selectedNumberIndex);
//   //     const newSelectedNumbers = [...selectedNumbers];
//   //     newSelectedNumbers[indexOfSelectedNumber] = number;
//   //     setSelectedNumbers(newSelectedNumbers);
//   //     setSelectedNumberIndex(number); // Set selected number index for border color change
//   //     console.log("Selected Number:", number);
//   //   }
//   // };

  // const handleNumberSelect =  (number) => {
  //   // Convert the number into an array
  //   const numbersArray = Array.isArray(number) ? number : [number];
  
  //   // Parse the stored JSON string to get the user details object
   
  //   // Check if the number is already selected
  //   const isSelected = selectedNumbers.includes(number);
  
  //   // If the number is selected, update the selected number index to the current number
  //   if (isSelected) {
  //     setSelectedNumberIndex(number);
  //     console.log("Selected Number:", number);
  //   } else if (selectedNumbers.length < 6) {
  //     // If the number is not selected and there are less than 6 selected numbers, add all numbers to the array
  //     setSelectedNumbers((prevSelectedNumbers) => prevSelectedNumbers.concat(numbersArray));
  //     setSelectedNumberIndex(number); // Set selected number index for border color change
  //     console.log("Selected Numbers:", selectedNumbers.concat(numbersArray));
  //   } else {
  //     // If there are already 6 selected numbers, replace the first selected number with the new one
  //     const indexOfSelectedNumber = selectedNumbers.indexOf(selectedNumberIndex);
  //     const newSelectedNumbers = [...selectedNumbers];
  //     newSelectedNumbers[indexOfSelectedNumber] = number;
  //     setSelectedNumbers(newSelectedNumbers);
  //     setSelectedNumberIndex(number); // Set selected number index for border color change
  //     console.log("Selected Numbers:", newSelectedNumbers);
  //   }
  // };
  

//   //   // Check if the number is already selected
//   //   const isSelected = selectedNumbers.includes(number);
  
//   //   // If the number is selected, update the selected number index to the current number
//   //   if (isSelected) {
//   //     setSelectedNumberIndex(number);
//   //   } else if (selectedNumbers.length < 6) {
//   //     // If the number is not selected and there are less than 6 selected numbers, add it to the array
//   //     setSelectedNumbers([...selectedNumbers, number]);
//   //     setSelectedNumberIndex(number); // Set selected number index for border color change
//   //   } else {
//   //     // If there are already 6 selected numbers, replace the first selected number with the new one
//   //     const indexOfSelectedNumber = selectedNumbers.indexOf(selectedNumberIndex);
//   //     const newSelectedNumbers = [...selectedNumbers];
//   //     newSelectedNumbers[indexOfSelectedNumber] = number;
//   //     setSelectedNumbers(newSelectedNumbers);
//   //     setSelectedNumberIndex(number); // Set selected number index for border color change
//   //   }
  
//   //   // Log the entire array of selected numbers
//   //   console.log("Selected Numbers:", selectedNumbers);
//   // };
  

  // const renderNumberButtons = () => {
  //   const numberButtons = [];
  //   for (let i = 1; i <= 60; i++) {
  //     const isSelected = selectedNumbers.includes(i);
  //     const isCurrentSelected = selectedNumberIndex !== null && selectedNumberIndex === i;

  //     numberButtons.push(
  //       <TouchableOpacity
  //         key={i}
  //         style={[
  //           styles.numberButton,
  //           isSelected && styles.selectedNumberBoxSelected,
  //           isCurrentSelected && styles.selectedNumberBoxSelected,
  //         ]}
  //         onPress={() => handleNumberSelect(i)}
  //       >
  //         <Text>{i}</Text>
  //       </TouchableOpacity>
  //     );
  //   }
  //   return numberButtons;
  // };

  // const renderSelectedNumbers = () => {
  //   const selectedNumberViews = [];
  //   for (let i = 1; i <= 6; i++) {
  //     const selectedNumber = selectedNumbers[i - 1];

  //     selectedNumberViews.push(
  //       <TouchableOpacity
  //         key={i}
  //         style={[
  //           styles.selectedNumberBox,
  //           selectedNumberIndex === selectedNumber && styles.selectedNumberBoxSelected,
  //         ]}
  //         onPress={() => handleNumberSelect(selectedNumber)}
  //       >
  //         {/* Display selected number or an empty box */}
  //         <Text style={styles.selectedNumber}>{selectedNumber}</Text>
  //       </TouchableOpacity>
  //     );
  //   }
  //   return selectedNumberViews;
  // };

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>Here You Go!</Text>
  //     <Text style={styles.subtitle}>Select 6 lucky numbers:</Text>

  //     <View style={styles.selectedNumbersContainer}>
  //       {renderSelectedNumbers()}
  //     </View>

  //     <View style={styles.numberButtonsContainer}>{renderNumberButtons()}</View>

  //     <TouchableOpacity  onPress={""} style={styles.doneButton}>
  //       <Text style={styles.doneButtonText}>Done</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   selectedNumbersContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   selectedNumber: {
//     marginRight: 10,
//     fontSize: 18,
//   },

  
//   numberButtonsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   numberButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 8,
//     marginRight: 8,
//     marginBottom:5,
//     marginTop:3
//   },
  
//   doneButton: {
//     backgroundColor: 'green',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   doneButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   selectedNumbersContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   selectedNumberBox: {
//     width: 40,
//     height: 40,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 5,
//   },
//   selectedNumber: {
//     fontSize: 18,
//   },

//   selectedNumberBoxSelected: {
//     borderColor: 'blue', // You can customize the color of the border
//     borderWidth: 2,      // You can customize the width of the border
//   },
  

  
// });

// export default PlayScreen;



import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Dimensions } from 'react-native';
import { useAuth } from './auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import axios from 'axios';

const PlayScreen = () => {

  const navigation = useNavigation();
  const { accessToken, setAccessToken } = useAuth();
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedNumberIndex, setSelectedNumberIndex] = useState(null);
  const refreshToken = accessToken;
  useEffect(() => {
    console.log('Selected Numbers three', selectedNumbers);
  }, [selectedNumbers]);
 

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
      console.log("Selected Numbers Two:", newSelectedNumbers);
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
  const createGame = async (gameLevel, credits) => {
    const storedUserDetails = await AsyncStorage.getItem('userDetails');
    const userId = await AsyncStorage.getItem('userId');
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    const storedUserCredits = await AsyncStorage.getItem('userCredits');
    const userCredits = storedUserCredits ? parseInt(storedUserCredits) : 0;
  
    // Parse the stored JSON string to get the user details object
    const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
    const level = 1;
    const userNewCredits = 0;
    const gameNumber = selectedNumbers;
  
    try {
      const response = await fetch(
        'https://lottery-backend-tau.vercel.app/api/v1/user/game/new-game',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedAccessToken}`,
          },
          body: JSON.stringify({
            userId,
            gameLevel: level,
            credits: userCredits,
            selectedNumbers:gameNumber,
          }),
        }
      );
  
      const responseData = await response.json();

  
      if (response.ok) {
        console.log('Game added successfully:', responseData);
        console.log("checking selected numbers" , selectedNumbers)
        // Do something with the success response if needed
        navigation.navigate('PlayedGame', { gameNumber });
        return responseData;
      } else {
        console.error('Error while creating game:', responseData.error || 'Something went wrong');
        // Throw an error to handle it in the calling code
        throw new Error(responseData.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error during createGame:', error);
      // Throw the error to handle it in the calling code
      throw error;
    }
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
  
        <TouchableOpacity  onPress={createGame} style={styles.doneButton}>
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
    paddingHorizontal: SCREEN_WIDTH * 0.05, // Use a percentage of the screen width
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.06, // Adjust font size based on screen width
    fontWeight: 'bold',
    marginBottom: SCREEN_WIDTH * 0.02,
  },
  subtitle: {
    fontSize: SCREEN_WIDTH * 0.04,
    marginBottom: SCREEN_WIDTH * 0.05,
  },
  selectedNumbersContainer: {
    flexDirection: 'row',
    marginBottom: SCREEN_WIDTH * 0.05,
  },
  selectedNumberBox: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1,
    borderRadius: SCREEN_WIDTH * 0.02,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    margin: SCREEN_WIDTH * 0.01,
  },
  selectedNumber: {
    fontSize: SCREEN_WIDTH * 0.04,
  },
  numberButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: SCREEN_WIDTH * 0.05,
    maxWidth: SCREEN_WIDTH * 0.8, // Maximum width to ensure 6 columns
  },
  
  numberButton: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1,
    borderRadius: SCREEN_WIDTH * 0.1 * 0.5, // Make it a perfect circle
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    margin: SCREEN_WIDTH * 0.01,
  },
  
  doneButton: {
    backgroundColor: 'green',
    paddingVertical: SCREEN_WIDTH * 0.015,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: SCREEN_WIDTH * 0.01,
    marginBottom:2
  },
  doneButtonText: {
    color: '#fff',
    fontSize: SCREEN_WIDTH * 0.04,
  },
  selectedNumberBoxSelected: {
    borderColor: 'blue',
    borderWidth: 2,
  },
});
export default PlayScreen

