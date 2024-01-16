// import { View, Text ,StyleSheet ,TouchableOpacity,ActivityIndicator} from 'react-native'
// import React ,{ useState,useEffect } from 'react'
// import { Card, TextInput, Button , Chip} from 'react-native-paper';
// import { AntDesign } from '@expo/vector-icons';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { EvilIcons } from '@expo/vector-icons';
// import { BackHandler } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';

// const NumberRow = ({ numbers }) => {

//   return (
//     <View style={styles.container}>
//       {numbers.map((number, index) => (
//         <View key={index} style={styles.numberBox}>
//           <Text style={styles.numberText}>{number}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };
// const HomeScreen =() => {

//   const navigation = useNavigation();
//   const [userGames, setUserGames] = useState([]);
//   const [userName, setUserName] = useState(null);
//   const [credits, setCredits] = useState(0);
//   const [fetchCount, setFetchCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [loadingCredits, setLoadingCredits] = useState(true);
//   const getUserGames = async ( ) => {
//     const storedAccessToken = await AsyncStorage.getItem('accessToken');
//     const userId = await AsyncStorage.getItem('userId');

//     const url = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-game/${userId}`;

//     try {
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${storedAccessToken}`,
//         },
//       });

//       if (!response.ok) {
//         const userGames = await getUserGames(userId, authToken);
//         const errorData = await response.json();
//         console.log('User games:', errorData);
//         const responseData = await response.json();
//         //console.log('User games data:', responseData);

//         // Update the state with user games data
//         setUserGames(responseData.message);
//         throw new Error(`Failed to fetch user games: ${errorData.message}`);

//       }

//       const responseData = await response.json();
//       console.log('User games data:', responseData);
//       responseData.message.forEach(game => {
//         // Log the selectedNumbers array for each game
//         console.log('Selected numbers for game:', game.selectedNumbers);
//       });
//       // Log the successful response data
//       return responseData;
//     } catch (error) {
//       console.error('Error while fetching user games:', error.message);
//       throw error;
//     }
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       const fetchPersonalDetails = async () => {
//         const userId = await AsyncStorage.getItem('userId');
//         const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`;
//         const storedAccessToken = await AsyncStorage.getItem('accessToken');

//         try {
//           const response = await fetch(apiUrl, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${storedAccessToken}`,
//             },
//           });

//           if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`${response.status} - ${errorData.message}`);
//           }

//           const data = await response.json();
//           setCredits(data.message.credits);
//           console.log("credits", data.message.credits);
//           // Additional fields can be set here based on your API response
//         } catch (error) {
//           console.error('Error fetching personal details:', error.message);
//         }
//       };

//       fetchPersonalDetails();
//     }, []) // Empty dependency array means this effect will only run once when the component mounts
//   );

//   useEffect(() => {
//     // Function to retrieve userName from AsyncStorage
//     const getUserNameFromStorage = async () => {
//       try {
//         const storedUserName = await AsyncStorage.getItem('userName');
//         if (storedUserName !== null) {
//           setUserName(storedUserName);
//         }
//       } catch (error) {
//         console.error('Error retrieving userName from AsyncStorage:', error);
//       }
//     };

