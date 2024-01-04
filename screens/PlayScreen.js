


// import React, { useState ,useEffect} from 'react';
// import { View, Text, TouchableOpacity, StyleSheet ,Dimensions } from 'react-native';
// import { useAuth } from './auth/AuthContext';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const { width, height } = Dimensions.get('window');
// const SCREEN_WIDTH = width < height ? width : height;
// import axios from 'axios';
// import { MaterialIcons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { EvilIcons } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';


// const PlayScreen = () => {

//   const navigation = useNavigation();
//   const { accessToken, setAccessToken } = useAuth();
//   const [selectedNumbers, setSelectedNumbers] = useState([]);
//   const [selectedNumberIndex, setSelectedNumberIndex] = useState(null);
//   const refreshToken = accessToken;
//   useEffect(() => {
//     console.log('Selected Numbers three', selectedNumbers);
//   }, [selectedNumbers]);
 

//   const handleNumberSelect =  (number) => {
//     // Convert the number into an array
//     const numbersArray = Array.isArray(number) ? number : [number];
  
//     // Parse the stored JSON string to get the user details object
   
//     // Check if the number is already selected
//     const isSelected = selectedNumbers.includes(number);
  
//     // If the number is selected, update the selected number index to the current number
//     if (isSelected) {
//       setSelectedNumberIndex(number);
//       console.log("Selected Number:", number);
//     } else if (selectedNumbers.length < 6) {
//       // If the number is not selected and there are less than 6 selected numbers, add all numbers to the array
//       setSelectedNumbers((prevSelectedNumbers) => prevSelectedNumbers.concat(numbersArray));
//       setSelectedNumberIndex(number); // Set selected number index for border color change
//       console.log("Selected Numbers:", selectedNumbers.concat(numbersArray));
//     } else {
//       // If there are already 6 selected numbers, replace the first selected number with the new one
//       const indexOfSelectedNumber = selectedNumbers.indexOf(selectedNumberIndex);
//       const newSelectedNumbers = [...selectedNumbers];
//       newSelectedNumbers[indexOfSelectedNumber] = number;
//       setSelectedNumbers(newSelectedNumbers);
//       setSelectedNumberIndex(number); // Set selected number index for border color change
//       console.log("Selected Numbers Two:", newSelectedNumbers);
//     }
//   };


//   const renderNumberButtons = () => {
//     const numberButtons = [];
//     for (let i = 1; i <= 60; i++) {
//       const isSelected = selectedNumbers.includes(i);
//       const isCurrentSelected = selectedNumberIndex !== null && selectedNumberIndex === i;

//       numberButtons.push(
//         <TouchableOpacity
//           key={i}
//           style={[
//             styles.numberButton,
//             isSelected && styles.selectedNumberBoxSelected,
//             isCurrentSelected && styles.selectedNumberBoxSelected,
//           ]}
//           onPress={() => handleNumberSelect(i)}
//         >
//           <Text  style={{color:'white'}}>{i}</Text>
//         </TouchableOpacity>
//       );
//     }
//     return numberButtons;
//   };



//   const createGame = async () => {
//     const storedUserDetails = await AsyncStorage.getItem('userDetails');
//     const userId = await AsyncStorage.getItem('userId');
//     const storedAccessToken = await AsyncStorage.getItem('accessToken');
//     const storedUserCredits = await AsyncStorage.getItem('userCredits');
//     const userCredits = storedUserCredits ? parseInt(storedUserCredits) : 0;
  
//     // Parse the stored JSON string to get the user details object
//     const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
//     const level = 1;
//     const userNewCredits = 0;
//     const gameNumber = selectedNumbers;
  
//     try {
//       const response = await fetch(
//         'https://lottery-backend-tau.vercel.app/api/v1/user/game/new-game',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${storedAccessToken}`,
//           },
//           body: JSON.stringify({
//             userId,
//             gameLevel: level,
//             credits: userCredits,
//             selectedNumbers:gameNumber,
//             gameType: 'someValue',
//           }),
//         }
//       );
  
//       const responseData = await response.json();

  
//       if (response.ok) {
//         console.log('Game added successfully:', responseData);
//         console.log("checking selected numbers" , selectedNumbers)
//         // Do something with the success response if needed
//         navigation.navigate('PlayedGame', { gameNumber });
//         return responseData;
//       } else {
//         console.error('Error while creating game:', responseData.error || 'Something went wrong');
//         // Throw an error to handle it in the calling code
//         throw new Error(responseData.error || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error('Error during createGame:', error);
//       // Throw the error to handle it in the calling code
//       throw error;
//     }
//   };


  
//   const validateAndCreateGame = async () => {
//     // Replace this line with the logic to get selectedNumbers from user input or elsewhere
   
