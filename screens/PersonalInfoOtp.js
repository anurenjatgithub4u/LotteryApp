import React, { useState , useRef } from 'react';
import { View, Text, TextInput, Button, Alert , StyleSheet,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';


const PersonalInfoOtp = ({ route, navigation }) => {
  const { email, name, mobileNumber } = route.params;
  const [otp, setOtp] = useState('');
   console.log("mob num", mobileNumber)

   const handleVerifyOtp = async () => {
    try {
      const enteredOTP = otpDigits.join('');
      const userId = await AsyncStorage.getItem('userId');
      const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`;
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const countryCode = "+917356380659";


      await AsyncStorage.setItem('userEmail', email);

      
      const response = await axios.patch(apiUrl, {
        email,
        otp: enteredOTP,
        name,
        mobileNumber
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedAccessToken}`,
        }
      });
  
      const responseData = response.data;
  
      if (response.status === 200) {
        navigation.navigate('ContactInfo');
        console.log("msssg", responseData.message);
      } else {
        console.log('Success', email, otp, name, mobileNumber);
        console.log('otp', JSON.stringify(mobileNumber));
        console.log("msssg", responseData.message);
        alert(responseData.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      Alert.alert('Error', 'An error occurred while verifying OTP');
    }
  };

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const digitRefs = useRef(otpDigits.map(() => React.createRef()));

  const handleDigitChange = (index, value) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
    setOtp(otp)
    // Move to the next TextInput if a digit is entered
    if (value && index < otpDigits.length - 1) {
      digitRefs.current[index + 1].current.focus();
    }
  };

  const handleVerification = () => {
    // Concatenate the OTP digits to form the complete OTP
    const enteredOtp = otpDigits.join('');
    console.log('Entered OTP:', email, otp, name, mobileNumber);

    // Your logic for OTP verification and API call here
  };

  return (

    <View  >


<TouchableOpacity onPress={()=> navigation.navigate('ContactInfo')} >

<MaterialIcons name="keyboard-arrow-left" size={35} color="black" style={{
     
     marginLeft: 10, marginTop:51// Add marginLeft to push the icon to the left
   }}
   
   />
   </TouchableOpacity>

     <Text style={{ fontSize: 34, fontWeight: '700' ,marginLeft:'6%'}}>
  OTP Verification 
</Text>

<View  

style={{ flexDirection: 'row', marginTop: 10,alignItems:'center',padding:'4%'}}>
   
      {otpDigits.map((digit, index) => (
        <View key={index}
        
        style={{ borderColor: 'black',
        backgroundColor: 'white',
        width: 50,
        borderWidth: 1,
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
              
              margin:'30%',
              backgroundColor:'white',
              
             
            }}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleDigitChange(index, value)}
            ref={digitRefs.current[index]}
          />
        </View>
      ))}





      </View>


      <TouchableOpacity

      
        style={{
            backgroundColor: '#31A062',
            width: '90%',
            marginVertical: 10,
            marginTop: 15,
            alignSelf:'center',
            height: 60,
            borderRadius:20
        }
    }
        
        onPress={handleVerifyOtp}
      >
        <Text style={{ color: 'white', fontSize: 18,alignSelf:'center',marginTop:15 }}>Verify OTP</Text>
      </TouchableOpacity>

     
      </View>
   
  );
};



export default PersonalInfoOtp

const styles = StyleSheet.create({})