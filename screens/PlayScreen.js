
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
// import { BackHandler } from 'react-native';

// const PlayScreen = () => {
//   const [selectedNumbers, setSelectedNumbers] = useState([]);
//   const [highlightedIndex, setHighlightedIndex] = useState(0);
  
//   const navigation = useNavigation();
//   const [areaText, setAreaText] = useState('');
//   const [levelText, setLevelText] = useState('');
  


//   const handleBoxClick = (number, index) => {
//     // If the number is already selected, remove it
//     if (selectedNumbers.includes(number)) {
//       setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
//     } else {
//       // If less than 6 numbers are selected, add the number
//       if (selectedNumbers.length < 6) {
//         setSelectedNumbers([...selectedNumbers, number]);
//       } else {
//         // If the selected numbers are full, change the number in the highlighted box
//         setSelectedNumbers((prevNumbers) => {
//           const newNumbers = [...prevNumbers];
//           newNumbers[highlightedIndex] = number;
//           return newNumbers;
//         });
//       }
//     }

//     // Highlight the clicked box
//     setHighlightedIndex(index);
//   };

//   const handleSelectBoxClick = (index) => {
//     // Set the highlighted index for the initial selection of empty boxes
//     setHighlightedIndex(index);
//   };

//   const handleNumberClick = (number) => {
//     // Set the selected number to the highlighted box
//     if (highlightedIndex !== null && selectedNumbers.length < 6) {
//       setSelectedNumbers((prevNumbers) => {
//         const newNumbers = [...prevNumbers];
//         newNumbers[highlightedIndex] = number;
//         return newNumbers;
//       });
  
//       // Move highlight to the next box
//       setHighlightedIndex((prevIndex) =>
//         prevIndex < 5 ? prevIndex + 1 : prevIndex
//       );
  
//       // Check if all six boxes are full
    
//     }else{
//       setSelectedNumbers((prevNumbers) => {
//         const newNumbers = [...prevNumbers];
//         newNumbers[highlightedIndex] = number;
//         return newNumbers;
//       });
//     }
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
//         const currentDate = new Date();
//         console.log("current date" , currentDate)
//         // Do something with the success response if needed
//         navigation.navigate('PlayedGame', { gameNumber, currentDate: currentDate.toISOString()  });
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
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Retrieve areaValue and levelValue from AsyncStorage
//         const areaValue = await AsyncStorage.getItem('area');
//         const levelValue = await AsyncStorage.getItem('level');

//         // Set the areaText based on the areaValue
//         let newAreaText = '';

//         if (areaValue === '1') {
//           newAreaText = 'Continental';
//         } else if (areaValue === '2') {
//           newAreaText = 'National';
//         } else {
//           // Handle other area values if needed
//         }

//         // Update state variables
//         setAreaText(newAreaText);
       
//       } catch (error) {
//         console.error('Error fetching data from AsyncStorage:', error.message);
//       }
//     };

//     // Call the fetchData function when the component mounts
//     fetchData();
//   }, []); 


//   useEffect(() => {
//     const fetchLevel = async () => {
//       try {
//         // Retrieve areaValue and levelValue from AsyncStorage
//         const areaValue = await AsyncStorage.getItem('area');
//         const levelValue = await AsyncStorage.getItem('level');

//         // Set the areaText based on the areaValue
//         let newLevelText = '';

//         if (levelValue === '1') {
//           newLevelText = ' 1';
//         } else if (levelValue === '2') {
//           newLevelText = ' 2';
//         } else if(levelValue === '3'){
//           newLevelText = ' 3';
//         }

//         // Update state variables
//         setLevelText(newLevelText);
       
//       } catch (error) {
//         console.error('Error fetching data from AsyncStorage:', error.message);
//       }
//     };

//     // Call the fetchData function when the component mounts
//     fetchLevel();
//   }, []); 

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
 


//   return (
//     <View style={styles.container}>
//             <View style={{ flexDirection: 'row', alignItems: 'flex-start',  justifyContent:'flex-start' ,marginRight: 190, }}>

// <MaterialIcons name="keyboard-arrow-left" size={35} color="white" style={{

// marginLeft: 10, // Add marginLeft to push the icon to the left
// }}

// />


// <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>