//     // Check if selectedNumbers is an array and has exactly 6 numbers
//     if (Array.isArray(selectedNumbers) && selectedNumbers.length === 6) {
//       try {
//         await createGame(); // Call your createGame function
//       } catch (error) {
//         console.error('Error during game creation:', error);
//         // Handle the error as needed
//       }
//     } else {
//       console.error('Please enter exactly 6 numbers');
//       // Handle the case where selectedNumbers doesn't contain 6 numbers
//       // You might want to display a message to the user or take appropriate action
//     }
//   };
 


//   const renderSelectedNumbers = () => {
//     const selectedNumberViews = [];
//     for (let i = 1; i <= 6; i++) {
//       const selectedNumber = selectedNumbers[i - 1];

//       selectedNumberViews.push(
//         <TouchableOpacity
//           key={i}
//           style={[
//             styles.selectedNumberBox,
//             selectedNumberIndex === selectedNumber && styles.selectedNumberBoxSelected,
//           ]}
//           onPress={() => handleNumberSelect(selectedNumber)}
//         >
//           {/* Display selected number or an empty box */}
//           <Text style={styles.selectedNumber}>{selectedNumber}</Text>
//         </TouchableOpacity>
//       );
//     }
//     return selectedNumberViews;
//   };
  
  
  
//     return (
//       <View style={styles.container}>
//          <View style={{ flexDirection: 'row', alignItems: 'flex-start',  justifyContent:'flex-start' ,marginRight: 190, }}>

//          <MaterialIcons name="keyboard-arrow-left" size={35} color="white" style={{
     
//       marginLeft: 10, // Add marginLeft to push the icon to the left
//     }}
    
//     />


// <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>


//     <Text style={styles.title}>Play Game</Text>




//    <EvilIcons name="bell" size={30}  style={styles.bell}  color="white" />
//     <AntDesign name="logout" size={19} style={styles.logout}color="white" />



//     </View>
//         </View>




//         <Text style={styles.subtitle}>Select 6 lucky numbers:</Text>
  
//         <View style={styles.selectedNumbersContainer}>
//           {renderSelectedNumbers()}
//         </View>
  
//         <View style={styles.numberButtonsContainer}>{renderNumberButtons()}</View>

        
//          <LinearGradient  colors={['#F0C735', '#D98F39']}  style={styles.doneButton}>
//         <TouchableOpacity  onPress={validateAndCreateGame} >
//           <Text style={styles.doneButtonText}>Done</Text>
//         </TouchableOpacity>
//         </LinearGradient>


//       </View>
//     );
  
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: SCREEN_WIDTH * 0.05, // Use a percentage of the screen width
//     backgroundColor:'#BA8DF3'
//   },
//   title: {
//     fontSize: SCREEN_WIDTH * 0.06, // Adjust font size based on screen width
//     fontWeight: 'bold',
  
//     color:'white'
//   },
//   bell: {
//     width: 24,
//     height: 24,
//     top: 1,
//     left: 150,
//     padding: '2px 3.5px 2px 3.5px',
   
//   },
//   logout: {
//     marginTop:5,
//     width: 24,
//     height: 24,
//     top: 1,
//     left: 165,
//     padding: '2px 3.5px 2px 3.5px',
   
//   },
//   subtitle: {
//     fontSize: SCREEN_WIDTH * 0.04,
//     marginBottom: SCREEN_WIDTH * 0.05,
//     color:'white',
//     marginRight:90
//   },
//   selectedNumbersContainer: {
//     flexDirection: 'row',
//     marginBottom: SCREEN_WIDTH * 0.05,
//   },
//   selectedNumberBox: {
//     width: SCREEN_WIDTH * 0.11,
//     height: SCREEN_WIDTH * 0.11,
//     borderRadius: SCREEN_WIDTH * 0.02,
//     borderWidth: 1,
//     borderColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: SCREEN_WIDTH * 0.01,
//   },
//   selectedNumber: {
//     fontSize: SCREEN_WIDTH * 0.04,
//   },
//   numberButtonsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     marginBottom: SCREEN_WIDTH * 0.05,
//     maxWidth: SCREEN_WIDTH * 0.8, // Maximum width to ensure 6 columns
//   },
  
//   numberButton: {
//     width: SCREEN_WIDTH * 0.1,
//     height: SCREEN_WIDTH * 0.1,
//     borderRadius: SCREEN_WIDTH * 0.02, // Make it a perfect circle
//     borderWidth: 1,
//     borderColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: SCREEN_WIDTH * 0.01,
//   },
  
