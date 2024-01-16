// import { useNavigation } from '@react-navigation/native';
// import   React  , {useEffect,useState} from 'react';
// import { View ,StyleSheet,TouchableHighlight} from 'react-native';
// import { Card, Title, Text, Button } from 'react-native-paper';
// import axios from 'axios';
// import { MaterialIcons } from '@expo/vector-icons';
// import {  TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BackHandler } from 'react-native';


// const MyCardComponent = () => {
//   const navigation = useNavigation();
//   const [userCredits, setUserCredits] = useState(0);
//   const [pressed, setPressed] = useState(false);
//   const [pressedLebelOne, setPressedLevelOne] = useState(false);
//   const [pressedNational, setPressedNational] = useState(false);
 
//   const [pressedleveltwo, setPressedleveltwo] = useState(false);
//   const [pressedlevelthree, setPressedlevelthree] = useState(false);
//   const handleButtonPress = () => {
//     navigation.navigate('ChooseLevel');
//   };
//   const handleMainScreen = () => {
//     navigation.navigate('ChooseLevel');
//   };

//   const checkUserCredits = async (navigateToPayment, navigateToMainScreen) => {
//     try {
//       // Retrieve userId from AsyncStorage
//       const storedUserDetails = await AsyncStorage.getItem('userDetails');
//       const accessToken = await AsyncStorage.getItem('accessToken');
//       // Parse the stored JSON string to get the user details object
//       const userDetails = JSON.parse(storedUserDetails);
  
//       // Check if userDetails exists and has _id property
//       if (!userDetails || !userDetails._id) {
//         console.log('User details not found in AsyncStorage');
//         return;
//       }
  
//       // Extract userId
//       const userId = userDetails._id;
  
//       // Make API request to check user credits
//       const response = await fetch(`https://lottery-backend-tau.vercel.app/api/v1/user/get-credits/${userId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//           // Include any additional headers or tokens if needed
//         },
//       });
  
//       if (response.ok) {
//         const result = await response.json();
//         console.log('User credits:', result.credits);
//         const userCredits = result.credits;

//         // Store the user credits in AsyncStorage
//         await AsyncStorage.setItem('userCredits', userCredits.toString());
  
//         console.log('new credits:', userCredits);
        
//         // If credits are zero, navigate to the payment gateway
//         if (result.credits === 0) {
//           navigation.navigate('PaymentMethodPage');
//         } else {
//           navigation.navigate('MainScreen');
//         }
//       } else {
//         console.error('Failed to fetch user credits');
//       }
//     } catch (error) {
//       console.error('Error checking user credits:', error.message);
//     }
//   };
 

//   const checkCreditsAndNavigate = async () => {
//     try {
//       // Retrieve userCredits from AsyncStorage
//       const storedUserCredits = await AsyncStorage.getItem('userCredits');

//       // Parse the string back to a number
//       const userCredits = storedUserCredits 

//       // Check if userCredits is equal to 0
//       if (storedUserCredits === 0) {
//         // If credits are 0, navigate to the PaymentMethodPage
//         navigation.navigate('PaymentMethodPage');
//       } else {
//         // If credits are greater than 0, navigate to the MainScreen
//         navigation.navigate('MainScreen');
//       }
//     } catch (error) {
//       console.error('Error checking credits:', error);
//       // Handle errors, e.g., show an error message or redirect to an error screen
//     }
//   };
  
//   const fetchAndConsoleStoredCredits = async () => {
//     try {
//       // Retrieve userCredits from AsyncStorage
//       const storedCredits = await AsyncStorage.getItem('credits');

  
//       // Log the stored user credits
//       console.log('Stored User credits checked succefull:', storedCredits);
  
//       // If needed, you can parse it back to a number
//       const userCredits = storedCredits ? parseInt(storedCredits) : 0;
//       console.log('Parsed User credits (as number):', userCredits);
  