// <Text style={styles.title}>Play Game</Text>




// <EvilIcons name="bell" size={30}  style={styles.bell}  color="white" />
// <AntDesign name="logout" size={19} style={styles.logout}color="white" />



// </View>


// </View>




// <Text style={styles.subtitle}> {areaText}   Level{levelText} $ {levelText} million</Text>
// <View style={{ flexDirection: 'row', marginTop: 20,marginBottom:5 ,alignItems:'center'}}>
//         {[...Array(6).keys()].map((index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleSelectBoxClick(index)}
//             style={{
//               width: SCREEN_WIDTH * 0.11,
//               height:SCREEN_WIDTH * 0.11,
//               borderRadius: SCREEN_WIDTH * 0.02,
//               margin:SCREEN_WIDTH * 0.015,
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderWidth: 1,
//               borderColor: highlightedIndex === index ? 'white' : 'white',
//               backgroundColor:
//               highlightedIndex === index ? '#31A062' : '#BA8DF3',
//               alignSelf:'center',
             
//             }}
//           >
//             <Text  style={{color:'white'}}>
//               {selectedNumbers.length > index ? selectedNumbers[index] : ''}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={{ flexDirection: 'row', flexWrap: 'wrap' , marginLeft:25}}>
//         {[...Array(60).keys()].map((number, index) => (
//           <TouchableOpacity
//             key={number + 1}
//             onPress={() => handleNumberClick(number + 1)}
//             style={{
//               width: SCREEN_WIDTH * 0.1,
//               height: SCREEN_WIDTH * 0.1,
//               borderRadius: SCREEN_WIDTH * 0.02,
//               margin:SCREEN_WIDTH * 0.015,
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderWidth: 1,
//               borderColor: highlightedIndex === index ? 'white' : 'white',
//               backgroundColor: selectedNumbers.includes(number + 1)
//                 ? '#31A062'
//                 : '#BA8DF3',
//             }}
//           >
//             <Text  style={{color:'white'}}>{number + 1}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Console log the selected numbers */}
        
//       <LinearGradient  colors={['#F0C735', '#D98F39']}  style={styles.doneButton}>
//         <TouchableOpacity  onPress={validateAndCreateGame} >
//           <Text style={styles.doneButtonText}>Done</Text>
//         </TouchableOpacity>
//         </LinearGradient>

//     </View>
//   );
// };


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
//     marginRight:90,
//     marginTop:10
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
//     color:'white'
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
//     width:'85%',
//     marginTop:20
//   },
//   doneButtonText: {
//     color: '#fff',
//     fontSize: SCREEN_WIDTH * 0.04,
//     alignSelf:'center'
//   },
//   selectedNumberBoxSelected: {
//     borderColor: 'white',
//     borderWidth: 2,
//     backgroundColor:'#31A078'
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
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BackHandler } from 'react-native';

