import React, { useState, useEffect, useCallback,createRef } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Modal } from 'react-native';
import * as Font from 'expo-font';
import { Entypo } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BackHandler } from 'react-native';
import { useAuth } from './auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const CustomPicker = ({ visible, onClose, onSelect, data }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {data.map((country) => (
            <TouchableOpacity
              key={country.countryCode}
              style={styles.countryItem}
              onPress={() => {
                onSelect(country.countryCode);
                onClose();
              }}
            >
              <Text>{`${country.country} - ${country.countryCode}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumberLogin, setMobileNumberLogin] = useState('');
  const { setAccessToken } = useAuth();
  const [countryCode, setCountryCode] = useState('');
  const [show, setShow] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // Add event listener for hardware back button press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Handle back button press
      // Here, you can add your logic to close the app
      // For example, you might want to show an exit confirmation dialog
      // If the screen is the Login screen, you can close the app
      if (navigation.isFocused()) {
        // Close the app (exit)
        BackHandler.exitApp();
        return true; // Prevent default behavior (exit the app)
      }

      // If it's not the Login screen, let the default back button behavior occur
      return false;
    });

    // Clean up the event listener on component unmount
    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    fetchCountries();
  }, []);
  const logSelectedCountryCode = () => {
    console.log('Selected Country Code:', selectedCountry,mobileNumber);
  };
  
  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        'https://lottery-backend-tau.vercel.app//api/v1/admin/get-country'
      );
      const countriesData = response.data.message;
      setCountries(countriesData);
    } catch (error) {
      console.error('Error fetching countries:', error.message);
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     // Validate input fields (you may want to add more validation)
  //     if (!email || !password) {
  //       console.log('Please fill in all fields');
  //       return;
  //     }
     
  //     // Make API request to login user using fetch
  //     const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/user/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //     });
  //   console.log("response",response);
  //     if (response.ok) {
  //       // If login is successful, you may want to store user information or a token
  //       const result = await response.json();
  //       console.log('User logged in successfully:', result.message);
  //       const userId = result.message.userId;
  //       console.log('User ID:', userId);
  //       await AsyncStorage.setItem('accessToken', result.message.accessToken);
  //       setAccessToken(result.message.accessToken);
  //       // You may want to navigate to another screen or perform authentication
  //       navigation.navigate('ProfileLanding');
  //     } else {
  //       // If login fails, handle the error (show an alert, etc.)
  //       console.error('Login failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error.message);
  //   }
  // };
  
  
  const fetchCredits = async () => {
    try {
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userDetails = JSON.parse(storedUserDetails);
  
      if (!userDetails || !userDetails._id) {
        console.log('User details not found in AsyncStorage');
        return;
      }
  
      const userId = userDetails._id;
  
      const response = await fetch(`https://lottery-backend-tau.vercel.app/api/v1/user/get-credits/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('User credits:', result.credits);
        const userCredits = result.credits;
  
        // Store the user credits in AsyncStorage
        await AsyncStorage.setItem('userCredits', userCredits.toString());
  
        console.log('New credits:', userCredits);
  
        // Additional logic can be added here if needed
      } else {
        console.error('Failed to fetch user credits');
      }
    } catch (error) {
      console.error('Error checking user credits:', error.message);
    }
  };

  const fetchAndConsoleStoredAccessToken = async () => {
    try {
      // Retrieve accessToken from AsyncStorage
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');

      const storedUserId = await AsyncStorage.getItem('userId');
      const storedCredits = await AsyncStorage.getItem('credits');
      
      // Log the stored accessToken
      console.log('Stored Access Token:', storedAccessToken);
      console.log('Stored user id:', storedUserId);
      console.log('Stored user credits agin again:', storedCredits);
      console.log('Stored refreshToken:', storedRefreshToken);


    } catch (error) {
      console.error('Error fetching stored Access Token:', error.message);
    }
  };
  
  // Call fetchAndConsoleStoredAccessToken to retrieve and console the stored Access Token

  
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
  const handleLogin = async () => {
    try {
      // Validate input fields (you may want to add more validation)
      if (!email || !password) {
        console.log('Please fill in all fields');
        return;
      }
  
      // Make API request to login user using fetch
      const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        // If login is successful, you may want to store user information or a token
        const result = await response.json();
      
        console.log('User logged in successfully:', result);
        const accessToken = result.data.accessToken;
        const refreshToken = result.data.refreshToken;

        const credits = result.data.user.credits;
        const userId = result.data.user._id;
        const userName = result.data.user.name;
        // Access user details from the response
        const user = result.message.user;
        console.log('User Details:', user);
        console.log('Access Token:', accessToken);
        console.log('Credits:', credits);
        console.log('UserId',userId);
        console.log('UserName..',userName);

        console.log('Refresh Token:', result.message.refreshToken);
        // Store user details or navigate to another screen
         await AsyncStorage.setItem('accessToken', accessToken);
         await AsyncStorage.setItem('refreshToken', refreshToken);

         await AsyncStorage.setItem('userId', userId);
         await AsyncStorage.setItem('userName', userName);
         await AsyncStorage.setItem('credits', credits.toString());

        // await AsyncStorage.setItem('userDetails', JSON.stringify(user));

        // fetchCredits();
        // fetchAndConsoleStoredCredits();
        fetchAndConsoleStoredAccessToken();
        // setAccessToken(result.message.accessToken);
        // You may want to navigate to another screen or perform authentication
        navigation.navigate('ALScreen');
      } else {
        // If login fails, handle the error (show an alert, etc.)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };
  

  return (
    <View style={{ flex:1,alignItems: 'center',justifyContent:'flex-start' , padding: 16 }}>
         <Text  style={styles.createaccountText}>Login</Text>
    <Text  style={styles.createaccountTextTwo}>Play and manage your games</Text>


    <View style={{ borderColor: 'black',
      backgroundColor: 'white',
      width: '100%',
      borderWidth: 0.5,
      borderStyle: 'solid',
      fontSize: 15,
      height:60,
      borderRadius: 25,

      color: 'white',  // Text color
      overflow: "hidden",}}>
      <TextInput
        label="Email"
       
        style={{ color: 'white',
     
        backgroundColor: 'white',
        height:60.5, }}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      </View>


      <View style={{ borderColor: 'black',
      backgroundColor: 'white',
      width: '100%',
      borderWidth: 0.5,
      borderStyle: 'solid',
      fontSize: 15,
      height:60,
      borderRadius: 25,
      marginTop:15,
      color: 'white',  // Text color
      overflow: "hidden",}}>
      <TextInput
        label="Password"
        
        style={{ color: 'white',
     
        backgroundColor: 'white',
        height:60.5, }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={() => Keyboard.dismiss()}
      />

      
   </View>

   <Text style={{ marginVertical: 10, color: '#31A062' }}>Or</Text>



<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>



<View style={{ borderColor: 'black',
      backgroundColor: 'white',
      width: '20%',
      borderWidth: 0.5,
            borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      marginRight:15,
      color: 'white',  // Text color
      overflow: "hidden",}}>
<TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedCountryText}>
          {selectedCountry || 'Ext'}
        </Text>
      </TouchableOpacity>
      <CustomPicker
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(value) => setSelectedCountry(value)}
        data={countries}
      />
</View>



<View style={{ borderColor: 'black',
      backgroundColor: 'white',
      width: '75%',
      borderWidth: 1,
      height:60,
      borderWidth: 0.5,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      color: 'white',  // Text color
      overflow: "hidden",}}>
<TextInput
      label="Mobile Number"
      
      style={{
        color: 'white',
        backgroundColor: 'white',
        height:60,
       
       }}
      keyboardType="phone-pad" // Use 'phone-pad' keyboard type for mobile numbers
      value={mobileNumberLogin}
      onChangeText={setMobileNumberLogin}
      onSubmitEditing={() => Keyboard.dismiss()}
    />
 </View>


</View>

      <Button mode="contained" onPress={handleLogin}  contentStyle={{
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }}
  style={{
    backgroundColor: '#31A062',
    width: '100%',
    marginVertical: 10,
    marginTop: 15,
  }}>
        Login
      </Button>

      <Text style={{ marginVertical: 10, color: '#31A062' }} onPress={() => navigation.navigate('Register')}>
       Create an account?
      </Text>
      <Text style={{ marginVertical: 10  , color: '#31A062' }}  onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
      
    </View>
  );
};
const styles = StyleSheet.create({
  circleText: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 100,
    height: 100,
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 20,
    marginTop: -20, // Adjust the negative margin top to move the circle upward
  },
  selectedCountryText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    
    borderColor: 'gray',
    
    backgroundColor: 'white',
    height: 51,
    marginTop: 7,
    marginRight: 10,
   
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  createaccountText: {
    
   
    // Add this line to align text to the left
    width: 354,
    height: 41,
    top: 99,
    left: 30,

    fontSize: 34, // Adjust the font size as needed
    fontWeight: 'bold',
    marginBottom:100
  },

  createaccountTextTwo: {
    
    fontSize: 17,
    width: 354,
    height: 22,
    top: 10,
    left: 38,
  
    fontSize: 13,
    marginBottom: 80,
    textAlign: 'left', // Add this line to align text to the left
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    selectedCountryText: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      backgroundColor: 'white',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    countryItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    elevation: 5,
  },
  countryItem: {
    paddingVertical: 10,
    
    borderBottomColor: 'gray',
  },
});
export default LoginScreen;