//       // Conditionally navigate based on userCredits
//       if (userCredits === 0) {
//         // If userCredits is 0, navigate to MainScreen
//         navigation.navigate('PaymentMethodPage');
//       } else {
//         // If userCredits is not 0, navigate to PaymentMethodPage
//         navigation.navigate('MainScreen');
//       }
//     } catch (error) {
//       console.error('Error fetching stored user credits:', error.message);
//     }
//   };
//   useEffect(() => {
//     // Add event listener for hardware back button press
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//       // Handle back button press
//       // Here, you can add your logic to close the app
//       // For example, you might want to show an exit confirmation dialog
//       // If the screen is the Login screen, you can close the app
//       if (navigation.isFocused()) {
//         // Close the app (exit)
//         navigation.navigate("Home")
//         return true; // Prevent default behavior (exit the app)
//       }

//       // If it's not the Login screen, let the default back button behavior occur
//       return false;
//     });

//     // Clean up the event listener on component unmount
//     return () => backHandler.remove();
//   }, [navigation]);

//   const isWorking = async() => {
//     console.log()
//   }
  
//   // Example usage:
//   // Call the check function when you want to check and navigate based on user credits
//   // For example, you can call it after the user logs in or when the component mounts
//   // check();
  
//   const handlePress = async () => {
//     setPressed(!pressed);
  
//     if (!pressed) {
//       // Store area value in AsyncStorage as 1 when Continental button is clicked
//       await AsyncStorage.setItem('area', '1');
//     }
//   };
  
//   const handlePressLevelOne = async () => {
//     setPressedLevelOne(!pressedLebelOne);
  
//     if (!pressedLebelOne) {
//       // Store level value in AsyncStorage as 1 when Level 1 button is clicked
//       await AsyncStorage.setItem('level', '1');
//     }
//   };
  
//   const handlePressNational = async () => {
//     setPressedNational(!pressedNational);
  
//     if (!pressedNational) {
//       // Store area value in AsyncStorage as 2 when National button is clicked
//       await AsyncStorage.setItem('area', '2');
//     }
//   };
  
//   const handlePressLevelTwo = async () => {
//     setPressedleveltwo(!pressedleveltwo);
//     setPressedLevelOne(pressedLebelOne);
//     if (!pressedleveltwo) {
//       // Store level value in AsyncStorage as 2 when Level 2 button is clicked
//       await AsyncStorage.setItem('level', '2');
//       const areaValue = await AsyncStorage.getItem('area');

//       console.log("level  value ",areaValue)
//     }
//   };
  
//   const handlePressLevelThree = async () => {
//     setPressedlevelthree(!pressedlevelthree);
  
//     if (!pressedlevelthree) {
//       // Store level value in AsyncStorage as 3 when Level 3 button is clicked
//       await AsyncStorage.setItem('level', '3');
//     }
//   };
  
//   const checkUserIdAndReference = async () => {
//     try {
//       // Retrieve userId and accessToken from AsyncStorage
//       const storedUserDetails = await AsyncStorage.getItem('userDetails');
//       const accessToken = await AsyncStorage.getItem('accessToken');
  
//       // Parse the stored JSON string to get the user details object
//       const userDetails = JSON.parse(storedUserDetails);
  
//       // Check if userDetails exists and has _id property
//       if (!userDetails || !userDetails._id) {
//         console.log('User details not found in AsyncStorage');
//         return;
//       }
  
//       // Extract userId
//       const userId = userDetails._id;
//        console.log("id",userId)
//        console.log("token",accessToken)
//       // Make API request to check user details
   
  
     
//     } catch (error) {
//       console.error('Error checking user details:', error.message);
//     }
//   };
  

//   const checkCondition = async () => {
//     try {
//       // Retrieve 'area' and 'level' values from AsyncStorage
//       const areaValue = await AsyncStorage.getItem('area');
//       const levelValue = await AsyncStorage.getItem('level');
  
//       // Check the conditions and navigate accordingly
//       if (areaValue === '1' && levelValue === '1') {
      
//         navigation.navigate('Play');
//       } else if(areaValue === '1' && levelValue === '2') {
//         navigation.navigate('Play');
//       }else if(areaValue === '1' && levelValue === '3') {
//         navigation.navigate('Play');
//       }else if(areaValue === '2' && levelValue === '1') {
//         navigation.navigate('Play');
//       }else if(areaValue === '2' && levelValue === '2') {
//         navigation.navigate('Play');
//       }else if(areaValue === '2' && levelValue === '3') {
//         navigation.navigate('Play');
//       }

