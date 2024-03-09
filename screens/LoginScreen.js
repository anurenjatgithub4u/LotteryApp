
import React, { useState, useEffect, useCallback,createRef } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Modal,ActivityIndicator,Platform  } from 'react-native';
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
import { Alert } from 'react-native';
import SensitiveInfo from 'react-native-sensitive-info';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import { MaterialIcons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from '@expo/vector-icons';
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

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
              <Text>{` ${country.countryCode} - ${country.country}`}</Text>
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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('LoginScreen focused');
    });
  
    return unsubscribe;
  }, [navigation]);
 
  const [fcmToken, setFcmToken] = useState(null);


  useEffect(() => {
    // Retrieve email from AsyncStorage
    const getRegisteredEmail = async () => {
      try {
        const registeredEmail = await AsyncStorage.getItem('registeredEmail');
        if (registeredEmail) {
          setEmail(registeredEmail);
        }
      } catch (error) {
        console.error('Error retrieving email:', error);
      }
    };

    getRegisteredEmail();
  }, []);
    
  const handleLogin = async () => {

    // const token = await registerForPushNotificationsAsync();
    // async function registerForPushNotificationsAsync() {
    //   let token;
    //   if (Platform.OS === 'android') {
    //     Notifications.setNotificationChannelAsync('default', {
    //       name: 'default',
    //       importance: Notifications.AndroidImportance.MAX,
    //       vibrationPattern: [0, 250, 250, 250],
    //       lightColor: '#FF231F7C',
    //       sound: 'default', // Make sure you have a valid sound file for the notification or use 'default'
    //     });
    //   }
    //   if (Device.isDevice) {
    //     const { status: existingStatus } =
    //       await Notifications.getPermissionsAsync();
    //     let finalStatus = existingStatus;
    //     if (existingStatus !== "granted") {
    //       const { status } = await Notifications.requestPermissionsAsync();
    //       finalStatus = status;
    //     }
    //     if (finalStatus !== "granted") {
    //       alert("Failed to get push token for push notification!");
    //       return;
    //     }
    //     // Learn more about projectId:
    //     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    //     token = (
    //       await Notifications.getExpoPushTokenAsync({
    //         projectId: "28ee1909-a4f9-48c6-9992-0571adb39059",
    //       })
    //     ).data;
    //   } else {
    //     console.log("Must use physical device for Push Notifications");
    //   }
    //   return token;
    // }
    //const token = await AsyncStorage.getItem('token');


    const token = await registerForPushNotificationsAsync();
    
    async function registerForPushNotificationsAsync() {
      let token;
  
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
          sound: 'default', // Make sure you have a valid sound file for the notification or use 'default'
        });
      }
  
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: "28ee1909-a4f9-48c6-9992-0571adb39059",
          })
        ).data;
      } else {
        console.log("Must use physical device for Push Notifications");
      }
  
  
  
  
      return token;
    }

    try {
      setLoading(true);
     
      if (!email || !password) {
        Alert.alert(
          '',
          'Please fill in all fields',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
        return;
      }
  
      const response = await axios.post('https://lottery-backend-tau.vercel.app/api/v1/user/login', {
        email,
        password,
        pushNotificationToken: token,
      });
  
      console.log("response", response);
  
      if (response.status === 200) {
        const result = response.data;
  
        //console.log('User logged in successfully:', result);
  
        const accessToken = result.data.accessToken;
        const refreshToken = result.data.refreshToken;
        const credits = result.data.user.credits;
        const userId = result.data.user._id;
        const userName = result.data.user.name;
        const userDate = result.data.user.createdAt;
        const userNumber = 1;
        // Setting the value for 'loginId' key
        
        // console.log('User Details:', result.message.user);
        // console.log('Access Token:', accessToken);
        // console.log('Credits:', credits);
        // console.log('UserId', userId);
        // console.log('UserName..', userName);
        // console.log('Refresh Token:', result.message.refreshToken);
  
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('userName', userName);
        await AsyncStorage.setItem('userDate', userDate);
        await AsyncStorage.setItem('credits', credits.toString());
        await AsyncStorage.setItem('userNumber', userNumber.toString());

        
        await new Promise(resolve => setTimeout(resolve, 2000));
         navigation.navigate('MainScreen', { screen: 'MainScreen' });
        // navigation.navigate("LocalAuthenticationScreen")
        fetchAndConsoleStoredAccessToken();
      } else {
        
  
        Alert.alert(
          '',
          'Login Failed',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      }
    } catch (error) {
      
      Alert.alert(
        '',
        'Login Failed',
        [{ text: error.response.data.message, onPress: () => console.log('OK Pressed') }]
      );
    } finally {
      setLoading(false);
    }
  };



  const loginWithNumber = async () => {
    try {

      const number = `${selectedCountry}${mobileNumberLogin}`
      const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/auth/login-with-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: number,
        }),
      });
      
      if (!response.ok) {
        // Handle error cases
        const errorData = await response.json();
        console.error(`Error: ${errorData.message}`);

       
        // You may want to display an error message to the user
      } else {
        // Request successful
        const responseData = await response.json();
        navigation.navigate('LoginOtp',{mobileNumber: number})
        console.log("Success",responseData); // You can handle the success response here
        // For example, display a success message to the user or redirect them
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Handle unexpected errors
    }
  };
  
  const loginUser = async () => {

    
    const storedPushToken = await AsyncStorage.getItem('expoPushToken');
  
    if (email && password) {
      // If email and password are provided, call handleLogin
      await handleLogin(email, password, storedPushToken);
    } else {
      // If email and password are not provided, call loginWithNumber
      await loginWithNumber(storedPushToken);
    }
  };

  
  useEffect(() => {
    const getStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('fcmToken');
        if (storedToken) {
          console.log('Stored Token:', storedToken);
          setFcmToken(storedToken);
        }
      } catch (error) {
        console.error('Error retrieving token from AsyncStorage:', error);
      }
    };

    getStoredToken();
  }, []);

  return (

    <View style={{ flex:1,alignItems: 'center',justifyContent:'flex-start' , paddingTop: 16,paddingTop:'25%',backgroundColor:"white",paddingLeft:'6%',paddingRight:'6%',paddingBottom:16 }}>

<StatusBar backgroundColor={"transparent"} translucent />

<MaterialIcons name="keyboard-arrow-left" onPress={()=>navigation.navigate('ProfileLandingTesting')} size={35} color="black" style={{
     
     alignSelf:'flex-start',right:'5%',bottom:'5%'
   }}/>
         <Text  style={styles.createaccountText}>Login</Text>
    <Text  style={styles.createaccountTextTwo}>Play and manage your games</Text>




<View

style={{ borderColor: 'black',
      backgroundColor: 'white',
      marginTop:15,
      width: '100%',
      marginBottom: 10,
      height:60,
      borderWidth: .5,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 20,
      
      color: 'white',  
      overflow: "hidden",}}
      
      
      >
      <TextInput
        label="Email"
        
        style={{
          color: 'white',
          backgroundColor: 'white',
          height:60.5,
        
         }}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      </View>



   
   

   
<View

style={{ borderColor: 'black',
      backgroundColor: 'white',
      marginTop:15,
      width: '100%',
      marginBottom: 10,
      height:60,
      borderWidth: .5,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 20,
      
      color: 'white',  
      overflow: "hidden",}}
      
      
      >
      <TextInput
        label="Password"
        
        style={{
          color: 'white',
          backgroundColor: 'white',
          height:60.5,
        
         }}
         activeUnderlineColor="gray"
         secureTextEntry={!showPassword}
         value={password}
         onChangeText={setPassword}
      />
  <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ padding: responsiveWidth(3.7), position: 'absolute', right: 0, }}
        >
          <FontAwesome
            name={showPassword ? 'eye-slash' : 'eye'}
            size={24}
            color="black"
          />
        </TouchableOpacity>


      </View>





   <Text style={{ marginVertical: 10, color: '#31A062' }}>OR</Text>