//   doneButton: {
//     backgroundColor: '#F0C735',
//     paddingVertical: SCREEN_WIDTH * 0.015,
//     paddingHorizontal: SCREEN_WIDTH * 0.05,
//     borderRadius: SCREEN_WIDTH * 0.01,
//     marginBottom:2,
//     width:'75%'
//   },
//   doneButtonText: {
//     color: '#fff',
//     fontSize: SCREEN_WIDTH * 0.04,
//     alignSelf:'center'
//   },
//   selectedNumberBoxSelected: {
//     borderColor: 'blue',
//     borderWidth: 2,
//   },
// });
// export default PlayScreen




import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Dimensions } from 'react-native';
import { useAuth } from './auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


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
          <Text  style={{color:'white'}}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return numberButtons;
  };



  const createGame = async () => {
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
            gameType: 'someValue',
          }),
        }
      );
  
      const responseData = await response.json();

  
      if (response.ok) {
        console.log('Game added successfully:', responseData);
        console.log("checking selected numbers" , selectedNumbers)
        const currentDate = new Date();
        console.log("current date" , currentDate)
        // Do something with the success response if needed
        navigation.navigate('PlayedGame', { gameNumber,  currentDate  });
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


  
  const validateAndCreateGame = async () => {
    // Replace this line with the logic to get selectedNumbers from user input or elsewhere
   
    // Check if selectedNumbers is an array and has exactly 6 numbers
    if (Array.isArray(selectedNumbers) && selectedNumbers.length === 6) {
      try {
        await createGame(); // Call your createGame function
      } catch (error) {
        console.error('Error during game creation:', error);
        // Handle the error as needed
      }
    } else {
      console.error('Please enter exactly 6 numbers');
      // Handle the case where selectedNumbers doesn't contain 6 numbers
      // You might want to display a message to the user or take appropriate action
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
         <View style={{ flexDirection: 'row', alignItems: 'flex-start',  justifyContent:'flex-start' ,marginRight: 190, }}>

         <MaterialIcons name="keyboard-arrow-left" size={35} color="white" style={{
     
      marginLeft: 10, // Add marginLeft to push the icon to the left
    }}
    
    />


<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>


    <Text style={styles.title}>Play Game</Text>




    <EvilIcons name="bell" size={30}  style={styles.bell}  color="white" />
    <AntDesign name="logout" size={19} style={styles.logout}color="white" />



    </View>


        </View>




        <Text style={styles.subtitle}>Continental Level 1 $ 1 million</Text>
  
        <View style={styles.selectedNumbersContainer}>
          {renderSelectedNumbers()}
        </View>
  
        <View style={styles.numberButtonsContainer}>{renderNumberButtons()}</View>

        
         <LinearGradient  colors={['#F0C735', '#D98F39']}  style={styles.doneButton}>
        <TouchableOpacity  onPress={validateAndCreateGame} >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
        </LinearGradient>


      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.05, // Use a percentage of the screen width
    backgroundColor:'#BA8DF3'
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.06, // Adjust font size based on screen width
    fontWeight: 'bold',
  
    color:'white'
  },
  bell: {
    width: 24,
    height: 24,
    top: 1,
    left: 150,
    padding: '2px 3.5px 2px 3.5px',
   
  },
  logout: {
    marginTop:5,
    width: 24,
    height: 24,
    top: 1,
    left: 165,
    padding: '2px 3.5px 2px 3.5px',
   
  },
  subtitle: {
    fontSize: SCREEN_WIDTH * 0.04,
    marginBottom: SCREEN_WIDTH * 0.05,
    color:'white',
    marginRight:90
  },
  selectedNumbersContainer: {
    flexDirection: 'row',
    marginBottom: SCREEN_WIDTH * 0.05,
  },
  selectedNumberBox: {
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_WIDTH * 0.11,
    borderRadius: SCREEN_WIDTH * 0.02,
    borderWidth: 1,
    borderColor: 'white',
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
    borderRadius: SCREEN_WIDTH * 0.02, // Make it a perfect circle
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: SCREEN_WIDTH * 0.01,
  },
  
  doneButton: {
    backgroundColor: '#F0C735',
    paddingVertical: SCREEN_WIDTH * 0.015,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: SCREEN_WIDTH * 0.01,
    marginBottom:2,
    width:'75%'
  },
  doneButtonText: {
    color: '#fff',
    fontSize: SCREEN_WIDTH * 0.04,
    alignSelf:'center'
  },
  selectedNumberBoxSelected: {
    borderColor: 'blue',
    borderWidth: 2,
  },
});
export default PlayScreen