//       console.log("testing area", areaValue)
//       console.log("testing level", levelValue)
//     } catch (error) {
//       console.error('Error checking conditions:', error.message);
//     }
//   };
  
//   // Example usage:
//   // Call the checkCondition function when needed, for example, on a button press or component mount
//   // For example:
//   // <Button
//   //   mode="contained"
//   //   onPress={checkCondition}
//   //   style={{ width: '80%', marginVertical: 10, alignSelf: 'center' }}
//   // >
//   //   Check Conditions and Navigate
//   // </Button>
  
//   // Example usage:
//   // Call the checkUserIdAndReference function when needed, for example, on a button press
//   <Button
//     mode="contained"
//     onPress={checkUserIdAndReference}
//     style={{ width: '80%', marginVertical: 10, alignSelf: 'center' }}
//   >
//     Check User ID and Reference
//   </Button>
  


//   return (

//     <View  style={{  alignItems: 'center' }}  >

// <View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:50}}>
// <MaterialIcons name="keyboard-arrow-left" size={35} color="black" style={{
     
//      marginLeft: 10, // Add marginLeft to push the icon to the left
//    }}/>
//      <Text  style={styles.welcomeText}>Choose game </Text>

//      </View>

     

//      <TouchableHighlight
//         style={[
//           styles.buttonContainer,
//           { backgroundColor: pressed ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
//         ]}
//         onPress={ handlePress}
//         underlayColor="#31A062" // This sets the color when the button is pressed
//       >
//         <Text style={[styles.buttonText,{color:pressed ? 'white' : 'black'}]}>
//           Continental
//           {'\n'}
//           <Text style={[ styles.buttonTextSmallTwo,{color:pressed ? 'white' : 'black'} ] }>
//      Win up to 1 million
//     </Text>
//         </Text>
//       </TouchableHighlight>


     
//       <TouchableHighlight
//         style={[
//           styles.buttonContainer,
//           { backgroundColor: pressedNational ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
//         ]}
//         onPress={handlePressNational}
//         underlayColor="#31A062" // This sets the color when the button is pressed
//       >
//         <Text style={[styles.buttonText, {color:pressedNational ? 'white' : 'black'}]}>
//           National
//           {'\n'}
//           <Text style={[styles.buttonTextSmallTwo, {color:pressedNational ? 'white' : 'black'}]}>
//       100$ , Win up to 1 million
//     </Text>
//         </Text>
//       </TouchableHighlight>

//       <Text  style={styles.chooseLevel}>Choose Level </Text>


//       <TouchableHighlight
//   style={[
//     styles.buttonContainer,
//     { backgroundColor: pressedLebelOne ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
//   ]}
//   onPress={handlePressLevelOne}
//   underlayColor="#31A062"
// >
//   <Text style={[styles.buttonText, { color: pressedLebelOne ? 'white' : 'black' }]}>
//     Level 1
//     {'\n'}
//     <Text style={[styles.buttonTextSmallTwo, { color: pressedLebelOne ? 'white' : 'black' }]}>
//       100$ , Win up to 1 million
//     </Text>
//   </Text>
// </TouchableHighlight>

      
     


//       <TouchableHighlight
//         style={[
//           styles.buttonContainer,
//           { backgroundColor: pressedleveltwo ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
//         ]}
//         onPress={handlePressLevelTwo}
//         underlayColor="#31A062" // This sets the color when the button is pressed
//       >
//         <Text style={[styles.buttonText, { color: pressedleveltwo ? 'white' : 'black' }]}>
//           Level 2
//           {'\n'}
//           <Text style={[styles.buttonTextSmallTwo, { color: pressedleveltwo ? 'white' : 'black' }]}>
//       200$ , Win up to 2 million
//     </Text>
//         </Text>
//       </TouchableHighlight>
      
  
 