<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 11 }}>



<View  style={{ borderColor: 'black',
    backgroundColor: 'white',
    marginTop:15,
    width: '20%',
    marginBottom: 10,
    marginRight:15,
    height:60,
    borderWidth: .5,
    borderStyle: 'solid',
    fontSize: 15,
    borderRadius: 20,
    
    color: 'white',  
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



<View
    style={{ borderColor: 'black',
    backgroundColor: 'white',
    marginTop:15,
    width: '75%',
    marginBottom: 10,
    height:60,
    borderWidth: .5,
    borderStyle: 'solid',
    fontSize: 15,
    borderRadius: 20,
    
    color: 'white',  
    overflow: "hidden",}}
>
<TextInput
      label="Mobile Number"
      
     
      style={{
        color: 'white',
        backgroundColor: 'white',
        height:60.5,
      
       }}
    activeUnderlineColor="gray"
      keyboardType="phone-pad" // Use 'phone-pad' keyboard type for mobile numbers
      value={mobileNumberLogin}
      onChangeText={(text) => {
        // Limit the input to a maximum of 10 characters
        if (text.length <= 10) {
          setMobileNumberLogin(text);
        }
      }}
      maxLength={10} 
      
    />
 </View>


</View>

{loading ? (
    <ActivityIndicator style={{ marginTop: 15 }} color="#31A062" size="large" />
  ) : (
    <Button
      mode="contained"
      onPress={loginUser}
      contentStyle={{
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      style={{
        backgroundColor: '#31A062',
        width: '100%',
        marginVertical: 10,
        marginTop: 15,
      }}
      disabled={loading}
    >
      Login
    </Button>
  )}

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
    
   
    left: 30,
     minHeight: hp("7%"),
    fontSize: 34, // Adjust the font size as needed
    fontWeight: 'bold',
    bottom:'6%'
   
  },

  createaccountTextTwo: {
    
    fontSize: 17,
    width: 354,
    height: 22,
    bottom:'6%',
    left: 33,
  
    fontSize: 13,
    
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