//     // Call the function to get userName when the component mounts
//     getUserNameFromStorage();
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       const fetchData = async () => {
//         try {
//           setLoading(true);
//           const responseData = await getUserGames();
//           setUserGames(responseData.message);
//         } catch (error) {
//           console.error('Error fetching user games:', error.message);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     }, [])
//   );

//   useFocusEffect(
//     React.useCallback(() => {
//       const fetchData = async () => {
//         try {
//           setLoading(true);
//           await getUserGames();
//         } catch (error) {
//           console.error('Error fetching user games:', error.message);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     }, [])
//   );

//   useEffect(() => {
//     // Add event listener for hardware back button press
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//       // Handle back button press
//       // Here, you can add your logic to close the app
//       // For example, you might want to show an exit confirmation dialog
//       // If the screen is the Login screen, you can close the app
//       if (navigation.isFocused()) {
//         // Close the app (exit)
//         navigation.navigate('ALScreen')
//         return true; // Prevent default behavior (exit the app)
//       }

//       // If it's not the Login screen, let the default back button behavior occur
//       return false;
//     });

//     // Clean up the event listener on component unmount
//     return () => backHandler.remove();
//   }, [navigation]);

//   return (
//     <View style={{ flex:1,alignItems: 'center',justifyContent:'flex-start' , marginTop:65}}>

// <View style={{ flexDirection: 'row', alignItems: 'center'}}>

// <EvilIcons name="bell" size={30}  style={styles.bell}  color="black" />
//     <AntDesign name="logout" size={19} style={styles.logout}color="black" />
// </View>

// <Text style={styles.welcomeText}>{`Welcome , ${userName || 'Guest'}`}</Text>

//         <LinearGradient
//           colors={['#31A078', '#31A05F']} // Example colors, replace with your desired gradient colors
//           style={styles.card}
//         >

// <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' ,marginBottom:8}}>
//   <Text style={styles.createdAtText}>
//     Last week's numbers
//   </Text>

//   <Text style={styles.viewGame}>View Game</Text>
// </View>
//          <NumberRow numbers={[1, 2, 3, 4, 5, 6]} />
//         </LinearGradient>

//       <View>

//       <Text  style={styles.yohaveText} > You have</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (

//       <Text style={styles.creditsText}>{credits} Credits</Text>

//       )}

//       </View>

//       <View style={{ flexDirection: 'row', alignItems: 'flex-start' ,justifyContent:'space-between'}}>

//       <LinearGradient
//   colors={['#31A078', '#31A05F']} // Example colors, replace with your desired gradient colors
//   style={styles.playNowcard}
// >
//   <TouchableOpacity onPress={() => navigation.navigate('PaymentMethodPage')}>
//     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{ color: 'white' }}>Buy Credits</Text>
//     </View>
//   </TouchableOpacity>
// </LinearGradient>
// <LinearGradient
//   colors={['#F0C735', '#D98F39']} // Example colors, replace with your desired gradient colors
//   style={styles.buycreditscard}
// >
//   <TouchableOpacity onPress={() => navigation.navigate('ALScreen')}>
//     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{ color: 'white' }}>Play Now</Text>
//     </View>
//   </TouchableOpacity>
// </LinearGradient>

// </View>

//       <View style={{ flexDirection: 'row',marginBottom:15, justifyContent: 'flex-start',alignItems:'flex-start',marginTop:20 }}>

//         <Text  style={styles.previousgames}>Previous Games</Text>

//         <Text  style={styles.seeAll}>See all</Text>
//         <AntDesign name="arrowright"  style={{marginTop:7,marginRight:10}} size={24} color="#FE555D" />

//         </View>

//         {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (

//         <ScrollView  style={{marginBottom:10,marginTop:10}}>
//       {userGames

//       .map((game, index) => (

//         <LinearGradient
//         colors={['#F0C735', '#D98F39']} // Example colors, replace with your desired gradient colors
//         style={styles.mainCard}
//       >
//         <TouchableOpacity key={index} onPress={() => handleCardPress(game)}>

//         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//   <Text style={styles.createdAtText}>
//   {new Date(game.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
//   </Text>

//   <Text style={styles.viewGame}>View Game</Text>
// </View>

//             <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

//               <View style={styles.container}>
//                 {game.selectedNumbers.map((number, index) => (
//                   <View key={index} style={styles.numberBox}>
//                     <Text style={styles.numberText}>{number}</Text>

//                   </View>
//                 ))}
//               </View>
//             </View>

//         </TouchableOpacity>
// </LinearGradient>

//       ))}
//       </ScrollView>

// )}

//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   welcomeText: {
//     width: 354,
//     height: 41,

//     left: 0,

//     fontSize: 30, // Adjust the font size as needed
//     fontWeight: 'bold',
//     marginBottom:35

//   },
//   numberBox: {
//     width: 43,
//     height: 37,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: 'white',
//     margin: 4.5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   numberText: {
//     marginTop:20,
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   createdAtText: {

//     fontSize: 15,
//     marginLeft: 10,
//     marginBottom: 10,
//     color: 'white',
//     flex: 1, // Use flex to allow the text to take available space
//   },
//   mainCard: {
//     width: 354,
//      marginBottom:10,
//     marginLeft:'1%',
//     borderRadius: 15,
//     padding: 15,
//     height:130,
//     elevation: 3,
//     backgroundColor: '#F0C735'
//   },
//   mainCardTwo: {
//     margin: 10,
//     padding: 15,
//     borderRadius: 15,
//     height:134,
//     width:354,
//     elevation: 3,
//     backgroundColor: '#F0C735',
//     marginTop:50,
//     alignSelf:'center'
//   },
//   yohaveText: {
//     width: 354,
//     height: 41,
//     top: 10,

//     marginLeft:'1.5%',
//     fontSize: 16, // Adjust the font size as needed

//   },

//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap', // Allow items to wrap to the next line
//     justifyContent: 'center', // Center items horizontally
//   },
//   previousgames: {

//     fontSize: 22, // Adjust the font size as needed
//     fontWeight: 'bold',
//     textAlign: 'left', // Add this line to explicitly set text alignment to left
//     marginRight:120,
//     marginLeft:15
//   },
//   seeAll: {
//      marginTop:8,
//     fontSize: 16, // Adjust the font size as needed
//     marginRight:5,
//     textAlign: 'left',
//     color:'#FE555D' // Add this line to explicitly set text alignment to left

//   },
//   creditsText: {
//     width: 354,
//     height: 41,
//     top: 1,
//     left: 1,
//     marginLeft:'2%',
//     fontSize: 30, // Adjust the font size as needed
//     marginBottom:5

//   },
//   viewGame: {
//     fontSize: 15,
//     marginLeft: 10, // Adjust this margin based on your design
//     marginBottom: 10,

//     color: 'white',
//     // No need for marginLeft here, as we're using justifyContent: 'space-between'
//   },

//   card: {
//     width: 354,
//     margin: 10,
//     padding: 15,
//     borderRadius: 15,
//     backgroundColor: '#31A078', // Set to the desired color
//     elevation: 3,
//     height: 125,
//     marginLeft:'2%'
//   },
//   playNowcard: {
//     width: 147,
//     margin: 1,
//     padding: 15,
//     borderRadius: 15,
//     backgroundColor: '#F0C735', // Set to the desired color
//     elevation: 3,
//     height: 50,
//     paddingLeft:15,
//     marginRight:22,
//     marginLeft:10,
//     alignSelf:'flex-start'
//   },
//   buycreditscard: {
//     width: 147,
//     margin: 1,
//     padding: 15,
//     borderRadius: 15,
//     backgroundColor: '#F0C735', // Set to the desired color
//     elevation: 3,
//     height: 50,
//     paddingLeft:20,
//     marginRight:10,
//     marginLeft:35,
//     alignSelf:'flex-start'
//   },

//   createaccountText: {

//     // Add this line to align text to the left
//     width: 354,
//     height: 41,
//     top: 103,
//     left: 30,

//     fontSize: 30, // Adjust the font size as needed
//     fontWeight: 'bold',
//     marginBottom:100
//   },

//   textInput: {
//     borderColor: 'black',
//     backgroundColor: 'white',
//     width: '100%',
//     borderWidth: 1,
//     borderStyle: 'solid',
//     fontSize: 15,
//     borderRadius: 25,
//     color: 'white', // Add this line to set the text color to white
//   },

//   createaccountTextTwo: {

//     fontSize: 17,
//     width: 354,
//     height: 22,
//     top: 10,
//     left: 38,

//     fontSize: 13,
//     marginBottom: 80,
//     textAlign: 'left', // Add this line to align text to the left
//   },

//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     selectedCountryText: {
//       fontSize: 16,
//       paddingVertical: 10,
//       paddingHorizontal: 10,
//       borderWidth: 1,
//       borderColor: 'gray',
//       borderRadius: 4,
//       backgroundColor: 'white',
//     },

//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     modalContent: {
//       backgroundColor: 'white',
//       padding: 20,
//       borderRadius: 10,
//       elevation: 5,
//     },
//     countryItem: {
//       paddingVertical: 10,
//       borderBottomWidth: 1,
//       borderBottomColor: 'gray',
//     },
//     elevation: 5,
//   },
//   countryItem: {
//     paddingVertical: 10,

//     borderBottomColor: 'gray',
//   },
//   circleText: {
//     backgroundColor: 'white',
//     borderRadius: 50,
//     width: 100,
//     height: 100,
//     textAlign: 'center',
//     lineHeight: 100,
//     fontSize: 20,
//     marginTop: -20, // Adjust the negative margin top to move the circle upward
//   },
//   numberBoxTwo: {
//     width: 45,
//     height: 35,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: 'white',
//     margin: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   numberText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: 'white',
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
// });

// export default HomeScreen;

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Card, TextInput, Button, Chip } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons } from "@expo/vector-icons";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { logout } from './auth/logout';
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const NumberRow = ({ numbers }) => {
  return (
    <View style={styles.container}>
      {numbers.map((number, index) => (
        <View key={index} style={styles.numberBox}>
          <Text style={styles.numberText}>{number}</Text>
        </View>
      ))}
    </View>
  );
};
const HomeScreen = () => {
  const navigation = useNavigation();
  const [userGames, setUserGames] = useState([]);
  const [userName, setUserName] = useState(null);
  const [credits, setCredits] = useState(0);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingCredits, setLoadingCredits] = useState(true);

  const logout = async () => {
    try {
      // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend server.
      const backendURL = 'https://lottery-backend-tau.vercel.app/api/v1/auth';
      
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const accessToken = await AsyncStorage.getItem('accessToken');
      // Assuming you have the refreshToken stored in a variable.
  
      // Make a POST request to the logout endpoint with the refreshToken in the request body.
      const response = await axios.post(
        `${backendURL}/logout`,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Check if the logout was successful.
      if (response.status === 200) {
        console.log('Logged out successfully');
        navigation.navigate('ProfileLanding');
        // Redirect or perform any other action after successful logout.
      } else {
        console.error('Logout failed');
        // Handle logout failure, e.g., display an error message.
      }
    } catch (error) {
      console.error('Error during logout', error);
      // Handle the error, e.g., display an error message.
    }
  };
  const handleLogout = () => {
    logout(navigation);
  };

  const goToGameDetails = (game) => {
    navigation.navigate('GameDetailsPage', { game });
  };
  const getUserGames = async () => {
    const storedAccessToken = await AsyncStorage.getItem("accessToken");
    const userId = await AsyncStorage.getItem("userId");

    const url = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-game/${userId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedAccessToken}`,
        },
      });

      if (!response.ok) {
        const userGames = await getUserGames(userId, authToken);
        const errorData = await response.json();
        console.log("User games:", errorData);
        const responseData = await response.json();
        //console.log('User games data:', responseData);

        // Update the state with user games data
        setUserGames(responseData.message);
        throw new Error(`Failed to fetch user games: ${errorData.message}`);
      }

      const responseData = await response.json();
      console.log("User games data:", responseData);
      responseData.message.forEach((game) => {
        // Log the selectedNumbers array for each game
        console.log("Selected numbers for game:", game.selectedNumbers);
      });
      // Log the successful response data
      return responseData;
    } catch (error) {
      console.error("Error while fetching user games:", error.message);
      throw error;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchPersonalDetails = async () => {
        const userId = await AsyncStorage.getItem("userId");
        const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`;
        const storedAccessToken = await AsyncStorage.getItem("accessToken");

        try {
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedAccessToken}`,
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${response.status} - ${errorData.message}`);
          }

          const data = await response.json();
          setCredits(data.message.credits);
          console.log("credits", data.message.credits);
          // Additional fields can be set here based on your API response
        } catch (error) {
          console.error("Error fetching personal details:", error.message);
        }
      };

      fetchPersonalDetails();
    }, []) // Empty dependency array means this effect will only run once when the component mounts
  );

  useEffect(() => {
    // Function to retrieve userName from AsyncStorage
    const getUserNameFromStorage = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem("userName");
        if (storedUserName !== null) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error("Error retrieving userName from AsyncStorage:", error);
      }
    };

    // Call the function to get userName when the component mounts
    getUserNameFromStorage();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const responseData = await getUserGames();
          setUserGames(responseData.message);
        } catch (error) {
          console.error("Error fetching user games:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          await getUserGames();
        } catch (error) {
          console.error("Error fetching user games:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  useEffect(() => {
    // Add event listener for hardware back button press
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Handle back button press
        // Here, you can add your logic to close the app
        // For example, you might want to show an exit confirmation dialog
        // If the screen is the Login screen, you can close the app
        if (navigation.isFocused()) {
          // Close the app (exit)
          navigation.navigate("ALScreen");
          return true; // Prevent default behavior (exit the app)
        }

        // If it's not the Login screen, let the default back button behavior occur
        return false;
      }
    );

    // Clean up the event listener on component unmount
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: hp(8),
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>

        <EvilIcons name="bell" size={30} style={styles.bell} color="black" />
        <TouchableOpacity  onPress={handleLogout}>

        <AntDesign
          name="logout"
          size={19}
          style={styles.logout}
          color="black"
        />
        </TouchableOpacity>
      </View>

      <Text style={styles.welcomeText}>{`Welcome , ${
        userName || "Guest"
      }`}</Text>

      <LinearGradient
        colors={["#31A078", "#31A05F"]} // Example colors, replace with your desired gradient colors
        style={styles.card}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text style={styles.createdAtText}>Last week's numbers</Text>

          <Text style={styles.viewGame}>View Game</Text>
        </View>
        <NumberRow numbers={[1, 2, 3, 4, 5, 6]} />
      </LinearGradient>

      <View>
        <Text style={styles.yohaveText}> You have</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Text style={styles.creditsText}>{credits} Credits</Text>
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <LinearGradient
          colors={["#31A078", "#31A05F"]} // Example colors, replace with your desired gradient colors
          style={styles.playNowcard}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("PaymentMethodPage")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white" }}>Buy Credits</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={["#F0C735", "#D98F39"]} // Example colors, replace with your desired gradient colors
          style={styles.buycreditscard}
        >
          <TouchableOpacity onPress={() => navigation.navigate("ALScreen")}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white" }}>Play Now</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginBottom: hp('1%'),
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: hp('3%'),
        }}
      >
        <Text style={styles.previousgames}>Previous Games</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Game")}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Game")}>
          <AntDesign
            name="arrowright"
            style={{ marginRight: hp("1%")  , marginLeft:hp("1%") }}
            size={24}
            color="#FE555D"
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={{ marginBottom: 10, marginTop: hp(.01) }}>
          {userGames.map((game, index) => (
            <LinearGradient
              key={index}
              colors={["#F0C735", "#D98F39"]} // Example colors, replace with your desired gradient colors
              style={styles.mainCard}
            >
              <TouchableOpacity key={index} onPress={() => goToGameDetails(game)}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.createdAtText}>
                    {new Date(game.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>

                  <Text style={styles.viewGame}>View Game</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={styles.container}>
                    {game.selectedNumbers.map((number, index) => (
                      <View key={index} style={styles.numberBox}>
                        <Text style={styles.numberText}>{number}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    width: 354,
    height: 41,

    left: 0,

    fontSize: 30, // Adjust the font size as needed
    fontWeight: "bold",
    marginBottom: hp("3%"),
  },
  numberBox: {
    width: 43,
    height: 37,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    margin: 4.5,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  createdAtText: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
    color: "white",
    flex: 1, // Use flex to allow the text to take available space
  },
  mainCard: {
    width: wp("90%"),
    margin: wp("2%"), // Responsive margin
    padding: wp("4%"), // Responsive padding
    borderRadius: wp("5%"), // Responsive borderRadius

    elevation: 3,
    height: hp("16%"), // Responsive height using heightPercentageToDP
    marginLeft: wp("2%"),
    backgroundColor: "#F0C735",
  },
  mainCardTwo: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    height: 134,
    width: 354,
    elevation: 3,
    backgroundColor: "#F0C735",
    marginTop: 50,
    alignSelf: "center",
  },
  yohaveText: {
    width: 354,
    height: 41,
    top: 10,

    marginLeft: "1.5%",
    fontSize: 16, // Adjust the font size as needed
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap", // Allow items to wrap to the next line
    justifyContent: "center", // Center items horizontally
  },
  previousgames: {
    fontSize: hp('2.8%'), // Adjust the percentage as needed
    fontWeight: "bold",
    textAlign: "left",
     marginRight:wp('20%'),
    marginLeft: wp('1%'),
  },
  seeAll: {
    fontSize: hp('2.0%'), // Adjust the percentage as needed
    fontWeight: "bold",
    textAlign: "left",
    marginRight: wp('1%'),
    marginLeft: wp('2%'),
    color: "#FE555D", // Add this line to explicitly set text alignment to left
  },
  creditsText: {
    width: 354,
    height: 41,
    top: 1,
    left: 1,
    marginLeft: "2%",
    fontSize: 30, // Adjust the font size as needed
    marginBottom: 5,
  },
  viewGame: {
    fontSize: 15,
    marginLeft: 10, // Adjust this margin based on your design
    marginBottom: 10,

    color: "white",
    // No need for marginLeft here, as we're using justifyContent: 'space-between'
  },

  card: {
    width: wp("90%"),
    margin: wp("2%"), // Responsive margin
    padding: wp("4%"), // Responsive padding
    borderRadius: wp("5%"), // Responsive borderRadius
    backgroundColor: "#31A078",
    elevation: 3,
    height: hp("16%"), // Responsive height using heightPercentageToDP
    marginLeft: wp("2%"),
  },
  playNowcard: {
    width: wp("33%"), // Adjust the percentage as needed
    margin: wp("0.5%"), // Responsive margin
    padding: wp("4%"), // Responsive padding
    borderRadius: wp("2%"), // Responsive borderRadius
    backgroundColor: "#F0C735",
    elevation: 3,
    height: hp("6%"), // Responsive height using heightPercentageToDP
    paddingLeft: wp("4%"), // Responsive paddingLeft
    marginRight: wp("10%"), // Responsive marginRight
    marginLeft: wp("1%"), // Responsive marginLeft
    alignSelf: "flex-start",
  },
  buycreditscard: {
    width: wp("33%"), // Adjust the percentage as needed
    margin: wp("0.5%"), // Responsive margin
    padding: wp("4%"), // Responsive padding
    borderRadius: wp("2%"), // Responsive borderRadius
    backgroundColor: "#F0C735",
    elevation: 3,
    height: hp("6%"), // Responsive height using heightPercentageToDP
    paddingLeft: wp("4%"), // Responsive paddingLeft
    marginRight: wp("1%"), // Responsive marginRight
    marginLeft: wp("10%"), // Responsive marginLeft
    alignSelf: "flex-start",
  },

  createaccountText: {
    // Add this line to align text to the left
    width: 354,
    height: 41,
    top: 103,
    left: 30,

    fontSize: 30, // Adjust the font size as needed
    fontWeight: "bold",
    marginBottom: 100,
  },

  textInput: {
    borderColor: "black",
    backgroundColor: "white",
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 15,
    borderRadius: 25,
    color: "white", // Add this line to set the text color to white
  },

  createaccountTextTwo: {
    fontSize: 17,
    width: 354,
    height: 22,
    top: 10,
    left: 38,

    fontSize: 13,
    marginBottom: 80,
    textAlign: "left", // Add this line to align text to the left
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    selectedCountryText: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 4,
      backgroundColor: "white",
    },

    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    countryItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "gray",
    },
    elevation: 5,
  },
  countryItem: {
    paddingVertical: 10,

    borderBottomColor: "gray",
  },
  circleText: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 100,
    height: 100,
    textAlign: "center",
    lineHeight: 100,
    fontSize: 20,
    marginTop: -20, // Adjust the negative margin top to move the circle upward
  },
  numberBoxTwo: {
    width: 45,
    height: 35,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  bell: {
    width: 24,
    height: 24,
    top: 1,
    left: wp("38%"),
    padding: "2px 3.5px 2px 3.5px",
  },
  logout: {
    marginTop: 5,
    width: 24,
    height: 24,
    top: 1,
    left: wp("40%"),
    padding: "2px 3.5px 2px 3.5px",
  },
});

export default HomeScreen;