//       <TouchableHighlight
//         style={[
//           styles.buttonContainer,
//           { backgroundColor: pressedlevelthree ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
//         ]}
//         onPress={handlePressLevelThree}
//         underlayColor="#31A062" // This sets the color when the button is pressed
//       >
//         <Text style={[styles.buttonText, { color: pressedlevelthree ? 'white' : 'black' }]}>
//           Level 3
//           {'\n'}
//           <Text style={[styles.buttonTextLevelThree, { color: pressedlevelthree ? 'white' : 'black' }]}>
//       300$ , Win up to 3 million
//     </Text>
//         </Text>
//       </TouchableHighlight>



       
//       <TouchableHighlight
//         style={[
//           styles.PlayGamebuttonContainer,
//           { backgroundColor: pressedlevelthree ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
//         ]}
//         onPress={checkCondition}
//         underlayColor="#31A062" // This sets the color when the button is pressed
//       >
//         <Text style={[styles.buttonText, { color: pressedlevelthree ? 'white' : 'black' }]}>
//           Play Game
     
//         </Text>
//       </TouchableHighlight>

//     </View>
   
//   );
// };

// const styles = StyleSheet.create({
//   welcomeText: {
//     width: 354,
//     height: 41,
//     top: 33,
//     left: 10,
  
//     fontSize: 30, // Adjust the font size as needed
//     fontWeight: 'bold',
//     marginBottom:50
   
//   },

//   buttonContainer: {
//     backgroundColor: '#31A062',
//     width: '90%',
//     marginVertical: 10,
//     marginTop: 15,
//     padding: 10,
//     alignItems: 'center',
//     borderRadius:20
//   },

//   PlayGamebuttonContainer: {
//     backgroundColor: '#31A062',
//     width: '90%',
//     marginVertical: 10,
//     marginTop: 35,
//     padding: 10,
//     alignItems: 'center',
//     borderRadius:20
//   },
//   buttonText: {
//     color: 'black',
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight:'700'
//   },
//   buttonText: {
//     color: 'black',
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight:'700'
//   },
//   buttonTextSmallTwo: {
   
//     textAlign: 'center',
//     fontSize: 16,
//   },

//   buttonTextLevelThree: {
//     color: 'black',
//     textAlign: 'center',
//     fontSize: 16,
//   },


//   chooseLevel: {
//     width: 354,
//     height: 41,
//     top: 10,
//     left: 20,
  
//     fontSize: 30, // Adjust the font size as needed
//     fontWeight: 'bold',
//     alignSelf:'center',
//     marginBottom:10,
//     marginTop:10
   
//   },
// })

// export default MyCardComponent;