const PlayScreen = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  
  const navigation = useNavigation();
  const [areaText, setAreaText] = useState('');
  const [levelText, setLevelText] = useState('');
  


  const handleBoxClick = (number, index) => {
    // If the number is already selected, remove it
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      // If less than 6 numbers are selected, add the number
      if (selectedNumbers.length < 6) {
        setSelectedNumbers([...selectedNumbers, number]);
      } else {
        // If the selected numbers are full, change the number in the highlighted box
        setSelectedNumbers((prevNumbers) => {
          const newNumbers = [...prevNumbers];
          newNumbers[highlightedIndex] = number;
          return newNumbers;
        });
      }
    }

    // Highlight the clicked box
    setHighlightedIndex(index);
  };

  const handleSelectBoxClick = (index) => {
    // Set the highlighted index for the initial selection of empty boxes
    setHighlightedIndex(index);
  };

  const handleNumberClick = (number) => {
    // Set the selected number to the highlighted box
    if (highlightedIndex !== null && selectedNumbers.length < 6) {
      setSelectedNumbers((prevNumbers) => {
        const newNumbers = [...prevNumbers];
        newNumbers[highlightedIndex] = number;
        return newNumbers;
      });
  
      // Move highlight to the next box
      setHighlightedIndex((prevIndex) =>
        prevIndex < 5 ? prevIndex + 1 : prevIndex
      );
  
      // Check if all six boxes are full
    
    }else{
      setSelectedNumbers((prevNumbers) => {
        const newNumbers = [...prevNumbers];
        newNumbers[highlightedIndex] = number;
        return newNumbers;
      });
    }
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
        navigation.navigate('PlayedGame', { gameNumber, currentDate: currentDate.toISOString()  });
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve areaValue and levelValue from AsyncStorage
        const areaValue = await AsyncStorage.getItem('area');
        const levelValue = await AsyncStorage.getItem('level');

        // Set the areaText based on the areaValue
        let newAreaText = '';

        if (areaValue === '1') {
          newAreaText = 'Continental';
        } else if (areaValue === '2') {
          newAreaText = 'National';
        } else {
          // Handle other area values if needed
        }

        // Update state variables
        setAreaText(newAreaText);
       
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); 


  useEffect(() => {
    const fetchLevel = async () => {
      try {
        // Retrieve areaValue and levelValue from AsyncStorage
        const areaValue = await AsyncStorage.getItem('area');
        const levelValue = await AsyncStorage.getItem('level');

        // Set the areaText based on the areaValue
        let newLevelText = '';

        if (levelValue === '1') {
          newLevelText = ' 1';
        } else if (levelValue === '2') {
          newLevelText = ' 2';
        } else if(levelValue === '3'){
          newLevelText = ' 3';
        }

        // Update state variables
        setLevelText(newLevelText);
       
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchLevel();
  }, []); 

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
 


  return (
    <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start',  justifyContent:'flex-start' ,marginRight: 190, }}>


            <TouchableOpacity  onPress={()=> navigation.navigate('ALScreen')}>
  
<MaterialIcons name="keyboard-arrow-left" size={35} color="white" style={{

marginLeft: 10, // Add marginLeft to push the icon to the left
}}

/>

</TouchableOpacity>
<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>


<Text style={styles.title}>Play Game</Text>




<EvilIcons name="bell" size={30}  style={styles.bell}  color="white" />
<AntDesign name="logout" size={19} style={styles.logout}color="white" />



</View>


</View>




<Text style={styles.subtitle}> {areaText}   Level{levelText} $ {levelText} million</Text>
<View style={{ flexDirection: 'row', marginTop: 20,marginBottom:5 ,alignItems:'center'}}>
        {[...Array(6).keys()].map((index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectBoxClick(index)}
            style={{
              width: SCREEN_WIDTH * 0.11,
              height:SCREEN_WIDTH * 0.11,
              borderRadius: SCREEN_WIDTH * 0.02,
              margin:SCREEN_WIDTH * 0.015,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: highlightedIndex === index ? 'white' : 'white',
              backgroundColor:
              highlightedIndex === index ? '#31A062' : '#BA8DF3',
              alignSelf:'center',
             
            }}
          >
            <Text  style={{color:'white'}}>
              {selectedNumbers.length > index ? selectedNumbers[index] : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' , marginLeft:25}}>
        {[...Array(60).keys()].map((number, index) => (
          <TouchableOpacity
            key={number + 1}
            onPress={() => handleNumberClick(number + 1)}
            style={{
              width: SCREEN_WIDTH * 0.1,
              height: SCREEN_WIDTH * 0.1,
              borderRadius: SCREEN_WIDTH * 0.02,
              margin:SCREEN_WIDTH * 0.015,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: highlightedIndex === index ? 'white' : 'white',
              backgroundColor: selectedNumbers.includes(number + 1)
                ? '#31A062'
                : '#BA8DF3',
            }}
          >
            <Text  style={{color:'white'}}>{number + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Console log the selected numbers */}
        
      <LinearGradient  colors={['#F0C735', '#D98F39']}  style={styles.doneButton}>
        <TouchableOpacity  onPress={validateAndCreateGame} >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
        </LinearGradient>

    </View>
  );
};


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
    marginRight:SCREEN_WIDTH * 0.2,
    marginTop:10
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
    color:'white'
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
    width:'85%',
    marginTop:SCREEN_WIDTH * 0.05
  },
  doneButtonText: {
    color: '#fff',
    fontSize: SCREEN_WIDTH * 0.04,
    alignSelf:'center'
  },
  selectedNumberBoxSelected: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor:'#31A078'
  },
});

export default PlayScreen;