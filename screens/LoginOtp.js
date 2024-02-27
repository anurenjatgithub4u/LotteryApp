
import React,{useState,useRef} from 'react'
import { View, Text, TextInput, Alert , StyleSheet,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const LoginOtp = ({ route,navigation }) => {

    const { mobileNumber } = route.params;
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    
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
            const storedPushToken = await AsyncStorage.getItem('ExpoPushToken');
          // Combine the OTP digits
          const enteredOTP = otpDigits.join('');
          
      
          // Make a request to your server to verify the OTP
          const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/auth/login-with-number', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             mobileNumber,
             otp:enteredOTP,
             pushNotificationToken:storedPushToken
            }),
          });
        
          if (response.ok) {
            // If verification is successful, navigate to the next screen (e.g., HomeScreen)
            navigation.navigate('MainScreen');
          } else {
            // If verification fails, handle the error (show an alert, etc.)
            console.error('OTP verification failed');
          }
        } catch (error) {
          console.error('Error during OTP verification:', error);
        }
      };
    
  
    return (
      <View style={{ flex: 1, alignItems: 'center',padding:16 }}>
  
  
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '5%', alignSelf: 'flex-start' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <MaterialIcons name="keyboard-arrow-left" size={35} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 34, fontWeight: '700', marginLeft: 8 }}>OTP Verification</Text>
    </View>
  
  
        <View    style={{ flexDirection: 'row', marginTop: 40 ,alignItems:'center'}}>
          {/* Create six TextInput components for each digit */}
          {otpDigits.map((digit, index) => (
  
  
  <View key={index}
  
  style={{ borderColor: 'black',
        backgroundColor: 'white',
        width: 50,
        justifyContent: 'center',
        borderWidth: 0.5,
        borderStyle: 'solid',
        fontSize: 15,
        height:55,
        borderRadius: 10,
        alignItems:'center',
       margin:5,
        marginTop:15,
        color: 'white',  // Text color
        overflow: "hidden",}}>
            <TextInput
              key={index}
              style={{
                alignItems:'center',
                textAlign: 'center',
                backgroundColor:'white'
              }}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleDigitChange(index, value)}
            ref={digitRefs[index]}
            />
            </View>
          ))}
        </View>
  

  <Button  contentStyle={{
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }}
  style={{
    backgroundColor: '#31A062',
    width: '90%',
    marginVertical: 10,
    marginTop: 15,
    alignSelf:'center',
    borderRadius:20
  }} onPress={handleVerification}><Text  style={{color:"white"}}>Verify OTP</Text></Button>
  
      
      </View>
    );
  };

export default LoginOtp

const styles = StyleSheet.create({})