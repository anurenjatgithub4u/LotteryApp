
import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback,createRef, useRef } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { Entypo } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HelpScreen from './screens/HelpScreen';
import PlayScreen from './screens/PlayScreen';
import ProfileScreen from './screens/ProfileScreen';
import GameScreen from './screens/GameScreen';
import ProfileLandingScreen from './screens/ProfileLanding';
import GameDetailsPage from './screens/GameDetailsPage';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { AuthProvider } from './screens/auth/AuthContext';
import DateRangePicker from './screens/DateRangePicker';
import ChooseAccount from './screens/ChooseAccount';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddAccount from './screens/AddAccount';
import PaymentPageGateWay from './screens/PaymentGateWay';

import ALSScreen from './screens/ALSScreen';
import PaymentMethodPage from './screens/PaymentMethodPage';

import * as Sentry from "@sentry/react-native";
import { ToastProvider } from 'react-native-toast-message';
import PayStack from './screens/PayStack';
import BuyCredits from './screens/BuyCredits';
import ChooseLevel from './screens/ChooseLevel';
import FaqPage from './screens/FaqPage';
import PlayedGame from './screens/PlayedGame';
import HomeScreen from './screens/HomeScreen';
import ContactinfoScreen from './screens/ContactinfoScreen';
import PurchaseScreen from './screens/PurchaseScreen';
import RedeemPage from './screens/RedeemPage';
import HelpDetailScreen from './screens/HelpDetailScreen';



// Sentry.init({
//   dsn: "https://a63ad10720920c86a1b3ed3f59f53861@o4506372185784320.ingest.sentry.io/4506372188667904",
//   // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
//   // We recommend adjusting this value in production.
//   tracesSampleRate: 1.0,
// });

const serverIpAddress = '192.168.29.12'; // Replace with your machine's IP address
const serverPort = 8000;
const apiUrl = `http://${serverIpAddress}:${serverPort}/register`;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const Splash = ({ navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
      const token = await AsyncStorage.getItem("accessToken");
      // After three seconds, navigate to the login screen
      setTimeout(() => {

        console.log("token",token)
        token?navigation.navigate('ProfileLanding'):navigation.navigate('ProfileLanding')
      }, 3000);
    }
  }, [appIsReady, navigation]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}>
     <Text style={styles.circleText}>LOGO</Text>
      <Text style={styles.boldText}>Afro</Text>
      <Text style={styles.boldText}>Lottery</Text>
      <Text style={styles.boldText}>System</Text>

      
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
  boldText: {
    fontWeight: 'bold',
    marginTop: 10, // Adjust the margin top as needed
    fontSize: 18, // Adjust the font size as needed
  },
});




const OTPVerificationScreen = ({ route,navigation }) => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const { email, name,mobileNumber } = route.params;
  const digitRefs = Array(6).fill(0).map((_, index) => useRef(null));
  const handleDigitChange = (index, value) => {
    // Update the corresponding OTP digit in the state
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
    if (value !== '') {
      const nextIndex = index + 1;
      if (nextIndex < otpDigits.length && digitRefs[nextIndex].current) {
        digitRefs[nextIndex].current.focus();
      }
    }
  };

  const handleVerification = async () => {
    try {
      // Combine the OTP digits
      const enteredOTP = otpDigits.join('');
      console.log('Entered OTP:', enteredOTP);
  
      // Make a request to your server to verify the OTP
      const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/user/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, // Replace with the actual email
          otp: enteredOTP,
          name, // Replace with the actual name
          mobileNumber
        }),
      });
    
      if (response.ok) {
        // If verification is successful, navigate to the next screen (e.g., HomeScreen)
        navigation.navigate('Login');
      } else {
        // If verification fails, handle the error (show an alert, etc.)
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
    }
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
     <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
  OTP Verification 
</Text>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        {/* Create six TextInput components for each digit */}
        {otpDigits.map((digit, index) => (
          <TextInput
            key={index}
            style={{
              width: 50,
              height: 50,
              borderWidth: 1,
              margin: 5,
              textAlign: 'center',
            }}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleDigitChange(index, value)}
          ref={digitRefs[index]}
          />
        ))}
      </View>
      <Button mode="contained" onPress={handleVerification} style={{ width: '100%', marginVertical: 20 }}>
        Verify OTP
      </Button>
    </View>
  );
};






const MainScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home-outline';

        }else if (route.name === 'Game') {
          iconName = focused ? 'ios-game-controller-outline' : 'ios-game-controller-outline';
        }
         else if (route.name === 'Help') {
          iconName = focused ? 'ios-help-circle' : 'ios-help-circle-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'ios-person' : 'ios-person-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Game" component={GameScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Help" component={HelpScreen}   options={{ headerShown: false }}/>
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
  
      {/* Add other tabs if needed */}
   
  </Tab.Navigator>
);

const GameStack = createStackNavigator();


console.disableYellowBox = true;


const App = () => {
  return (


    <AuthProvider>
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen}options={{ gestureEnabled: false }} />
        <Stack.Screen name="ProfileLanding" component={ProfileLandingScreen}options={{ gestureEnabled: false }} />
        <Stack.Screen name="Play" component={PlayScreen} />
        <Stack.Screen name="OTP" component={OTPVerificationScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="GameDetails" component={GameDetailsPage} />
        
        <Stack.Screen name="DateRange" component={DateRangePicker} />
        <Stack.Screen name="ChooseAccount" component={ChooseAccount} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}options={{ gestureEnabled: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword}options={{ gestureEnabled: false }} />
        <Stack.Screen name='PaymentPageGateWay' component={PaymentPageGateWay}></Stack.Screen>
       
        <Stack.Screen name="AddAccount" component={AddAccount} />
        <Stack.Screen name="ALScreen" component={ALSScreen} />
        <Stack.Screen name='PaymentMethodPage' component={PaymentMethodPage} />
        <Stack.Screen name='PayStack' component={PayStack} />
        <Stack.Screen name='Faq' component={FaqPage}/>
        <Stack.Screen name='BuyCredits' component={BuyCredits} />
        <Stack.Screen name='ChooseLevel' component={ChooseLevel} />
        <Stack.Screen name='PlayedGame' component={PlayedGame} />
        <Stack.Screen name='ContactInfo' component={ContactinfoScreen} />
        <Stack.Screen name='PurchaseScreen' component={PurchaseScreen} />
        <Stack.Screen name='Redeem' component={RedeemPage} />
        <Stack.Screen name='HelpDetail' component={HelpDetailScreen} />

      </Stack.Navigator>
      
    </NavigationContainer>
    </AuthProvider>
  );
};



export default Sentry.wrap(App);