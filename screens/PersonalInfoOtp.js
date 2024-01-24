import React, { useState , useRef } from 'react';
import { View, Text, TextInput, Button, Alert , StyleSheet,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const PersonalInfoOtp = ({ route, navigation }) => {
  const { email, name, mobileNumber } = route.params;
  const [otp, setOtp] = useState('');


  const handleVerifyOtp = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`; // Replace with your actual API endpoint
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
     
      const response = await fetch(apiUrl, {
        method: 'PATCH', // Use PATCH method for updating
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedAccessToken}`,
        },
        body: JSON.stringify({ email, otp, name, mobileNumber }),
      });
      const responseData = await response.json();
     
  
      if (responseData.message==='Success') {
        // Check the response data to determine success
        console.log('Success', 'Personal details updated successfully');
        console.log("msssg", responseData.message)
        navigation.navigate('ContactInfo');
      } else {
        Alert.alert('Error', `Error: ${responseData.message}`);
        console.log("msssg", responseData.message)
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'An error occurred while verifying OTP');
    }
  };

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const digitRefs = useRef(otpDigits.map(() => React.createRef()));

  const handleDigitChange = (index, value) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

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

    <View  style={{marginTop:0}}>


<TouchableOpacity onPress={()=> navigation.navigate('ContactInfo')} >

<MaterialIcons name="keyboard-arrow-left" size={35} color="black" style={{
     
     marginLeft: 10, marginTop:51// Add marginLeft to push the icon to the left
   }}
   
   />
   </TouchableOpacity>

     <Text style={{ fontSize: 34, fontWeight: '700' ,marginLeft:'6%'}}>
  OTP Verification 
</Text>

    <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: '6%' }}>
   
      {otpDigits.map((digit, index) => (
        <View key={index} style={{ borderColor: 'black', backgroundColor: 'white', width: 50, borderWidth: 0.5, borderStyle: 'solid', fontSize: 15, height: 55, borderRadius: 10, margin: 5, marginTop: 15, color: 'white', overflow: "hidden" }}>
          <TextInput
            key={index}
            style={{
              textAlign: 'center',
              backgroundColor: 'white'
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