import { useNavigation } from '@react-navigation/native';
import   React  , {useEffect,useState} from 'react';
import { View ,StyleSheet,TouchableHighlight} from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import {  TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';


const MyCardComponent = () => {
  const navigation = useNavigation();
  const [userCredits, setUserCredits] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [pressedLebelOne, setPressedLevelOne] = useState(false);
  const [pressedNational, setPressedNational] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [pressedleveltwo, setPressedleveltwo] = useState(false);
  const [pressedlevelthree, setPressedlevelthree] = useState(false);

  const [commonLevel,setCommonLevel] = useState(0);
  const [commonArea,setCommonArea] = useState(0);

  const handleButtonPress = () => {
    navigation.navigate('ChooseLevel');
  };
  const handleMainScreen = () => {
    navigation.navigate('ChooseLevel');
  };


  useEffect(() => {
    // Add event listener for hardware back button press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Handle back button press
      // Here, you can add your logic to close the app
      // For example, you might want to show an exit confirmation dialog
      // If the screen is the Login screen, you can close the app
      if (navigation.isFocused()) {
        // Close the app (exit)
        navigation.navigate("Home")
        return true; // Prevent default behavior (exit the app)
      }

      // If it's not the Login screen, let the default back button behavior occur
      return false;
    });

    // Clean up the event listener on component unmount
    return () => backHandler.remove();
  }, [navigation]);

  const isWorking = async() => {
    console.log()
  }

  
  const handlePress = async () => {
    setPressed(!pressed);
  
    if (!pressed) {
      // Store area value in AsyncStorage as 1 when Continental button is clicked
      await AsyncStorage.setItem('area', '1');
    }
    setCommonArea(1);
  };
  
  const handlePressLevelOne = async () => {
    setPressedLevelOne(!pressedLebelOne);
  
    if (!pressedLebelOne) {
      // Store level value in AsyncStorage as 1 when Level 1 button is clicked
      await AsyncStorage.setItem('level', '1');
    }
    setCommonLevel(1);
  };
  
  const handlePressNational = async () => {
    setPressedNational(!pressedNational);
  
    if (!pressedNational) {
      // Store area value in AsyncStorage as 2 when National button is clicked
      await AsyncStorage.setItem('area', '2');
    }
    setCommonArea(2);
  };
  
  const handlePressLevelTwo = async () => {
    setPressedleveltwo(!pressedleveltwo);
    setCommonLevel(commonLevel==1)
    if (!pressedleveltwo) {
      // Store level value in AsyncStorage as 2 when Level 2 button is clicked
      await AsyncStorage.setItem('level', '2');
      const areaValue = await AsyncStorage.getItem('area');

      console.log("level  value ",areaValue)
    }
    setCommonLevel(2);
  };
  
  const handlePressLevelThree = async () => {
    setPressedlevelthree(!pressedlevelthree);
  
    if (!pressedlevelthree) {
      // Store level value in AsyncStorage as 3 when Level 3 button is clicked
      await AsyncStorage.setItem('level', '3');
    }
    setCommonLevel(3);
  };
  
  const checkUserIdAndReference = async () => {
    try {
      // Retrieve userId and accessToken from AsyncStorage
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
      const accessToken = await AsyncStorage.getItem('accessToken');
  
      // Parse the stored JSON string to get the user details object
      const userDetails = JSON.parse(storedUserDetails);
  
      // Check if userDetails exists and has _id property
      if (!userDetails || !userDetails._id) {
        console.log('User details not found in AsyncStorage');
        return;
      }
  
      // Extract userId
      const userId = userDetails._id;
       console.log("id",userId)
       console.log("token",accessToken)
      // Make API request to check user details
   
  
     
    } catch (error) {
      console.error('Error checking user details:', error.message);
    }
  };
  

  const checkCondition = async () => {
    try {
      // Retrieve 'area' and 'level' values from AsyncStorage
      const areaValue = await AsyncStorage.getItem('area');
      const levelValue = await AsyncStorage.getItem('level');
  
      // Check the conditions and navigate accordingly
      if (areaValue === '1' && levelValue === '1') {
      
        navigation.navigate('Play');
      } else if(areaValue === '1' && levelValue === '2') {
        navigation.navigate('Play');
      }else if(areaValue === '1' && levelValue === '3') {
        navigation.navigate('Play');
      }else if(areaValue === '2' && levelValue === '1') {
        navigation.navigate('Play');
      }else if(areaValue === '2' && levelValue === '2') {
        navigation.navigate('Play');
      }else if(areaValue === '2' && levelValue === '3') {
        navigation.navigate('Play');
      }

      console.log("testing area", areaValue)
      console.log("testing level", levelValue)
    } catch (error) {
      console.error('Error checking conditions:', error.message);
    }
  };
  
  // Example usage:
  // Call the checkCondition function when needed, for example, on a button press or component mount
  // For example:
  // <Button
  //   mode="contained"
  //   onPress={checkCondition}
  //   style={{ width: '80%', marginVertical: 10, alignSelf: 'center' }}
  // >
  //   Check Conditions and Navigate
  // </Button>
  
  // Example usage:
  // Call the checkUserIdAndReference function when needed, for example, on a button press
  <Button
    mode="contained"
    onPress={checkUserIdAndReference}
    style={{ width: '80%', marginVertical: 10, alignSelf: 'center' }}
  >
    Check User ID and Reference
  </Button>
  


  return (

    <View  style={{  alignItems: 'center' }}  >

<View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:50}}>
<MaterialIcons name="keyboard-arrow-left" size={35} color="black" style={{
     
     marginLeft: 10, // Add marginLeft to push the icon to the left
   }}/>
     <Text  style={styles.welcomeText}>Choose game </Text>

     </View>

     

     <TouchableHighlight
        style={[
          styles.buttonContainer,
          { backgroundColor: commonArea==1 ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
        ]}
        onPress={ handlePress}
        underlayColor="#31A062" // This sets the color when the button is pressed
      >
        <Text style={[styles.buttonText,{color:commonArea==1 ? 'white' : 'black'}]}>
          Continental
          {'\n'}
          <Text style={[ styles.buttonTextSmallTwo,{color:commonArea==1 ? 'white' : 'black'} ] }>
     Win up to 1 million
    </Text>
        </Text>
      </TouchableHighlight>


     
      <TouchableHighlight
        style={[
          styles.buttonContainer,
          { backgroundColor: commonArea==2 ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
        ]}
        onPress={handlePressNational}
        underlayColor="#31A062" // This sets the color when the button is pressed
      >
        <Text style={[styles.buttonText, {color:commonArea==2 ? 'white' : 'black'}]}>
          National
          {'\n'}
          <Text style={[styles.buttonTextSmallTwo, {color:commonArea==2 ? 'white' : 'black'}]}>
      100$ , Win up to 1 million
    </Text>
        </Text>
      </TouchableHighlight>

      <Text  style={styles.chooseLevel}>Choose Level </Text>


      <TouchableHighlight
  style={[
    styles.buttonContainer,
    { backgroundColor: commonLevel==1? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
  ]}
  onPress={handlePressLevelOne}
  underlayColor="#31A062"
>
  <Text style={[styles.buttonText, { color: commonLevel==1 ? 'white' : 'black' }]}>
    Level 1
    {'\n'}
    <Text style={[styles.buttonTextSmallTwo, { color: commonLevel==1 ? 'white' : 'black' }]}>
      100$ , Win up to 1 million
    </Text>
  </Text>
</TouchableHighlight>

      
     


      <TouchableHighlight
        style={[
          styles.buttonContainer,
          { backgroundColor: commonLevel==2 ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
        ]}
        onPress={handlePressLevelTwo}
        underlayColor="#31A062" // This sets the color when the button is pressed
      >
        <Text style={[styles.buttonText, { color: commonLevel==2 ? 'white' : 'black' }]}>
          Level 2
          {'\n'}
          <Text style={[styles.buttonTextSmallTwo, { color: commonLevel==2 ? 'white' : 'black' }]}>
      200$ , Win up to 2 million
    </Text>
        </Text>
      </TouchableHighlight>
      
  
 
      <TouchableHighlight
        style={[
          styles.buttonContainer,
          { backgroundColor: commonLevel==3 ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
        ]}
        onPress={handlePressLevelThree}
        underlayColor="#31A062" // This sets the color when the button is pressed
      >
        <Text style={[styles.buttonText, { color: commonLevel==3 ? 'white' : 'black' }]}>
          Level 3
          {'\n'}
          <Text style={[styles.buttonTextLevelThree, { color: commonLevel==3 ? 'white' : 'black' }]}>
      300$ , Win up to 3 million
    </Text>
        </Text>
      </TouchableHighlight>



       
      <TouchableHighlight
        style={[
          styles.PlayGamebuttonContainer,
          { backgroundColor: pressedlevelthree ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
        ]}
        onPress={checkCondition}
        underlayColor="#31A062" // This sets the color when the button is pressed
      >
        <Text style={[styles.buttonText, { color: pressedlevelthree ? 'white' : 'black' }]}>
          Play Game
     
        </Text>
      </TouchableHighlight>

    </View>
   
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    width: 354,
    height: 41,
    top: 33,
    left: 10,
  
    fontSize: 30, // Adjust the font size as needed
    fontWeight: 'bold',
    marginBottom:50
   
  },

  buttonContainer: {
    backgroundColor: '#31A062',
    width: '90%',
    marginVertical: 10,
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
    borderRadius:20
  },

  PlayGamebuttonContainer: {
    backgroundColor: '#31A062',
    width: '90%',
    marginVertical: 10,
    marginTop: 35,
    padding: 10,
    alignItems: 'center',
    borderRadius:20
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight:'700'
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight:'700'
  },
  buttonTextSmallTwo: {
   
    textAlign: 'center',
    fontSize: 16,
  },

  buttonTextLevelThree: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },


  chooseLevel: {
    width: 354,
    height: 41,
    top: 10,
    left: 20,
  
    fontSize: 30, // Adjust the font size as needed
    fontWeight: 'bold',
    alignSelf:'center',
    marginBottom:10,
    marginTop:10
   
  },
})

export default MyCardComponent;